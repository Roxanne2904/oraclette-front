<script setup>
import { useEventStore } from "@/store/EventStore";
import { toRefs, defineProps } from "vue";
import UpdateDialogComponent from "./UpdateDialogComponent.vue";

const props = defineProps({
	msg: {
		type: Object,
		required: true,
	},
});

const { msg } = toRefs(props);

const eventStore = useEventStore();

const on = {};

function deleteMessage(messageId, eventId) {
	eventStore.hideMessage(eventId, messageId);
}
</script>

<template>
	<div
		:class="{
			'd-flex flex-row-reverse  ': msg.isItMyMessage,
		}"
	>
		<div class="d-flex flex-column align-start fit-content">
			<strong :class="msg.isItMyMessage ? 'align-self-end mt-4 mx-3' : ' ml-4'">{{
				msg.writedBy
			}}</strong>

			<v-chip
				variant="flat"
				rounded
				:color="msg.isItMyMessage ? 'accent' : ''"
				dark
				style="height: auto; white-space: normal"
				:class="{
					'pa-4 mb-2 message': true,
					'align-self-end': msg.isItMyMessage,
				}"
				v-on="on"
			>
				{{ msg.message }}
			</v-chip>

			<div class="d-flex flex-column ga-3 w-100">
				<div
					:class="
						msg.isItMyMessage
							? 'd-flex justify-end px-4 ml-3 ga-1'
							: 'd-flex justify-start ml-2 ga-1'
					"
				>
					<sub class="ml-2" style="font-size: 0.5rem">
						Crée le
						<strong>{{ msg.createdAt }}</strong></sub
					>
					<sub class="ml-2" v-if="msg.hasBeenUpdated" style="font-size: 0.5rem">
						Mis à jour le
						<strong>{{ msg.updatedAt }}</strong></sub
					>
				</div>

				<div
					:class="
						msg.isItMyMessage
							? 'd-flex pb-6 px-4 justify-end w-100'
							: 'd-flex pb-6 px-4 justify-start w-100'
					"
				>
					<div class="d-flex ga-2">
						<update-dialog-component :msg="msg" />

						<v-btn
							v-if="msg.canIDelete"
							@click="deleteMessage(msg.id, msg.eventId)"
							size="x-small"
							icon="mdi-trash-can"
							color="delete"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
