const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt-nodejs");
const knex = require('knex');

//CONTROLLERS
const register =  require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'maniek',
      password : '',
      database : 'smart-brain'
    }
  });
//promise
// db.select('*').from('users').then(data=> {
//     console.log(data);
// })



const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=> {
    res.send(database.users)
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{register.handleRegister(req.res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})




app.put('/image',(req,res)=>{image.imageHandler(req,res,db)})

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})



app.listen(3000,()=> {
    console.log(`Server running on port 3000`)
})

console.log("console.log ", process.env.PORT);

// bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash)
// });
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });



   // bcrypt.compare("tomek234", "$2a$10$maGAqnAqJj1uQnUo4pu3metZvu.hk5Gz7dN7ttHbuKHoL/v3G/0/y", function(err, res) {
    //          console.log("first quess", res)
    //     });
        
    //     bcrypt.compare("tomek23", "$2a$10$maGAqnAqJj1uQnUo4pu3metZvu.hk5Gz7dN7ttHbuKHoL/v3G/0/y", function(err, res) {
    //          console.log("first ques", res)
    //     });