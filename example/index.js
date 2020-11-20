//Require all the packages
let express = require("express");
let app = express();
// let bodyParser = require('body-parser');

//Database initialization
let DataStore = require('nedb');
let db = new DataStore('chirp.db');
db.loadDatabase();

//Express Middleware
app.use('/', express.static('public'));
// app.use(bodyParser.json());

//STEP6: listen for a POST request
app.post('/chirpData', (req,res) => {
    console.log("Received a POST request!");

    //STEP6.5: Receive and parse the json into a js object
    let chirpObj = req.body;
    console.log(chirpObj);
    //STEP7: Store the data
    db.insert(chirpObj);

    //STEP8: Send msg back to the client
    let responseObj = {
        "task": "success",
        "chirp": chirpObj
    };
    res.json(responseObj);
});

//STEP11: listen for a GET response
app.get('/allchirps', (req, res) => {
    console.log("Received a GET request for all chirps!");

    //find all the objects in the database
    db.find({}, function(err, docs){
        console.log(docs);
        //create an object to send to client side
        let allChirps = {
            "data": docs
        }
        //send a response back to the client
        res.json(allChirps);
    });

})

app.listen(3000, ()=> {
    console.log("listening at localhost:3000");
})
