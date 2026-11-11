import { prisma } from "@/config";
import { createNewUser } from "@/controllers/users.controllers";
import { validateSchema } from "@/middlewares";
import { userSchema } from "@/schemas";
import { Router } from "express";


const router = Router()
router.get('/users', async (_req, res) => {
    try {
        const users = await prisma.user.findMany()
        console.log(users)
        return res.send(users)
    } catch (error: any) {
        res.send(error.message)
    }
});

router.post('/users', validateSchema(userSchema), createNewUser);

export { router as usersRouter }