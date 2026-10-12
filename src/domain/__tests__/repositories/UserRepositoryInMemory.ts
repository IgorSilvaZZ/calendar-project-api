import { randomUUID } from "node:crypto";
import { User, type UserAttributes } from "@domain/entities/User";
import type {
	UserInput,
	UserUpdateInput,
} from "@domain/interfaces/UserInterface";
import type { UserRepository } from "@domain/repositories/UserRepository";

export class UserRepositoryInMemory implements UserRepository {
	public users: User[] = [];

	private getActivitiesUsers() {
		return this.users.filter((user) => !user.deletedAt);
	}

	async findById(id: string): Promise<User | null> {
		return this.getActivitiesUsers().find((user) => user.id === id) || null;
	}

	async findByEmail(email: string): Promise<User | null> {
		return (
			this.getActivitiesUsers().find((user) => user.email === email) || null
		);
	}

	async findAll(): Promise<User[]> {
		return this.getActivitiesUsers();
	}

	async create(input: UserInput): Promise<User> {
		const data: UserAttributes = {
			id: randomUUID(),
			...input,
		};

		const user = new User(data);

		this.users.push(user);

		return user;
	}

	async update(id: string, input: UserUpdateInput): Promise<User> {
		const user = await this.findById(id);

		if (!user) {
			throw new Error("User not found!");
		}

		Object.entries(input).forEach(([key, value]) => {
			// Invoca o setter dinamicamente
			if (value && key in user) {
				Reflect.set(user, key, value);
			}
		});

		return user;
	}
}
