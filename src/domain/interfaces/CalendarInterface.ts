import type { CalendarAttributes } from "@domain/entities/Calendar";

export type CalendarInput = Omit<CalendarAttributes, "id">;

export type CalendarUpdateInput = {
	name: string;
};
