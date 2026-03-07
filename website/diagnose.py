from flask import Blueprint,render_template

diagnose = Blueprint('diagnose',__name__)

@diagnose.route('/diagnose')
def checkup():
    return render_template("Detection.html")
    

