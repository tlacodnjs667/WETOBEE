const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3=require('multer-s3');
const path = require('path')

require('dotenv').config();

const s3 = new AWS.S3({
    region:'ap-northeast-2',
    credentials:{accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY}
});
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp' ];

const awsUploader = multer({
    storage : multerS3({
        s3:s3,
        bucket:'wetobeebucket',
        acl:'public-read',
        key: async(req, file, cb) => {
            const uploadDirectory = req.query.directory ?? '';
            const extension = path.extname(file.originalname)
            if(!allowedExtensions.includes(extension)){
                return cb(new Error('wrong extension'));
            }
            cb(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
        }
    }),
}).single("files");

module.exports = awsUploader;