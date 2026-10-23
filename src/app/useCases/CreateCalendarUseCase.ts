import { AppErrors } from "@app/shared/AppErrors";
import {
	DUPLICATE_MESSAGE_ERROR,
	MAX_ATTEMPTS_CREATE_CALENDAR_CODE,
} from "@app/shared/CalendarConsts";
import { CalendarUtils } from "@app/shared/CalendarUtils";
import { USER_NOT_FOUND_MESSAGE } from "@app/shared/UserConsts";
import type { Calendar } from "@domain/entities/Calendar";
import type {
	CalendarInput,
	CreateCalendarInput,
} from "@domain/interfaces/CalendarInterface";
import type { AvailableHoursRepository } from "@domain/repositories/AvailableHoursRepository";
import type { CalendarRepository } from "@domain/repositories/CalendarRepository";
import type { ExceptionsHoursRepository } from "@domain/repositories/ExceptionsHoursRepository";
import type { UserRepository } from "@domain/repositories/UserRepository";

export class CreateCalendarUseCase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly calendarRepository: CalendarRepository,
		private readonly availableHoursRepository: AvailableHoursRepository,
		private readonly exceptionsHoursRepository: ExceptionsHoursRepository,
	) {}

	/* Utilizando retry ja contando que o code vai ser UNIQUE no banco de dados */
	private async retryGenerateCode(
		input: Omit<CalendarInput, "code">,
	): Promise<Calendar> {
		for (let i = 0; i < MAX_ATTEMPTS_CREATE_CALENDAR_CODE; i++) {
			const code = CalendarUtils.generatedCode();

			try {
				return await this.calendarRepository.create({ ...input, code });
			} catch (error) {
				if (
					!(error instanceof AppErrors) ||
					error.message !== DUPLICATE_MESSAGE_ERROR
				) {
					throw error;
				}
			}
		}

		throw new AppErrors(DUPLICATE_MESSAGE_ERROR, 400);
	}

	/* 
		Passos para criar um calendario:
		- Usuario deve existir [X]
		- Validar se o codigo alfa numerico existe cadastrado caso existir criar um novo e realizar a mesma validação [X]
		- Criar os horarios disponiveis [X]
		- Criar Exceções [X]
		- Cuidados
			- Race condition de verificações/criação de codigo unico para o calendario [X]
				- Criar testes unitarios e criar casos para testar isso
	*/

	public async execute(input: CreateCalendarInput) {
		const user = await this.userRepository.findById(input.userId);

		if (!user) {
			throw new AppErrors(USER_NOT_FOUND_MESSAGE, 404);
		}

		const calendar = await this.retryGenerateCode({
			name: input.name,
			timeZone: input.timeZone,
			userId: input.userId,
		});

		const availableHours = input.availableHours.map((item) => ({
			...item,
			calendarId: calendar.id,
		}));

		const exceptionsHours = input.exceptionsHours?.map((item) => ({
			...item,
			calendarId: calendar.id,
		}));

		await Promise.all([
			this.availableHoursRepository.createMany(availableHours),
			this.exceptionsHoursRepository.createMany(exceptionsHours ?? []),
		]);

		return {
			calendar,
			availableHours,
			...(exceptionsHours && {
				exceptionsHours,
			}),
		};
	}
}
