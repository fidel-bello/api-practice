/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Request, Response } from 'express';

interface IUser {
    id: string
}

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
        interface Response {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            result: any
        }
    }
}
