const express = require('express');
const app = express();
const PORT = 3000;

//Connect DB 
const db = require('./config/mongoose');

// Parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

//make assets available to use
app.use(express.static('./assets'));

//set up express-ejs-layout
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//extract and place the css and js file from subpages into the correct position
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up ejs view 
app.set('view engine','ejs');
app.set('views','./views');


//use express routes
app.use('/',require('./routes'));

app.listen(PORT,function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server running on port : ${PORT}`);
});