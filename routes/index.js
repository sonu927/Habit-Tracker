const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
router.post('/add',homeController.addHabit);
router.post('/toggleHabit/:id',homeController.toggleHabit);
router.get('/weekview',homeController.weekView);
router.post('/toggleDay',homeController.toggleDay);
module.exports = router;