import os
from flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
if os.path.exists("env.py"):
    import env

app = Flask(__name__)
app.config["MONGO_DBNAME"] = 'myPlanner'
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")

mongo = PyMongo(app)

@app.route('/')
@app.route('/start')
def start():
    return render_template('start.html')

@app.route('/create_new_plan')
def create_new_plan():
    return render_template('create_new_plan.html')


@app.route('/insert_new_plan', methods=["POST"])
def insert_new_plan():
    plans = mongo.db.plans
    plans.insert_one(request.form.to_dict())
    return redirect(url_for('after_creating_plan.html'))


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
    port=int(os.environ.get('PORT')),
    debug=True)