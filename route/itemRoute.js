const { authentication, restrictTo } = require('../controller/authController');
const {
    createNameItem,
    getAllItem,
    getItemById,
    updateItem,
    deleteItem,
} = require('../controller/itemController');

const router = require('express').Router();

router
    .route('/')
    .post(authentication, restrictTo('1'), createNameItem).get(authentication, restrictTo('1'), getAllItem);

router
    .route('/:id')
    .get(authentication, restrictTo('1'), getItemById)
    .patch(authentication, restrictTo('1'), updateItem)
    .delete(authentication, restrictTo('1'), deleteItem);

module.exports = router;