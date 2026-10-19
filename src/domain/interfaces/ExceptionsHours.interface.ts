export type ExceptionsHoursInput = {
	date: Date;
	startHour: string;
	endHour: string;
	action: string;
	calendarId: string;
};

export type ExceptionsHoursUpdateInput = Partial<
	Omit<ExceptionsHoursInput, "calendarId">
>;
