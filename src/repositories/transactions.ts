import { prisma } from "@/config";
import { getUserById } from "./users";
import { CreatePaymentParams } from "@/types";

export async function exchange(payment: CreatePaymentParams) {
    const { receiverId, gaverId, value } = payment;
    await withdrawBalance(gaverId, value);
    await sendBalance(receiverId, value);
    return await prisma.transaction.create({ data: { gaverId, receiverId, value } })

}

export async function withdrawBalance(id: number, value: number) {
    const user = await getUserById(id);

    if (!user) {
        throw new Error("User not found");
    }

    const newBalance = user.balance - value;

    return await prisma.user.update({
        where: {
            id
        },
        data: {
            balance: newBalance,
        },
    });
};

export async function sendBalance(id: number, value: number) {
    const receiver = await getUserById(id);

    if (!receiver) {
        throw new Error("Receiver not found");
    }

    const newBalance = receiver.balance + value;

    return await prisma.user.update({
        where: { id },
        data: {
            balance: newBalance,
        }
    });
};