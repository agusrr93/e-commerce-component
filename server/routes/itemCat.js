const express = require('express');
const router = express.Router();
const itemCatController = require('../controller/itemCat')
const {auth} = require('../middleware/auth')

router.post('/add',itemCatController.addItemCat)
router.post('/remove',itemCatController.removeItemCat)
router.get('/', itemCatController.getItemCat)
router.get('/all', itemCatController.getAllItem)
router.post('/', itemCatController.create)
router.put('/:id', auth, itemCatController.update)
router.delete('/:id', auth, itemCatController.remove)
router.get('/:name', itemCatController.findByName)


module.exports = router;