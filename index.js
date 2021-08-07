const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { response, request } = require('express');
const post_model = require('./schema')
const app = express();
const port = 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

const db_uri = "mongodb+srv://admin:admin@cluster0.mhpe2.mongodb.net/test"
mongoose.connect(db_uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.post('/createPost',(request,response)=>{
    try {
        const body = request.body;
        post_model.create(body,(error,data)=>{
            if(error){
                throw error;
            }
            else{
                console.log(data);
                response.send(data);
            }
        })
    } catch (error) {
        response.send(`Error at post >>>> : ${error.message}`);
    }
})

// Read All
app.get("/readAll", (request, response) => {
    try {
        post_model.find({}, (error, data) => {
            if (error) {
                throw error
            } else {
                console.log(data)
                response.send(data);
            }
        })
    } catch (error) {
        response.send(error)
    }
})


// Reads one with specific title

app.get("/readOne", (request, response) => {
    try {
        const { title } = request.headers;
        if (title) {
            post_model.findOne({title}, (error, data) => {
                if (error) {
                    throw error;
                } else {
                    response.send(data);
                }
            });
        }
        else{
            response.send(`Fieled Missing`)
        }
        
    } catch (error) {
        response.send(`Got an error during get posts `, error.message);
    }
});





mongoose.connection.on("connected", () => console.log("mongoose connected"));
mongoose.connection.on("error", (error) => console.log(`mongoose error >>> ${error.message}`));



app.listen(port,()=>console.log(`App running at localhost:${port}`));
