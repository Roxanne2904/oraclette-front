import { defineStore } from "pinia";
import { router } from "@/router/index.js";
import { useUserStore } from "@/store/UserStore.js";
import { useAppStore } from "@/store/AppStore.js";
import { messageService } from "./service/messages";

export const useEventStore = defineStore("EventStore", {
	state: () => {
		return {
			currentEvent: null,
			error: null,
			events: [],
			eventMessages: [],
			totalEvents: 0,
			currentPage: 1,
			eventsPerPage: 5,
			lastMonthEventWinner: {},
			currentMonthEvents: [],
			maxLengthMsg: 1,
			status: null,
		};
	},
	actions: {
		/**
		 * @function fetchEvents
		 * @async
		 * @description Get the events.
		 * @param {number} page The page number.
		 * @param {number} eventsPerPage The number of events per page.
		 * @param {string} city The search string.
		 * @returns {Promise<void>}
		 * @throws {Error} The error message.
		 */
		async fetchEvents(page = 1, eventsPerPage = 5, city = "") {
			try {
				const userStore = useUserStore();

				const options = {
					headers: {
						"Content-Type": "application/json",
					},
				};

				if (userStore.getLoginStatus)
					options.headers.Authorization = `Bearer ${userStore.getAccessToken}`;

				const queryParans = new URLSearchParams({
					page,
					eventsPerPage,
					city,
				});

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/events?${queryParans}`,
					options
				);

				if (!response.ok) {
					console.error(response.message);
				} else {
					const {
						data: { events, totalEvents },
					} = await response.json();

					this.events = events;
					this.totalEvents = totalEvents;
					this.currentPage = page;
					this.eventsPerPage = eventsPerPage;
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		/**
		 * @function fetchContestEvents
		 * @async
		 * @description Get the contest events and the last month winner.
		 * @returns {Promise<void>}
		 * @throws {Error} The error message.
		 */
		async fetchContestEvents() {
			try {
				const userStore = useUserStore();

				const options = {
					headers: {
						"Content-Type": "application/json",
					},
				};

				if (userStore.getLoginStatus)
					options.headers.Authorization = `Bearer ${userStore.getAccessToken}`;

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/contest`,
					options
				);

				const {
					data: { currentMonthEvents },
				} = await response.json();

				this.currentMonthEvents = currentMonthEvents;
			} catch (error) {
				throw new Error(error);
			}
		},
		async getContestWinner() {
			try {
				const options = {
					headers: {
						"Content-Type": "application/json",
					},
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/contest/winner`,
					options
				);

				const {
					data: { lastMonthEventWinner },
				} = await response.json();

				this.lastMonthEventWinner = lastMonthEventWinner;
			} catch (error) {
				throw new Error(error);
			}
		},
		async likeAnEvent(eventId, alreadyLiked) {
			const userStore = useUserStore();

			const options = {
				method: alreadyLiked ? "DELETE" : "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userStore.getAccessToken}`,
				},
				body: JSON.stringify({ eventId }),
			};

			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/events/${eventId}/like`,
				options
			);

			if (!response.ok) {
				const appStore = useAppStore();

				const { message } = await response.json();

				appStore.setNotification(message, "error");
			} else {
				const currentEvent = this.currentMonthEvents.find(
					(event) => event.id === eventId
				);

				currentEvent.is_liked_by_user = !currentEvent.is_liked_by_user;
			}
		},
		/**
		 * @function getEvent
		 * @async
		 * @description Get specific event.
		 * @returns {Promise<void>}
		 * @throws {Error} Error.
		 */
		async getEvent(id) {
			try {
				const userStore = useUserStore();
				const isLogged = userStore.getLoginStatus;

				const options = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userStore.getAccessToken}`,
					},
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/events/${id}`,
					isLogged ? options : null
				);

				const { data } = await response.json();

				this.status = data.current_participant_status;
				this.currentEvent = data;
			} catch (error) {
				throw new Error(error);
			}
		},
		/**
		 * @function changePicture
		 * @async
		 * @description Adds a new picture.
		 * @param {string} url The picture's URL.
		 * @returns {Promise<void>}
		 * @throws {Error} Error.
		 */
		async changePicture(id, base64_picture) {
			try {
				const appStore = useAppStore();

				const options = {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						base64_picture,
					}),
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/events/${id}`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();

					this.error = message;
				} else {
					appStore.setNotification("Photo changée !", "success");

					router.go();
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		async joinEvent(eventId) {
			try {
				const userStore = useUserStore();
				const appStore = useAppStore();

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userStore.getAccessToken}`,
					},
					body: JSON.stringify({
						eventId,
					}),
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/eventManagement`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();

					this.error = message;
				} else {
					appStore.setNotification("Évènement rejoint !", "success");

					userStore.eventDetails.events.push(eventId);

					router.go();
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		async leaveEvent(eventId) {
			try {
				const userStore = useUserStore();
				const appStore = useAppStore();

				const options = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userStore.getAccessToken}`,
					},
					body: JSON.stringify({
						eventId,
					}),
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/eventManagement`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();
					this.error = message;
				} else {
					appStore.setNotification("Évènement quitté.", "success");

					router.go();
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		/**
		 * @function create
		 * @async
		 * @description Create a new event.
		 * @param {string} description Event description.
		 * @param {number} places Event places.
		 * @param {string} date Event date.
		 * @param {string} address Event address.
		 * @param {string} zipCode Event zip code.
		 * @param {string} city Event city.
		 * @returns {Promise<void>}
		 * @throws {Error} Error.
		 */
		async create(description, places, date, address, zipCode, city, gender) {
			try {
				const userStore = useUserStore();
				const appStore = useAppStore();

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userStore.getAccessToken}`,
					},
					body: JSON.stringify({
						description,
						adress: address,
						zip_code: zipCode,
						city,
						available_slot: places,
						date,
						gender,
					}),
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/events`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();

					this.error = message;
				} else {
					const { data } = await response.json();

					appStore.setNotification("Évènement créé avec succès", "success");

					userStore.eventDetails.events.push(data.id);

					router.push({
						name: "EventDetail",
						params: { id: data.id },
					});
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		async closeEvent(id) {
			try {
				const userStore = useUserStore();
				const appStore = useAppStore();

				const options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userStore.getAccessToken}`,
					},
					body: JSON.stringify({
						id,
					}),
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/events/${id}/close`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();

					this.error = message;
				} else {
					router.go();

					appStore.setNotification("L'évènement a été fermé.", "success");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		async acceptUser(eventId, userId) {
			try {
				const userStore = useUserStore();
				const appStore = useAppStore();

				const options = {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userStore.getAccessToken}`,
					},
					body: JSON.stringify({
						eventId,
						userId,
					}),
				};

				const response = await fetch(
					`${
						import.meta.env.VITE_API_URL
					}/eventManagement/${eventId}/accept/${userId}`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();

					this.error = message;
				} else {
					router.go();

					appStore.setNotification("Utilisateur ajouté !", "success");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		async refuseUser(eventId, userId) {
			try {
				const userStore = useUserStore();
				const appStore = useAppStore();

				const options = {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userStore.getAccessToken}`,
					},
				};

				const response = await fetch(
					`${
						import.meta.env.VITE_API_URL
					}/eventManagement/${eventId}/refuse/${userId}`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();

					this.error = message;
				} else {
					router.go();

					appStore.setNotification("Utilisateur refusé.", "success");

					router.go();
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		async banUser(eventId, userId) {
			try {
				const userStore = useUserStore();
				const appStore = useAppStore();

				const options = {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userStore.getAccessToken}`,
					},
					body: JSON.stringify({
						eventId,
						userId,
					}),
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/eventManagement/${eventId}/ban/${userId}`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();

					this.error = message;
					appStore.setNotification("L'utilisateur n'a pas pu être banni", "error");
				} else {
					appStore.setNotification("L'utilisateur a bien été banni.", "success");

					router.go();
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		async addMessage(eventId, message) {
			try {
				const appStore = useAppStore();
				const userStore = useUserStore();

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userStore.getAccessToken}`,
					},
					body: JSON.stringify({
						message,
					}),
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/messages/${eventId}`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();

					this.error = message;
					appStore.setNotification("Votre message n'a pas pu être ajouté", "error");
				}

				this.getMessages(eventId);
				appStore.setNotification("Votre message à été ajouté", "success");
			} catch (error) {
				throw new Error(error);
			}
		},
		async getMessages(eventId) {
			try {
				const userStore = useUserStore();
				const currentUserId = userStore.userDetails.id;

				const options = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userStore.getAccessToken}`,
					},
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/messages/${eventId}`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();
					this.error = message;
				}
				const { data } = await response.json();

				this.eventMessages = messageService(data, currentUserId);
			} catch (error) {
				throw new Error(error);
			}
		},
		async updateMessage(commentId, newMessage, eventId) {
			try {
				const appStore = useAppStore();
				const userStore = useUserStore();

				const options = {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userStore.getAccessToken}`,
					},
					body: JSON.stringify({
						message: newMessage,
					}),
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/messages/${commentId}`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();
					this.error = message;
					appStore.setNotification(
						"Votre message n'a pas pu être mis à jour",
						"error"
					);
				}

				this.getMessages(eventId);
				appStore.setNotification("Votre message a bien été mis à jour", "success");
			} catch (error) {
				throw new Error(error);
			}
		},
		async hideMessage(eventId, commentId) {
			try {
				const appStore = useAppStore();
				const userStore = useUserStore();

				const options = {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userStore.getAccessToken}`,
					},
					body: JSON.stringify({
						eventId,
						commentId,
					}),
				};

				const response = await fetch(
					`${
						import.meta.env.VITE_API_URL
					}/messages/${eventId}/${commentId}/disabled`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();

					this.error = message;
					appStore.setNotification("le message n'a pas pu être supprimé", "error");
				}

				this.getMessages(eventId);
				appStore.setNotification("Le message a été supprimé", "success");
			} catch (error) {
				throw new Error(error);
			}
		},
	},
	getters: {
		/**
		 * @function getErrorMessages
		 * @description Return the request error message.
		 * @returns {string} The request error message.
		 */
		getErrorMessages() {
			return this.error;
		},
		/**
		 * @function getEventsDetails
		 * @description Return the events details.
		 * @returns {Object} The events details.
		 */
		getEventsDetails() {
			return {
				events: this.events,
				totalEvents: this.totalEvents,
				currentPage: this.currentPage,
				eventsPerPage: this.eventsPerPage,
				status: this.status,
			};
		},
	},
});
