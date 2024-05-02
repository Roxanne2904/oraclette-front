HomeEventCard.vue

<script setup>
import { toRefs, defineProps, ref } from "vue";
import { toGenderIcon } from "../utils/helperFunctions";
import { useRouter } from "vue-router";

const router = useRouter();

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

const genderIcon = toGenderIcon(gender.value);
</script>

<template>
	<v-card
		class="mx-4"
		color="grey-200"
		width="250"
		elevation="0"
		link
		@click="() => router.push({ name: 'EventDetail', params: { id: id } })"
	>
		<v-img
			class="align-end text-white"
			gradient="rgba(var(--v-theme-grey-900),0.35),rgba(var(--v-theme-grey-900),0.35)"
			:src="thumbnail"
			cover
			height="200"
		>
			<v-card-title>{{ title }}</v-card-title>
		</v-img>

		<div>
			<v-card-subtitle class="pt-4 d-flex justify-space-between align-center">
				<p>{{ date }}</p>
				<v-icon
					:title="frenchGender"
					:icon="genderIcon"
					color="secondary"
				/>
			</v-card-subtitle>

			<v-card-text>
				{{ description }}
			</v-card-text>
		</div>
	</v-card>
</template>

<styles>

</styles>
