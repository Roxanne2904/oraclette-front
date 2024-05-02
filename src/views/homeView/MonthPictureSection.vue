<script setup>
import { useUserStore } from "@/store/UserStore.js";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { formatDate } from "@/utils/date.js";
import { toRefs, onMounted } from "vue";
import { useEventStore } from "@/store/EventStore";

const userStore = useUserStore();
const eventStore = useEventStore();

const { currentMonthEvents } = toRefs(eventStore);

onMounted(() => {
	eventStore.fetchContestEvents();
});

const handleLikedPicture = (event, alreadyLiked) => {
	return eventStore.likeAnEvent(event.id, alreadyLiked);
};
</script>

<template>
	<v-container id="vote" fluid class="py-16 bg-grey-200">
		<v-row>
			<v-col
				cols="12"
				md="8"
				lg="6"
				class="d-flex flex-column ga-3 ga-lg-6 mx-auto align-lg-center"
			>
				<h2>Votez pour la photo du mois ! 🗳️</h2>
				<p>
					Chaque mois, vous pouvez voter pour la photo de raclette la plus originale.
				</p>
				<v-container class="pa-0">
					<v-row>
						<v-col class="or-month-pictures-container">
							<v-dialog
								v-for="event in currentMonthEvents"
								:key="event.id"
								class="or-month-picture-container"
								max-width="1000"
							>
								<template v-slot:activator="{ props }">
									<v-card
										v-bind="props"
										:image="`${event.image_url}`"
										class="or-month-picture"
									>
										<v-card-actions class="w-100 h-100 justify-end align-end">
											<v-btn
												v-if="userStore.getLoginStatus"
												:icon="event.is_liked_by_user ? 'mdi-heart' : 'mdi-heart-outline'"
												color="red"
												class="or-like-button"
												@click.stop="handleLikedPicture(event, event.is_liked_by_user)"
											/>
										</v-card-actions>
									</v-card>
								</template>
								<template v-slot:default="{ isActive }">
									<v-card>
										<v-card-item>
											<template v-slot:append>
												<v-btn
													variant="plain"
													color="on-background"
													icon="mdi-close"
													@click="isActive.value = false"
												/>
											</template>
										</v-card-item>
										<v-card-text>
											<v-img :src="`${event.image_url}`" max-height="75vh" />
										</v-card-text>
										<v-card-actions
											class="px-6 w-100 h-100 justify-space-between align-center"
										>
											<p>
												{{ event.city }},
												{{ formatDate(event.date) }}
											</p>
											<v-btn
												v-if="userStore.getLoginStatus"
												:icon="event.is_liked_by_user ? 'mdi-heart' : 'mdi-heart-outline'"
												color="red"
												@click.stop="handleLikedPicture(event, event.is_liked_by_user)"
											/>
										</v-card-actions>
									</v-card>
								</template>
							</v-dialog>
						</v-col>
					</v-row>
				</v-container>
				<div class="pt-10">
					<button-component
						label="Participer à une raclette party"
						route="Events"
						class="mx-auto"
					/>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>
