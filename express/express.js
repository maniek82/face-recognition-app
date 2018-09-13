const express = require ('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//
app.use(express.static(__dirname + '/public'));

app.get('/profile',( req, res) => {

//    req.query
//    req.body
//    req.header
//    req.params
    //   res.status
    //   res.send

   res.send("<h1>Getting profile</h1>");
});


    

app.listen(3000);