# YayPlan
[YayPlan](https://yayplan.herokuapp.com/) is an easy schedule planner app which you can use when you want to set up a gathering with your friends and families with a simple and modern user interface.

To use this app, you simply follow these three steps.
1. Register a name of an event organizer(your name if you are planning an event) and an event key which is used to restore data afterwards.
2. Set up the event details(event title, description, place) and suggest some dates so participants can vote.
3. Share the link of the event with participants. In the link, participants can register their availabilities. 

<p align="center"><img src = "https://github.com/AsunaMasuda/MilestoneProject3/blob/master/image_README/responsive_site.png?raw=true" width=900></p>

## Table of Contents

1. [UX](#ux)
    - [Goals](#goals)
        - [User Goals](#user-goals)
    - [User Stories](#user-stories)
    - [Wireframes](#wireframes)
    - [Color Scheme](#color-scheme)

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
The goal of this project is to create a web application to enables users to plan an event and its date by following simple steps.

### User Goals
The target audience for this website is:
- People who want to plan an event and find out the most suitable date for the attendees.

The user goal is to have:
- A platform that allows them to launch a schedular which is easy to share with participants.
- The flexibility to modify the details of the plan and the number of participants.

## User Stories
#### As an organizer for an event,
- I would like to have a simple interface and functionality to set up an event without any registration. 
- I would like to edit the details of the plan anytime when any change happens. 
- I would like to avoid specifying the number of participants when creating the event, since it can be changed as the situation evolves. 
- I would like to avoid anybody else from being able to change the details of the event.
- I would like to see which date is the most suitable for the participants.

####  As a participant for the event,
- I would like to have multiple choices (Yes/No/Maybe) for the availability.
- I would like to have the ability to add a note to the organizer, which allows me to add additional context to availability option which I selected.
- I would like to have the ability to edit the answers whenever any change might happen.

## Wireframes
Wireframes were created with [balsamiq](https://balsamiq.com/).
- [Homepage](https://github.com/AsunaMasuda/MilestoneProject3/blob/master/image_README/top-page.png)
- [Create plan page](https://github.com/AsunaMasuda/MilestoneProject3/blob/master/image_README/create-plan.png)
- [Update participant page](https://github.com/AsunaMasuda/MilestoneProject3/blob/master/image_README/update-participants.png)

## Color Scheme
- As the illustrations used on main pages had some modern aesthetics of colors, as well as it's important to limit the total numbers of primary colors, I decided to use similar colors to the illustrations as the primary colors for this site.
1. ![#363636](https://via.placeholder.com/15/363636/000000?text=+) `#363636`: Letters
2. ![#fff](https://via.placeholder.com/15/fff/000000?text=+) `#fff`: Background color
3. ![#ff6666](https://via.placeholder.com/15/ff6666/000000?text=+) `#ff6666`: Button elements
4. ![#bb7cfe](https://via.placeholder.com/15/bb7cfe/000000?text=+) `#bb7cfe`: Hovering over link elememts
5. ![#1abc9b](https://via.placeholder.com/15/1abc9b/000000?text=+) `#1abc9b`: Input Fields, Icons, Datepicker element

# Features

## Existing Features
### Home page
- This page is used as a landing page. It contains a "How It Works" section and a "Get Started" button to start the planning. 

### Page for registering a name and an event key
- Users register their name (organizer's name) and an event key. Event keys are used to restore the data when there is any change they need to make to the event, or if they need to restore the shareable link for participants or even delete the event itself.
- This page also checks if the combination of the name and the event key input is available or not.

### Page for registering details of the event
- Users can set up the details (event title, description, date, place) of the event in this page. They can set up multiple dates so the participants can answer when they are available.

### Page for getting a shareable link
- This page comes up after completing the registration of the event details and provides the shareable link with participants.

### Page for participants
- This page allows participants to add their name, availability (Yes/No/Maybe) and a note. 
- Participants can edit their answers and also delete the data in this page. 

### Page for restoring an existing plan
- This page allows users to: 1. Edit the existing event data 2. Get the shareable link by entering the organizer name and the event key which they registered. 

## Features Left to Implement
### Delete the data after the event date is passed
- After the date of the event has passed, the data is automatically deleted for storage purposes.

## Defensive Design
- All the forms in this site have a validation system and any submission with blank input is prevented. It displays a message to let users know neccessary input sections which are empty.  
- An alert pops up when users press a button to delete the event data or the participant data, to prevent users from deleting data by mistake.

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
- In the page for creating a new event(create_new_plan.html), if users added many empty availabilities forms at the same time and remove the forms randomly, the date was not correctly updated in the MongoDB collection. It was caused by the try/except method which I used in order to check if a key for availabilities exists in the request.form MultiDict object. After I replaced the try/except method with if/else statement, this bug was fixed.

#### JavaScript
- In the page for registering participants(update_plan_participants.html), if a participant uses a whitespace in their name, it caused a rendering issue after clicking 'Edit' button. It was caused by whitespaces surrounding the selected name which was created by text() function in JavaScript used to get the text for the name from the HTML. This bug was fixed by using the trim() function, which deletes all whitespaces before and after the selected text(in this case, the selected name).

#### Browser Compatibility
- Safari: The css styling for a delete button in the Modal window in restored_data.html was not working in Safari. It was caused by `type="button"` in the anchor tag that works as the delete button, and after deleting `type="button"` it started working as expected.

# Deployment
## Local Deployment
For local deployment, you need to have an IDE such as Gitpod and you need to install the following in your IDE:
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
8. Install all required modules from requirements.txt with the command`pip3 install -r requirements.txt`
9. Now you can run the website with the command `python3 app.py`
10. You can now access the website at **http://127.0.0.1:5000**

## Heroku Deployment
This website is deployed on [Heroku](https://www.heroku.com/), following these steps:
1. Create a requirements.txt file using the command `pip3 freeze > requirements.txt` in the terminal.
2. Create a Procfile using the commant `echo web: python app.py > Procfile` in the terminal.
3. Commit and push all the changes to the Github repositoty of this project.
4. Go to Heroku and create a new app. Set a name for this app and select the closest region.
5. Choose Deployment method as GitHub in Heroku Dashboard and link the Github repository to the Heroku app.
6. Go to Settings then Reveal Config Vars in Heroku Dashboard and set the values as follows:

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
- All the icons in this website were provided by [Font Awesomme](https://fontawesome.com/).

### Images
- The images used in the home page are created by [pikisuperstar - www.freepik.com](https://www.freepik.com/free-photos-vectors/people).

### UX
- I used this article as reference when deciding the color scheme. [7 Tips To Organize Colors for UI Design](https://uxplanet.org/7-tips-to-organize-colors-for-ui-design-97bbefed8a8a)

### JavaScript
- The datetime picker is powered by [flatpickr](https://github.com/flatpickr/flatpickr).

## Acknowledgements
- Thanks to: my Code Institute Mentor Guido Cecilio Garcia Bernal for his advice throughout the development process.
- Code Institute Slack Community that gave me a light when I was stuck in my coding.
