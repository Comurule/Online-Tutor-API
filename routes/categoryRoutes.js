const router = require ('express').Router();
const Person = require('../controller/userController');
const Category = require('../controller/categoryController');
const{
    update_a_category,
    delete_a_category,
    getAll_categories,
    create_a_category
} = Category;




router.post('/:category_id', update_a_category);
router.delete('/:category_id', delete_a_category);
router.get('/', getAll_categories);
router.post('/', create_a_category);



module.exports =router;