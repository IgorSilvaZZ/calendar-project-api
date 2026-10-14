import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ExceptionsHours } from "../../entities/ExceptionsHours";
import {
	BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
	UPDATE_EXCEPTIONS_HOURS_ATTRIBUTES,
} from "../fixtures/exceptions-hours.fixture";

describe("ExceptionsHours Entity", () => {
	const mockNow = new Date("2026-09-16T10:00:00.000Z");

	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(mockNow);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe("Basic Instantiation and Updates", () => {
		it("should be able to create an exceptions hours entity", () => {
			const exceptionsHours = new ExceptionsHours(
				BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
			);

			expect(exceptionsHours).toBeTruthy();
			expect(exceptionsHours).toBeInstanceOf(ExceptionsHours);
		});

		it("should generate an id automatically when not provided", () => {
			const exceptionsHours = new ExceptionsHours(
				BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
			);

			expect(exceptionsHours.id).toBeTruthy();
			expect(typeof exceptionsHours.id).toBe("string");
		});

		it("should use the provided id when given", () => {
			const id = randomUUID();

			const exceptionsHours = new ExceptionsHours({
				...BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
				id,
			});

			expect(exceptionsHours.id).toBe(id);
		});

		it("should be able to update calendarId", () => {
			const exceptionsHours = new ExceptionsHours(
				BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
			);
			const newCalendarId = randomUUID();

			exceptionsHours.calendarId = newCalendarId;

			expect(exceptionsHours.calendarId).toBe(newCalendarId);
		});

		it("should be able to update date", () => {
			const exceptionsHours = new ExceptionsHours(
				BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
			);
			const newDate = new Date("2026-09-17");

			exceptionsHours.date = newDate;

			expect(exceptionsHours.date).toBe(newDate);
		});

		it("should be able to update action", () => {
			const exceptionsHours = new ExceptionsHours(
				BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
			);
			const newAction = UPDATE_EXCEPTIONS_HOURS_ATTRIBUTES.action!;

			exceptionsHours.action = newAction;

			expect(exceptionsHours.action).toBe(newAction);
		});

		it("should be able to update startHour when valid", () => {
			const exceptionsHours = new ExceptionsHours(
				BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
			);
			const newStartHour = UPDATE_EXCEPTIONS_HOURS_ATTRIBUTES.startHour!;

			exceptionsHours.startHour = newStartHour;

			expect(exceptionsHours.startHour).toBe(newStartHour);
		});

		it("should be able to update endHour when valid", () => {
			const exceptionsHours = new ExceptionsHours(
				BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
			);
			const newEndHour = UPDATE_EXCEPTIONS_HOURS_ATTRIBUTES.endHour!;

			exceptionsHours.hourEnd = newEndHour;

			expect(exceptionsHours.endHour).toBe(newEndHour);
		});
	});

	describe("Time-based Behavior & Timestamps", () => {
		it("should set createdAt and updatedAt to mock system time on creation", () => {
			const exceptionsHours = new ExceptionsHours(
				BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
			);

			expect(exceptionsHours.createdAt).toEqual(mockNow);
			expect(exceptionsHours.updatedAt).toEqual(mockNow);
		});

		it("should update updatedAt accurately when a property changes over time", () => {
			const exceptionsHours = new ExceptionsHours(
				BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
			);

			// Avança o tempo fake em 30 minutos (1.800.000 ms)
			vi.advanceTimersByTime(1000 * 60 * 30);

			exceptionsHours.action = "open";

			const expectedUpdatedAt = new Date("2026-09-16T10:30:00.000Z");
			expect(exceptionsHours.updatedAt).toEqual(expectedUpdatedAt);
		});

		it("should update updatedAt and set deletedAt accurately on soft delete", () => {
			const exceptionsHours = new ExceptionsHours(
				BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
			);

			// Avança o tempo em 15 minutos
			vi.advanceTimersByTime(1000 * 60 * 15);

			exceptionsHours.delete();

			const expectedTime = new Date("2026-09-16T10:15:00.000Z");
			expect(exceptionsHours.isDeleted).toBe(true);
			expect(exceptionsHours.deletedAt).toEqual(expectedTime);
			expect(exceptionsHours.updatedAt).toEqual(expectedTime);
		});

		it("should update updatedAt and clear deletedAt on restore", () => {
			const exceptionsHours = new ExceptionsHours(
				BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
			);

			exceptionsHours.delete();

			// Avança mais 45 minutos após a exclusão
			vi.advanceTimersByTime(1000 * 60 * 45);

			exceptionsHours.restore();

			const expectedRestoreTime = new Date("2026-09-16T10:45:00.000Z");
			expect(exceptionsHours.isDeleted).toBe(false);
			expect(exceptionsHours.deletedAt).toBeUndefined();
			expect(exceptionsHours.updatedAt).toEqual(expectedRestoreTime);
		});
	});

	describe("Domain Validations", () => {
		it("should throw an error when endHour is equal to startHour on creation", () => {
			const sameHour = "10:00";

			expect(() => {
				new ExceptionsHours({
					...BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
					startHour: sameHour,
					endHour: sameHour,
				});
			}).toThrow("hourEnd must be greater than startHour.");
		});

		it("should throw an error when endHour is before startHour on creation", () => {
			const invalidStartHour = "11:00";
			const invalidEndHour = "10:00";

			expect(() => {
				new ExceptionsHours({
					...BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
					startHour: invalidStartHour,
					endHour: invalidEndHour,
				});
			}).toThrow("hourEnd must be greater than startHour.");
		});

		it("should throw an error when updating startHour equal to or past endHour", () => {
			const exceptionsHours = new ExceptionsHours(
				BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
			);
			const invalidStartHour = "17:00";

			expect(() => {
				exceptionsHours.startHour = invalidStartHour;
			}).toThrow("hourEnd must be greater than startHour.");
		});

		it("should throw an error when updating endHour equal to or before startHour", () => {
			const exceptionsHours = new ExceptionsHours(
				BASE_EXCEPTIONS_HOURS_ATTRIBUTES,
			);
			const invalidEndHour = "09:00";

			expect(() => {
				exceptionsHours.hourEnd = invalidEndHour;
			}).toThrow("hourEnd must be greater than startHour.");
		});
	});
});
