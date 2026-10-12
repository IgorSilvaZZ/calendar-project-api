import { AppErrors } from "@app/shared/AppErrors";
import { CreateUserCase } from "@app/useCases/CreateUserUseCase";
import { CREATE_USER_INPUT } from "@domain/__tests__/fixtures/user.fixture";
import { UserRepositoryInMemory } from "@domain/__tests__/repositories/UserRepositoryInMemory";
import { beforeEach, describe, expect, it } from "vitest";

describe("CreateUserCase", () => {
	let userRepository: UserRepositoryInMemory;
	let createUserCase: CreateUserCase;

	beforeEach(() => {
		userRepository = new UserRepositoryInMemory();
		createUserCase = new CreateUserCase(userRepository);
	});

	it("should be able to create a new user", async () => {
		const user = await createUserCase.execute(CREATE_USER_INPUT);

		expect(user).toBeTruthy();
		expect(user.id).toBeTruthy();
		expect(user.email).toBe(CREATE_USER_INPUT.email);
		expect(userRepository.users).toHaveLength(1);
		expect(userRepository.users[0].id).toBe(user.id);
	});

	it("should throw an error if trying to create a user with an already existing email", async () => {
		await createUserCase.execute(CREATE_USER_INPUT);

		await expect(createUserCase.execute(CREATE_USER_INPUT)).rejects.toThrow(
			AppErrors,
		);
		await expect(createUserCase.execute(CREATE_USER_INPUT)).rejects.toThrow(
			"User already exists",
		);
	});
});
