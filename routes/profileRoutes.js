const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/profiles', profileController.createProfile);
router.put('/profiles/:id', profileController.updateProfile);
router.get('/profiles/:id', profileController.getProfileById);
router.get('/profiles', profileController.getAllProfiles);
router.delete('/profiles/:id',profileController.deleteProfile);

module.exports = router ;