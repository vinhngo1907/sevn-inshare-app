const db = require("../database/db");
const File = db.File;
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const apiUrl = require("../contexts/constants");

const fileController = {
    getFiles: (req, res) => {
        File.getFiles(results => {
            res.json({ files: results })
        })
    },
    createFile: async(req, res) => {
        // console.log(req.file)
        const t = await db.sequelize.transaction();
        try {
            const newFile = await File.create({
                uuid: uuidv4(),
                name: req.file.filename,
                size: req.file.size,
                path: req.file.path.split(path.sep).slice(0).join('/'),
                createdAt: new Date(),
                updatedAt: new Date()

            }, { transaction: t });
            t.commit();
            res.json({ success: true, msg: 'Happy upload', file: newFile });

        } catch (error) {
            console.log(error.message);
            t.rollback();
            res.status(500).json({ success: false, msg: error.message })
        }
    },
    getFile: async(req, res) => {
        try {
            const file = await File.findOne({ where: { uuid: req.params.uuid } })
            if (!file) {
                return res.status(401).json({ success: false, file, msg: 'File not found or expired' })
            }
            res.json({ success: true, msg: 'Get file success', file })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, msg: error.message });
        }
        // .then(file => {
        // if (!file) {
        //     res.json({ success: false, msg: 'File not found or expired' })
        //     } else {
        //         return res.status(401).json({ success: true, file, msg: 'Get file success' })
        //     }
        // }).catch(err => {
        //     console.log(err);
        //     return res.status(500).json({ success: false, message: 'Something wrong' })
        // });
    },
    downloadFile: async(req, res) => {
        try {
            const file = await File.findOne({ where: { uuid: req.params.uuid } });
            // Link expired
            if (!file) {
                // return res.render('download', { error: 'Link has been expired.' });
                return res.status(401).json({ success: false, msg: 'Link has been expired.' })
            }
            // await file.save();
            const filePath = `${__dirname}/../${file.path}`;
            res.download(filePath);
            // console.log(filePath)
            // res.json({ success: true, file })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, msg: error.message });
        }
    },
    send: async(req, res) => {
        console.log(req.body)
        const { uuid, fromEmail, toEmail } = req.body

        try {
            // res.json({ success: true })
            if (!uuid || !fromEmail || !toEmail)
                return res.status(400).json({ success: false, message: 'All fields is required.' });

            const file = await File.findOne({ where: { uuid } });
            if (file.sender) {
                return res.status(422).json({ success: false, message: "Email already sent once" })
            }
            await File.update({
                sender: fromEmail,
                receiver: toEmail
            }, { where: { uuid } })

            // file.sender = fromEmail,
            //     file.receiver = toEmail
            // await file.save();
            const sendMail = require("../services/mailService")
            sendMail({
                from: fromEmail,
                to: toEmail,
                subject: 'shareIt file sharing',
                text: `${fromEmail} shared a file with you.`,
                html: require('../services/emailTemplate')({
                    fromEmail,
                    downloadLink: `${apiUrl}/files/${file.uuid}?source=email`,
                    size: parseInt(file.size / 1000) + ' KB',
                    expires: '24 hours'
                })
            }).then(function() {
                return res.json({ success: true, msg: "Email sent successfully" });
            }).catch(function(err) {
                console.log(err)
                return res.status(500).json({ success: false, msg: err.message });
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, msg: error.message });
        }
    }
}

module.exports = fileController