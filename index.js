const express = require('express');
const app = express();
const PORT = 3000;


app.listen(PORT,function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server running on port : ${PORT}`);
});