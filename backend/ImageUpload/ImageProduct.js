const helpers = require('./helpers')

//upload image
const multer = require('multer')
const path = require('path')
var maxSize = 1 * 1000 * 1000
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: helpers.imageFilter,
}).single('image')

const ImageUploadProduct = function (req, res, next) {
    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.status(400).send(req.fileValidationError)
        } else if (!req.file) {
            return res.status(400).send('server do not contain file')
        } else if (err instanceof multer.MulterError) {
            return res.status(400).send(err)
        } else if (err) {
            return res.status(400).send(err)
        }
        res.json(req.file.path)
        // Display uploaded image for user validation
        // res.send(
        //   `You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`
        // );
    })
}
exports.ProductImage = ImageUploadProduct
