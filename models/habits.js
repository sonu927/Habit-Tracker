const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['done','not-done','none'],
        default: 'none'
    },
    date:{
        type: Date,
        default: Date.now
    },
    previousDays: [
        {
            date:{
                type: Date,
                default: Date.now
            },
            status:{
                type: String,
                enum: ['done','not-done','none'],
                default: 'none'
            }
        }
    ]
});

const Habit = mongoose.model('Habit',habitSchema);
module.exports = Habit;