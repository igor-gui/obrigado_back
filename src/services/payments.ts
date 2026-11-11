import { exchange, getUserByEmail, getUserByNick } from "@/repositories";
import { ApiUser, PaymentParams } from "@/types";
import { validateSession } from "@/middlewares";
import { DoubleData } from "@/errors";
import { checkValidData } from "@/helpers";
import { User } from "@prisma/client";

export async function sendMoney(payment: PaymentParams) {
    const session = await validateSession(payment.authorization);

    checkDoubleData(payment);

    // const user = checkValidData(payment.receiverNick) ?
    //     await getUserByNick(payment.receiverNick) :
    //     await getUserByEmail(payment.receiverEmail);
    let user;
    if(checkValidData(payment.receiverNick)){
        user = await getUserByNick(payment.receiverNick);
    } else {
        user = await getUserByEmail(payment.receiverEmail);
    }

    if (!user) {
    throw new Error("Recipient not found");
}
    
    return await exchange({ gaverId: session.User.id, receiverId: user.id, value: payment.value });
};

function checkDoubleData(payment: PaymentParams) {
    const { receiverEmail, receiverNick } = payment;

    const emailIsValid = checkValidData(receiverEmail);
    const nickIsValid = checkValidData(receiverNick);

    if (emailIsValid && nickIsValid) throw DoubleData()
};


