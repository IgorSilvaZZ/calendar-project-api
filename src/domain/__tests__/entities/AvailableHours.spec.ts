import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AvailableHours } from "../../entities/AvailableHours";
import {
	BASE_AVAILABLE_HOURS_ATTRIBUTES,
	UPDATE_AVAILABLE_HOURS_ATTRIBUTES,
} from "../fixtures/available-hours.fixture";

describe("AvailableHours Entity", () => {
	const mockNow = new Date("2026-09-16T10:00:00.000Z");

	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(mockNow);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe("Basic Instantiation and Updates", () => {
		it("should be able to create an available hours entity", () => {
			const availableHours = new AvailableHours(
				BASE_AVAILABLE_HOURS_ATTRIBUTES,
			);

			expect(availableHours).toBeTruthy();
			expect(availableHours).toBeInstanceOf(AvailableHours);
		});

		it("should generate an id automatically when not provided", () => {
			const availableHours = new AvailableHours(
				BASE_AVAILABLE_HOURS_ATTRIBUTES,
			);

			expect(availableHours.id).toBeTruthy();
			expect(typeof availableHours.id).toBe("string");
		});

		it("should use the provided id when given", () => {
			const id = randomUUID();

			const availableHours = new AvailableHours({
				...BASE_AVAILABLE_HOURS_ATTRIBUTES,
				id,
			});

			expect(availableHours.id).toBe(id);
		});

		it("should be able to update calendarId", () => {
			const availableHours = new AvailableHours(
				BASE_AVAILABLE_HOURS_ATTRIBUTES,
			);
			const newCalendarId = randomUUID();

			availableHours.calendarId = newCalendarId;

			expect(availableHours.calendarId).toBe(newCalendarId);
		});

		it("should be able to update weekDay", () => {
			const availableHours = new AvailableHours(
				BASE_AVAILABLE_HOURS_ATTRIBUTES,
			);
			const newWeekDay = 3;

			availableHours.weekDay = newWeekDay;

			expect(availableHours.weekDay).toBe(newWeekDay);
		});

		it("should be able to update startHour", () => {
			const availableHours = new AvailableHours(
				BASE_AVAILABLE_HOURS_ATTRIBUTES,
			);
			const newStartHour = UPDATE_AVAILABLE_HOURS_ATTRIBUTES.startHour!;

			availableHours.startHour = newStartHour;

			expect(availableHours.startHour).toBe(newStartHour);
		});

		it("should be able to update endHour", () => {
			const availableHours = new AvailableHours(
				BASE_AVAILABLE_HOURS_ATTRIBUTES,
			);
			const newEndHour = UPDATE_AVAILABLE_HOURS_ATTRIBUTES.endHour!;

			availableHours.endHour = newEndHour;

			expect(availableHours.endHour).toBe(newEndHour);
		});
	});

	describe("Time-based Behavior & Timestamps", () => {
		it("should set createdAt and updatedAt to mock system time on creation", () => {
			const availableHours = new AvailableHours(
				BASE_AVAILABLE_HOURS_ATTRIBUTES,
			);

			expect(availableHours.createdAt).toEqual(mockNow);
			expect(availableHours.updatedAt).toEqual(mockNow);
		});

		it("should update updatedAt accurately when a property changes over time", () => {
			const availableHours = new AvailableHours(
				BASE_AVAILABLE_HOURS_ATTRIBUTES,
			);

			// Avança o tempo fake em 30 minutos (1.800.000 ms)
			vi.advanceTimersByTime(1000 * 60 * 30);

			availableHours.weekDay = 2;

			const expectedUpdatedAt = new Date("2026-09-16T10:30:00.000Z");
			expect(availableHours.updatedAt).toEqual(expectedUpdatedAt);
		});

		it("should update updatedAt and set deletedAt accurately on soft delete", () => {
			const availableHours = new AvailableHours(
				BASE_AVAILABLE_HOURS_ATTRIBUTES,
			);

			// Avança o tempo em 15 minutos
			vi.advanceTimersByTime(1000 * 60 * 15);

			availableHours.delete();

			const expectedTime = new Date("2026-09-16T10:15:00.000Z");
			expect(availableHours.isDeleted).toBe(true);
			expect(availableHours.deletedAt).toEqual(expectedTime);
			expect(availableHours.updatedAt).toEqual(expectedTime);
		});

		it("should update updatedAt and clear deletedAt on restore", () => {
			const availableHours = new AvailableHours(
				BASE_AVAILABLE_HOURS_ATTRIBUTES,
			);

			availableHours.delete();

			// Avança mais 45 minutos após a exclusão
			vi.advanceTimersByTime(1000 * 60 * 45);

			availableHours.restore();

			const expectedRestoreTime = new Date("2026-09-16T10:45:00.000Z");
			expect(availableHours.isDeleted).toBe(false);
			expect(availableHours.deletedAt).toBeUndefined();
			expect(availableHours.updatedAt).toEqual(expectedRestoreTime);
		});
	});
});
