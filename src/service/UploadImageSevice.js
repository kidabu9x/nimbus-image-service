var cloudinary = require('cloudinary').v2;
import path from 'path';
import DatauriParser from 'datauri/parser';
import randomstring from "randomstring";

const dUri = new DatauriParser();

cloudinary.config({
    cloud_name: 'nimbus-education',
    api_key: '355379485188139',
    api_secret: 'KDH3CTcyMn6pNOiHoBNUlnDIYgs'
});

const dataUri = file => dUri.format(path.extname(file.originalname).toString(), file.buffer);

function upload(file) {
    return new Promise(resolve => {
        const fileExtension = file.originalname.split('.').pop();
        if (!["png", "jpg"].includes(fileExtension)) {
            throw new Error("File format not supported");
        }
        const fileName = file.originalname.split('.').slice(0, -1).join('.');
        const filePath = 'blogs/uat/' + fileName + "-" + randomstring.generate();
        const uriFile = dataUri(file).content;
        const opts = {
            public_id: filePath
        }

        cloudinary.uploader.upload(uriFile, opts)
            .then(result => {
                resolve(result.secure_url)
            });
    });
}

export {
    upload
};