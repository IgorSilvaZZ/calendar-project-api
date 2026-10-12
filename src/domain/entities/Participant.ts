import { randomUUID } from "node:crypto";

export interface ParticipantAttributes {
	id?: string;
	name: string;
	email: string;
	celPhone: string;
	calendarId: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Participant {
	private _id: string;
	private _name: string;
	private _email: string;
	private _cellPhone: string;
	private _calendarId: string;
	private _createdAt: Date;
	private _updatedAt: Date;

	constructor(participant: ParticipantAttributes) {
		this._id = participant.id ?? randomUUID();
		this._name = participant.name;
		this._email = participant.email;
		this._cellPhone = participant.celPhone;
		this._calendarId = participant.calendarId;
		this._createdAt = participant.createdAt ?? new Date();
		this._updatedAt = participant.updatedAt ?? new Date();
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

	get cellPhone(): string {
		return this._cellPhone;
	}

	get calendarId(): string {
		return this._calendarId;
	}

	get createdAt(): Date {
		return this._createdAt;
	}

	get updatedAt(): Date {
		return this._updatedAt;
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

	set cellPhone(cellPhone: string) {
		this._cellPhone = cellPhone;
		this.touch();
	}

	set calendarId(calendarId: string) {
		this._calendarId = calendarId;
		this.touch();
	}

	// ----- Utilitários -----

	private touch(): void {
		this._updatedAt = new Date();
	}
}
