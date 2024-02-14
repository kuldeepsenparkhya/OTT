import { Response } from "express";
import nodemailer from 'nodemailer'

export const handleError = (error: any, status: any, res: Response) => {

    return res.status(status).send({
        message: error,
        error: true,
    })

}

export const handleResponse = (res: Response, data: any, message: string, status: any,) => {

    return res.status(status).send({
        data,
        message: message,
        error: false,
    })

}



export const sendMailer = async (email: string, subject: string, message: any, res: Response) => {

    const transporter = nodemailer.createTransport({
        host: `${process.env.SMPT_EMAIL_HOST}`,
        port: parseInt(`${process.env.SMPT_EMAIL_PORT}`),
        auth: {
            user: `${process.env.SMPT_EMAIL_USER}`,
            pass: `${process.env.SMPT_EMAIL_PASSWORD}`
        },
        secure: false
    })

    const data = {
        from: `${process.env.SMPT_EMAIL_FROM}`,
        to: `${email}`,
        subject: `${subject} - College`,
        html: `${message}`,
    }

    transporter.sendMail(data, (error: any, info: any) => {
        if (error) {
            console.log('error>>>>>>', error);
            res.status(error.responseCode).send(error)
        }
    })

    return
};

export const createUUID = () => {
    var dt = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0
        dt = Math.floor(dt / 16)
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })

    return uuid
};



export const  generateResetPasswordEmail = (token: any) => {

    return `<div style="margin:auto width:70%">
                <div style="font-family: Helvetica,Arial,sans-serifmin-width:1000pxoverflow:autoline-height:2">
                <div style="margin:50px autowidth:60%padding:20px 0">
                <p style="font-size:25px">Hello,</p>
                <p>Use the code below to recover access to your College account.</p>
                <div style="border-bottom:1px solid #eee">
                <a href=${process.env.FRONTEND_URL}/reset-password?token=${token} style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Click the link and reset your password</a>
                </div>
                <p>The recovery code is only valid for 24 hours after it’s generated. If your code has already expired, you can restart the recovery process and generate a new code.
                If you haven't initiated an account recovery or password reset in the last 24 hours, ignore this message.</p>
                <p style="font-size:0.9em">Best Regards,<br />College</p>
                </div>
                </div>
            </div>`;
}
