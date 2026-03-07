from flask import Flask

def create_app():
    app=Flask(__name__)
    app.config['SECRET_KEY']='HELLO'

    from .views import views
    from .symptoms import symptoms
    from .diagnose import diagnose
    

    app.register_blueprint(views,url_prefix='/')
    app.register_blueprint(symptoms,url_prefix='/diagnose')
    app.register_blueprint(diagnose,url_prefix='/')

    return app