import { randomUUID } from "node:crypto";
import type { AvailableHoursAttributes } from "@domain/entities/AvailableHours";

export const BASE_AVAILABLE_HOURS_ATTRIBUTES: Readonly<AvailableHoursAttributes> =
	Object.freeze({
		calendarId: randomUUID(),
		weekDay: 1, // Segunda-feira
		startHour: "08:00",
		endHour: "18:00",
	});

export const ANOTHER_AVAILABLE_HOURS_ATTRIBUTES: Readonly<AvailableHoursAttributes> =
	Object.freeze({
		...BASE_AVAILABLE_HOURS_ATTRIBUTES,
		weekDay: 2, // Terça-feira
		startHour: "09:00",
		endHour: "17:00",
	});

export const UPDATE_AVAILABLE_HOURS_ATTRIBUTES: Partial<AvailableHoursAttributes> =
	Object.freeze({
		startHour: "10:00",
		endHour: "19:00",
	});
