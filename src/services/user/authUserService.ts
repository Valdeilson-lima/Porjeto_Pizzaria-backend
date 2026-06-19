import { prisma } from "../../lib/prisma";

interface AuthUserServiceProps {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserServiceProps) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userAlreadyExists) {
      throw new Error("Email ou senha incorretos");
    }

    return { message: "User authenticated successfully", email, password };
  }
}

export { AuthUserService };
