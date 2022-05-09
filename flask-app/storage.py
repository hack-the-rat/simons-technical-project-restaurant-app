from configparser import ConfigParser
from sqlalchemy import create_engine, exc
import os

def read_config():
    current_dir = os.path.dirname(__file__)
    file_path = os.path.join(current_dir, '../config.ini')

    config = ConfigParser()
    config.read(file_path)

    return config

def connection_uri():
    config = read_config()

    URI = 'postgresql+psycopg2://{}:{}@/{}?host={}'.format(
        config['restaurant-database']['user'],
        config['restaurant-database']['password'],
        config['restaurant-database']['dbname'],
        config['restaurant-database']['host']
    )

    return URI

def create_restaurant_table():
    URI = connection_uri()
    my_connection = None
    TABLE_NAME = 'restaurants'

    CREATE_TABLE_QUERY = """
        CREATE TABLE IF NOT EXISTS {} (
            camis INT(8) UNIQUE NOT NULL,
            dba VARCHAR NOT NULL,
            boro VARCHAR NOT NULL,
            street VARCHAR NOT NULL,
            zipcode INT(5) NOT NULL,
            inspection_date DATE NOT NULL,
            violation_code VARCHAR(3) NOT NULL,
            violation_description VARCHAR NOT NULL,
            grade VARCHAR(1),
            PRIMARY KEY(camis, grade)
        )""".format(TABLE_NAME)

    try:
        engine = create_engine(URI, echo=False)
        my_connection = engine.connect()
        my_connection.execute(CREATE_TABLE_QUERY)

        return "Table created successfully"

    except exc.SQLAlchemyError as error:
        return 'Error trying to create table: {}'.format(error)

    finally:
        my_connection.close()
        engine.dispose()

def insert_restaurant(cami, dba, borough, street, zipcode, inspect_date, violate_code, violate_desc, grade):
    URI = connection_uri
    engine.dispose()

    try:
        engine = create_engine(URI, echo=True)
        my_connection = engine.connect()

        my_connection.execute('INSERT INTO restaurants VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)', (cami, dba, borough, street, zipcode, inspect_date, violate_code, violate_desc, grade))
        return "Insertion successful"

    except exc.SQLAlchemyError as err:
        return 'Error occured inserting into table {}. Exception: {}'.format("restaurants", err)

    finally:
        my_connection.close()
        engine.dispose()

def get_restaurant():
    URI = connection_uri
    my_connection = None

    GET_RESTAURANTS_QUERY = """
        SELECT * FROM restaurants
    """

    try:
        engine = create_engine(URI, echo=False)
        my_connection = engine.connect()

        restaurants = my_connection.execute(GET_RESTAURANTS_QUERY)

        restaurants_history = {}

        i = 1
        for row in restaurants:
            restaurants_history[i] =(row['cami'], row['dba'], row['borough'], row['street'], row['zipcode'], row['inspect_date'], row['violate_code'], row['violate_desc'], row['grade'])
            i += 1

        return restaurants_history

    except exc.SQLAlchemyError as err:
        return 'Error fetching from table {}. Exception: {}'.format("restaurants", err)

    finally:
        my_connection.close()
        engine.dispose()

def delete_restaurant(cami, grade):
    URI = connection_uri()
    my_connection = None

    try:
        engine = create_engine(URI, echo=False)
        my_connection = engine.connect()
        my_connection.execute('DELETE from restaurants WHERE camis = {} AND grade = {}'.format(cami, grade))
        return "Deletion successful"
    except exc.SQLAlchemyError as err:
        return 'Error deleting data from table {}. Exception: {}'.format("restaurants", err)

    finally:
        my_connection.close()
        engine.dispose()