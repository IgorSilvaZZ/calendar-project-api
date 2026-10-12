import type { UserAttributes } from "@domain/entities/User";
import type { UserInput } from "@domain/interfaces/UserInterface";

export const BASE_USER_ATTRIBUTES: Readonly<UserAttributes> = Object.freeze({
	name: "John Doe",
	email: "john@example.com",
	password: "password123",
	celPhone: "11999999999",
	occupation: "Developer",
});

export const CREATE_USER_INPUT: Readonly<UserInput> = Object.freeze({
	name: "John Doe",
	email: "john@example.com",
	password: "password123",
	celPhone: "11999999999",
	occupation: "Developer",
});

export const ANOTHER_USER_ATTRIBUTES: Readonly<UserAttributes> = Object.freeze({
	...BASE_USER_ATTRIBUTES,
	email: "another@example.com",
});

export const UPDATE_USER_ATTRIBUTES: Partial<UserAttributes> = Object.freeze({
	name: "John Updated",
	occupation: "Teacher",
});
