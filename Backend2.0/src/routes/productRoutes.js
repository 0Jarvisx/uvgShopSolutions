const express = require('express');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct, uploadImage } = require('../controllers/ProductController');
const multer = require('multer');
const multerS3 = require('multer-s3');
const router = express.Router();
const { s3, GetObjectCommand, getSignedUrl } = require("../config/aws");

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        let category = req.query.category;
        console.log(category);
        const fileName = `${category}/${Date.now()}_${file.originalname}`;
        cb(null, fileName);
      },
      contentType: multerS3.AUTO_CONTENT_TYPE
    }),
  });

router.post('/',createProduct);
router.post('/upload', upload.single('single'), uploadImage);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
