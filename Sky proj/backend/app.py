import os
from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")  # Load URI from .env
mongo = PyMongo(app)
CORS(app)  # Allow frontend access

@app.route("/download_json", methods=["GET"])
def download_json():
    data = list(mongo.db.TrafficData.find({}, {"_id": 0}))  # Fetch from MongoDB
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
