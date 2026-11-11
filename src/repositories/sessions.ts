import { prisma } from "@/config";
import { v4 as uuidV4 } from "uuid";
import { getUserByEmail } from "./users";
import { CreateSessionParams } from "@/types";
import { invalidCredentials, invalidSession } from "@/errors";

export async function createSession({ email }: CreateSessionParams) {
    const user = await getUserByEmail(email);
    if (!user) throw invalidCredentials();

    return await prisma.session.create({
        data: {
            userId: user.id,
            token: uuidV4(),
        },
    });
}

export async function getUserByAuthorization(authorization: string) {
    const session = await getSessionByAuthorization(authorization);
    if (!session) throw invalidSession();

    return session.User;
}

export async function getSessionByAuthorization(authorization: string) {
    const token = authorization.replace("Bearer ", "");

    return await prisma.session.findUnique({
        where: { token },
        include: { User: true },
    });
}