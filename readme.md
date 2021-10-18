# iTunes Search with React & Express (Full-stack)

> A full-stack web application, created with Express and React, that interfaces with the iTunes Search API.

The deployed app can be found [here](https://itunes-search-app-riaz.herokuapp.com/)

## Table of Contents:

- [General Info](#general-information)
- [Installation](#installation)
- [Usage Instructions](#usage-instructions)
- [Running Tests](#running-tests)
- [Application Security](#application-security)
- [Handling of API Keys](#handling-of-api-keys)
- [Credits](#credits)
- [Contact](#contact)

## General Information

This is a full-stack web application that interfaces with the iTunes Search API. It was created using both React (frontend) and Express (backend). The backend is responsible for handling the interaction with the third-party API (i.e the iTunes Search API).

This application allows users to search for content within the iTunes store. In addition to this, users are be able to add/remove items from their list of favourites.

## Installation

To run this project, do the following:

1. On GitHub, navigate to the main page of the repository. Click on the green button - **"Code"**
2. Copy the URL displayed.
3. Open up the command prompt by typing _cmd_ in the search bar - on Windows.
4. Select the directory in which you would like to store the cloned respository.
5. Thereafter, enter git clone, and then paste the URL that you copied earlier. e.g. git clone https://github.com/RiazK09/iTunesSearchApp.git
6. Hit enter to create a local clone on your device.
7. If you go to this new directory, you will find all the project files, ready to be utilised.
8. Navigate to this directory from the command line interface.
9. Navigate to both the backend and the frontend directories in the command line interface and type the following to install all of the necessary node modules and dependencies:
   _npm install_

10. In the command line interface, type the following to run the backend and frontend in development mode:
    _npm start_

11. The frontend will automatically open the application in the browser. The backend/server runs on http://localhost:8080/ and the frontend on http://localhost:3000

## Usage Instructions

My web application provides an easy to use yet attractive user interface that allows users to enter search criteria into an input box. In addition to this, users will be able to select the media that they want to search for, courtesy of a dropdown menu.

Each search has been capped to display a maximum of 20 results. Users can browse the results returned and they will be able to create a list of their favourite content by
clicking on the "Add to Favourites" button. Users also have an option to remove items from their list of favourites by clicking on the corresponding "Remove from Favourites" button.

The user interface is extremely simple, intuitive and easy to use.

## Running Tests

In order to ensure that my application has been appropriately tested, I have created four(4) tests: Two (2) of which are in the backend & Two (2) in the frontend.

- Backend/Server (with Mocha and Chai):

1. Tests whether the server (backend) communicates with the client (frontend).
2. Tests whether the server gets search requests.

- Frontend/Client:

1. A snapshot test of the 'AddFavourites' component.
2. A test to see whether the API is working using axios.get

In order to run these tests, navigate to the respective directories (backend or frontend) within the command line interface and type the following:
_npm test_

## Application Security

I utilised Helmet in order to secure my Express app (backend). Helmet works by setting HTTP headers appropriately. Although not foolproof, helmet can protect the app from common web threats & vulnerabilities.

## Handling of API Keys

I did not require an API key in order to access the iTunes Search API. However, in many instances, API keys are utilised & they should be secured in the following manner:

- Create a file called '.env' on your root folder with key/pair entries.
- Thereafter add the key to this file. E.g. REACT_APP_MOVIE_API_KEY=yourKey
  This key can now be accessed by using the process.env variable. E.g. console.log(process.env.REACT_APP_MOVIE_API_KEY) will print the Movie API key to the console.
- Lastly, add the .env file to your .gitignore file. This will ensure that the .env file, which contains the key, is NOT pushed to GitHub!

## Credits

- The React Movie App [tutorial](https://www.youtube.com/watch?v=jc9_Bqzy2YQ&list=LL&index=3&t=2266s) - by Chris Blakely.
- HyperionDev - https://www.hyperiondev.com/

## Contact

**Riaz Karolia**
Created by [@RiazK09](https://www.linkedin.com/in/riaz-karolia/) - Feel free to contact me!
<!-- If you click on my username, it will take you to my LinkedIn profile -->
