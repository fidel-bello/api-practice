import {NextFunction, Request, Response} from 'express'

export const healthCheck = (req: Request, res: Response, _next: NextFunction) => {
    return res.status(200).json({
        success: true,
        message: 'Working perfectly'
    })
}