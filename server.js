const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt-nodejs");


const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
const database = {
    users: [
        {
            id: "1",
            name:"john",
            email: "john@gmail.com",
            password: "pass123",
            entries: 0,
            joined: new Date()
        },
        {
            id: "2",
            name:"sally",
            email: "sally@gmail.com",
            password: "asia123",
            entries: 0,
            joined: new Date()
        }
    ]
}
app.get('/',(req,res)=> {
    res.send(database.users)
})

app.post('/signin',(req,res)=> {

    // bcrypt.compare("tomek234", "$2a$10$maGAqnAqJj1uQnUo4pu3metZvu.hk5Gz7dN7ttHbuKHoL/v3G/0/y", function(err, res) {
    //          console.log("first quess", res)
    //     });
        
    //     bcrypt.compare("tomek23", "$2a$10$maGAqnAqJj1uQnUo4pu3metZvu.hk5Gz7dN7ttHbuKHoL/v3G/0/y", function(err, res) {
    //          console.log("first ques", res)
    //     });

    if(req.body.email ===database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    }else {
       res.status(400).json("error logging in");
    }
})

app.post('/register',(req,res)=> {

    const {email, name, password} = req.body;

    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash)
    });

    database.users.push({
            id: database.users.length+1,
            name:name,
            email: email,
            entries: 0,
            joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id',(req,res)=> {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user=> {
        if(user.id===id) {
            found=true;
         return res.json(database.user[0]);
        }
    })
    if(!found) {
        res.status(404).json("not such user")
   
    }
})

app.put('/image',(req,res)=> {
    const {id} = req.body;
    let found = false;

    database.users.forEach(user=> {
        if(user.id===id) {
            found=true;
            user.entries++
            return res.json(user.entries)
        }
    })

    if(!found) {
        res.status(404).json("not such user");
    }
})



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });



app.listen(3000,()=> {
    console.log("server running on port 3000")
})


