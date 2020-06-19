import os
from flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
if os.path.exists("env.py"):
    import env

# creates an instance of flask and assign it to the app variable
app = Flask(__name__)
app.config.update(dict(PREFERRED_URL_SCHEME='https'))

# Environment variables
app.config["MONGO_DBNAME"] = 'myPlanner'
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")

mongo = PyMongo(app)


@app.route('/')
@app.route('/start')
def start():
    """
    This renders start.html which is the top page of this website.
    """
    return render_template('start.html')


@app.route('/check_event_key')
def check_event_key():
    """
    This renders a page to register an organizer name and an event key.
    """
    return render_template('check_event_key.html')


@app.route('/check_database', methods=["POST"])
def check_database():
    """
    This function communicates MongoDB database to check if the organizer name
    and the event key are available for the new user.
    If it's available, it returns a page for setting up the event details and
    creates a new collection.
    If it's not available, it returns a message to let users suggest
    a different key.

    @type plan_id: str
    @param plan_id: id created for the MongoDB collection
    @type organizer_name: str
    @param organizer_name: Organizer's name for the event
    @type event_key: str
    @param event_key: A key which is used to access the data
    """
    organizer_name = request.form["organizer_name"]
    event_key = request.form["event_key"]
    count_user = mongo.db.plans.count_documents((
        {"organizer_name": organizer_name,
         "event_key": event_key}))
    if count_user > 0:
        not_available_word = "This event key is not available with the "\
            "organizer name. Please use a different event key."
        return render_template('check_event_key.html',
                               not_available_word=not_available_word,
                               organizer_name=organizer_name,
                               event_key=event_key)
    else:
        plans = mongo.db.plans
        inserted_plan = plans.insert_one(request.form.to_dict())
        plan_id = inserted_plan.inserted_id
        plans.update({'_id': plan_id},
                     {'$set':
                      {'event_name': '',
                       'event_description': '',
                       'availabilities': [],
                       'event_place': '',
                       'participants': []
                       }})
        organizer_name = request.form["organizer_name"]
        return redirect(url_for('create_new_plan',
                                organizer_name=organizer_name,
                                plan_id=plan_id))


@app.route('/create_new_plan/<organizer_name>/<plan_id>')
def create_new_plan(organizer_name, plan_id):
    """
    This renders a page for setting up the event details and creates a new
     collection.
    """
    return render_template('create_new_plan.html',
                           organizer_name=organizer_name,
                           plan_id=plan_id)


@app.route('/update_details/<plan_id>', methods=["POST"])
def update_details(plan_id):
    """
    This function adds the details of the event to the collection.
    """
    f = request.form
    keys = f.keys()
    list_form = [ava_f for ava_f in keys if "availability_" in ava_f]
    list_avail = []
    for each_availability in list_form:
        list_avail.append(f[each_availability])
    mongo.db.plans.update({'_id': ObjectId(plan_id)},
                          {'$set':
                           {'event_name': f["event_name"],
                            'event_description': f["event_description"],
                            'availabilities': list_avail,
                            'event_place': f["event_place"],
                            'participants': []
                            }})
    return render_template('after_creating_plan.html', plan_id=plan_id)


@app.route('/update_plan_participants/<plan_id>')
def update_plan_participants(plan_id):
    """
    This function renders a html for showing the details of the event to
    participants.
    The participants also can add their availability in this page.
    """
    the_plan = mongo.db.plans.find_one({"_id": ObjectId(plan_id)})
    range_availability = range(0, len(the_plan['availabilities']))
    if len(the_plan['participants']) == 0:
        range_participant = range(0, 0)
    else:
        range_participant = range(0, len(the_plan['participants']))
    return render_template('update_plan_participants.html',
                           plan_id=plan_id, the_plan=the_plan,
                           range_participant=range_participant,
                           range_availability=range_availability)


# Connecting to the data base to register participants
@app.route('/update_plan_complete/<plan_id>', methods=["POST"])
def update_plan_complete(plan_id):
    """
    This function adds the information submitted by participants to the
    collection of the event.
    This handles submittions by multiple participants at the same time.
    """
    the_plan = mongo.db.plans.find_one({"_id": ObjectId(plan_id)})
    f = request.form
    keys = f.keys()
    list_participant = [part_f for part_f in keys if "participant_" in part_f]
    for each_participant in list_participant:
        name_participant = f[each_participant]
        num = str(each_participant).split('_')[1]
        list_avail = []
        for n in range(1, (len(the_plan['availabilities'])) + 1):
            participant_each_availability = "part_" + num + "_avail_" + str(n)
            list_avail.append(f[participant_each_availability])
        mongo.db.plans.update({'_id': ObjectId(plan_id)},
                              {'$push': {
                                  "participants": {
                                      'name': name_participant,
                                      'availabilities': list_avail,
                                      'participant_note':
                                      f["part_note"]
                                  }}
                               })
    return render_template('after_updating_plan.html', plan_id=plan_id)


@app.route('/delete_participant/<plan_id>', methods=["POST"])
def delete_participant(plan_id):
    """
    This function deletes participants data from the collection.
    """
    mongo.db.plans.update({'_id': ObjectId(plan_id)},
                          {'$pull': {'participants': {
                              'name': request.form['edit_name']}}})
    return render_template('after_updating_plan.html', plan_id=plan_id)


@app.route('/restore_plan')
def restore_plan():
    """
    This renders a page for restoring an event with user's name and
    their event key.
    """
    return render_template('restore_plan.html')


@app.route('/restore_data', methods=["POST"])
def restore_data():
    """
    This function checks if the collection is found by the organizer name and
    the event key, in the restore data page.
    If the data is found,
    it returns a template that shows the options for editting.
    If it's not found, it returns an error message to display for the user.
    """
    organizer_name = request.form["organizer_name"]
    event_key = request.form["event_key"]
    count_user = mongo.db.plans.count_documents((
        {"organizer_name": organizer_name,
         "event_key": event_key}))
    if count_user > 0:
        the_plan = mongo.db.plans.find_one(
            {"organizer_name": request.form["organizer_name"],
             "event_key": request.form["event_key"]})
        plan_id = the_plan['_id']
        return render_template('restored_data.html',
                               plan_id=plan_id,
                               organizer_name=organizer_name,
                               event_key=event_key)
    else:
        not_found_message = "Data not found with the the name and the event."\
                            " Please try it again."
        return render_template('restore_plan.html',
                               not_found_message=not_found_message,
                               organizer_name=organizer_name,
                               event_key=event_key)


@app.route('/change_plan/<plan_id>')
def change_plan(plan_id):
    """
    This function checks if the collection that holds event details is found
    by the organizer name and the event key.
    It returns several availabilities if the collection holds the data.
    """
    the_plan = mongo.db.plans.find_one({'_id': ObjectId(plan_id)})
    if len(the_plan['availabilities']) > 0:
        range_availability = range(0, len(the_plan['availabilities']))
        return render_template('change_plan.html',
                               the_plan=the_plan,
                               plan_id=the_plan['_id'],
                               range_availability=range_availability)
    else:
        return render_template('change_plan.html',
                               the_plan=the_plan,
                               plan_id=the_plan['_id'])


@app.route('/edit_details/<plan_id>', methods=["POST"])
def edit_details(plan_id):
    """
    The function updates event details from restore page.
    """
    f = request.form
    keys = f.keys()
    list_form = [ava_f for ava_f in keys if "availability_" in ava_f]
    list_avail = []
    for each_availability in list_form:
        list_avail.append(f[each_availability])
    the_plan = mongo.db.plans.find_one({'_id': ObjectId(plan_id)})
    mongo.db.plans.update({'_id': ObjectId(plan_id)},
                          {'$set': {
                              'event_name': f["event_name"],
                              'event_description': f["event_description"],
                              'availabilities': list_avail,
                              'event_place': f["event_place"],
                              'participants': the_plan['participants']
                          }})
    return render_template('after_creating_plan.html', plan_id=plan_id)


@app.route('/edit_yourplan/<plan_id>', methods=["POST"])
def edit_yourplan(plan_id):
    """
    The function updates participant information in the existing
    event from restore page.
    """
    f = request.form
    keys = f.keys()
    the_plan = mongo.db.plans.find_one({'_id': ObjectId(plan_id)})
    i = 0
    while i < len(the_plan['participants']):
        if f['edit_name'] == the_plan['participants'][i]['name']:
            list_avail_edit = []
            for n in range(1, len(the_plan['availabilities'])+1):
                each_availability = "availability_" + str(n)
                if each_availability in keys:
                    list_avail_edit.append(f[each_availability])
                else:
                    break
            updating_participant_DB = "participants." + str(i)
            mongo.db.plans.update(
                {'_id': ObjectId(plan_id)},
                {'$set': {
                    updating_participant_DB: {
                        'name': f['edit_name'],
                        'availabilities': list_avail_edit,
                        'participant_note': f["part_note"]
                    }}})
            i = i + 1
        else:
            i = i + 1
            continue
    return render_template('after_updating_plan.html', plan_id=plan_id)


@app.route('/see_plan_from_restore/<plan_id>')
def see_plan_from_restore(plan_id):
    """
    The function renders a page for updating participants from restore page.
    """
    the_plan = mongo.db.plans.find_one({'_id': ObjectId(plan_id)})
    organizer_name = the_plan['organizer_name']
    event_key = the_plan['event_key']
    if len(the_plan['availabilities']) > 0:
        return redirect(url_for('update_plan_participants',
                                plan_id=plan_id))
    else:
        suggestion_word = "The plan is not set yet. Please go to 'Change Your"\
                          " Plan' link and complete your event details."
        return render_template('restored_data.html',
                               plan_id=plan_id,
                               organizer_name=organizer_name,
                               event_key=event_key,
                               suggestion_word=suggestion_word)


@app.route('/delete_plan/<plan_id>')
def delete_plan(plan_id):
    """
    This function enables users to delete a collection (event).
    """
    mongo.db.plans.delete_one({'_id': ObjectId(plan_id)})
    return render_template('after_delete.html')


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=False)
