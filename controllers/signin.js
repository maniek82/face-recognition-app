const handleSignin = (req,res, db, bcrypt)=> {
    const {email, password} = req.body;
    if(!email || !password) {
        return  res.status(400).json("Please enter your details correctly");
      }

        db.select('email','hash').from('login')
        .where('email', '=', email).then(data=> {
          const passValid= bcrypt.compareSync(password, data[0].hash)
          if(passValid) {
           return  db.select('*').from('users').where('email',email).then(user=> {
                 res.json(user[0])
             })
             .catch(err=>res.status(400).json("Unable to signin"))
          }else {
              res.status(400).json("wrong credentials")
          }
        })
       .catch(err=>res.status(400).json("wrong credentials"))
     
    
    }

    module.exports = {
        handleSignin: handleSignin
    }