import type { AvailableHours } from "@domain/entities/AvailableHours";
import type { AvailableHoursInput } from "@domain/interfaces/AvailableHoursInterface";
import type { BaseRepository } from "./BaseRepository";

export interface AvailableHoursRepository
	extends BaseRepository<AvailableHours, AvailableHoursInput> {
	createMany(input: AvailableHoursInput[]): Promise<AvailableHours[]>;
}
