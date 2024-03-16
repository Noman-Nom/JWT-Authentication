const express = require('express');
const app = express();


const user = [

    {
        id : 1,
        name : 'Muhammmad Noman',
        pasword : 'Noman1234',
        isAdmin : true
        
    },

    {
        id : 2,
        name : 'Muhammmad Anwar',
        pasword : 'Anwar1234',
        isAdmin : false

    },
]


app.listen(5000,()=>console.log('Server Running'))