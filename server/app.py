import os 
from flask import Flask
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    DATABASE_URI = os.environ.get('DATABASE_URI')
    return DATABASE_URI

if __name__ == '__main__':
    app.run(port=5555, debug=True)