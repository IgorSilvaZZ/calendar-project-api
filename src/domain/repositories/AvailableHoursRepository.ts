import type { AvailableHours } from "@domain/entities/AvailableHours";
import type {
	AvailableHoursInput,
	AvailableHoursUpdateInput,
} from "@domain/interfaces/AvailableHoursInterface";
import type { BaseRepository } from "./BaseRepository";

export interface AvailableHoursRepository
	extends BaseRepository<
		AvailableHours,
		AvailableHoursInput,
		AvailableHoursUpdateInput
	> {
	createMany(input: AvailableHoursInput[]): Promise<AvailableHours[]>;
}
