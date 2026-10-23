import type { AvailableHoursInput } from "./AvailableHoursInterface";
import type { ExceptionsHoursInput } from "./ExceptionsHours.interface";

export type CalendarInput = {
	name: string;
	userId: string;
	timeZone: string;
	code: string;
};

export type CreateCalendarInput = CalendarInput & {
	availableHours: Omit<AvailableHoursInput, "calendarId">[];
	exceptionsHours?: Omit<ExceptionsHoursInput, "calendarId">[];
};

export type CalendarUpdateInput = {
	name?: string;
};
