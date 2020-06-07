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


@app.route('/check_event_key')
def check_event_key():
    return render_template('check_event_key.html')


@app.route('/update_details/<plan_id>', methods=["POST"])
def update_details(plan_id):
    list_avail = []
    for i in range(0, 6):
        each_availability = "availability_" + str(i)
        try:
            list_avail.append(request.form[each_availability])
        except:
            break
    plans = mongo.db.plans
    plans.update({'_id': ObjectId(plan_id)},
                 {'$set': {
                     'event_name': request.form["event_name"],
                     'event_description': request.form["event_description"],
                     'availabilities': list_avail,
                     'event_place': request.form["event_place"],
                     'participants': []
                 }})
    return render_template('after_creating_plan.html', plan_id=plan_id)


@app.route('/update_plan_participants/<plan_id>')
def update_plan_participants(plan_id):
    the_plan = mongo.db.plans.find_one({"_id": ObjectId(plan_id)})
    range_availability = range(0, len(the_plan['availabilities']))
    if the_plan['participants'] == 0:
        range_participant = 0
    else:
        range_participant = range(0, len(the_plan['participants']))
    return render_template('update_plan_participants.html',
                           plan_id=plan_id, the_plan=the_plan,
                           range_participant=range_participant,
                           range_availability=range_availability)


@app.route('/update_plan_complete/<plan_id>', methods=["POST"])
def update_plan_complete(plan_id):
    i = 0
    while i < 50:
        i = i + 1
        each_participant = "participant_" + str(i)
        try:
            name_participant = request.form[each_participant]
            dict_avail = []
            for n in range(1, 6):
                participant_each_availability = "participant_" + \
                    str(i) + "_availability_" + str(n)
                try:
                    dict_avail.append(
                        request.form[participant_each_availability])
                except:
                    break
            the_plan = mongo.db.plans
            the_plan.update({'_id': ObjectId(plan_id)},
                            {'$push': {
                                "participants": {
                                    'name': name_participant,
                                    'availabilities': dict_avail,
                                    'participant_note':
                                        request.form["participant_note"]
                                }}
                             })
        except:
            continue

    return render_template('after_updating_plan.html', plan_id=plan_id)


@app.route('/check_plan_participants/<plan_id>')
def check_plan_participants(plan_id):
    the_plan = mongo.db.plans.find_one({"_id": ObjectId(plan_id)})
    range_availability = range(0, len(the_plan['availabilities']))
    if the_plan['participants'] == 0:
        range_participant = 0
    else:
        range_participant = range(0, len(the_plan['participants']))
    return render_template('update_plan_participants.html',
                           plan_id=plan_id, the_plan=the_plan,
                           range_participant=range_participant,
                           range_availability=range_availability)


@app.route('/edit_yourplan/<plan_id>', methods=["POST"])
def edit_yourplan(plan_id):
    the_plan = mongo.db.plans.find_one({'_id': ObjectId(plan_id)})
    i = 0
    while i < len(the_plan['participants']):
        if request.form['edit_name'] == the_plan['participants'][i]['name']:
            dict_avail_edit = []
            for n in range(1, 6):
                each_availability = "availability_" + str(n)
                try:
                    dict_avail_edit.append(request.form[each_availability])
                except: break
            updating_participant_DB = "participants." + str(i)

            mongo.db.plans.update(
                {'_id': ObjectId(plan_id)},
                {'$set': {
                    updating_participant_DB: {
                        'name': request.form['edit_name'],
                        'availabilities': dict_avail_edit,
                        'participant_note': request.form["participant_note"]
                    }}})
            i = i + 1
        else:
            i = i + 1
            continue
    return render_template('after_updating_plan.html', plan_id=plan_id)


@app.route('/delete_participant/<plan_id>', methods=["POST"])
def delete_participant(plan_id):
    mongo.db.plans.update({'_id': ObjectId(plan_id)},
                          {'$pull': {'participants': {
                              'name': request.form['edit_name']}}})
    return render_template('after_updating_plan.html', plan_id=plan_id)


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)