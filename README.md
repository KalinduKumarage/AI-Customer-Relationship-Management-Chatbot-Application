# CRM Chatbot Application 🤖 - SD02_2021

The chatbot is an intelligent AI Customer Relationship Management tool which will be utilized by the Hospital Information System Digital Pulz. 
The chatbot is an interactive chatbot which is a fundamental component of the existing Hospital Information System. 

### Contributors 
- Kalindu Hithaisha Kumarage Don
- Etharu De Silva Wickramarathe
- Balasuriyage Dihan Anupa Perera
- Osura Dissanayake
- Naveen de Silva

## Features 
- Order Prescription -> Upload a Photo of your Prescription and Share your location to get them delivered.
- Doctor Appointment -> Schedule appointments with a doctor
- Profile Management -> Edit information in your Profile, and view Consulation History and Order History.
- Access Control -> Sign up or Login.
- Hospital Finder -> View all the Hospitals near your area.
- Report Generation -> Generate Reports of your Profile Information, Consultation History and Order History. 

## Tech 

The CRM Chatbot application uses several technologies;

- [Rasa] - An Open Source Chatbot framework
- [ReactJS] - open-source front-end JavaScript library for building user interfaces
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [MongoDB] - source-available cross-platform document-oriented database program 

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
    
[node.js]: <http://nodejs.org>
[Rasa]: <https://rasa.com/>
[ReactJS]: <https://reactjs.org/>
[Express]: <https://expressjs.com/>
[MongoDB]: <https://www.mongodb.com/>

## Installation and Setup 

> As a prerequisite you are required to have the anaconda environment to support Rasa functionalities.

1.  Open the project folder and navigate to the three major components using three seperate terminals, components are chatbot_ui, chatbot_server and Chatbot.
2. To install the dependencies in the chatbot_server and chatbot_ui folder run the command.
```sh
npm install
``` 
3. For the chatbot folder you are required to activate the anaconda environment using the command. Environment name will be specified by you at the time of installation.
```sh
conda activate <environment name>
```

4. You are not required to train a bot as we have provided a pre-trained model for your convenience.
5. In the chatbot folder execute the command.Note that the enviroment must be activated.
```sh
rasa run -m models --enable-api --cors "*" --debug
```
6. Finally in both chatbot_ui and chatbot_server folders execute the below command to start up the app
```sh
npm start
```