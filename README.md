# YayPlan
[YayPlan](https://yayplan.herokuapp.com/) is a easy schedule planner app which you can use when you want to set up a gathering with your friends and families with a simple and modern user interface.

To use this app, you simply follow these three steps.
1. Register a name of an event organizer(your name if you are planning an event) and an event key which is used to restore data afterwards.
2. Set up the event details(event title, description, place) and suggest some dates so participants can vote.
3. Share the link of the event with participants. In the link, participants can register their availabilities. 

<p align="center"><img src = "https://github.com/AsunaMasuda/MilestoneProject3/blob/master/image_README/responsive_site.png?raw=true" width=900></p>

## Table of Contents

1. [UX](#ux)
    - [Goals](#goals)
        - [User's Goals](#user-goals)
    - [User Stories](#user-stories)
    - [Wireframes](#wireframes)

2. [Features](#features)
    - [Existing Features](#existing-features)
        - [Home page](#home-page)
        - [Page for registering a name and an event key](#page-for-registering-a-name-and-an-event-key)
        - [Page for registering details of the event](#page-for-registering-details-of-the-event)
        - [Page for getting a shareable link](#page-for-getting-a-shareable-link)
        - [Page for participants](#page-for-participants)
        - [Page for restoring an existing plan](#page-for-restoring-an-existing-plan)
    - [Features Left to Implement](#features-left-to-implement)
        - [Delete the data after the event date is passed](#delete-the-data-after-the-event-date-is-passed)
    - [Defensive Design](#defensive-design)

3. [Information Architecture](#information-architecture)

4. [Technologies Used](#technologies-used)

5. [Testing](#testing)
    - [Manual Testing](#manual-testing)
    - [Bugs](#bugs)

6. [Deployment](#deployment)
    - [Local Deployment](#local-deployment)
    - [Heroku Deployment](#heroku-deployment)

7. [Credits](#credits)


# UX
## Goals
The goal of this project is to create a web application to enables users to plan an event and schedule the date with participants, with simple steps.

### User's Goals
The target audience for this website is:
- People who want to plan an event and find out the best date for the participants

The user goal is to have:
- A platform that allows them to launch a schedular which is easy to share with participants
- A flexibility to modify the details of the plan and the number of participants

## User Stories
#### As an organizer for an event,
- I would like to have a simple functionality to set up an event without any registration. 
- I would like to edit the details of the plan anytime when any change happened. 
- I would like to avoid from setting up the number of participants when setting up, since it can be changed as the situation changes. 
- I would like to avoid anybody else from being able to change the details of the event.
- I would like to see which date is the most suitable to the participants.

####  As a participant for the event,
- I would like to have multiple choices (Yes/No/Maybe) for the availability.
- I would like to have an ability to add a note to the organizer, that explains the part the choices cannot address.
- I would like to have an ability to edit the answers whenever any change is caused.

## Wireframes
Wireframes were created with [balsamiq](https://balsamiq.com/).
- [Homepage](https://github.com/AsunaMasuda/MilestoneProject3/blob/master/image_README/top-page.png)
- [Create plan page](https://github.com/AsunaMasuda/MilestoneProject3/blob/master/image_README/create-plan.png)
- [Update participant page](https://github.com/AsunaMasuda/MilestoneProject3/blob/master/image_README/update-participants.png)

# Features

## Existing Features
### Home page
- This page is used as a landing page. It contains "how it works" section and a "Get started" button to start the planning. 

### Page for registering a name and an event key
- Users register their name (organizer's name) and an event key. Event keys are used to restore the data when there is any change happened in the event, restore the shareable link for participants and delete the event itself, if they wish.
- This page also checks if the combination of the name and the event key input is available or not.

### Page for registering details of the event
- Users can set up the details(event title, description, date, place) of the event in this page. They can set up multiple dates so the participants can answer when they are available.

### Page for getting a shareable link
- This page comes up after completing registering the details and provides the shareable link with participants.

### Page for participants
- This page allows participants can add their name, availabilities(Yes/No/Maybe) and a note. 
- Participants can edit their answers and also delete the data in this page. This app is made for the situation shere they No key is required to edit or delete the participant schedule. 

### Page for restoring an existing plan
- This page allows users to enable 1. to edit the existing event data and 2. to get the shareable link with entering the organizer name and the event key which they registered. 

## Features Left to Implement
### Delete the data after the event date is passed
- After the data of the event passed, automatically the data is deleted to assure the storage.

## Defensive Design
- All the forms in this site have a validation system and any submission with blank input is prevented and it shows a message to let users know neccessary input sections.  
- An alert pops up when users pressed a button to delete the event data or the participant data, to prevent users from deleting data by a mistake.

# Information Architecture
MongoDB Atlas is used for storing data for this web site. 

The following is the data structure. 
```
{
    _id : ObjectId()
    organizer_name : String,
    event_key : String,
    availabilities : Array,
    event_description : String,
    event_name : String,
    event_place : String,
    participants : Array
                   { 
        name: String,
        availabilities: Array,
        participant note: String
     }
}
```

# Technologies Used
This application contains key CRUD functionalities and they are used to maximize user's experience in this site. The main frontend development was created using HTML, CSS, JavaScript and their libraries. The main backend development was powered by Python and Flask.

### Languages 
- HTML, CSS, JavaScript, Python

### Libraries
- Bootstrap (v4.4.1)
- JQuery
- JQuery-UI
- Popper.js
- Font Awesome
- Flask
- Jinja
- PyMongo

### Tools
- Git/GitHub
- Gitpod
- PIP
- MongoDB Atlas

# Testing
### Validation Tools
I used these validation tools below for each file.
- HTML: [W3C HTML Validator](https://validator.w3.org/)
- CSS: [W3C CSS validator](https://jigsaw.w3.org/css-validator/)
- JavaScript: [JSHint](https://jshint.com/)
- Python: [PEP8 online](http://pep8online.com/)

### Manual Testing
Testing was done throughout the application being built. This application is built with a mobile first responsive design in mind. I created [this testing matrix](https://github.com/AsunaMasuda/MilestoneProject3/blob/master/image_README/test_result.png) to make sure the site works as expected in different devices with the emuration funtion in Google Developer Tool, browsers and screen sizes.

### Bugs
#### Python and Database
- In the page for creating a new event(create_new_plan.html), if users added many empty availabilities forms at the same time and remove the forms randomly, the date was not correctly updated into MongoDB collection. It was caused by try/except method which I used in order to check if a key for availabilities exists in the request.form MultiDict object. After I replaced try/except method with if/else statement, this bug was fixed.

#### JavaScript
- In the page for registering participants(update_plan_participants.html), if a participant uses a whitespace in their name, it caused a rendering issue after clicking 'Edit' button. It was caused by whitespaces surrounding the selected name which was created by text() function in JavaScript used to get the text for the name from the HTML. This bug was fixed by using trim() function, which deletes all whitespaces before and after the selected text(in this case, the selected name).

#### Browser Compatibility
- Safari: The css styling for a delete button in the Modal window in restored_data.html was not working in Safari. It was caused by `type="button"` in the anchor tag that works as the delete button, and after deleting `type="button"` it started working as expected.

# Deployment
## Local Deployment
For local deployment, you need to have IDE such as Gitpod and you need to install those followings in your IDE:
- Git, Python3, PIP3, MongoDB

1. At the top of this repository, click the green button **Clone or download**.
2. In the Clone with HTTPs section, copy the clone URL for the repository. 
3. Open your favourite terminal (cmd, powershell, bash, git bash, etc.)
4. Change the current working directory to the location where you want the cloned directory to be made.
5. Type `git clone`, and then paste the URL you copied in Step 2:
   `git clone https://github.com/AsunaMasuda/MilestoneProject3.git`
6. Press Enter. Your local clone will be created.
7. You can either 
    - Create a virtual environment and create environment variables of IP, PORT, MONGO_URI and SECRET_KEY.
    - Or edit the app.py file like the following variables:
        ```
        'IP', '127.0.0.1'
        ```
        ```
        'PORT', '5000'
        ```
        ```
        'SECRET_KEY', '<somethingsecret>'
        ```
        ```
        'MONGO_URI', 'mongodb+srv://<username>:<password>@<cluster_name>-ocous.mongodb.net/<database_name>?retryWrites=true&w=majority'
        ```
8. Install all required modules from requirements.txt with the command`pip3 install -r requirements.txt.`
9. Now you can run the website with the command `python3 app.py`
10. You can now access the website at **http://127.0.0.1:5000**

## Heroku Deployment
This website is deployed on [Heroku](https://www.heroku.com/), following these steps:
1. Create a requirements.txt file using the command `pip3 freeze > requirements.txt` in the terminal.
2. Create a Procfile using the commant `echo web: python app.py > Procfile` in the terminal.
3. Commit and push all the changes to the Github repositoty of this project.
4. Go to Heroku and create a new app. Set a name for this app and select the closest region.
5. Choose Deployment method as GitHub in Heroku Dashboard and link the Github repository to the Heroku app.
6. Go to Settings then Reveal Config Vars in Heroku Dashboard and set values as followings.

| Key | Value |
 --- | ---
IP | 0.0.0.0
PORT | 5000
MONGO_URI | `mongodb+srv://<username>:<password>@<cluster_name>-ocous.mongodb.net/<database_name>?retryWrites=true&w=majority`
SECRET_KEY | `<your_secret_key>`

# Credits

## Content
- All text within this project was written by the developer.

## Media
### Icons
- All the icons in this website were provided by [Font Awesomme](https://fontawesome.com/)

### Images
- The images used in the home page are created by [pikisuperstar - www.freepik.com](https://www.freepik.com/free-photos-vectors/people)

### JavaScript
- The datetime picker is powered by [flatpickr](https://github.com/flatpickr/flatpickr)

## Acknowledgements
- Thanks to: my Code Institute Mentor Guido Cecilio Garcia Bernal for his advise throughout the development process
- Code Institute Slack Community that gave a light when I am stuck in my code.
