import { randomUUID } from "node:crypto";
import {
	AvailableHours,
	type AvailableHoursAttributes,
} from "@domain/entities/AvailableHours";
import type { AvailableHoursInput } from "@domain/interfaces/AvailableHoursInterface";
import type { AvailableHoursRepository } from "@domain/repositories/AvailableHoursRepository";

export class AvailableHoursInMemory implements AvailableHoursRepository {
	public availableHours: AvailableHours[] = [];

	private getActivitiesAvailableHours(): AvailableHours[] {
		return this.availableHours.filter((item) => !item.deletedAt);
	}

	async findById(id: string): Promise<AvailableHours | null> {
		return (
			this.getActivitiesAvailableHours().find((item) => item.id === id) ?? null
		);
	}

	async findAll(): Promise<AvailableHours[]> {
		return this.getActivitiesAvailableHours();
	}

	async create(input: AvailableHoursInput): Promise<AvailableHours> {
		const data: AvailableHoursAttributes = {
			id: randomUUID(),
			...input,
		};

		const availableHour = new AvailableHours(data);

		this.availableHours.push(availableHour);

		return availableHour;
	}

	async createMany(input: AvailableHoursInput[]): Promise<AvailableHours[]> {
		const availableHours = input.map(
			(item) => new AvailableHours({ id: randomUUID(), ...item }),
		);

		this.availableHours.push(...availableHours);

		return availableHours;
	}

	async update(
		id: string,
		input: Partial<AvailableHoursInput>,
	): Promise<AvailableHours> {
		const availableHour = await this.findById(id);

		if (!availableHour) {
			throw new Error("Available Hour not found!");
		}

		Object.entries(input).forEach(([key, value]) => {
			// Invoca o setter dinamicamente
			if (value && key in availableHour) {
				Reflect.set(availableHour, key, value);
			}
		});

		return availableHour;
	}
}
