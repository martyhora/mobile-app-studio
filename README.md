# Mobile App Studio

Single page application written in React and using React Router serving as a visual environment to design and generate mobile applications. First of all you need to create a new project (application) and then add needed scenes (pages) into it. You can then add several components into each scene like textboxes, buttons, listviews, textfields and images.

To generate the mobile application source code you need to implement your own layer on backend to do that. How to implement the layer is described in the section below.

# Generating the application source code

The application itself does not come with an implementation for generating the mobile application source code. Instead you have to write your own implementation in PHP.

There's a prepared class ```Creator\ApplicationCreator``` for that purpose. The class should be created by coping file ```api/v1/Creator/ApplicationCreator.example.php``` into ```api/v1/Creator/ApplicationCreator.php``` and renaming class in it to ```ApplicationCreator```. To write your own business logic to generate the source code, feel free to edit ```createApplication``` method's body.

# Installation

To run the project you will need Apache, PHP, Composer and NodeJs installed.

- clone project by running ```git clone https://github.com/martyhora/mobile-app-studio.git``` into your DocumentRoot path
- change folder ```cd api/v1``` and run ```composer install```
- run ```npm i``` or ```yarn install``` in the project root
- run ```webpack --watch``` to compile changes in JS a LESS files
- create database and run SQL scripts in ```/api/v1/sql/db.sql``` to create database structure in it
- copy file ```api/v1/config.local.php``` into ```api/v1/config.php``` and setup your projects and database connection
- copy file ```api/v1/Creator/ApplicationCreator.example.php``` into ```api/v1/Creator/ApplicationCreator.php``` and rename class in it to ```ApplicationCreator``` (this is a class with business logic for generating the result source code of the mobile app, see above in the section Generating the application code)
- open the project in the browser
