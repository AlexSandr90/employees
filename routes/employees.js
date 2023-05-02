const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');
const {
    add,
    all,
    edit,
    remove,
    employee
} = require('../controllers/employees');

router.get('/', auth, all);
router.get('/:id', auth, employee);
router.post('/add', auth, add);
router.post('/remove/:id', auth, remove);
router.put('/edit/:id', auth, edit);

module.exports = router;