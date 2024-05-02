<script setup>
import ButtonAction from "@/components/ButtonAction.vue";
import { useEventStore } from "@/store/EventStore";
import { useUserStore } from "@/store/UserStore";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();
const eventStore = useEventStore();
const event = eventStore.currentEvent;
const currentParticipantStatus = event.current_participant_status;

const action = {
	accepted: {
		chat: () =>
			router.push({
				name: "EventChat",
			}),
		leave: () => eventStore.leaveEvent(event.id),
	},
	toParticipate: () => eventStore.joinEvent(event.id),
	admin: {
		closeEvent: () => eventStore.closeEvent(event.id),
	},
};
const label = {
	awaiting: "Demande envoyée !",
	refused: "Votre demande a été rejeté",
	banned: "Vous avez été banni de cet évènement",
	accepted: {
		chat: "Discuter",
		leave: "Quitter",
	},
	admin: {
		closeEvent: "Fermer l'évènement",
	},
};

const IS_AWAITING = currentParticipantStatus === "awaiting";
const IS_ACCEPTED = currentParticipantStatus === "accepted";
const IS_REFUSED = currentParticipantStatus === "refused";
const IS_BANNED = currentParticipantStatus === "banned";
const IS_NOT_A_PARTICIPANT = currentParticipantStatus.length === 0;
const IS_ADMIN =
	userStore.userDetails.isAdmin || event.user_id === userStore.userDetails.id;

watchEffect(() => {
	event.value = eventStore.currentEvent;
});
</script>

<template>
	<ButtonAction
		:action="action[currentParticipantStatus]"
		:label="label[currentParticipantStatus]"
		:is-disabled="true"
		addClass="ml-4 px-4 py-3 joinLeaveButton"
		v-if="IS_AWAITING"
	/>

	<ButtonAction
		:label="label[currentParticipantStatus]"
		:is-disabled="true"
		addClass="ml-4 px-4 py-3 joinLeaveButton"
		v-if="IS_REFUSED"
	/>
	<ButtonAction
		:label="label[currentParticipantStatus]"
		:is-disabled="true"
		addClass="ml-4 px-4 py-3 joinLeaveButton"
		v-if="IS_BANNED"
	/>
	<ButtonAction
		label="Rejoindre !"
		:action="action['toParticipate']"
		addClass="ml-4 px-4 py-3 joinLeaveButton"
		v-if="IS_NOT_A_PARTICIPANT"
	/>

	<ButtonAction
		:action="action[currentParticipantStatus].chat"
		:label="label[currentParticipantStatus].chat"
		:is-disabled="false"
		addClass="ml-4 px-4 py-3 d-flex"
		btnStyle="secondary"
		variant="outlined"
		color="primary"
		v-if="IS_ACCEPTED"
	/>
	<ButtonAction
		:action="action[currentParticipantStatus].leave"
		:label="label[currentParticipantStatus].leave"
		addClass="ml-4 px-4 py-3"
		btnStyle="custom"
		color="red"
		variant="outlined"
		:is-disabled="false"
		v-if="IS_ACCEPTED && !IS_ADMIN"
	/>
	<ButtonAction
		:action="action['admin'].closeEvent"
		:label="label['admin'].closeEvent"
		addClass="ml-4
				px-4 py-3"
		btnStyle="custom"
		color="red"
		variant="outlined"
		:is-disabled="false"
		v-if="IS_ADMIN"
	/>
</template>

<style scoped></style>
