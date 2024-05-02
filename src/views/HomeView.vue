<script setup>
import { ref, watchEffect, toRefs } from "vue";

import { useUserStore } from "@/store/UserStore.js";
import { useEventStore } from "@/store/EventStore.js";
import AboutSection from "@/views/homeView/AboutSection.vue";
import SignInInvitationSection from "@/views/homeView/SignInInvitationSection.vue";
import MonthPictureSection from "@/views/homeView/MonthPictureSection.vue";
import EventSection from "@/views/homeView/EventSection.vue";
import BannerSection from "@/views/homeView/BannerSection.vue";
import { onMounted } from "vue";

const userStore = useUserStore();
const eventStore = useEventStore();

const events = ref(eventStore.events);

const { lastMonthEventWinner } = toRefs(eventStore);

onMounted(() => {
	eventStore.fetchEvents();
});

watchEffect(() => {
	events.value = eventStore.events;
});
</script>

<template>
	<BannerSection v-if="events" :lastMonthEventWinner="lastMonthEventWinner" />
	<AboutSection />
	<MonthPictureSection v-if="userStore.getLoginStatus" />
	<SignInInvitationSection v-else />
	<EventSection v-if="events" :events="events" />
</template>

<style>
.or-hero-container {
	display: grid;
	align-items: center;
	width: 100vw;
	height: calc(100dvh - 56px);
}

.or-hero {
	display: grid;
	gap: 1.5rem;
	padding: 3rem 1.5rem;
	line-height: 1.25;
	color: rgb(var(--v-theme-grey-100));
}

.or-month-pictures-container {
	display: grid;
	gap: 0.5rem;
	grid-template-columns: repeat(2, 1fr);
}

.or-month-picture {
	aspect-ratio: 1;
}

.or-like-button {
	background-color: rgba(var(--v-theme-grey-100), 0.5) !important;
}

@media only screen and (min-width: 1024px) {
	.or-hero-container {
		height: fit-content;
	}

	.or-hero {
		margin: auto;
		padding: 6rem 0;
		max-width: 50%;
	}

	.or-hero h1,
	.or-hero p {
		text-align: center;
	}

	.or-month-pictures-container {
		gap: 1.5rem;
		grid-template-columns: repeat(3, 1fr);
	}
}
</style>
