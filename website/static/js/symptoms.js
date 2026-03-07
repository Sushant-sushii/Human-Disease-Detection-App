document.querySelector('form').addEventListener('submit', function(e) {
    // 1. Check all checkboxes (common and symptom lists)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    // 2. Check your hidden inputs (head_part, etc.)
    const headPart = document.getElementById('head_part_input').value;
    const facePart = document.getElementById('head_part_for_face')?.value; // Using optional chaining if it doesn't exist
    
    // 3. Validation Logic
    const hasSymptom = checkboxes.length > 0;
    const hasRegion = (headPart && headPart !== "") || (facePart && facePart !== "");
    const hasAdditionalInfo = document.querySelector('textarea[name="additional_info"]')?.value.trim() !== "";

    // If nothing is selected, stop the redirect/submission
    if (!hasSymptom && !hasRegion && !hasAdditionalInfo) {
        e.preventDefault();
        alert("Please select at least one symptom or region before submitting.");
    }
});










// toggles for legs
function toggleNumbInputLeg()
{

    const checkbox=document.getElementById('numb-check-leg');
    const inputContainer=document.getElementById('numb-input-container-leg');

    if(checkbox.checked)
    {
        inputContainer.classList.remove('hidden');

    }
    else{
        inputContainer.classList.add('hidden');
        document.getElementById('numb-leg').value='';
    }
}

function togglePainInput(){

    const checkbox=document.getElementById('pain-check');
    const inputContainer=document.getElementById('pain-input-container');

    if(checkbox.checked)
    {
        inputContainer.classList.remove('hidden');

    }
    else{
        inputContainer.classList.add('hidden');
        document.getElementById('pain-rating').value='';
    }
}
// face section toggle
function toggleFaceInput(){

    const checkbox=document.getElementById('face-check');
    const inputContainer=document.getElementById('face-section');

    if(checkbox.checked)
    {
        inputContainer.classList.remove('hidden');

    }
    else{
        inputContainer.classList.add('hidden');
       
    }
}
// toggle for facial organs


















 // Toggle for face dropdown
function toggleDropdownforFace() {
    const menu = document.getElementById('dropdown-menu-for-face');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Logic for face selection
function selectOptionForFace(simple) {
    // 1. Update the unique Face display span
    const displaySpan = document.getElementById('selected-value-for-face');
    if (displaySpan) {
        displaySpan.innerHTML = `
            <div class="flex flex-col">
                <span class="text-sm">${simple}</span>
            </div>
        `;
    }

    // 2. Store the value for Flask
    const inputField = document.getElementById('head_part_input_for_face');
    if (inputField) {
        inputField.value = simple.toLowerCase();
    }

    // 3. Close the menu immediately after selection
    const menu = document.getElementById('dropdown-menu-for-face');
    if (menu) {
        menu.classList.add('hidden');
    }
}

// Improved Click-Outside logic for multiple dropdowns
window.onclick = function (event) {
    const isHeadClick = event.target.closest('#custom-dropdown');
    const isFaceClick = event.target.closest('#custom-dropdown-face');

    // Close Head menu if clicking outside of it
    if (!isHeadClick) {
        const headMenu = document.getElementById('dropdown-menu');
        if (headMenu) headMenu.classList.add('hidden');
    }

    // Close Face menu if clicking outside of it
    if (!isFaceClick) {
        const faceMenu = document.getElementById('dropdown-menu-for-face');
        if (faceMenu) faceMenu.classList.add('hidden');
    }
}
// Chest
function toggleDropdownChest() {
    const menu = document.getElementById('dropdown-menu-chest');
    menu.classList.toggle('hidden');
}

function selectChestOption(organ) {
    // 1. Update button text
    document.getElementById('selected-value-chest').innerText = organ;
    
    // 2. Update hidden input for Flask
    document.getElementById('chest_part_input').value = organ.toLowerCase();

    // 3. Hide all question sets first
    const questionSets = document.querySelectorAll('#chest-questions-container > div');
    questionSets.forEach(set => set.classList.add('hidden'));

    // 4. Show only the selected organ's questions
    const selectedId = `${organ.toLowerCase()}-questions`;
    const targetSet = document.getElementById(selectedId);
    if (targetSet) {
        targetSet.classList.remove('hidden');
    }

    // 5. Close the menu
    toggleDropdownChest();
}

// Ensure the window click handler covers the chest dropdown
window.onclick = function (event) {
    if (!event.target.closest('#custom-dropdown') && 
        !event.target.closest('#custom-dropdown-face') && 
        !event.target.closest('#custom-dropdown-chest')) {
        
        document.getElementById('dropdown-menu')?.classList.add('hidden');
        document.getElementById('dropdown-menu-for-face')?.classList.add('hidden');
        document.getElementById('dropdown-menu-chest')?.classList.add('hidden');
    }
}
// toggles for neck
function toggleDropdownNeck() {
    const menu = document.getElementById('dropdown-menu-neck');
    if (menu) menu.classList.toggle('hidden');
}

function selectNeckOption(part) {
    // 1. Update the button text
    document.getElementById('selected-value-neck').innerText = part;
    
    // 2. Update hidden input for your Flask backend
    // Replacing spaces with hyphens for easier processing (e.g., 'lymph-nodes')
    document.getElementById('neck_part_input').value = part.toLowerCase().replace(/\s+/g, '-');

    // 3. Hide all neck question sets first
    const questionSets = document.querySelectorAll('#neck-questions-container > div');
    questionSets.forEach(set => set.classList.add('hidden'));

    // 4. Show the specific questions based on the organ/part
    const selectedId = `${part.toLowerCase().replace(/\s+/g, '-')}-questions`;
    const targetSet = document.getElementById(selectedId);
    if (targetSet) {
        targetSet.classList.remove('hidden');
    }

    // 5. Close the menu immediately
    const menu = document.getElementById('dropdown-menu-neck');
    if (menu) menu.classList.add('hidden');
}

// Updated global click-outside handler
window.onclick = function (event) {
    const dropdowns = [
        { btn: '#custom-dropdown', menu: 'dropdown-menu' },
        { btn: '#custom-dropdown-face', menu: 'dropdown-menu-for-face' },
        { btn: '#custom-dropdown-chest', menu: 'dropdown-menu-chest' },
        { btn: '#custom-dropdown-neck', menu: 'dropdown-menu-neck' }
    ];

    dropdowns.forEach(item => {
        if (!event.target.closest(item.btn)) {
            const menuElement = document.getElementById(item.menu);
            if (menuElement) menuElement.classList.add('hidden');
        }
    });
}
// toggles for hand
function toggleNumbInput()
{

    const checkbox=document.getElementById('numb-check');
    const inputContainer=document.getElementById('numb-input-container');

    if(checkbox.checked)
    {
        inputContainer.classList.remove('hidden');

    }
    else{
        inputContainer.classList.add('hidden');
        document.getElementById('numb-finger').value='';
    }
}
function toggleGripInput(){

    const checkbox=document.getElementById('grip-check');
    const inputContainer=document.getElementById('grip-input-container');

    if(checkbox.checked)
    {
        inputContainer.classList.remove('hidden');

    }
    else{
        inputContainer.classList.add('hidden');
        document.getElementById('grip-rating').value='';
    }
}
   
function toggleSwellInput()
{

    const checkbox=document.getElementById('swell-check');
    const inputContainer=document.getElementById('swell-input-container');

    if(checkbox.checked)
    {
        inputContainer.classList.remove('hidden');

    }
    else{
        inputContainer.classList.add('hidden');
        document.getElementById('swell-time').value='';
    }
}
    





function toggleFeverInput()
         {
            // 1. Get references to both elements
            const checkbox = document.getElementById('fever-check');
            const inputContainer = document.getElementById('fever-input-container');


            // 2. Check the state of the checkbox
            if (checkbox.checked) {
                // Unhide the input box
                inputContainer.classList.remove('hidden');
                document.getElementById('fever-temp').required=true;
            } else {
                // Re-hide and clear the input if they uncheck it
                inputContainer.classList.add('hidden');
                 document.getElementById('fever-temp').required=false;
                document.getElementById('fever-temp').value = '';
            }
        }


        function toggleDropdown() {
            const menu = document.getElementById('dropdown-menu');
            menu.classList.toggle('hidden');
        }

        function selectOption(simple, clinical) {
            // Update the button text
            document.getElementById('selected-value').innerHTML = `
        <div class="flex flex-col">
            <span class="text-sm">${simple}</span>
            <span class="text-[10px] text-blue-400/60">${clinical}</span>
        </div>
    `;

            // Store the clinical value for Flask
            document.getElementById('head_part_input').value = clinical.toLowerCase();

            // Close the menu
            toggleDropdown();
        }

        // Close dropdown if user clicks outside
        window.onclick = function (event) {
            if (!event.target.closest('#custom-dropdown')) {
                document.getElementById('dropdown-menu').classList.add('hidden');
            }
        }