# # Project Title: **SnapTouch** *(Image Editing Website)*

## Video Demo: https://youtu.be/Hh7VJYrCgcM

## Description:

SnapTouch is a website made by me that lets a user upload a image,
adjust the properties of the image, add preset filters to image,
rotate/flip the image and at last download the edited version of image.

Tech Stack used:

-Flask
-Html5
-CSS
-JavaScript
-Boostrap
-CamanJS
-AJAX

Requirenments: python(latest version) and flask

-app.py: this file contains the necesary imports, functions and the routes for the website.

-static: folder contains the CSS and JS files. the image that user uploads gets stored here.

-templates:contains html templates

I have used the javascript filter properties for adjusting image properties and rotating/fliping the image

For preset filters i have used CamanJS filtert library.

## Functionality

### Routes

-"/": The landing page route where users can upload an image.

-"/upload": This route handles the image upload functionality. It saves the uploaded image to the server's static folder and renders the landing page with the uploaded image displayed.

-"/adjust": This route displays the adjust page where users can modify image properties.

-"/rotate": This route displays the rotate page where users can rotate or flip the image.

-"/filters": This route displays the filters page where users can apply preset filters to the image.

### Templates
-index.html:

The index.html file follows the standard structure of an HTML document. It consists of the following sections:

<head>: Contains meta information and external CSS and JavaScript library references.

<body>: Contains the main content of the page.

The index.html file includes references to the following external resources:

CamanJS: JavaScript library for image editing and applying filters.
Bootstrap CSS: CSS framework for styling the page.
Boxicons: Icon library.
Font Awesome: Icon/font library.

-adjust.html: The template for adjusting image properties.

-rotate.html: The template for rotating and flipping the image.

-filters.html: The template for applying filters to the image.

## Possible Improvements

The SnapTouch application could be enhanced by adding the following features:

-Crop options to allow users to crop the image.

-More filters and image adjustment properties.

-Text overlay functionality to add text on the image.


## How to run project in your computer:

The process to run the "SnapTouch" project on your computer involves the following steps:

-Download the zip file containing the project code.

-Extract the contents of the zip file to a folder.

-Open the folder in your preferred Integrated Development Environment (IDE).

-Ensure that you have Python and Flask installed on your computer.

-Open a terminal or command prompt window.

-Navigate to the project folder using the `cd` command in the terminal.

-Run the following command in the terminal: `flask run`

-The Flask application will start running, and you should see a message indicating the local server address where the application is hosted (e.g.,    Running on http://127.0.0.1:5000/).

-Open a web browser and enter the provided local server address in the address bar (e.g., http://127.0.0.1:5000/).

-The SnapTouch website should now be accessible, and you can begin uploading images, adjusting properties, applying filters, rotating/flipping images, and downloading the edited versions.

