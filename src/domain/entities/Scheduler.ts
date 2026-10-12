import { randomUUID } from "node:crypto";

export interface SchedulerAttributes {
	id?: string;
	calendarId: string;
	participantId: string;
	date: Date;
	startHour: string;
	endHour: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export class Scheduler {
	private _id: string;
	private _calendarId: string;
	private _participantId: string;
	private _date: Date;
	private _startHour: string;
	private _endHour: string;
	private _createdAt: Date;
	private _updatedAt: Date;
	private _deletedAt?: Date;

	constructor(scheduler: SchedulerAttributes) {
		this.validateHours(scheduler.startHour, scheduler.endHour);

		this._id = scheduler.id ?? randomUUID();
		this._calendarId = scheduler.calendarId;
		this._participantId = scheduler.participantId;
		this._date = scheduler.date;
		this._startHour = scheduler.startHour;
		this._endHour = scheduler.endHour;
		this._createdAt = scheduler.createdAt ?? new Date();
		this._updatedAt = scheduler.updatedAt ?? new Date();
		this._deletedAt = scheduler.deletedAt;
	}

	// ----- Getters -----

	get id(): string {
		return this._id;
	}

	get calendarId(): string {
		return this._calendarId;
	}

	get participantId(): string {
		return this._participantId;
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

	set participantId(participantId: string) {
		this._participantId = participantId;
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

	set endHour(endHour: string) {
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

	private validateHours(startHour: string, endHour: string): void {
		const startHourToDate = this.convertHourToDate(startHour);
		const endHourToDate = this.convertHourToDate(endHour);

		if (endHourToDate.getTime() <= startHourToDate.getTime()) {
			throw new Error("endHour must be greater than startHour.");
		}
	}
}
