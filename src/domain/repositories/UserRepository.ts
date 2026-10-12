import type { User } from "../entities/User";
import type { UserInput, UserUpdateInput } from "../interfaces/UserInterface";
import type { BaseRepository } from "./BaseRepository";

export interface UserRepository
	extends BaseRepository<User, UserInput, UserUpdateInput> {
	findByEmail(email: string): Promise<User | null>;
}
