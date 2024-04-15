FROM python:3.9-slim-buster

WORKDIR /app

COPY requirements.txt /app

RUN pip3 install --upgrade pip && pip3 install -r ./requirements.txt --no-cache-dir

COPY ./ /app

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0:8000"]