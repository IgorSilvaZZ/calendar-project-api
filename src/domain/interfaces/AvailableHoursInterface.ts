export type AvailableHoursInput = {
	calendarId: string;
	weekDay: number;
	startHour: string;
	endHour: string;
};

export type AvailableHoursUpdateInput = Partial<
	Omit<AvailableHoursInput, "calendarId">
>;
