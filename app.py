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


@app.route('/insert_new_plan', methods=["POST"])
def insert_new_plan():
    plans = mongo.db.plans
    plans.insert_one(request.form.to_dict())
    organizer_name = request.form["organizer_name"]
    look_for_id = plans.find({"organizer_name": organizer_name}).sort( "_id", -1 )[0]
    return render_template('create_new_plan.html', organizer_name=organizer_name, look_for_id = look_for_id)


@app.route('/update_details/<plan_id>', methods=["POST"])
def update_details(plan_id):
    plans = mongo.db.plans
    plans.update({'_id': ObjectId(plan_id)},
    request.form.to_dict())
    return render_template('after_creating_plan.html')


@app.route('/see_plan/<plan_id>')
def see_plan(plan_id):
    return render_template('after_creating_plan.html')


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
    port=int(os.environ.get('PORT')),
    debug=True)