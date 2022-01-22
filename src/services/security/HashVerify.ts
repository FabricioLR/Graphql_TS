import { compare } from "bcryptjs";

type HashVerifyProps = {
    password: string
    passwordUser: string
}

export async function HashVerify(data: HashVerifyProps){
    const verify = await compare(data.password, data.passwordUser)

    return verify
}