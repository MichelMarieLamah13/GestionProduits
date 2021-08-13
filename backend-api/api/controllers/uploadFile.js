const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = '';
        switch (file.fieldname) {
            case 'imgUsr':
                dir = './public/images/users/'
                break;
            case 'imgCb':
                dir = './public/images/productServices/Cb';
                break;
            case 'imgQr':
                dir = './public/images/productServices/Qr';
                break;
            case 'imgPd1':
            case 'imgPd2':
            case 'imgPd3':
            case 'imgPd4':
            case 'imgPd5':
                dir = './public/images/productServices/Pd';
                break;
            default:
                dir = './public/images';
                break;
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const td = new Date();
        const std = td.getFullYear() + '' + td.getMonth() + '' + td.getDate() + '' + td.getDay()
            + 'T' + td.getHours() + '' + td.getMinutes() + '' + td.getSeconds() + '' + td.getMilliseconds();
        const extparts = file.mimetype.split('/');
        const ext = extparts[extparts.length - 1];

        cb(null, std + '.' + ext);
    }

});
const fileFilter = (req, file, cb) => {
    const imgTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (imgTypes.includes(file.mimetype)) {
        //save the file
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

module.exports = upload