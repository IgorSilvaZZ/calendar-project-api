import { randomUUID } from "node:crypto";

export interface UserAttributes {
	id?: string;
	name: string;
	email: string;
	password: string;
	celPhone: string;
	occupation: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export class User {
	private _id: string;
	private _name: string;
	private _email: string;
	private _password: string;
	private _cellPhone: string;
	private _occupation: string;
	private _createdAt: Date;
	private _updatedAt: Date;
	private _deletedAt?: Date;

	constructor(user: UserAttributes) {
		this._id = user.id ?? randomUUID();
		this._name = user.name;
		this._email = user.email;
		this._password = user.password;
		this._cellPhone = user.celPhone;
		this._occupation = user.occupation;
		this._createdAt = user.createdAt ?? new Date();
		this._updatedAt = user.updatedAt ?? new Date();
	}

	// ----- Getters -----

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}

	get cellPhone(): string {
		return this._cellPhone;
	}

	get occupation(): string {
		return this._occupation;
	}

	get createdAt(): Date {
		return this._createdAt;
	}

	get updatedAt(): Date {
		return this._updatedAt;
	}

	get deletedAt(): Date | undefined {
		return this._deletedAt;
	}

	get isDeleted(): boolean {
		return this._deletedAt !== undefined;
	}

	// ----- Setters -----

	set name(name: string) {
		this._name = name;
		this.touch();
	}

	set email(email: string) {
		this._email = email;
		this.touch();
	}

	set password(password: string) {
		this._password = password;
		this.touch();
	}

	set cellPhone(cellPhone: string) {
		this._cellPhone = cellPhone;
		this.touch();
	}

	set occupation(occupation: string) {
		this._occupation = occupation;
		this.touch();
	}

	// ----- Soft delete / restore -----

	delete(): void {
		this._deletedAt = new Date();

		this.touch();
	}

	restore(): void {
		this._deletedAt = undefined;

		this.touch();
	}

	// ----- Utilitários -----

	private touch(): void {
		this._updatedAt = new Date();
	}
}
