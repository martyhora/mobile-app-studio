# Mobile App Studio

Single page application written in React and React Router. The API is written in Symfony. serving as a visual environment to design and generate mobile applications. First of all you need to create a new project (application) and then add needed scenes (pages) into it. You can then add several components into each scene like textboxes, buttons, listviews, textfields and images.

To generate the mobile application source code you need to implement your own layer on backend to do that. How to implement the layer is described in the section below.

![alt text](https://martyhora.cz/img/portfolio/thumbnails/1.png)

# Generating the application source code

The application itself does not come with an implementation for generating the mobile application source code. Instead you have to write your own implementation in PHP.

There's a prepared class ```App\AppCreator\AppCreator``` for that purpose. The class should be created by coping file ```api/src/AppCreator/AppCreator.example.php``` into ```api/src/AppCreator/AppCreator.php``` and renaming class in it to ```AppCreator```. To write your own business logic to generate the source code, feel free to edit ```createApplication``` method's body.

# Installation

To run the project you will need Apache, PHP, Composer and NodeJs installed.

- clone project by running ```git clone https://github.com/martyhora/mobile-app-studio.git``` into your DocumentRoot path
- change folder ```cd api``` and run ```composer install```
- create database by running ```php bin/console doctrine:migrations:migrate```
- run ```npm i``` or ```yarn install``` in the project root
- run ```npm start``` to watch and compile changes in JS a LESS files or ```npm run build``` to build production bundle
- setup DB configuration and JWT tokens setting in .env
- copy file ```api/src/AppCreator/AppCreator.example.php``` into ```api/src/AppCreator/AppCreator.php``` and rename class in it to ```AppCreator``` (this is a class with business logic for generating the result source code of the mobile app, see above in the section Generating the application code)
- open the project in the browser
