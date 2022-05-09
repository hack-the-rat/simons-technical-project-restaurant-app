from flask import Flask, request, jsonify
from flask_app.storage import insert_restaurant, get_restaurant

app = Flask(__name__)

@app.route('/')
def index():
    return "Simons NYC Restaurant App"

@app.route('/')
def health():
    return '', 200

@app.route('/')
def ready():
    return '', 200

@app.route('/data', methods=['GET'])
def get_data():
    restaurants_history = []

    try:
        restaurants = get_restaurant()
        for key, value in restaurants.items():
            restaurants_history.append(value)

        return jsonify({'restaurants': restaurants_history}), 200
    except:
        return jsonify({'error': 'error fetching restaurants history'}), 500

@app.route('/insert_restaurant', methods=['POST'])
def insert_info():
    insert_info = request.get_json()
    cami, dba, borough, street, zipcode, inspect_date, violate_code, violate_desc, grade = insert_info['cami'], insert_info['dba'], insert_info['borough'], insert_info['street'], insert_info['zipcode'], insert_info['inspect_date'], insert_info['violate_code'], insert_info['violate_desc'], insert_info['grade']

    try:
        insert_info(cami, dba, borough, street, zipcode, inspect_date, violate_code, violate_desc, grade)
        return jsonify({'Response': 'Successfully inserted into database'}), 200
    except:
        return jsonify({'Response': 'Unable to insert into database'})