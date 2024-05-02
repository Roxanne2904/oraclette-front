<script setup>
import { useEventStore } from "@/store/EventStore";

import { watchEffect } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import MessageComponent from "./message/MessageComponent.vue";
import DisabledMessageComponent from "./message/DisabledMessageComponent.vue";

const router = useRouter();
const route = useRoute();

const eventId = route.params.id;
const eventStore = useEventStore();

const messages = ref(eventStore.eventMessages);
const event = ref(eventStore.currentEvent);

const messageInput = ref(null);
const messageContainer = ref(null);
const scrollToBottom = ref(null);
const participantListOpen = ref(false);

onMounted(() => {
	scrollToBottom.value.scrollIntoView();
	eventStore.getMessages(eventId);
	eventStore.getEvent(eventId);
});

function sendMessage() {
	const unavailableMessage =
		messageInput.value.value.trim().length < eventStore.maxLengthMsg;
	if (!messageInput.value.value || unavailableMessage) return;

	eventStore.addMessage(eventId, messageInput.value.value);

	scrollToBottom.value.scrollIntoView(true);
	messageInput.value.reset();
}

const handleClick = () =>
	(participantListOpen.value = !participantListOpen.value);

watchEffect(() => {
	messages.value = eventStore.eventMessages;
	event.value = eventStore.currentEvent;
});
</script>

<template>
	<v-responsive class="overflow-y-hidden fill-height pa-0 pa-md-4">
		<v-card :elevation="1" class="d-flex flex-column fill-height">
			<v-layout class="d-flex flex-column">
				<v-card-title class="d-flex">
					<v-btn
						class="mr-4"
						size="min-content"
						variant="text"
						color="black"
						icon="mdi-arrow-left"
						@click="router.back()"
					></v-btn>
					Messages du groupe <v-spacer></v-spacer>
					<v-btn
						size="min-content"
						variant="text"
						color="black"
						icon="mdi-account-multiple"
						id="participantList"
						@click="participantListOpen = !participantListOpen"
					></v-btn
				></v-card-title>

				<v-card-text class="overflow-y-auto chatLogs" ref="messageContainer">
					<template v-for="(msg, i) in messages" :key="i">
						<message-component v-if="!msg.disabled" :msg="msg" />
						<disabled-message-component v-else-if="event" :msg="msg" :event="event" />
					</template>
					<div ref="scrollToBottom" class="mt-10"></div>
					<v-navigation-drawer
						temporary
						v-model="participantListOpen"
						location="right"
					>
						<template #prepend>
							<v-list-item append-icon="mdi-close" @click="handleClick"
								>Participants</v-list-item
							>
						</template>
						<v-list density="compact" nav>
							<v-list-item
								v-for="(u, index) in 20"
								:key="index"
								prepend-avatar="https://placehold.co/64"
								title="User"
							></v-list-item>
						</v-list>
					</v-navigation-drawer>
				</v-card-text>
				<v-card-actions class="d-flex align-end h-0">
					<v-text-field
						variant="underlined"
						class="mt-4 messageInput"
						ref="messageInput"
						placeholder="Discutez..."
						type="text"
						no-details
						outlined
						append-icon="mdi-send"
						@keyup.enter="sendMessage()"
						@click:append="sendMessage()"
						:rules="[
							(v) =>
								(v && v.length >= eventStore.maxLengthMsg) ||
								`Le message doit contenir au moins ${eventStore.maxLengthMsg} caractères`,
						]"
					/>
				</v-card-actions>
			</v-layout>
		</v-card>
	</v-responsive>
</template>

<style scoped>
.fit-content {
	width: fit-content;
}
.border-bot {
	border-bottom: solid var(--v-theme-grey-500) 1px;
}
</style>
