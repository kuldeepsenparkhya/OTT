import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';


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