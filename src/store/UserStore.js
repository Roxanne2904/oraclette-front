import { router } from "@/router/index.js";
import { defineStore } from "pinia";
import { useAppStore } from "@/store/AppStore.js";
import { sanitizeInput } from "@/utils/helperFunctions.js";
import { userEventsService } from "./service/userEvent";

export const useUserStore = defineStore("UserStore", {
	state: () => {
		return {
			isLogged: false,
			error: null,
			accessToken: localStorage.getItem("accessToken"),
			userDetails: {
				id: null,
				firstName: "",
				lastName: "",
				gender: {
					title: "",
					value: "",
				},
				isAdmin: null,
			},
			eventDetails: {
				events: [],
				awaiting: [],
				totalEvents: 0,
				currentPage: 1,
				eventsPerPage: 5,
			},
		};
	},
	actions: {
		/**
		 * @function register
		 * @async
		 * @description Register a new user.
		 * @param {string} lastName User last name.
		 * @param {string} firstName User first name.
		 * @param {string} gender User gender.
		 * @param {string} dateOfBirth User date of birth.
		 * @param {string} email User email address.
		 * @param {string} password User password.
		 * @returns {Promise<void>}
		 * @throws {Error} The error message.
		 */
		async register(
			lastName,
			firstName,
			gender,
			dateOfBirth,
			email,
			password
		) {
			try {
				const appStore = useAppStore();

				const options = {
					method: "POST",

					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						lastname: sanitizeInput(lastName),
						firstname: sanitizeInput(firstName),
						birthdate: sanitizeInput(dateOfBirth),
						gender: sanitizeInput(gender),
						email: sanitizeInput(email),
						password: sanitizeInput(password),
					}),
				};

				const response = await fetch(
					`${
						import.meta.env.VITE_API_URL
					}/auth/signup`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();

					this.error = message;
				} else {
					const { data } = await response.json();

					this.isLogged = true;
					this.accessToken = data.accessToken;

					localStorage.setItem(
						"accessToken",
						data.access_token
					);

					appStore.setNotification(
						"Connexion réussie",
						"success"
					);

					router.push({ name: "Profile" });
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		/**
		 * @function authWithGoogle
		 * @description Login with Google.
		 * @returns {void}
		 */
		authWithGoogle(accessToken) {
			const appStore = useAppStore();

			this.isLogged = true;
			this.accessToken = accessToken;

			localStorage.setItem("accessToken", accessToken);

			appStore.setNotification("Connexion réussie", "success");

			router.push({ name: "Profile" });
		},
		/**
		 * @function login
		 * @async
		 * @description Login a new user.
		 * @param {string} email User email address.
		 * @param {string} password User password.
		 * @param {string} loginType User login type.
		 * @returns {Promise<void>}
		 * @throws {Error} The error message.
		 */
		async login(email, password, loginType = "local") {
			// FAIRE UN SECURE STORE
			try {
				const appStore = useAppStore();

				const options = {
					method: "POST",

					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
						loginType,
					}),
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/auth/login`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();

					this.error = message;
				} else {
					const { data } = await response.json();

					this.isLogged = true;
					this.accessToken = data.access_token;

					localStorage.setItem(
						"accessToken",
						data.access_token
					);

					appStore.setNotification(
						"Connexion réussie",
						"success"
					);

					router.push({ name: "Profile" });
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		/**
		 * @function logout
		 * @description Logout the user.
		 * @returns {void}
		 */
		logout() {
			localStorage.removeItem("accessToken");

			this.$reset();

			router.push({ name: "Home" });
		},
		/**
		 * @function update
		 * @async
		 * @description Update the user details.
		 * @param {string} firstName User first name.
		 * @param {string} lastName User last name.
		 * @param {string} gender User
		 * @returns {Promise<boolean>} If the update is successful.
		 * @throws {Error} The error message.
		 */
		async update(firstName, lastName, gender) {
			try {
				const appStore = useAppStore();

				const options = {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.accessToken}`,
					},
					body: JSON.stringify({
						firstname: firstName,
						lastname: lastName,
						gender,
					}),
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/users`,
					options
				);

				if (!response.ok) {
					if (response.status === 401) {
						this.fetchTokens();

						this.update(
							firstName,
							lastName,
							gender
						);
					} else {
						const { message } =
							await response.json();

						this.error = message;
					}
				} else {
					const { message } = await response.json();

					this.userDetails.firstName = firstName;
					this.userDetails.lastName = lastName;
					this.userDetails.gender = gender;

					appStore.setNotification(message, "success");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		/**
		 * @function fetchUserInfos
		 * @async
		 * @description Get the user details.
		 * @returns {Promise<void>}
		 * @throws {Error} The error message.
		 */
		async fetchUserInfos() {
			try {
				const appStore = useAppStore();

				const options = {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.accessToken}`,
					},
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/users`,
					options
				);

				if (!response.ok) {
					if (response.status === 401) {
						this.fetchTokens();
					} else {
						const { message } =
							await response.json();

						appStore.setNotification(
							message,
							"error"
						);
					}
				} else {
					const { data } = await response.json();

					const genders = [
						{
							title: "Homme",
							value: "male",
						},
						{
							title: "Femme",
							value: "female",
						},
						{
							title: "Autre",
							value: "nonbinary",
						},
					];

					this.userDetails = {
						id: data.id,
						firstName: data.firstname,
						lastName: data.lastname,
						gender: genders.find(
							({ value }) =>
								value === data.gender
						),
						isAdmin: data.is_admin,
					};

					this.fetchEvents();
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		/**
		 * @function fetchEvents
		 * @async
		 * @description Get the user events.
		 * @param {number} page The page number.
		 * @param {number} eventsPerPage The number of events per page.
		 * @returns {Promise<void>}
		 * @throws {Error} The error message.
		 */
		async fetchEvents(page = "", eventsPerPage = "") {
			try {
				const queryParams = new URLSearchParams({
					page,
					eventsPerPage,
				});

				const options = {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.accessToken}`,
					},
				};

				const response = await fetch(
					`${
						import.meta.env.VITE_API_URL
					}/users/events?${queryParams}`,
					options
				);

				if (!response.ok) {
					if (response.status === 401) {
						this.fetchTokens();

						this.fetchEvents(page, eventsPerPage);
					}
				} else {
					const {
						data: { events, totalEvents },
					} = await response.json();

					this.eventDetails.events =
						userEventsService.backToFront(
							events,
							this.userDetails.id
						);

					this.eventDetails.totalEvents = totalEvents;
					this.eventDetails.currentPage =
						page || this.eventDetails.currentPage;
					this.eventDetails.eventsPerPage =
						eventsPerPage ||
						this.eventDetails.eventsPerPage;
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		/**
		 * @function checkToken
		 * @description Check if the user has a token.
		 * @returns {void}
		 */
		async checkToken() {
			const accessToken = localStorage.getItem("accessToken");

			if (!accessToken) {
				this.isLogged = false;
				this.accessToken = "";
			} else {
				this.isLogged = true;
				this.accessToken = accessToken;

				await this.fetchUserInfos();
			}
		},
		/**
		 * @function fetchTokens
		 * @async
		 * @description Get new tokens.
		 * @returns {Promise<void>}
		 * @throws {Error} The error message.
		 */
		async fetchTokens() {
			try {
				const appStore = useAppStore();

				const options = {

					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.accessToken}`,
					},
				};

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/auth/token`,
					options
				);

				if (!response.ok) {
					const { message } = await response.json();

					appStore.setNotification(message, "error");

					localStorage.removeItem("accessToken");

					router.push({ name: "Home" });
				} else {
					const { data } = await response.json();

					this.accessToken = data.access_token;

					localStorage.setItem(
						"accessToken",
						data.access_token
					);
				}
			} catch (error) {
				throw new Error(error);
			}
		},
	},
	getters: {
		/**
		 * @function getLoginStatus
		 * @description Return the user login status.
		 * @returns {boolean} The user login status.
		 */
		getLoginStatus() {
			return this.isLogged;
		},
		/**
		 * @function getUserDetails
		 * @description Return the user details.
		 * @returns {object} The user details.
		 */
		getUserDetails() {
			return this.userDetails;
		},
		/**
		 * @function getAccessToken
		 * @description Return the request error message.
		 * @returns {string} The request error message.
		 */
		getErrorMessages() {
			return this.error;
		},
		/**
		 * @function getAccessToken
		 * @description Return the user access token.
		 * @returns {string} The user access token.
		 */
		getAccessToken() {
			return this.accessToken;
		},
		/**
		 * @function getEvents
		 * @description Return the user events.
		 * @returns {string} The user events.
		 */
		getEvents() {
			return this.events;
		},
		/**
		 * @function getEventDetails
		 * @description Return the user events details.
		 * @returns {string} The user events details.
		 */
		getEventDetails() {
			return this.eventDetails;
		},
	},
});
