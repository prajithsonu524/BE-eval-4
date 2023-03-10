const router = require('express').Router();

const { getAllContentTypes, createContentType, updateFieldName, addField, deleteField } = require('../controller/contentTypes');

router.get('/getall', getAllContentTypes);
router.post('/create', createContentType);
router.put('/update/:id', updateFieldName);
router.put('/addfield/:id', addField);
router.delete('/deletefield/:id', deleteField);


module.exports = router;
