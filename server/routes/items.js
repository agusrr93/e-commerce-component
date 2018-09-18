const express = require('express');
const router = express.Router();
const itemController = require('../controller/item')
const {auth} = require('../middleware/auth')

/* GET users listing. */
router.get('/', itemController.getItems)
router.post('/',auth,itemController.createItem)
router.put('/:id', auth, itemController.updateItem)
router.delete('/:id', auth, itemController.deleteItem)
router.get('/:id', itemController.findItemById)

module.exports = router;