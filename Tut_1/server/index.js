const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json())


const users = [

    {
        id : 1,
        username : 'Muhammad Noman',
        password : 'noman1234',
        isAdmin : true
        
    },

    {
        id : 2,
        username : 'Muhammmad Anwar',
        password : 'Anwar1234',
        isAdmin : false

    },
]
 
            app.post("/api/login",(req,res)=>{

                const {username,password} = req.body;
             const user = users.find((u)=>{

             
                return u.username === username && u.password === password;


             })
             if(user){
                // res.json(user);
                    const accessToken = jwt.sign({
                        id: user.id,
                        isAdmin : user.isAdmin
                    },'mySecretKey');

                    res.json({
                        username : user.username,
                        isAdmin : user.isAdmin,
                        accessToken : accessToken
                    
                    });
                 
             } else {

                res.status(400).json({message : "Invalid Username or Password"})
             }

                // res.json("Working")  for testing postman
            })
                
            const verify = (req ,res , next)=>{

                const authHeader = req.headers.authorization;

                if(authHeader){

                    const token = authHeader.split(" ")[1];

                    jwt.verify(token,'mySecretKey',(err , user)=>{
                        if(err){

                            return res.status(403).json("Token is not valid")
                        }
                        req.user = user;
                        next();

                    })

                }else{

                    res.status(401).json({message : "You are not authenticated"})
                }



            }

            app.delete("/api/users/:userId",verify,(req,res)=>{

                if(req.user.id === req.params.userId || req.user.isAdmin){

                    res.json("User has been deleted");

                }else{

                    res.status(403).json("You are not allowed to delete this user")
                }
            })
 
app.listen(5000,()=>console.log('Server Running'))