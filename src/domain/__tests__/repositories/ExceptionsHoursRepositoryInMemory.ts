import { randomUUID } from "node:crypto";
import {
	ExceptionsHours,
	type ExceptionsHoursAttributes,
} from "@domain/entities/ExceptionsHours";
import type { ExceptionsHoursInput } from "@domain/interfaces/ExceptionsHours.interface";
import type { ExceptionsHoursRepository } from "@domain/repositories/ExceptionsHoursRepository";

export class ExceptionsHoursRepositoryInMemory
	implements ExceptionsHoursRepository
{
	public exceptionsHours: ExceptionsHours[] = [];

	private getActivitiesExceptionsHours(): ExceptionsHours[] {
		return this.exceptionsHours.filter((item) => !item.deletedAt);
	}

	async findById(id: string): Promise<ExceptionsHours | null> {
		return (
			this.getActivitiesExceptionsHours().find((item) => item.id === id) ?? null
		);
	}

	async findAll(): Promise<ExceptionsHours[]> {
		return this.getActivitiesExceptionsHours();
	}

	async create(input: ExceptionsHoursInput): Promise<ExceptionsHours> {
		const data: ExceptionsHoursAttributes = {
			id: randomUUID(),
			...input,
		};

		const exceptionHour = new ExceptionsHours(data);

		this.exceptionsHours.push(exceptionHour);

		return exceptionHour;
	}

	async createMany(input: ExceptionsHoursInput[]): Promise<ExceptionsHours[]> {
		const exceptionsHours = input.map(
			(item) => new ExceptionsHours({ id: randomUUID(), ...item }),
		);

		this.exceptionsHours.push(...exceptionsHours);

		return exceptionsHours;
	}

	async update(
		id: string,
		input: Partial<Partial<Omit<ExceptionsHoursInput, "calendarId">>>,
	): Promise<ExceptionsHours> {
		const exceptionHour = await this.findById(id);

		if (!exceptionHour) {
			throw new Error("Exception Hour not found!");
		}

		Object.entries(input).forEach(([key, value]) => {
			// Invoca o setter dinamicamente
			if (value && key in exceptionHour) {
				Reflect.set(exceptionHour, key, value);
			}
		});

		return exceptionHour;
	}
}
