# SBA318-ExpressRestfulApii
Express RESTful API Example
This is an example Express application demonstrating the implementation of a RESTful API for managing users.

Features
Allows creation of new users via a web form.
Supports basic CRUD operations (Create, Read, Update, Delete) for users.
Provides error handling for invalid requests and responses.
Technologies Used
Node.js
Express.js
EJS (Embedded JavaScript) for rendering views
CSS for styling


npm install
npm start
localhost:3000 

Visit the homepage (/) to access the web form for creating a new user.
Fill out the form fields for name, username, and email, then click the "Create User" button to submit the form.
Once submitted, the user will be created, and you will receive a confirmation message.

Project Structure

app.js: Main entry point of the application.
data/: comments.js,posts.js,users.js .....data
routes/: Contains route handlers -commentsR........, postR....., usersR......
views/: Contains EJS templates for rendering views-index.ejs
styles.css: CSS file for styling the application

