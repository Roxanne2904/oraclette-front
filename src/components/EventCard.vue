<script setup>
import { toRefs, defineProps, ref } from "vue";
import { toGenderIcon } from "../utils/helperFunctions";

const frenchGender = ref("");

const props = defineProps({
	id: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	thumbnail: {
		required: true,
	},
});

const { id, description, date, gender, thumbnail } = toRefs(props);

switch (gender.value) {
	case "male":
		frenchGender.value = "Homme";
		break;
	case "female":
		frenchGender.value = "Femme";
		break;
	default:
		frenchGender.value = "Non-binaire";
		break;
}

const genderIcon = toGenderIcon(gender.value);
</script>

<template>
	<v-card
		:elevation="1"
		:title="title"
		:subtitle="date"
		:prependAvatar="thumbnail"
		:to="{ name: 'EventDetail', params: { id: id } }"
	>
		<template v-slot:append>
			<v-icon
				:title="frenchGender"
				:icon="genderIcon"
				color="secondary"
			/>
		</template>
		<v-card-text>{{ description }}</v-card-text>
	</v-card>
</template>
