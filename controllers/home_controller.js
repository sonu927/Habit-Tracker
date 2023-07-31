const Habit = require('../models/habits');


//fetches all the habits from the DB and render home Page
module.exports.home = async function(req,res){
    updateHabitDaily();
    const habits = await Habit.find({}).sort({createdAt: -1});
    return res.render('home',{
        habits: habits
    });
}

//add new habit to DB
module.exports.addHabit = async function(req,res){
    try{
        const newHabit = {
            name: req.body.name,
            status: 'none',
            previousDays: []
        }

        //Calculate dates for previous six days
        const today = new Date();
        for(let i=1;i<=6;i++){
            const previousDay = new Date(today);
            previousDay.setDate(today.getDate() - i);
            newHabit.previousDays.unshift({
                date: previousDay,
                status: 'none'
            });
        }
        

        await Habit.create(newHabit);
        return res.redirect('back');

    }catch(err){
        console.log('Error in adding new data');
    }
}

//toggle habit status everytime you click it
module.exports.toggleHabit = async function(req,res){
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) {
            return res.status(404).send('Habit not found');
        }

        const statusOptions = ['none', 'done', 'not-done'];
        const currentIndex = statusOptions.indexOf(habit.status);
        const nextIndex = (currentIndex + 1) % statusOptions.length;
        habit.status = statusOptions[nextIndex];

        await habit.save(); // Save the updated habit

        return res.json(habit.status);
    } catch (err) {
        console.error('Error toggling habit status:', err);
        return res.status(500).send('Internal Server Error');
    }
}

//fetches all the habits from the DB and render Weekly View Page
module.exports.weekView = async function(req,res){
    const habits = await Habit.find({}).sort({createdAt: -1});
   
    return res.render('weekView',{
        habits: habits
    });
}

//toggle habit status for previous days
module.exports.toggleDayStatus = async function(req,res){
    const habit = await Habit.findById(req.query.id);
    const habitDate = new Date(req.query.date);
    //console.log(habitDate);
    const index = habit.previousDays.findIndex(day => day.date.getDate() == habitDate.getDate() && day.date.getMonth()== habitDate.getMonth());
    //console.log(index);
    const statusOptions = ['none', 'done', 'not-done'];
    const currentIndex = statusOptions.indexOf(habit.previousDays[index].status);
    const nextIndex = (currentIndex + 1) % statusOptions.length;

    habit.previousDays[index].status = statusOptions[nextIndex]
    habit.save();

    return res.json(habit.previousDays[index].status);
}

//delete the habit
module.exports.delete = async function(req,res){
    try{
        const habit = await Habit.findById(req.params.id);
        if(!habit){
            return res.status(404).json({ message: 'Habit not found' });
        }
        await habit.deleteOne();
        return res.redirect('back');
    }catch(err){
        console.error("Error in deleting the habit : ",err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

//update the daily date for all habits
async function updateHabitDaily(){
    const habits = await Habit.find({});
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    habits.forEach(habit => {
        const today = new Date();
        if(habit.date.toLocaleDateString('en-GB', options) != today.toLocaleDateString('en-GB', options)){
            habit.status = 'none';
            habit.previousDays.shift();
            habit.previousDays.push({
                date: habit.date,
                status: habit.status
            });
        }
        habit.date = today;
        habit.save();
    });
}