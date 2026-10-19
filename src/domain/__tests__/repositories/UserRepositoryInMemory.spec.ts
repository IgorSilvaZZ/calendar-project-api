import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	ANOTHER_USER_ATTRIBUTES,
	BASE_USER_ATTRIBUTES,
	UPDATE_USER_ATTRIBUTES,
} from "../fixtures/user.fixture";
import { UserRepositoryInMemory } from "./UserRepositoryInMemory";

describe("InMemoryUserRepository", () => {
	let repository: UserRepositoryInMemory;

	const mockNow = new Date("2026-09-16T10:00:00.000Z");

	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(mockNow);
		repository = new UserRepositoryInMemory();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe("Create Operations", () => {
		it("should be able to create and persist a new user", async () => {
			const user = await repository.create(BASE_USER_ATTRIBUTES);

			expect(user).toBeTruthy();
			expect(user.id).toBeTruthy();
			expect(user.createdAt).toEqual(mockNow);
			expect(repository.users).toHaveLength(1);
			expect(repository.users[0]).toEqual(user);
		});
	});

	describe("Find Operations", () => {
		it("should be able to find a user by id", async () => {
			const createdUser = await repository.create(BASE_USER_ATTRIBUTES);

			const foundUser = await repository.findById(createdUser.id);

			expect(foundUser).toBeTruthy();
			expect(foundUser?.id).toBe(createdUser.id);
		});

		it("should return null when user is not found by id", async () => {
			const foundUser = await repository.findById("non-existing-id");

			expect(foundUser).toBeNull();
		});

		it("should be able to find a user by email", async () => {
			await repository.create(BASE_USER_ATTRIBUTES);

			const foundUser = await repository.findByEmail(
				BASE_USER_ATTRIBUTES.email,
			);

			expect(foundUser).toBeTruthy();
			expect(foundUser?.email).toBe(BASE_USER_ATTRIBUTES.email);
		});

		it("should return null when user is not found by email", async () => {
			const foundUser = await repository.findByEmail(
				"non-existing@example.com",
			);

			expect(foundUser).toBeNull();
		});

		it("should be able to list all active users", async () => {
			await repository.create(BASE_USER_ATTRIBUTES);
			await repository.create(ANOTHER_USER_ATTRIBUTES);

			const users = await repository.findAll();

			expect(users).toHaveLength(2);
		});

		it("should not return soft-deleted users in findById, findByEmail or findAll", async () => {
			const user = await repository.create(BASE_USER_ATTRIBUTES);

			user.delete();

			const foundById = await repository.findById(user.id);
			const foundByEmail = await repository.findByEmail(user.email);
			const allUsers = await repository.findAll();

			expect(foundById).toBeNull();
			expect(foundByEmail).toBeNull();
			expect(allUsers).toHaveLength(0);
		});
	});

	describe("Update Operations", () => {
		it("should be able to update user data and refresh updatedAt timestamp", async () => {
			const user = await repository.create(BASE_USER_ATTRIBUTES);

			vi.advanceTimersByTime(1000 * 60 * 30); // Avança 30 minutos

			const updatedUser = await repository.update(
				user.id,
				UPDATE_USER_ATTRIBUTES,
			);

			const expectedUpdatedAt = new Date("2026-09-16T10:30:00.000Z");

			expect(updatedUser.name).toBe(UPDATE_USER_ATTRIBUTES.name);
			expect(updatedUser.occupation).toBe(UPDATE_USER_ATTRIBUTES.occupation);
			expect(updatedUser.updatedAt).toEqual(expectedUpdatedAt);
		});

		it("should throw an error when trying to update a non-existing user", async () => {
			await expect(
				repository.update("non-existing-id", { name: "New Name" }),
			).rejects.toThrow("User not found");
		});
	});
});
