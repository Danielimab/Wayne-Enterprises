const express = require('express');
const resourceController = require('../controllers/resourceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware.authenticate); 

router.get('/', resourceController.getResources);

router.get('/resource', resourceController.getResourceById);

router.post('/add', resourceController.addResource);

router.put('/update', resourceController.updateResource);

router.delete('/delete', resourceController.deleteResource);

module.exports = router;