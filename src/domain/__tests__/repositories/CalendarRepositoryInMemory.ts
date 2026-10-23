import { AppErrors } from "@app/shared/AppErrors";
import {
	CALENDAR_NOT_FOUND,
	DUPLICATE_MESSAGE_ERROR,
} from "@app/shared/CalendarConsts";
import { Calendar } from "@domain/entities/Calendar";
import type {
	CalendarInput,
	CalendarUpdateInput,
} from "@domain/interfaces/CalendarInterface";
import type { CalendarRepository } from "@domain/repositories/CalendarRepository";

export class CalendarRepositoryInMemory implements CalendarRepository {
	public calendars: Calendar[] = [];

	private getActivitiesCalendars() {
		return this.calendars.filter((item) => !item.deletedAt);
	}

	async findByCode(code: string): Promise<Calendar | null> {
		return (
			this.getActivitiesCalendars().find((item) => item.code === code) ?? null
		);
	}

	async findById(id: string): Promise<Calendar | null> {
		return this.getActivitiesCalendars().find((item) => item.id === id) ?? null;
	}

	async findAll(): Promise<Calendar[]> {
		return this.getActivitiesCalendars();
	}

	async create(input: CalendarInput): Promise<Calendar> {
		/* Simulando o UNIQUE do banco */
		const codeExists = await this.findByCode(input.code);

		if (codeExists) {
			throw new AppErrors(DUPLICATE_MESSAGE_ERROR);
		}

		const calendar = new Calendar(input);

		this.calendars.push(calendar);

		return calendar;
	}

	async update(id: string, input: CalendarUpdateInput): Promise<Calendar> {
		const calendar = await this.findById(id);

		if (!calendar) {
			throw new AppErrors(CALENDAR_NOT_FOUND);
		}

		Object.entries(input).forEach(([key, value]) => {
			// Invoca o setter dinamicamente
			if (value && key in calendar) {
				Reflect.set(calendar, key, value);
			}
		});

		return calendar;
	}
}
