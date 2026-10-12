import { randomUUID } from "node:crypto";

export interface CalendarAttributes {
	id?: string;
	name: string;
	code: string;
	userId: string;
	timeZone: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export class Calendar {
	private _id: string;
	private _name: string;
	private _code: string;
	private _timeZone: string;
	private _userId: string;
	private _createdAt: Date;
	private _updatedAt: Date;
	private _deletedAt?: Date;

	constructor(calendar: CalendarAttributes) {
		this._id = calendar.id ?? randomUUID();
		this._name = calendar.name;
		this._code = calendar.code;
		this._timeZone = calendar.timeZone;
		this._userId = calendar.userId;
		this._createdAt = calendar.createdAt ?? new Date();
		this._updatedAt = calendar.updatedAt ?? new Date();
		this._deletedAt = calendar.deletedAt;
	}

	// ----- Getters -----

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get code(): string {
		return this._code;
	}

	get timeZone(): string {
		return this._timeZone;
	}

	get userId(): string {
		return this._userId;
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

	set code(code: string) {
		this._code = code;
		this.touch();
	}

	set userId(userId: string) {
		this._userId = userId;
		this.touch();
	}

	set timeZone(timeZone: string) {
		this._timeZone = timeZone;
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
