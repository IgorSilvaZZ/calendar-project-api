import { randomUUID } from "node:crypto";

export interface ExceptionsHoursAttributes {
	id?: string;
	date: Date;
	startHour: string;
	endHour: string;
	action: string;
	calendarId: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export class ExceptionsHours {
	private readonly _id: string;
	private _date: Date;
	private _startHour: string;
	private _endHour: string;
	private _action: string;
	private _calendarId: string;
	private readonly _createdAt: Date;
	private _updatedAt: Date;
	private _deletedAt?: Date;

	constructor(exceptionsHour: ExceptionsHoursAttributes) {
		this.validateHours(exceptionsHour.startHour, exceptionsHour.endHour);

		this._id = exceptionsHour.id ?? randomUUID();
		this._date = exceptionsHour.date;
		this._startHour = exceptionsHour.startHour;
		this._endHour = exceptionsHour.endHour;
		this._action = exceptionsHour.action;
		this._calendarId = exceptionsHour.calendarId;
		this._createdAt = exceptionsHour.createdAt ?? new Date();
		this._updatedAt = exceptionsHour.updatedAt ?? new Date();
		this._deletedAt = exceptionsHour.deletedAt;
	}

	// ----- Getters -----
	get id(): string {
		return this._id;
	}

	get date(): Date {
		return this._date;
	}

	get startHour(): string {
		return this._startHour;
	}

	get endHour(): string {
		return this._endHour;
	}

	get action(): string {
		return this._action;
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

	get deletedAt(): Date | undefined {
		return this._deletedAt;
	}

	get isDeleted(): boolean {
		return this._deletedAt !== undefined;
	}

	// ----- Setters -----
	set action(action: string) {
		this._action = action;
		this.touch();
	}

	set calendarId(calendarId: string) {
		this._calendarId = calendarId;
		this.touch();
	}

	set date(date: Date) {
		this._date = date;
		this.touch();
	}

	set startHour(startHour: string) {
		this.validateHours(startHour, this._endHour);
		this._startHour = startHour;
		this.touch();
	}

	set hourEnd(endHour: string) {
		this.validateHours(this._startHour, endHour);
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

	// ----- Utilitários & Validações de Domínio -----

	private touch(): void {
		this._updatedAt = new Date();
	}

	private convertHourToDate(hourString: string): Date {
		const [hour, minutes] = hourString.split(":").map(Number);

		const now = new Date();

		now.setHours(hour, minutes);

		return now;
	}

	private validateHours(hourStart: string, hourEnd: string): void {
		const hourStartToDate = this.convertHourToDate(hourStart);
		const hourEndToDate = this.convertHourToDate(hourEnd);

		if (hourEndToDate.getTime() <= hourStartToDate.getTime()) {
			throw new Error("hourEnd must be greater than startHour.");
		}
	}
}
