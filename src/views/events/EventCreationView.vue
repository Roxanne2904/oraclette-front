<script setup>
import { ref, watchEffect } from "vue";
import { useEventStore } from "@/store/EventStore.js";
import ButtonComponent from "@/components/ButtonComponent.vue";

const eventStore = useEventStore();

const description = ref(""),
	places = ref(null),
	date = ref(null),
	address = ref(""),
	zipCode = ref(""),
	city = ref(""),
	gender = ref(""),
	allowLocation = ref(false),
	formError = ref("");

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

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
		title: "Non-binaire",
		value: "nonbinary",
	},
];

const genders = ["male", "female", "nonbinary"];

// Rules

const descriptionRules = [
	(value) => {
		if (value?.length >= 10) return true;
		return "La description doit contenir au moins 10 caractères";
	},
];

const placesRules = [
	(value) => {
		if (value > 0) return true;
		return "Le nombre de places doit être supérieur à 0";
	},
];

const dateRules = [
	(value) => !!value || "La date est obligatoire",
	(value) => {
		const selectedDate = new Date(value);
		return (
			selectedDate >= tomorrow || "La date doit être supérieure à la date du jour"
		);
	},
];

const addressRules = [
	(value) => {
		if (value) return true;
		return "L'adresse est obligatoire";
	},
];

const zipCodeRules = [
	(value) => {
		if (value) return true;
		return "Le code postal est obligatoire";
	},
];

const cityRules = [
	(value) => {
		if (value) return true;
		return "La ville est obligatoire";
	},
];

const genderRules = [
	({ value }) => {
		if (genders.includes(value)) return true;
		return "Veuillez sélectionner un genre valide.";
	},
];

const allowLocationRules = [
	(value) => value || "Veuillez accepter le partage de votre adresse",
];

// Functions

const handleSubmit = () => {
	if (
		!(
			description.value &&
			places.value &&
			date.value &&
			address.value &&
			zipCode.value &&
			city.value &&
			gender.value.value &&
			allowLocation.value
		)
	) {
		formError.value = "Veuillez remplir tous les champs.";
	} else {
		formError.value = "";

		eventStore.create(
			description.value,
			places.value,
			date.value,
			address.value,
			zipCode.value,
			city.value,
			gender.value.value
		);
	}
};

watchEffect(() => {
	const errorMessage = eventStore.getErrorMessages;

	formError.value = errorMessage ? errorMessage : null;
});
</script>

<template>
	<v-container>
		<v-row>
			<v-col cols="12" md="8" lg="6" class="d-flex flex-column ga-5 mx-auto">
				<h1>Création d'un évènement</h1>
				<v-form class="d-flex flex-column ga-4" @submit.prevent="handleSubmit">
					<v-textarea
						v-model="description"
						:rules="descriptionRules"
						label="Description"
						variant="outlined"
					/>
					<v-select
						v-model="gender"
						:rules="genderRules"
						name="gender"
						label="Genre"
						:items="genderOptions"
						item-title="title"
						item-value="value"
						return-object
						variant="outlined"
					/>
					<v-text-field
						v-model="places"
						:rules="placesRules"
						label="Nombre de places d'invités"
						type="number"
						variant="outlined"
					/>
					<v-text-field
						v-model="date"
						:rules="dateRules"
						label="Date"
						type="date"
						:min="tomorrow"
						variant="outlined"
					/>
					<v-text-field
						v-model="address"
						:rules="addressRules"
						label="Adresse"
						variant="outlined"
					/>
					<v-text-field
						v-model="zipCode"
						:rules="zipCodeRules"
						label="Code postal"
						variant="outlined"
					/>
					<v-text-field
						v-model="city"
						:rules="cityRules"
						label="Ville"
						variant="outlined"
					/>
					<v-checkbox
						v-model="allowLocation"
						:rules="allowLocationRules"
						label="J'ai pris connaissance du fait que l'adresse renseignée sera révélée aux participants que j'accepte dans mon événement."
					/>
					<button-component
						type="submit"
						label="Créer l'évènement"
						class="mx-auto"
					/>
					<p v-if="formError" class="text-red-darken-4 text-center">
						{{ formError }}
					</p>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>
