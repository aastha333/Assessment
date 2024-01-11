const router = require('express').Router();
const { storage } = require('../middleware/index')
const multer = require('multer');
const upload = multer({ storage });
const controller = require('../controller/crud');

router.get('/get-images', controller.getImage);
router.post('/upload-image', upload.single('file'), controller.uploadImage);
router.get('/download-image/:objectName', controller.downloadSpecifcImage);
router.delete('/delete-image/:objectName', controller.deleteImage);

module.exports = router;
