const thuocController = require('./thuocController');
const express = require('express');
const router = express.Router();

router.get('/', thuocController.getThuocs);
router.get('/getphieukhambenhs', thuocController.getThuocPhieuKhamBenhs);
router.get('/getphieukhambenhs/:id', thuocController.getThuocKhamBenhById);
router.get('/:id', thuocController.getThuocById);

router.post('/add', thuocController.createThuoc);

router.put('/update/:id', thuocController.updateThuoc);

router.delete('/delete/:id', thuocController.deleteThuoc);

module.exports = router;