import sharp from 'sharp';
import fs from 'fs';

const resizeImg = async (req, res, next) => {
    if (!req.file || req.file.mimetype === 'image/gif') {
        next()
        return
    }

    const oldfile = req.file.destination + '/' + req.file.filename;
    const newfile = oldfile.replace(/\.jpeg|\.jpg|\.png/, '.webp');
    let file;

    if (req.file.size < 50000) {
        file = await sharp(oldfile).webp({ lossless: true }).toFile(newfile);
    } else {
        file = await sharp(oldfile).webp({ quality: 60 }).toFile(newfile);
    }

    fs.unlink(oldfile, (err) => {
        if (err) {
            file = req.file;
            return
        }
    })

    file.fieldname = req.file.fieldname;
    file.filename = req.file.filename.replace(/\.jpeg|\.jpg|\.png/, '.webp');
    req.file = file;

    next()
}

export default resizeImg;