import { AppErrors } from "@app/shared/AppErrors";
import type { User } from "@domain/entities/User";
import type { UserInput } from "@domain/interfaces/UserInterface";
import type { UserRepository } from "@domain/repositories/UserRepository";

export class CreateUserCase {
	constructor(private readonly userRepository: UserRepository) {}

	public async execute(input: UserInput): Promise<User> {
		const userExists = await this.userRepository.findByEmail(input.email);

		if (userExists) {
			throw new AppErrors("User already exists", 400);
		}

		const user = await this.userRepository.create(input);

		return user;
	}
}
