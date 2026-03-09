from flask import Blueprint, render_template, request
from google import genai
from google.genai import types
import markdown 
import os
from dotenv import load_dotenv

load_dotenv()
symptoms = Blueprint('symptoms', __name__)

# CONFIGURATION
# Using 2.5 Flash for the best balance of speed and helpfulness
MODEL_ID = "gemini-2.5-flash" 
api_key = os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=api_key)


@symptoms.route('/<part_name>', methods=['GET', 'POST'])
def symptoms_page(part_name):
    if request.method == 'POST':
        # Retrieve form data
        common = request.form.getlist('common')
        selected = request.form.getlist('symptom')
        fever_temp = request.form.get('fever-temp')
        additional_info = request.form.get('additional_info')
        
        all_symptoms = ", ".join(common + selected) if (common or selected) else "None reported"

        # SYSTEM INSTRUCTION: Refined to be concise but helpful
        system_instruction = """
        Role: Professional Health Assistant for 'Jeevan AI'.
        Objective: Provide a clear, actionable assessment of symptoms.
        
        Strict Formatting Rules:
        1. Start directly with the assessment. Do not use long intros like 'Hello! Thank you for reaching out'.
        2. Use ### for headers and **bold** for key medical terms.
        3. Structure: 
           ### Potential Causes
           (List 2-3 likely causes with brief explanations)
           
           ### Recommended Advice
           (Provide 2-3 self-care or practical steps)
           
           ### When to seek Urgent Care
           (List specific red flags)
        """

        prompt_text = f"USER DATA: Area: {part_name}, Symptoms: {all_symptoms}, Temp: {fever_temp}C, Notes: {additional_info}"

        try:
            response = client.models.generate_content(
                model=MODEL_ID,
                contents=prompt_text,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    temperature=0.3,
                    max_output_tokens=800  # INCREASED: Ensures the full advice is visible
                )
            )
            
            if response.text:
                # Convert markdown to HTML for the dashboard
                formatted_diagnosis = markdown.markdown(response.text)
            else:
                formatted_diagnosis = "<p class='text-yellow-400 font-bold'>The AI safety filter blocked this specific result. Please try rephrasing your notes.</p>"

        except Exception as e:
            error_str = str(e)
            if "429" in error_str:
                formatted_diagnosis = "<p class='text-orange-400 font-bold'>Server Busy: Free quota limit reached. Please wait 60s.</p>"
            else:
                formatted_diagnosis = f"<p class='text-red-400'>System Error: {error_str}</p>"

        return render_template("result.html", 
                               diagnosis=formatted_diagnosis, 
                               part=part_name,
                               symptoms_list=all_symptoms,
                               temp=fever_temp)

    return render_template("symptoms_page.html", part=part_name)