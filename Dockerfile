FROM python:3.7

WORKDIR /restaurant_app_flask

ADD run.py .

ADD config.ini .

ADD requirements.txt .

RUN pip install -r requirements.txt

ADD ./flask_app ./flask_app

EXPOSE 8000

CMD [ "python", "run.py" ]