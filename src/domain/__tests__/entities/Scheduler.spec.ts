import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Scheduler, type SchedulerAttributes } from "../../entities/Scheduler";

describe("Scheduler Entity", () => {
	const date = "2026-09-16";

	const baseAttributes: SchedulerAttributes = {
		calendarId: randomUUID(),
		participantId: randomUUID(),
		date: new Date(date),
		startHour: "14:00",
		endHour: "15:00",
	};

	describe("Basic Instantiation and Updates", () => {
		it("should be able to create a scheduler", () => {
			const scheduler = new Scheduler(baseAttributes);

			expect(scheduler).toBeTruthy();
			expect(scheduler).toBeInstanceOf(Scheduler);
		});

		it("should generate an id automatically when not provided", () => {
			const scheduler = new Scheduler(baseAttributes);

			expect(scheduler.id).toBeTruthy();
			expect(typeof scheduler.id).toBe("string");
		});

		it("should use the provided id when given", () => {
			const id = randomUUID();

			const scheduler = new Scheduler({ ...baseAttributes, id });

			expect(scheduler.id).toBe(id);
		});

		it("should be able to update calendarId", () => {
			const scheduler = new Scheduler(baseAttributes);
			const newCalendarId = randomUUID();

			scheduler.calendarId = newCalendarId;

			expect(scheduler.calendarId).toBe(newCalendarId);
		});

		it("should be able to update participantId", () => {
			const scheduler = new Scheduler(baseAttributes);
			const newParticipantId = randomUUID();

			scheduler.participantId = newParticipantId;

			expect(scheduler.participantId).toBe(newParticipantId);
		});

		it("should be able to update date", () => {
			const scheduler = new Scheduler(baseAttributes);
			const newDate = new Date("2026-09-17");

			scheduler.date = newDate;

			expect(scheduler.date).toBe(newDate);
		});
	});

	describe("Time-based Behavior & Timestamps", () => {
		const mockNow = new Date("2026-09-16T10:00:00.000Z");

		beforeEach(() => {
			vi.useFakeTimers();
			vi.setSystemTime(mockNow);
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it("should set createdAt and updatedAt to mock system time on creation", () => {
			const scheduler = new Scheduler(baseAttributes);

			expect(scheduler.createdAt).toEqual(mockNow);
			expect(scheduler.updatedAt).toEqual(mockNow);
		});

		it("should update updatedAt accurately when a property changes over time", () => {
			const scheduler = new Scheduler(baseAttributes);

			// Avança o tempo fake em 30 minutos (1.800.000 ms)
			vi.advanceTimersByTime(1000 * 60 * 30);

			scheduler.date = new Date("2026-09-18");

			const expectedUpdatedAt = new Date("2026-09-16T10:30:00.000Z");
			expect(scheduler.updatedAt).toEqual(expectedUpdatedAt);
		});

		it("should update updatedAt and set deletedAt accurately on soft delete", () => {
			const scheduler = new Scheduler(baseAttributes);

			// Avança o tempo em 15 minutos
			vi.advanceTimersByTime(1000 * 60 * 15);

			scheduler.delete();

			const expectedTime = new Date("2026-09-16T10:15:00.000Z");
			expect(scheduler.isDeleted).toBe(true);
			expect(scheduler.deletedAt).toEqual(expectedTime);
			expect(scheduler.updatedAt).toEqual(expectedTime);
		});

		it("should update updatedAt and clear deletedAt on restore", () => {
			const scheduler = new Scheduler(baseAttributes);

			scheduler.delete();

			// Avança mais 45 minutos após a exclusão
			vi.advanceTimersByTime(1000 * 60 * 45);

			scheduler.restore();

			const expectedRestoreTime = new Date("2026-09-16T10:45:00.000Z");
			expect(scheduler.isDeleted).toBe(false);
			expect(scheduler.deletedAt).toBeUndefined();
			expect(scheduler.updatedAt).toEqual(expectedRestoreTime);
		});
	});

	describe("Schedule Hours Validation", () => {
		it("should be able to update startHour when valid", () => {
			const scheduler = new Scheduler(baseAttributes);

			const newStartHour = "13:00";

			scheduler.startHour = newStartHour;

			expect(scheduler.startHour).toBe(newStartHour);
		});

		it("should be able to update endHour when valid", () => {
			const scheduler = new Scheduler(baseAttributes);

			const newEndHour = "16:00";

			scheduler.endHour = newEndHour;

			expect(scheduler.endHour).toBe(newEndHour);
		});

		it("should throw an error when endHour is equal to startHour on creation", () => {
			const sameHour = "10:00";

			expect(() => {
				new Scheduler({
					...baseAttributes,
					startHour: sameHour,
					endHour: sameHour,
				});
			}).toThrow("endHour must be greater than startHour.");
		});

		it("should throw an error when endHour is before startHour on creation", () => {
			const invalidStartHour = "11:00";
			const invalidEndHour = "10:00";

			expect(() => {
				new Scheduler({
					...baseAttributes,
					startHour: invalidStartHour,
					endHour: invalidEndHour,
				});
			}).toThrow("endHour must be greater than startHour.");
		});

		it("should throw an error when updating startHour equal to or past endHour", () => {
			const scheduler = new Scheduler(baseAttributes);
			const invalidStartHour = "16:00";

			expect(() => {
				scheduler.startHour = invalidStartHour;
			}).toThrow("endHour must be greater than startHour.");
		});

		it("should throw an error when updating endHour equal to or before startHour", () => {
			const scheduler = new Scheduler(baseAttributes);
			const invalidEndHour = "13:00";

			expect(() => {
				scheduler.endHour = invalidEndHour;
			}).toThrow("endHour must be greater than startHour.");
		});
	});
});
