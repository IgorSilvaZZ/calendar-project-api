import type { ExceptionsHours } from "@domain/entities/ExceptionsHours";
import type {
	ExceptionsHoursInput,
	ExceptionsHoursUpdateInput,
} from "@domain/interfaces/ExceptionsHours.interface";
import type { BaseRepository } from "./BaseRepository";

export interface ExceptionsHoursRepository
	extends BaseRepository<
		ExceptionsHours,
		ExceptionsHoursInput,
		ExceptionsHoursUpdateInput
	> {
	createMany(input: ExceptionsHoursInput[]): Promise<ExceptionsHours[]>;
}
