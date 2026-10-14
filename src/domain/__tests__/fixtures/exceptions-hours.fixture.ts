import { randomUUID } from "node:crypto";
import type { ExceptionsHoursAttributes } from "@domain/entities/ExceptionsHours";

export const BASE_EXCEPTIONS_HOURS_ATTRIBUTES: Readonly<ExceptionsHoursAttributes> =
	Object.freeze({
		calendarId: randomUUID(),
		date: new Date("2026-09-16"),
		startHour: "09:00",
		endHour: "17:00",
		action: "block",
	});

export const ANOTHER_EXCEPTIONS_HOURS_ATTRIBUTES: Readonly<ExceptionsHoursAttributes> =
	Object.freeze({
		...BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
		startHour: "13:00",
		endHour: "14:00",
		action: "open",
	});

export const UPDATE_EXCEPTIONS_HOURS_ATTRIBUTES: Partial<ExceptionsHoursAttributes> =
	Object.freeze({
		action: "open",
		startHour: "10:00",
		endHour: "16:00",
	});
