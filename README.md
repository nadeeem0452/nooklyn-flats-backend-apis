Running the Flats NodeJS + Express.js + MongoDB API Locally

Install NodeJS and NPM from  https://nodejs.org/en/download/.

Install MongoDB Community Server from  https://www.mongodb.com/download-center.

Run MongoDB, instructions are available on the install page for each OS at https://docs.mongodb.com/manual/administration/install-community/

Install all the npm packages:
Goto/CD into the project source code
Install all required npm packages by running npm install from the command line in the project root folder (where the package.json is located).

MongoDB Configuration: Run the mongodb instance local and make connection and add connection string in database.config.js file which is located in /config folder
snippet for the same is: 
module.exports = {
    url: 'mongodb://localhost:/name-of-mongodb-connction-url'
}

Starting the API locally: 
Start the API by running npm start from the command line in the project root folder, you should see the message Server listening on port 4000. 


Testing API with Postman: 
You can test the API directly using Postman and import the postman collection from project folder /postman/LocalFlatsApis.postman_collection. 
For instructions on how to use Postman see the second half of this post.
