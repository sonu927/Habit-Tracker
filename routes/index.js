const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

//for home
router.get('/',homeController.home);
//for adding new habit
router.post('/add',homeController.addHabit);
//to change habit status
router.post('/toggleHabit/:id',homeController.toggleHabit);
//for weekly view of habits
router.get('/weekview',homeController.weekView);
//to change habit status for previous days
router.post('/toggleDay',homeController.toggleDayStatus);
//for deleting a habit
router.get('/delete/:id',homeController.delete);
module.exports = router;