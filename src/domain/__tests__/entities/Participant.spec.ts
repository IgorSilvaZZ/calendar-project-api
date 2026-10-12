import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
	Participant,
	type ParticipantAttributes,
} from "../../entities/Participant";

describe("Participant Entity", () => {
	const participantAttributes: ParticipantAttributes = {
		name: "Participant Test",
		email: "participant@test.com",
		celPhone: "11988888888",
		calendarId: randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	it("should be able to create a participant", () => {
		const participant = new Participant(participantAttributes);

		expect(participant).toBeTruthy();
		expect(participant).toBeInstanceOf(Participant);
		expect(participant.email).toBe(participantAttributes.email);
	});

	it("should generate an id automatically when not provided", () => {
		const participant = new Participant(participantAttributes);

		expect(participant.id).toBeTruthy();
		expect(typeof participant.id).toBe("string");
	});

	it("should use the provided id when given", () => {
		const id = randomUUID();

		const participant = new Participant({ ...participantAttributes, id });

		expect(participant.id).toBe(id);
	});

	it("should set createdAt and updatedAt automatically when not provided", () => {
		const participant = new Participant({
			...participantAttributes,
			createdAt: undefined as unknown as Date,
			updatedAt: undefined as unknown as Date,
		});

		expect(participant.createdAt).toBeInstanceOf(Date);
		expect(participant.updatedAt).toBeInstanceOf(Date);
	});

	it("should be able to update participant name", () => {
		const participant = new Participant(participantAttributes);

		const newName = "New Participant Name";

		participant.name = newName;

		expect(participant.name).toBe(newName);
	});

	it("should be able to update participant email", () => {
		const participant = new Participant(participantAttributes);

		const newEmail = "new-participant@test.com";

		participant.email = newEmail;

		expect(participant.email).toBe(newEmail);
	});

	it("should be able to update participant cellPhone", () => {
		const participant = new Participant(participantAttributes);

		const newCellPhone = "11977777777";

		participant.cellPhone = newCellPhone;

		expect(participant.cellPhone).toBe(newCellPhone);
	});

	it("should be able to update participant calendarId", () => {
		const participant = new Participant(participantAttributes);

		const newCalendarId = randomUUID();

		participant.calendarId = newCalendarId;

		expect(participant.calendarId).toBe(newCalendarId);
	});

	it("should update updatedAt when any field is updated", async () => {
		const participant = new Participant(participantAttributes);

		const previousUpdatedAt = participant.updatedAt;

		await new Promise((resolve) => setTimeout(resolve, 10));

		participant.email = "another-email@test.com";

		expect(participant.updatedAt.getTime()).toBeGreaterThan(
			previousUpdatedAt.getTime(),
		);
	});
});
