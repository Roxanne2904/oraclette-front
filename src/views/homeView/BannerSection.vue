<script setup>
import { toRefs, ref, computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
	lastMonthEventWinner: {
		type: Object,
		default: null,
		required: true,
	},
});

const { lastMonthEventWinner } = toRefs(props);

const router = useRouter();
const search = ref(null);
const backgroundStyle = computed(() => ({
	background: `linear-gradient(rgba(var(--v-theme-grey-900), 0.5), rgba(var(--v-theme-grey-900), 0.5)), center / cover no-repeat url(${lastMonthEventWinner.value.image_url})`,
}));
</script>

<template>
	<v-container fluid class="pa-0">
		<v-row class="d-block flex-column pa-0 ma-0">
			<v-col class="py-0 or-hero-container" :style="backgroundStyle">
				<div class="or-hero">
					<div class="d-flex flex-column ga-2">
						<h1 class="text-grey-100">
							Rencontrez des amateurs de raclette avec
							<span class="text-primary">O'Raclette</span>
							!
						</h1>
						<p class="text-grey-100">
							Élargissez votre cercle d'amis autour d'une table chaleureuse en
							rejoignant une raclette party proche de chez vous.
						</p>
					</div>
					<v-form
						class="d-flex ga-2"
						@submit.prevent="
							router.push({
								name: 'Events',
								query: {
									search: search,
								},
							})
						"
					>
						<v-text-field
							v-model="search"
							label="Votre ville"
							variant="outlined"
							bg-color="rgba(var(--v-theme-grey-600), .75)"
						/>
					</v-form>
					<p class="font-italic text-center text-subtitle-1 text-grey-200">
						Photo du mois par
						{{ lastMonthEventWinner.creator.firstname }}
					</p>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>
