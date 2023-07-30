const mongoose = require('mongoose');

const uri ='mongodb+srv://sonu16122001:RpSu8SVp6TSwGanA@cluster-habittracker.iebmom4.mongodb.net/HabitTracketDB?retryWrites=true&w=majority'

const db = mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start your application or perform other operations after successful connection
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
  });

  module.exports = db