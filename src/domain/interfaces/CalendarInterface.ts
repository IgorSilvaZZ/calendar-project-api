export type CalendarInput = {
	name: string;
	userId: string;
	timeZone: string;
	availableHours: string[];
};

export type CalendarUpdateInput = {
	name?: string;
};
