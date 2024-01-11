const router = require('express').Router();
const { storage } = require('../middleware/index')
const multer = require('multer');
const controller = require('../controller/crud');

const upload = multer({ storage });

router.get('/get-images', controller.getImage);
router.post('/upload-image', upload.single('file'), controller.uploadImage);
router.get('/download-image/:objectName', controller.downloadSpecifcImage);
router.delete('/delete-image/:objectName', controller.deleteImage);

module.exports = router;
