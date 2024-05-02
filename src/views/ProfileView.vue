<script setup>
import { watch, ref, computed, toRefs, onMounted } from "vue";
import { useUserStore } from "@/store/UserStore.js";
import { formatDate } from "@/utils/date.js";
import ButtonComponent from "@/components/ButtonComponent.vue";
import EventCard from "@/components/EventCard.vue";

const userStore = useUserStore();

const isSettingsPanelDisplayed = ref(false);
const lastPage = ref(0);
const error = computed(() => userStore.getErrorMessages);
const { events, totalEvents, currentPage, eventsPerPage } = toRefs(
	userStore.getEventDetails
);

const { firstName, lastName, gender } = toRefs(userStore.getUserDetails);

const genderOptions = [
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

// Rules

const firstNameRules = [
	(value) => {
		if (value?.length >= 2) return true;
		return "Le prénom doit comporter au moins 2 caractères.";
	},
];

const lastNameRules = [
	(value) => {
		if (value?.length >= 2) return true;
		return "Le nom doit comporter au moins 2 caractères.";
	},
];

const genderRules = [
	({ value }) => {
		if (
			genderOptions.find(
				({ value: genderOptionsValue }) =>
					value === genderOptionsValue
			)
		)
			return true;
		return "Veuillez sélectionner un genre valide.";
	},
];

// Functions

const handleLogout = () => userStore.logout();

const handleSettings = () => {
	if (isSettingsPanelDisplayed.value) {
		setUserDetails();
	}

	isSettingsPanelDisplayed.value = !isSettingsPanelDisplayed.value;
};

const handleSubmit = () => {
	if (!(firstName.value && lastName.value && gender.value.value)) {
		error.value = "Veuillez remplir tous les champs.";
	} else {
		error.value = "";
		const isUpdated = userStore.update(
			firstName.value,
			lastName.value,
			gender.value.value
		);

		if (isUpdated) {
			isSettingsPanelDisplayed.value = false;
		} else {
			error.value =
				"Une erreur est survenue, veuillez réessayer plus tard.";
		}
	}
};

const handlePageChange = () => {
	if (currentPage.value === lastPage.value) return;

	lastPage.value = currentPage.value;

	userStore.fetchEvents(currentPage.value, eventsPerPage.value);

	setEventDetails();
};

const setUserDetails = () => {
	const storeUserDetails = userStore.getUserDetails;

	firstName.value = storeUserDetails.firstName;
	lastName.value = storeUserDetails.lastName;
	gender.value = storeUserDetails.gender;
};

const setEventDetails = () => {
	const storeEventDetails = userStore.getEventDetails;

	events.value = storeEventDetails.events;
	totalEvents.value = storeEventDetails.totalEvents;
	currentPage.value = storeEventDetails.currentPage;
	eventsPerPage.value = storeEventDetails.eventsPerPage;
};

// Lifecycle

onMounted(() => {
	setEventDetails();
});

watch(
	() => userStore.userDetails,
	(newUserDetails, oldUserDetails) => {
		if (newUserDetails !== oldUserDetails) {
			setUserDetails();
		}
	},
	{ deep: true }
);
</script>

<template>
	<v-container fluid class="py-12">
		<v-row>
			<v-col
				cols="12"
				md="8"
				lg="6"
				xl="5"
				class="d-flex flex-column ga-5 mx-auto"
			>
				<div class="d-flex justify-end align-center ga-3">
					<v-btn
						class="bg-grey-100"
						:elevation="1"
						icon="mdi-cog"
						title="Paramètres"
						@click="handleSettings"
					/>
					<v-btn
						:elevation="1"
						icon="mdi-logout"
						title="Déconnexion"
						@click="handleLogout"
					/>
				</div>
				<div
					v-if="isSettingsPanelDisplayed"
					class="d-flex flex-column ga-3"
				>
					<h2 class="mx-auto">Paramètres</h2>
					<v-form
						@submit.prevent="handleSubmit"
						class="d-flex flex-column ga-5"
					>
						<v-text-field
							v-model="lastName"
							:rules="lastNameRules"
							label="Nom"
							variant="outlined"
						/>
						<v-text-field
							v-model="firstName"
							:rules="firstNameRules"
							label="Prénom"
							variant="outlined"
						/>
						<v-select
							v-model="gender"
							:rules="genderRules"
							label="Genre"
							:items="genderOptions"
							item-title="title"
							item-value="value"
							return-object
							variant="outlined"
						/>
						<div
							class="d-flex flex-column align-center ga-2"
						>
							<button-component
								label="Sauvegarder"
								type="submit"
							/>
							<p class="text-red-darken-4">
								{{ error }}
							</p>
							<button-component
								label="Annuler"
								:isPrimary="false"
								@click="handleSettings"
							/>
						</div>
					</v-form>
				</div>
				<div v-else class="d-flex flex-column ga-3">
					<div
						class="d-flex flex-column align-center ga-3"
					>
						<v-avatar size="100">
							<v-img
								:src="`https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}&size=100`"
								:alt="`${firstName} ${lastName} avatar`"
							></v-img>
						</v-avatar>
						<div
							v-if="firstName && lastName"
							class="text-center"
						>
							<h2>
								{{ firstName }}
								{{ lastName }}
							</h2>
							<p>
								{{ totalEvents }}
								{{
									totalEvents > 1
										? "participations"
										: "participation"
								}}
							</p>
						</div>
					</div>
					<div>
						<v-divider />
					</div>
					<div
						v-if="events.length"
						class="d-flex flex-column ga-4"
					>
						<h2 class="mx-auto">
							Mes évènements
						</h2>
						<event-card
							v-for="(
								event, index
							) in events"
							:key="index"
							:id="event.id"
							:title="
								(event.user_id ===
								userStore.userDetails.id
									? `Créateur | ${event.city}`
									: event.city) +
								` (${event.zip_code})`
							"
							:description="
								event.description
							"
							:date="formatDate(event.date)"
							:gender="event.gender"
							:thumbnail="
								event.image_url
									? event.image_url
									: '/assets/images/event-placeholder.png'
							"
							:class="`or-event or-${event.status}`"
						/>
						<v-pagination
							v-if="
								totalEvents >
								userStore.eventDetails
									.eventsPerPage
							"
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
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<style>
.or-ended,
.or-canceled {
	opacity: 0.75;
	filter: grayscale(100%);
	background-color: rgb(var(--v-theme-grey-200)) !important;
}

.v-pagination__list {
	width: 100%;
	justify-content: space-between;
}

.v-pagination__list li {
	margin: 0;
}
</style>
