import { newUser } from "@/services";
import { CreateUserParams } from "@/types";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function createNewUser(req: Request, res: Response, next: NextFunction) {
    const { body }: { body: CreateUserParams } = req;
    try {
        const user = await newUser(body);
        return res.send(user).status(httpStatus.CREATED);
    }
    catch (err: any) {
        console.error(err)
        const ERROR_DEV_MESSAGE: string = `ERROR MESSAGE: ${err.message}`;
        console.log(ERROR_DEV_MESSAGE);
        next(err)
    }
}