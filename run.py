from gevent.pywsgi import WSGIServer
from flask_app.app import app

if __name__ == '__main__':  
    WSGIServer(('0.0.0.0', 80), app).serve_forever()