import { messageService } from "@/store/service/messages";
import { expect, test, describe } from "vitest";

describe("On messageService...", () => {
	test("...data should be formatted from Back to Front correctly", () => {
		const mockMsg = [
			{
				createdAt: new Date().toISOString(),
				disabled: false,
				event: { id: 11, user_id: 6 },
				event_id: 11,
				id: 1,
				message: "Je suis un message",
				updatedAt: new Date().toISOString(),
				user: {
					birthdate: "1994-06-29",
					email: "moi@mail.fr",
					firstname: "John",
					gender: "male",
					id: 6,
					is_admin: true,
					lastname: "Doe",
				},
				user_id: 6,
			},
		];
		const msg = mockMsg[0];
		const currentUserId = 6;

		const isItMyMessage = currentUserId === msg.user_id;
		const canIDelete = currentUserId === msg.event.user_id;

		const createAtTimestamp = new Date(msg.createdAt).getTime();
		const updatedAtTimestamp = new Date(msg.updatedAt).getTime();

		const expectedResultData = {
			createdAt: new Date(msg.createdAt).toLocaleDateString(),
			disabled: msg.disabled,
			eventId: msg.event.id,
			id: msg.id,
			message: msg.message,
			updatedAt: new Date(msg.updatedAt).toLocaleDateString(),
			writedBy: currentUserId === msg.user_id ? "Vous" : "Nom Prénom",
			isItMyMessage,
			canIDelete,
			eventCreator: msg.event.user_id,
			hasBeenUpdated: createAtTimestamp !== updatedAtTimestamp,
		};

		const result = messageService(mockMsg, currentUserId)[0];

		expect(result).toEqual(expectedResultData);
		expect(result.message).toBe("Je suis un message");
	});

	describe("...Given I'm NOT creator of this event...", () => {
		describe("...and I'm message owner", () => {
			test(" it sould return `Vous` for `writedBy`, isItMyMessage is truthy and canIDelete is falsy", () => {
				const mockMsg = [
					{
						createdAt: new Date().toISOString(),
						disabled: false,
						event: { id: 11, user_id: 5 },
						event_id: 11,
						id: 2,
						message: "je suis un message",
						updatedAt: new Date().toISOString(),
						user: {
							birthdate: "1994-06-29",
							email: "moi@mail.fr",
							firstname: "John",
							gender: "male",
							id: 6,
							is_admin: true,
							lastname: "Doe",
						},
						user_id: 6,
					},
				];
				const currentUserId = 6;

				const writedBy = "Vous";

				const result01 = messageService(mockMsg, currentUserId)[0].writedBy;
				const result02 = messageService(mockMsg, currentUserId)[0].isItMyMessage;
				const result03 = messageService(mockMsg, currentUserId)[0].canIDelete;

				expect(result01).toEqual(writedBy);
				expect(result02).toBeTruthy();
				expect(result03).toBeFalsy();
			});
		});
		describe("...and I'm NOT message owner", () => {
			test(" it sould return `Doe John` for `writedBy`, isItMyMessage and canIDelete are false", () => {
				const mockMsg = [
					{
						createdAt: new Date().toISOString(),
						disabled: false,
						event: { id: 11, user_id: 5 },
						event_id: 11,
						id: 3,
						message: "je suis un message",
						updatedAt: new Date().toISOString(),
						user: {
							birthdate: "1994-06-29",
							email: "moi@mail.fr",
							firstname: "John",
							gender: "male",
							id: 8,
							is_admin: true,
							lastname: "Doe",
						},
						user_id: 8,
					},
				];
				const currentUserId = 6;

				const writedBy = "Doe John";

				const result01 = messageService(mockMsg, currentUserId)[0].writedBy;
				const result02 = messageService(mockMsg, currentUserId)[0].isItMyMessage;
				const result03 = messageService(mockMsg, currentUserId)[0].canIDelete;

				expect(result01).toBe(writedBy);
				expect(result02).toBeFalsy();
				expect(result03).toBeFalsy();
			});
		});
	});
	describe("...Given I am creator of this event ...", () => {
		describe("...and I'm message owner", () => {
			test(" it sould return `vous` for `writedBy`, isItMyMessage and canIDelete are truthy", () => {
				const mockMsg = [
					{
						createdAt: new Date().toISOString(),
						disabled: false,
						event: { id: 11, user_id: 6 },
						event_id: 11,
						id: 4,
						message: "je suis un message",
						updatedAt: new Date().toISOString(),
						user: {
							birthdate: "1994-06-29",
							email: "moi@mail.fr",
							firstname: "John",
							gender: "male",
							id: 6,
							is_admin: true,
							lastname: "Doe",
						},
						user_id: 6,
					},
				];
				const currentUserId = 6;

				const writedBy = "Vous";

				const result01 = messageService(mockMsg, currentUserId)[0].writedBy;
				const result02 = messageService(mockMsg, currentUserId)[0].isItMyMessage;
				const result03 = messageService(mockMsg, currentUserId)[0].canIDelete;

				expect(result01).toEqual(writedBy);
				expect(result02).toBeTruthy();
				expect(result03).toBeTruthy();
			});
		});
		describe("...and I'm not message owner", () => {
			test("it sould return `Doe John` for `writedBy`, isItMyMessage is Falsy and canIDelete is truthy", () => {
				const mockMsg = [
					{
						createdAt: new Date().toISOString(),
						disabled: false,
						event: { id: 11, user_id: 5 },
						event_id: 11,
						id: 5,
						message: "je suis un message",
						updatedAt: new Date().toISOString(),
						user: {
							birthdate: "1994-06-29",
							email: "moi@mail.fr",
							firstname: "John",
							gender: "male",
							id: 8,
							is_admin: true,
							lastname: "Doe",
						},
						user_id: 8,
					},
				];
				const currentUserId = 5;

				const writedBy = "Doe John";

				const result01 = messageService(mockMsg, currentUserId)[0].writedBy;
				const result02 = messageService(mockMsg, currentUserId)[0].isItMyMessage;
				const result03 = messageService(mockMsg, currentUserId)[0].canIDelete;

				expect(result01).toBe(writedBy);
				expect(result02).toBeFalsy();
				expect(result03).toBeTruthy();
			});
		});
	});
});
