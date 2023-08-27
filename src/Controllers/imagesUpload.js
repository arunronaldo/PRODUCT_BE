const Images = require('../Models/imagesModel')
const fs = require('fs')
const { promisify } = require('util')

class ImagesUpload {
    async uploadAsBase64(req, res) {
        try {
            console.log('Req.body', req.query)
            if(Array.isArray(req.files.file)) return res.json({ message: 'Single file should select'})
            
            let imagesMimeType = ['image/jpeg', 'image/svg', 'image/svg+xml', 'image/png']
            if(imagesMimeType.includes(req.files.file.mimetype)){

                let path = req.files.file.tempFilePath
                let urlPrefix = `data:${req.files.file.mimetype};base64,`
                const promise = promisify(fs.readFile)
                const readData = await promise(path)
                let data = Buffer.from(readData).toString('base64')
                let dataURL = urlPrefix + data

                // Create Data in collection 
                let doc = {
                    imageType: req.query.imageType,
                    refId: req.query.refId,
                    imageURL: dataURL
                }
                let docCreated = await Images.create(doc)
                fs.unlink(path, (err) =>{
                    if(err) {
                        res.json({ error: err, 
                        message: 'Temp file remove error'})
                    }
                })
                return res.send({
                    data: docCreated
                })
            }else {
                res.json({
                    status: false,
                    message: 'Invalid file types'
                })
            }
        } catch (e) {
            console.log('ERROR', e)
            res.json({
                error: e,
                status: false,
                statusCode: 500,
                messsage: 'Internal server error'
            })
        }
    }
}

exports.ImagesUpload = new ImagesUpload()