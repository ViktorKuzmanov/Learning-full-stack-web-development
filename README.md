# Learning full stack web development

Though learning full stack web development from online course I developed 3 simple projects expained in detail down below.

## Weather Project

### Usage
Search town by typing it in the text box (ex: London) and get current temperature in that town

Upon building this weather app I learned how to:

- make express server 
- fetch data from openweathermap.org using their API and making GET requests using Node.js
- parse JSON 
- get the data send in the post request using Body-Parser package


## Newsletter web app

### Usage
You can sign up to my Newsletter.

While building this Newsletter app I learned how to:

- incorporate Bootstrap examples into my project
- post data (from sign up) to Mailchimp Servers via their API 
- redirect the user to home page if they failed to sign up for the Newsletter
- deploy my web app for free on Heroku servers and now it is available at https://glacial-eyrie-22601.herokuapp.com/


## To-Do list app 

### Usage
Create and delete tasks to do. 
Create new to-do list at /nameOfList 

Upon building this simple todolist app I learned about how to:

- implement Embedded JavaScript (EJS) templates templates to reduce repetitiveness in my code
        - pass variables(data) from my express server to my .ejs template file 
        - place markers (placeholder for variable) in my template
        - populating the template with dynamic content by writing JavaScript with the use of EJS tags like the Scriptlet Tag <%
        
- create EJS layout (header.ejs and footer.ejs)
    
- create my own module like Express.js (date.js)
    
- make separate todolist available at /work (check this twice, Not sure if i have anymore)
    
- save and delete items from todolist using MongoDB database

- create (listen on the server for) dynamic route based on route parameters in the URL when the user making a get request
    
- deploy my app at http://blooming-dusk-50906.herokuapp.com/ using MongoDB Atlas and Heroku

