const express = require('express');
const router = express.Router();

const CarController = require('./controllers/CarController');

router.get('/cars', CarController.searchAll);
router.get('/car/:codigo', CarController.searchOne);
router.post('/car', CarController.addCar);
router.put('/car/:codigo', CarController.updateCar);
router.delete('/car/:codigo', CarController.deleteCar);

module.exports = router;
