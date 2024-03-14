# BruinsOnBoard

BruinsOnBoard is a rideshare application for university students to easily find other students to share an Uber/Lyft ride to get to and from UCLA and LAX. As college students, Uber costs to LAX can be devastating to our wallets, so BruinsOnBoard in here to help reduce transportation costs. Users can create a ride group or join existing groups, and view profiles. Never again will you have to pay $50 for an Uber ride!

![logo](./src/logo.png)

## Running the Application Locally
To run the application locally, first clone the repository, `cd` into it (if necessary) and install necessary dependencies:

```
git clone https://github.com/derekwu15/BruinsOnBoard.git
cd ./BruinsOnBoard
python3 start.py
npm install
npm start
```
When running start.py, it will ask you for the Mongo_URI and JWT_KEY which are necessary for connecting to the database on MongoDB and setting up the jwt token authentication system. For the CS 35L project, we will provide these to our designated TA. 

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

