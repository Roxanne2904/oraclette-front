<script setup>
import { toRefs } from "vue";
import HomeEventCard from "@/components/HomeEventCard.vue";
import { formatDate } from "@/utils/date.js";

const props = defineProps({
	events: {
		type: Object,
		default: null,
		required: true,
	},
});

const { events } = toRefs(props);
</script>

<template>
	<v-container fluid class="py-12">
		<v-row class="d-flex flex-column ga-5 mx-auto">
			<v-col cols="12" md="8" class="mx-auto">
				<h2 class="pb-6 text-center">
					<em class="text-primary">Hmmm...</em> Envie de raclette ?<br />
					<p>Viens trouver ton bonheur ici !</p>
				</h2>
				<v-slide-group show-arrows="desktop" center-active class="pa-0">
					<v-slide-group-item v-for="event in events" :key="event.id">
						<HomeEventCard
							:id="event.id"
							:title="event.city"
							:description="event.description"
							:date="formatDate(event.date)"
							:gender="event.gender"
							:thumbnail="
								event.image_url
									? event.image_url
									: '/assets/images/event-placeholder.png'
							"
							class="mx-4"
						/>
					</v-slide-group-item>
				</v-slide-group>
			</v-col>
		</v-row>
	</v-container>
</template>

<style></style>
