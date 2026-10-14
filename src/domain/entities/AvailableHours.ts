import { randomUUID } from "node:crypto";

export interface AvailableHoursAttributes {
	id?: string;
	weekDay: number;
	startHour: string;
	endHour: string;
	calendarId: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export class AvailableHours {
	private readonly _id: string;
	private _calendarId: string;
	private _weekDay: number;
	private _startHour: string;
	private _endHour: string;
	private readonly _createdAt: Date;
	private _updatedAt: Date;
	private _deletedAt?: Date;

	constructor(availableHour: AvailableHoursAttributes) {
		this._id = availableHour.id ?? randomUUID();
		this._calendarId = availableHour.calendarId;
		this._weekDay = availableHour.weekDay;
		this._startHour = availableHour.startHour;
		this._endHour = availableHour.endHour;
		this._createdAt = availableHour.createdAt ?? new Date();
		this._updatedAt = availableHour.updatedAt ?? new Date();
		this._deletedAt = availableHour.deletedAt;
	}

	// ----- Getters -----
	get id(): string {
		return this._id;
	}

	get calendarId(): string {
		return this._calendarId;
	}

	get weekDay(): number {
		return this._weekDay;
	}

	get startHour(): string {
		return this._startHour;
	}

	get endHour(): string {
		return this._endHour;
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
	set calendarId(calendarId: string) {
		this._calendarId = calendarId;
		this.touch();
	}

	set weekDay(weekDay: number) {
		this._weekDay = weekDay;
		this.touch();
	}

	set startHour(startHour: string) {
		this._startHour = startHour;
		this.touch();
	}

	set endHour(endHour: string) {
		this._endHour = endHour;
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
