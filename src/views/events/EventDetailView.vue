<script setup>
import { ref, watchEffect } from "vue";
import { useUserStore } from "@/store/UserStore.js";
import { useEventStore } from "@/store/EventStore.js";
import { useRouter } from "vue-router";
import MemberCard from "@/components/MemberCard.vue";
import EventStatusBtn from "@/components/event/EventStatusBtn.vue";

const router = useRouter();

const userStore = useUserStore();
const eventStore = useEventStore();
const event = eventStore.currentEvent;

const picture = ref(null);
const joined = ref(null);
const awaiting = ref(null);
const tab = ref(null);
const membersPagination = ref(1);
const manageMembersPagination = ref(1);

//check if event is joined
event.participants.forEach((value) => {
	if (value.id === userStore.userDetails.id) {
		joined.value = true;
	}
});

//check if event is soft joined
event.awaiting.forEach((value) => {
	if (value.id === userStore.userDetails.id) {
		awaiting.value = true;
	}
});

//convert image to base64 and send it
function encodeImageFileAsURL(element) {
	var file = element.files[0];
	var reader = new FileReader();
	reader.onloadend = function () {
		eventStore.changePicture(event.id, reader.result);
	};
	reader.readAsDataURL(file);
}

watchEffect(() => {
	event.value = eventStore.currentEvent;
});
</script>

<template>
	<div v-if="!event">LOADING</div>
	<div v-else>
		<div
			v-if="event.status === 'open'"
			class="d-flex flex-column align-center ga-4"
		>
			<div class="grid">
				<div class="col1">
					<h1 class="text-uppercase">Raclette party à {{ event.city }}</h1>
					<p>{{ event.description }}</p>
					<p class="ml-4 mt-4">
						<v-icon icon="mdi-account"></v-icon>
						{{
							event.available_slot +
							(event.available_slot === 1
								? " place de disponible"
								: " places de disponible")
						}}
					</p>
					<p class="ml-4 mt-4">
						<v-icon icon="mdi-map-marker"></v-icon>
						{{ event.adress ? event.adress + ", " : "" }}
						{{ event.zip_code + " " + event.city }}
					</p>
					<p class="ml-4 mt-4">
						<v-icon icon="mdi-calendar-blank"></v-icon>
						{{ event.date }}
					</p>
				</div>
				<div class="col2">
					<div class="d-none d-lg-flex w-100 justify-end mt-4">
						<EventStatusBtn />
					</div>

					<v-dialog v-if="event.image_url" class="mb-2">
						<template v-slot:activator="{ props }">
							<v-card
								class="largeScreen"
								flat
								:image="event.image_url ?? '/assets/images/event-placeholder.png'"
								max-width="500px"
								min-width="200px"
								width="calc(100% - 32px)"
								v-bind="props"
							>
								<v-img :src="event.image_url ?? '/assets/images/event-placeholder.png'">
								</v-img>
							</v-card>
						</template>
						<template v-slot:default="{ isActive }">
							<v-card class="mx-4 largeScreen">
								<v-card-item class="py-2 px-4">
									<v-card-title>Photo de l'événement </v-card-title>
									<template v-slot:append>
										<v-btn
											variant="plain"
											color="on-background"
											icon="mdi-close"
											@click="isActive.value = false"
										></v-btn>
									</template>
								</v-card-item>

								<v-card-text class="bg-grey-lighten-3">
									<v-img
										:src="event.image_url ?? '/assets/images/event-placeholder.png'"
										max-height="80vh"
										max-width="90vw"
									></v-img>
								</v-card-text>
								<v-card-actions>
									<v-avatar color="surface-variant"></v-avatar>
									<p class="text-caption text-truncate">
										&nbsp;&nbsp;{{
											event.creator.firstname + " " + event.creator.lastname
										}}
									</p>
									<v-spacer></v-spacer>

									<v-btn
										icon="mdi-heart-outline"
										color="red"
										class="align-center"
									></v-btn>
								</v-card-actions>
							</v-card>
						</template>
					</v-dialog>
				</div>
			</div>
			<div class="d-flex d-lg-none w-100 flex-wrap justify-center mt-4 ga-4">
				<EventStatusBtn />
			</div>
			<v-dialog v-if="event.image_url" class="mb-2 smallScreen">
				<template v-slot:activator="{ props }">
					<v-card
						flat
						class="smallScreen"
						:image="event.image_url ?? '/assets/images/event-placeholder.png'"
						max-width="500px"
						min-width="200px"
						width="calc(100% - 32px)"
						v-bind="props"
					>
						<v-img :src="event.image_url ?? '/assets/images/event-placeholder.png'">
						</v-img>
					</v-card>
				</template>
				<template v-slot:default="{ isActive }">
					<v-card class="mx-4 smallScreen">
						<v-card-item class="py-2 px-4">
							<v-card-title>Photo de l'événement </v-card-title>
							<template v-slot:append>
								<v-btn
									variant="plain"
									color="on-background"
									icon="mdi-close"
									@click="isActive.value = false"
								></v-btn>
							</template>
						</v-card-item>

						<v-card-text class="bg-grey-lighten-3">
							<v-img
								:src="event.image_url ?? '/assets/images/event-placeholder.png'"
								max-height="80vh"
								max-width="90vw"
							></v-img>
						</v-card-text>
						<v-card-actions>
							<v-avatar color="surface-variant"></v-avatar>
							<p class="text-caption text-truncate">
								&nbsp;&nbsp;{{ event.creator.firstname + " " + event.creator.lastname }}
							</p>
							<v-spacer></v-spacer>
							<v-btn icon="mdi-heart-outline" color="red" class="align-center"></v-btn>
						</v-card-actions>
					</v-card>
				</template>
			</v-dialog>
			<div style="width: min(calc(100% - 32px), 512px)">
				<v-file-input
					v-if="event.creator.id == userStore.userDetails.id"
					accept="image/png, image/jpeg"
					:label="event.image_url ? 'Changer la photo' : 'Ajouter une photo'"
					class="mx-auto"
					:elevation="1"
					prepend-icon="mdi-plus-box"
					v-model="picture"
					@change="encodeImageFileAsURL($event.target)"
				></v-file-input>
			</div>
			<div style="width: min(720px, 100%)" class="mb-4">
				<v-tabs fixed-tabs color="accent" bg-color="transparent" v-model="tab">
					<v-tab value="members" class="text-uppercase"> Les participants </v-tab>
					<v-tab
						v-if="
							userStore.userDetails.isAdmin ||
							event.user_id === userStore.userDetails.id
						"
						value="manageMembers"
						class="text-uppercase"
					>
						Requêtes
					</v-tab>
				</v-tabs>
				<v-window class="mb-4 bg-grey-lighten-3" v-model="tab">
					<v-window-item value="members">
						<v-data-iterator
							:items="event.participants"
							:page="membersPagination"
							items-per-page="3"
							style="max-height: 512px"
						>
							<template v-slot:default="{ items }">
								<template v-for="(item, i) in items" :key="i">
									<member-card
										:name="item.raw.firstname + ' ' + item.raw.lastname"
										avatar="/assets/images/event-placeholder.png"
										:user-id="item.raw.id"
										:event-id="event.id"
										:is-admin="
											userStore.userDetails.isAdmin ||
											event.user_id === userStore.userDetails.id
										"
									></member-card>
								</template>
							</template> </v-data-iterator
					></v-window-item>
					<v-window-item
						v-if="
							userStore.userDetails.isAdmin ||
							event.user_id === userStore.userDetails.id
						"
						value="manageMembers"
					>
						<v-data-iterator
							:items="event.awaiting"
							:page="manageMembersPagination"
							style="max-height: 512px"
						>
							<template v-slot:default="{ items }">
								<template v-for="(item, i) in items" :key="i">
									<member-card
										:name="item.raw.firstname + ' ' + item.raw.lastname"
										avatar="/assets/images/event-placeholder.png"
										:user-id="item.raw.id"
										:event-id="event.id"
										moderation
										:is-admin="
											userStore.userDetails.isAdmin ||
											event.user_id === userStore.userDetails.id
										"
									></member-card>
								</template>
							</template>
						</v-data-iterator>
					</v-window-item>
				</v-window>
			</div>
		</div>
		<div
			v-if="event.status === 'ended'"
			class="w-100 d-flex flex-column align-center justify-center text-center"
			style="height: 80vh"
		>
			<h1>Cet événement est terminé !</h1>
			<v-btn @click="router.push({ name: 'Events' })">
				<p>En trouver un autre</p>
			</v-btn>
		</div>
		<div
			v-if="event.status === 'canceled'"
			class="w-100 d-flex flex-column align-center justify-center text-center"
			style="height: 80vh"
		>
			<h1>Cet événement est fermé !</h1>
			<v-btn @click="router.push({ name: 'Events' })">
				<p>En trouver un autre</p>
			</v-btn>
		</div>
	</div>
</template>

<style>
.grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 32px;
	margin: 4rem;
	font-size: 1vmax;
	width: 75%;
}

.col1 {
	display: grid;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
	gap: 32px;
}

.col2 {
	display: grid;
	grid-template-rows: 3fr 7fr;
	gap: 32px;
	justify-items: end;
}

@media (max-width: 1250px) {
	.largeScreen {
		display: none !important;
	}

	.smallScreen {
		display: block !important;
	}

	.grid {
		grid-template-columns: 1fr;
		margin: 1rem;
		font-size: 18px;
		text-align: center;
	}

	.col2 {
		display: none;
	}
}

@media (min-width: 1250px) {
	.largeScreen {
		display: block !important;
	}

	.smallScreen {
		display: none !important;
	}

	.grid {
		grid-template-columns: 1fr 1fr;
		text-align: start;
	}

	.col2 {
		display: grid;
	}
}
</style>
