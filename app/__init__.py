from flask import Flask
from flask_restful import Resource, Api
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)
api = Api(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

from app import search, db_models
