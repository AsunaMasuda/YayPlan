# YayPlan
[YayPlan](https://yayplan.herokuapp.com/) is a easy schedule planner app which you can use when you want to set up a gathering with your friends and families. 

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
        - [Delete the data in the database](#delete-the-data-in-the database)

3. [Information Architecture](#information-architecture)

4. [Technologies Used](#technologies-used)

5. [Testing](#testing)
    - [Manual Testing](#manual-testing)
    - [Bugs](#bugs)
    - [How User Stories Needs Were Met](#how-user-stories-needs-were-met)

6. [Deployment](#deployment)
    - [Local Deployment](#local-deployment)

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
As a user of YayPlan, I can edit the plan anytime and invite as many as people to register their schedule, so that I don't need to set up again from scratch when there is any change in the plan or the participants.

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
### Delete the data in the database
- After the data of the event passed, automatically the data is deleted to assure the storage
- The delete options of participants are managed with an unique delete key associated with each participant for the situation where there are many people use this app

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
- MongoDB Atlas

# Testing
### Validation Tools
- HTML: [W3C HTML Validator](https://validator.w3.org/)
- CSS: [W3C CSS validator](https://jigsaw.w3.org/css-validator/)
- JavaScript: [JSHint](https://jshint.com/)
- Python: [PEP8 online](http://pep8online.com/)

### Manual Testing
I created [a testing matrix]() to make sure the site works as expected in different devices, browsers and screen sizes.

### Bugs
- to be updated

### How User Stories Needs Were Met
- to be updated

# Deployment
To deploy this page to GitHub Pages from my [GitHub repository](https://github.com/AsunaMasuda/Milestoneproject_2), the following steps were taken: 
1. Log into GitHub. 
2. From the list of repositories on the screen, select **AsunaMasuda/Milestoneproject_2**.
3. From the menu items near the top of the page, select **Settings**.
4. Scroll down to the **GitHub Pages** section.
5. Under **Source**, click the drop-down menu labelled **None** and select **Master Branch**.
6. On selecting Master Branch, the page is automatically refreshed, the website is now deployed. 
7. Scroll back down to the **GitHub Pages** section to retrieve the link to the deployed website.

## Local Deployment
To clone this project from GitHub:
1. At the top of this repository, click the green button **Clone or download**.
2. In the Clone with HTTPs section, copy the clone URL for the repository. 
3. Open your favourite terminal (cmd, powershell, bash, git bash, etc.)
4. Change the current working directory to the location where you want the cloned directory to be made.
5. Type `git clone`, and then paste the URL you copied in Step 2.
6. Press Enter. Your local clone will be created.

# Credits

## Content
- All text within this project was written by the developer.

## Media
### Icons
- to be updated

### Images
- The images used in the home page are created by [pikisuperstar - www.freepik.com](https://www.freepik.com/free-photos-vectors/people)

### JavaScript
- [flatpickr - javascript datetime picker](https://github.com/flatpickr/flatpickr)

## Acknowledgements

Thanks to:
My Code Institute Mentor Guido Cecilio Garcia Bernal for his advise throughout the development process.
