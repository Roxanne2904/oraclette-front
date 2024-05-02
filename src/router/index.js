import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/UserStore";
import { useEventStore } from "@/store/EventStore";

const routes = [
	{
		path: "/",
		component: () => import("@/layouts/DefaultLayout.vue"),
		children: [
			{
				path: "",
				name: "Home",
				meta: {
					frenchName: "Accueil",
				},
				beforeEnter: async (to, from, next) => {
					const eventStore = useEventStore();
					await eventStore.getContestWinner();
					next();
				},
				component: () => import("@/views/HomeView.vue"),
			},
			{
				path: "about",
				name: "About",
				meta: {
					frenchName: "À propos",
				},
				component: () => import("@/views/AboutView.vue"),
			},
			{
				path: "register",
				name: "Register",
				meta: {
					frenchName: "Inscription",
				},
				beforeEnter: (to, from, next) => {
					const userStore = useUserStore();

					if (!userStore.getLoginStatus) {
						next();
					} else {
						next({ name: "Profile" });
					}
				},
				component: () => import("@/views/authentication/RegisterView.vue"),
			},
			{
				path: "login",
				name: "Login",
				meta: {
					frenchName: "Connexion",
				},
				beforeEnter: (to, from, next) => {
					const userStore = useUserStore();

					if (!userStore.getLoginStatus) {
						next();
					} else {
						next({ name: "Profile" });
					}
				},
				component: () => import("@/views/authentication/LoginView.vue"),
			},
			{
				path: "forgot-password",
				name: "ForgotPassword",
				meta: {
					frenchName: "Récupération de compte",
				},
				component: () => import("@/views/authentication/ForgotPasswordView.vue"),
			},
			{
				path: "profil",
				name: "Profile",
				meta: {
					frenchName: "Profil",
				},
				beforeEnter: (to, from, next) => {
					const userStore = useUserStore();

					if (userStore.getLoginStatus) {
						next();
					} else {
						userStore.fetchUserInfos();

						next({ name: "Login" });
					}
				},
				component: () => import("@/views/ProfileView.vue"),
			},
			{
				path: "contact",
				name: "Contact",
				meta: {
					frenchName: "Contact",
				},
				component: () => import("@/views/ContactView.vue"),
			},
			{
				path: "legal-notices",
				name: "LegalNotices",
				meta: {
					frenchName: "Mentions Légales",
				},
				component: () => import("@/views/LegalNoticesView.vue"),
			},
		],
	},
	{
		path: "/events",
		component: () => import("@/layouts/DefaultLayout.vue"),
		children: [
			{
				path: "",
				name: "Events",
				meta: {
					frenchName: "Événements",
				},
				beforeEnter: (to, from, next) => {
					const eventStore = useEventStore();
					eventStore.fetchEvents();
					next();
				},
				component: () => import("@/views/events/EventsView.vue"),
			},
			{
				path: ":id",
				name: "EventDetail",
				meta: {
					frenchName: "Détail d'événement",
				},
				beforeEnter: async (to, from, next) => {
					const eventStore = useEventStore();
					const userStore = useUserStore();

					if (!userStore.getLoginStatus) next({ name: "Login" });

					try {
						await eventStore.getEvent(to.params.id);
					} catch (error) {
						throw new Error(error.toString());
					}

					next();
				},
				component: () => import("@/views/events/EventDetailView.vue"),
			},
			{
				path: ":id/chat",
				name: "EventChat",
				meta: {
					frenchName: "Discussion de l'événement",
				},
				beforeEnter: async (to, from, next) => {
					const eventStore = useEventStore();
					const userStore = useUserStore();

					if (!userStore.getLoginStatus) next({ name: "Login" });

					try {
						await eventStore.getEvent(to.params.id);
					} catch (error) {
						throw new Error(error.toString());
					}
					next();
				},
				component: () => import("@/views/events/EventChatView.vue"),
			},
			{
				path: "create",
				name: "EventCreation",
				meta: {
					frenchName: "Création d'événement",
				},
				beforeEnter: (to, from, next) => {
					const userStore = useUserStore();

					if (userStore.getLoginStatus) {
						next();
					} else {
						next({ name: "Login" });
					}
				},
				component: () => import("@/views/events/EventCreationView.vue"),
			},
		],
	},
	{
		path: "/:catchAll(.*)",
		component: () => import("@/layouts/DefaultLayout.vue"),
		children: [
			{
				path: "",
				name: "NotFound",
				meta: {
					frenchName: "404",
				},
				component: () => import("@/views/errors/NotFoundView.vue"),
			},
		],
	},
];

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior() {
		return { top: 0 };
	},
});

router.beforeEach(() => {
	const userStore = useUserStore();
	userStore.checkToken();
});

router.onError((error, to) => {
	if (error.message.includes("Failed to fetch dynamically imported module")) {
		window.location = to.fullPath;
	}
});
