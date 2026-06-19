import { compare } from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { sign } from "jsonwebtoken";

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

    const passworMatch = await compare(password, userAlreadyExists.password);

    if (!passworMatch) {
      throw new Error("Email ou senha incorretos");
    }

    // TODO: Implementar geração de token JWT para autenticação
    const token = sign(
      {
        name: userAlreadyExists.name,
        email: userAlreadyExists.email,
      },
      process.env.JWT_SECRET!,
      {
        subject: userAlreadyExists.id,
        expiresIn: "7d",
      }
    );

    return {
      id: userAlreadyExists.id,
      name: userAlreadyExists.name,
      email: userAlreadyExists.email,
      role: userAlreadyExists.role,
      token,
    };
  }
}

export { AuthUserService };
