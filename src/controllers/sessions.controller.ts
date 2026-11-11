import { login } from "@/services";
import { CreateSessionParams } from "@/types";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function startSession(req: Request, res: Response, next: NextFunction) {
    const { body }: { body: CreateSessionParams } = req;

    try {
        const { token } = await login(body);
        return res.status(httpStatus.CREATED).send(token);
    }
    catch (err: any) {
        const ERROR_DEV_MESSAGE = `ERROR MESSAGE: ${err.message}.`;
        console.log(ERROR_DEV_MESSAGE);
        next(err)
    }

}