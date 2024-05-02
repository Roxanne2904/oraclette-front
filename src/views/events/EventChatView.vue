<script setup>
import { ref } from "vue";
import ChatComponent from "@/components/ChatComponent.vue";
import { useEventStore } from "@/store/EventStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { watchEffect } from "vue";

const route = useRoute();
const eventId = route.params.id;

const eventStore = useEventStore();
const event = ref(eventStore.currentEvent);
const status = eventStore.status;
const isParticipant = status?.length > 0 ? true : false;

onMounted(() => {
	if (!eventStore.status) eventStore.statusgetEvent(eventId);
});

watchEffect(() => {
	event.value = eventStore.currentEvent;
});
</script>

<template>
	<div
		class="fill-height w-100 d-flex align-start align-md-center justify-center"
	>
		<div
			class="d-flex align-center justify-center"
			style="
				width: min(calc(100% - 32px), 1280px) !important;
				height: max(90vh, 500px) !important;
			"
		>
			<chat-component v-if="isParticipant" />
			<h1 v-else>Vous n'avez pas rejoint cet événement !</h1>
		</div>
	</div>
</template>
