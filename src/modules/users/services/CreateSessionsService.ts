import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/Users";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const token = sign({}, "76e1803654207db09f5e88fde1be498a", {
      subject: user.id,
      expiresIn: "1d"
    })

    return {
      user,
      token
    };
  }
}

export default CreateSessionsService;
