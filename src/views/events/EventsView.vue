<script setup>
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "@/store/UserStore.js";
import { useEventStore } from "@/store/EventStore.js";
import { formatDate } from "@/utils/date.js";
import EventCard from "@/components/EventCard.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import Map from "@/components/Map.vue";

const userStore = useUserStore();
const eventStore = useEventStore();

const isLogged = userStore.getLoginStatus;

const events = ref(eventStore.events);
const totalEvents = ref(eventStore.totalEvents);
const eventsPerPage = ref(eventStore.eventsPerPage);
const currentPage = ref(eventStore.currentPage);
const lastPage = ref(0);
const city = ref("");

// Functions

const setEventsDetails = () => {
	events.value = eventStore.events;
	totalEvents.value = eventStore.totalEvents;
	currentPage.value = eventStore.currentPage;
	eventsPerPage.value = eventStore.eventsPerPage;
};

const handlePageChange = () => {
	if (currentPage.value === lastPage.value) return;

	lastPage.value = currentPage.value;

	eventStore.fetchEvents(
		currentPage.value,
		eventsPerPage.value,
		city.value
	);
};

const handleSubmit = () => {
	if (!city.value) city.value = "";
	currentPage.value = 1;
	eventStore.fetchEvents(
		currentPage.value,
		eventsPerPage.value,
		city.value
	);
};

// Lifecycle

onMounted(() => {
	if (location.search) {
		const searchParams = new URLSearchParams(location.search);

		city.value = searchParams.get("search");

		handleSubmit();
	}
});

watch(() => eventStore.events, setEventsDetails);
</script>

<template>
	<v-container class="py-12">
		<v-row>
			<v-col
				cols="12"
				md="8"
				lg="6"
				class="d-flex flex-column ga-8 mx-auto"
			>
				<h1>Trouvez une raclette party à proximité !</h1>
				<button-component
					v-if="isLogged"
					label="Créer un évènement"
					route="EventCreation"
					:isPrimary="true"
					class="mx-auto"
				/>
				<v-form
					class="d-flex ga-2"
					@submit.prevent="handleSubmit"
				>
					<v-text-field
						v-model="city"
						label="Votre ville"
						variant="outlined"
						clearable
						@click:clear="handleSubmit"
					/>
				</v-form>
				<Map v-if="events" :events="events" />
				<div class="d-flex flex-column ga-4">
					<p v-if="!events.length">
						Aucun résultat pour cette recherche.
					</p>
					<event-card
						v-for="event in events"
						:key="event.id"
						:id="event.id"
						:title="`${event.city} (${event.zip_code})`"
						:description="event.description"
						:date="formatDate(event.date)"
						:gender="event.gender"
						:thumbnail="
							event.image_url
								? event.image_url
								: '/assets/images/event-placeholder.png'
						"
					/>
					<v-pagination
						v-if="totalEvents > eventsPerPage"
						v-model="currentPage"
						total-visible="2"
						:length="
							Math.ceil(
								totalEvents /
									eventsPerPage
							)
						"
						@click="handlePageChange"
					/>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<style>
.v-pagination__list {
	width: 100%;
	justify-content: space-between;
}

.v-pagination__list li {
	margin: 0;
}
</style>
