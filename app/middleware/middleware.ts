import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import multer from "multer";
import path from "path";


interface AuthenticatedRequest extends Request {
    user?: any;
}


export const authorization = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const pathArray = ['/api/register', '/api/login', '/api/google', '/api/forgotPassword', '/api/update-password', '/api/media', '/api/products', '/api/products/:id']
    const dynamicPathRegex = /^\/api\/\w+\/\w+\/?/;


    if (pathArray.includes(req.path) || dynamicPathRegex.test(req.path))
        return next()


    if (req.headers.authorization) {
        try {
            const data = await jwt.verify(req.headers.authorization, `${process.env.JWT_SECREATE} `)

            req.user = data;

            return next()

        } catch (error) {

            return res.status(401).send({
                error: true,
                message: 'Unauthorized access!',
            })
        }
    }
    else {
        return res.status(401).send({
            error: true,
            message: 'Unauthorized access!',
        })
    }

}


export const multipleFileUploading = async (req: Request, res: Response, next: NextFunction) => {

    const BASE_PATH = __dirname
    const storage = multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, path.join(BASE_PATH, '../upload'))

        },

        filename: function (req, file, cb) {
            const string = file.originalname.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '')
            const myFile = string.split(" ").join("_")

            cb(null, Date.now() + myFile)
        },
    })

    const fileFilter = (req: Request, file: any, cb: any) => {
        if (file.mimetype === 'image/jpe' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm' || file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3' || file.mimetype === 'audio/wav') {
            cb(null, true)
        }
        else {
            cb(null, true)
        }
    }

    const upload = multer({
        storage: storage,
        fileFilter: fileFilter
    })

    upload.fields([{ name: 'bannerImage', maxCount: 5 }, { name: 'video', maxCount: 1 }])(req, res, next)

}


export const fileUploader = async (req: Request, res: Response, next: NextFunction) => {
    const BASE_PATH = __dirname
    const storage = multer.diskStorage({

        destination: function (req: Request, file: any, cb: any) {
            cb(null, path.join(BASE_PATH, '../upload'))

        },
        filename: function (req: Request, file: any, cb: any) {
            cb(null, Date.now() + file.originalname)
        },
    })
    const fileFilter = (req: Request, file: any, cb: any) => {
        if (file.mimetype === 'image/jpe' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm' || file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3' || file.mimetype === 'audio/wav') {
            cb(null, true)
        }
        else {
            cb(null, true)
        }
    }
    const upload = multer({
        storage: storage,
        limits: { fileSize: 1024 * 1024 * 1024 * 5 },
        fileFilter: fileFilter
    })

    upload.single("video")(req, res, next)

}