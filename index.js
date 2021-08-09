const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { response, request, query } = require('express');
const postModel = require('./schema');
const signupModel = require('./signupSchema');
const app = express();
const port = 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

const db_uri = "mongodb+srv://admin:admin@cluster0.mhpe2.mongodb.net/test"
mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



// create post on dashboard

app.post('/createPost', (request, response) => {
    try {
        const body = request.body;
        postModel.create(body, (error, data) => {
            if (error) {
                throw error;
            }
            else {
                console.log(data);
                response.send(data);
            }
        })
    } catch (error) {
        response.send(`Error at post >>>> : ${error.message}`);
    }
})



// Read All posts
app.get("/readAll", (request, response) => {
    try {
        postModel.find({}, (error, data) => {
            if (error) {
                throw error
            } else {
                console.log(`All posts >>>> ${data}`)
                response.send(data);
            }
        })
    } catch (error) {
        response.send(error)
    }
})




// sign up api

app.post('/signup', (request, response) => {
    try {
        const body = request.body
        signupModel.create(body, (error, data) => {
            if (error) {
                throw error;
            }
            else {
                response.send(data)
                console.log(data);
            }
        })
    } catch (error) {
        response.send(`Error on signup >>> ${error.message}`)
    }
})



// login api

app.get("/signup", (request, response) => {
    try {
        var email = request.headers.email;
        console.log(email);
        const query = {
            email: email
        }

        signupModel.findOne(query, (error, data) => {
            if (error) {
                throw error;
            } else {
                response.send(JSON.stringify(data));
            }
        });


    } catch (error) {
        response.send(`Got an error during login  `, error);
    }
});


mongoose.connection.on("connected", () => console.log("mongoose connected"));
mongoose.connection.on("error", (error) => console.log(`mongoose error >>> ${error.message}`));



app.listen(port, () => console.log(`App running at localhost:${port}`));
