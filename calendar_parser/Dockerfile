FROM python:3

WORKDIR /app

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY . /app/calendar_parser

EXPOSE 8080

CMD [ "python3", "-m" , "calendar_parser"]
