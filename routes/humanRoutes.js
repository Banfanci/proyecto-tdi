const express = require('express');
const humanController = require('../controllers/humanController');

const router = express.Router();

router
  .route('/')
  .get(humanController.getAllHumans)
  .post(humanController.createHuman);

router
  .route('/:human_id')
  .get(humanController.getHuman)
  .delete(humanController.deleteHuman);

module.exports = router;
