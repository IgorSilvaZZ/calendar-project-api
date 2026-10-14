/** biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: <TEMPORARIO> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <TEMPORARIO> */
import type { CalendarInput } from "@domain/interfaces/CalendarInterface";
import type { CalendarRepository } from "@domain/repositories/CalendarRepository";
import type { UserRepository } from "@domain/repositories/UserRepository";

export class CreateCalendarUseCase {
	constructor(
		private readonly calendarRepository: CalendarRepository,
		private readonly userRepository: UserRepository,
	) {}

	public async execute(input: CalendarInput) {
		return null;
	}
}
