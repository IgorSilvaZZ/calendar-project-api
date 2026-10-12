import type { Calendar } from "@domain/entities/Calendar";
import type {
	CalendarInput,
	CalendarUpdateInput,
} from "@domain/interfaces/CalendarInterface";
import type { BaseRepository } from "./BaseRepository";

export interface CalendarRepository
	extends BaseRepository<Calendar, CalendarInput, CalendarUpdateInput> {
	findByCode(code: string): Promise<Calendar | null>;
}
