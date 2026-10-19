/** biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: <TEMPORARIO> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <TEMPORARIO> */
import type { CalendarInput } from "@domain/interfaces/CalendarInterface";
import type { AvailableHoursRepository } from "@domain/repositories/AvailableHoursRepository";
import type { CalendarRepository } from "@domain/repositories/CalendarRepository";
import type { UserRepository } from "@domain/repositories/UserRepository";

export class CreateCalendarUseCase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly availableHoursRepository: AvailableHoursRepository,
		private readonly calendarRepository: CalendarRepository,
	) {}

	/* 
		Passos para criar um calendario:
		- Usuario deve existir
		- Validar se o codigo alfa numerico existe cadastrado caso existir criar um novo e realizar a mesma validação
		- Criar os horarios disponiveis
		- Criar Exceções
	*/

	public async execute(input: CalendarInput) {
		return null;
	}
}
