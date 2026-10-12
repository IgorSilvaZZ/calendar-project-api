import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { Calendar, type CalendarAttributes } from "../../entities/Calendar";

describe("Calendar Entity", () => {
	const calendarAttributes: CalendarAttributes = {
		name: "Work Calendar",
		code: "WORK-2026",
		timeZone: "America/Sao_Paulo",
		userId: randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date(),
		deletedAt: undefined as unknown as Date,
	};

	it("should be able to create a calendar", () => {
		const calendar = new Calendar(calendarAttributes);

		expect(calendar).toBeTruthy();
		expect(calendar).toBeInstanceOf(Calendar);
	});

	it("should generate an id automatically when not provided", () => {
		const calendar = new Calendar(calendarAttributes);

		expect(calendar.id).toBeTruthy();
		expect(typeof calendar.id).toBe("string");
	});

	it("should use the provided id when given", () => {
		const id = randomUUID();

		const calendar = new Calendar({ ...calendarAttributes, id });

		expect(calendar.id).toBe(id);
	});

	it("should set createdAt and updatedAt automatically when not provided", () => {
		const calendar = new Calendar({
			...calendarAttributes,
			createdAt: undefined as unknown as Date,
			updatedAt: undefined as unknown as Date,
		});

		expect(calendar.createdAt).toBeInstanceOf(Date);
		expect(calendar.updatedAt).toBeInstanceOf(Date);
	});

	it("should be able to update calendar name", () => {
		const calendar = new Calendar(calendarAttributes);

		const newName = "Personal Calendar";

		calendar.name = newName;

		expect(calendar.name).toBe(newName);
	});

	it("should be able to update calendar timeZone", () => {
		const calendar = new Calendar(calendarAttributes);

		const newTimeZone = "America/Toronto";

		calendar.timeZone = newTimeZone;

		expect(calendar.timeZone).toBe(newTimeZone);
	});

	it("should be able to update calendar code", () => {
		const calendar = new Calendar(calendarAttributes);

		const newCode = "PERS-2026";

		calendar.code = newCode;

		expect(calendar.code).toBe(newCode);
	});

	it("should be able to update calendar userId", () => {
		const calendar = new Calendar(calendarAttributes);

		const newUserId = randomUUID();

		calendar.userId = newUserId;

		expect(calendar.userId).toBe(newUserId);
	});

	it("should update updatedAt when any field is updated", async () => {
		const calendar = new Calendar(calendarAttributes);

		const previousUpdatedAt = calendar.updatedAt;

		await new Promise((resolve) => setTimeout(resolve, 10));

		calendar.name = "Another Calendar Name";

		expect(calendar.updatedAt.getTime()).toBeGreaterThan(
			previousUpdatedAt.getTime(),
		);
	});

	it("should be able to soft delete a calendar", () => {
		const calendar = new Calendar(calendarAttributes);

		expect(calendar.isDeleted).toBe(false);

		calendar.delete();

		expect(calendar.deletedAt).toBeInstanceOf(Date);
		expect(calendar.isDeleted).toBe(true);
	});

	it("should be able to restore a deleted calendar", () => {
		const calendar = new Calendar(calendarAttributes);

		calendar.delete();
		expect(calendar.isDeleted).toBe(true);

		calendar.restore();

		expect(calendar.deletedAt).toBeUndefined();
		expect(calendar.isDeleted).toBe(false);
	});

	it("should update updatedAt when calendar is deleted or restored", async () => {
		const calendar = new Calendar(calendarAttributes);

		const previousUpdatedAt = calendar.updatedAt;

		await new Promise((resolve) => setTimeout(resolve, 10));

		calendar.delete();

		expect(calendar.updatedAt.getTime()).toBeGreaterThan(
			previousUpdatedAt.getTime(),
		);
	});
});
