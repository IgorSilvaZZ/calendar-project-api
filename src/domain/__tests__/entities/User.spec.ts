import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { User, type UserAttributes } from "../../entities/User";

describe("User Entity", () => {
	const userAttributes: UserAttributes = {
		name: "User Test",
		email: "user@test.com",
		password: "123456",
		celPhone: "11999999999",
		occupation: "Developer",
		createdAt: new Date(),
		updatedAt: new Date(),
		deletedAt: undefined as unknown as Date,
	};

	it("should be able to create a user", () => {
		const user = new User(userAttributes);

		expect(user).toBeTruthy();
		expect(user).toBeInstanceOf(User);
	});

	it("should generate an id automatically when not provided", () => {
		const user = new User(userAttributes);

		expect(user.id).toBeTruthy();
		expect(typeof user.id).toBe("string");
	});

	it("should use the provided id when given", () => {
		const id = randomUUID();

		const user = new User({ ...userAttributes, id });

		expect(user.id).toBe(id);
	});

	it("should set createdAt and updatedAt automatically when not provided", () => {
		const user = new User({
			...userAttributes,
			createdAt: undefined as unknown as Date,
			updatedAt: undefined as unknown as Date,
		});

		expect(user.createdAt).toBeInstanceOf(Date);
		expect(user.updatedAt).toBeInstanceOf(Date);
	});

	it("should be able to update user name", () => {
		const user = new User(userAttributes);

		const newName = "New User Name";

		user.name = newName;

		expect(user.name).toBe(newName);
	});

	it("should be able to update user email", () => {
		const user = new User(userAttributes);

		const newEmail = "new-email@test.com";

		user.email = newEmail;

		expect(user.email).toBe(newEmail);
	});

	it("should be able to update user password", () => {
		const user = new User(userAttributes);

		const newPassword = "new-password";

		user.password = newPassword;

		expect(user.password).toBe(newPassword);
	});

	it("should be able to update user cellPhone", () => {
		const user = new User(userAttributes);

		const newCellPhone = "11888888888";

		user.cellPhone = newCellPhone;

		expect(user.cellPhone).toBe(newCellPhone);
	});

	it("should be able to update user occupation", () => {
		const user = new User(userAttributes);

		const newOccupation = "Designer";

		user.occupation = newOccupation;

		expect(user.occupation).toBe(newOccupation);
	});

	it("should update updatedAt when any field is updated", async () => {
		const user = new User(userAttributes);

		const previousUpdatedAt = user.updatedAt;

		await new Promise((resolve) => setTimeout(resolve, 10));

		user.name = "Another Name";

		expect(user.updatedAt.getTime()).toBeGreaterThan(
			previousUpdatedAt.getTime(),
		);
	});

	it("should be able to soft delete a user", () => {
		const user = new User(userAttributes);

		expect(user.isDeleted).toBe(false);

		user.delete();

		expect(user.deletedAt).toBeInstanceOf(Date);
		expect(user.isDeleted).toBe(true);
	});

	it("should be able to restore a deleted user", () => {
		const user = new User(userAttributes);

		user.delete();
		expect(user.isDeleted).toBe(true);

		user.restore();

		expect(user.deletedAt).toBeUndefined();
		expect(user.isDeleted).toBe(false);
	});

	it("should update updatedAt when user is deleted or restored", async () => {
		const user = new User(userAttributes);

		const previousUpdatedAt = user.updatedAt;

		await new Promise((resolve) => setTimeout(resolve, 10));

		user.delete();

		expect(user.updatedAt.getTime()).toBeGreaterThan(
			previousUpdatedAt.getTime(),
		);
	});
});
