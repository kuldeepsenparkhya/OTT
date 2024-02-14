import { Request, Response } from "express"
import { User } from "../model";
import { createUUID, generateResetPasswordEmail, handleError, handleResponse, sendMailer } from "../utils/helper";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import "dotenv/config";

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user || !(await user.matchPassword(password))) {
            handleError('Invalid login credentials', 400, res);
            return;
        }
        else {
            const token = jwt.sign({
                _id: user._id,
                email: user.email,
                name: user.name,
            }, `${process.env.JWT_SECREATE} `, { expiresIn: process.env.JWT_EXPIRESIN })

            handleResponse(res, { token: token }, 'LoggedIn Successfully!', 200,)
        }
    } catch (error) {

    }
};


export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email })
        if (!user) {
            handleError('Invalid login credentials', 400, res);
            return;
        };

        const token = createUUID();

        await User.updateOne({ _id: user._id }, { token: token }, { new: true });

        const subject = 'Your forgot password link';
        const message = generateResetPasswordEmail(token);

        sendMailer(email, subject, message, res);

        return res.send({ message: `We have sent reset password email link`, error: false });



    } catch (error) {

    }
}




// Forgot password verify
export const forgotPasswordVerify = async (req: Request, res: Response): Promise<void> => {
    try {
        const { newPassword, confirmPassword, token } = req.body

        // const { error } = updateUserPassword.validate(req.body, { abortEarly: false })
        // if (error) {
        //     handleError(error, 400, res)
        //     return
        // }

        const user = await User.findOne({ token: token })

        if (!user) {
            res.status(409).send({ message: 'This link has already been used', error: true })
            return
        }

        if (newPassword === confirmPassword) {
            const updatePassword = await bcrypt.hash(newPassword, 10);
            await User.updateOne({ token: token, _id: user._id }, { token: null, password: updatePassword }, { new: true })
                .then(data => {
                    return res.send({ message: 'You have successfully reset your password', error: false })
                })
                .catch(err => {
                    handleError(err.message, 400, res);
                    return
                })
        }
        else {
            handleError('Password and confirm password should be same.', 400, res);
            return
        }

    } catch (error) {
        handleError(error, 400, res);
    }



}

// Me

interface AuthenticatedRequest extends Request {
    user?: { _id: string };
};

export const me = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.['_id'];

    const user = await User.findOne({ _id: userId })
    user === null ? handleError('Unauthorized user', 400, res) : handleResponse(res, user, 'Your profile has been fetched successfully.', 200)
}