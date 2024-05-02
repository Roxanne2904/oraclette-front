<script setup>
import { useEventStore } from "@/store/EventStore";
import { ref, defineProps } from "vue";

const props = defineProps({
	msg: {
		type: Object,
		required: true,
	},
});

const eventStore = useEventStore();

const dialog = ref(false);
const newMessage = ref(null);
const currentMessage = ref(props.msg.message);

function updateMessage(messageId, currentMessage, eventId) {
	const newFreshMessage = newMessage.value.value;
	const stillSameMessage = currentMessage === newFreshMessage;
	const unavailableMessage = newFreshMessage.trim().length < 1;

	if (stillSameMessage || unavailableMessage) return;
	eventStore.updateMessage(messageId, newFreshMessage, eventId);
	dialog.value = false;
}
</script>

<template>
	<v-dialog v-model="dialog" persistent width="1024">
		<template v-slot:activator="{ props }">
			<v-btn
				v-if="msg.isItMyMessage"
				v-bind="props"
				size="x-small"
				color="grey-600"
				icon="mdi-pencil"
			/>
		</template>

		<v-card>
			<v-card-title class="pt-4 pl-4 d-flex align-center ga-2">
				<v-icon class="xs-logo" icon="mdi-pencil" color="accent" />
				<span class="text-h5 xs-title text-sm-h6 text-md-h5 text-lg-h5 text-xl-h5"
					>Modifier votre message</span
				>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12">
							<v-text-field
								ref="newMessage"
								label="Votre nouveau message"
								required
								:placeholder="msg.message"
								v-model="currentMessage"
								type="text"
								:rules="[
									(v) =>
										(v && v.trim().length >= eventStore.maxLengthMsg) ||
										'Le message ne peut pas être vide',
								]"
								@keyup.enter="updateMessage(msg.id, msg.message, msg.eventId)"
							></v-text-field>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
			<v-card-actions class="custom-wrap d-flex justify-end">
				<v-spacer></v-spacer>
				<v-btn color="grey-600" variant="text" @click="dialog = false">
					Fermer
				</v-btn>
				<v-btn
					color="accent"
					variant="text"
					@click="updateMessage(msg.id, msg.message, msg.eventId)"
				>
					Enregistrer votre message
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
	<!-- </v-row> -->

	<template> </template>
</template>

<style scoped>
.custom-wrap {
	flex-wrap: wrap;
}
@media (max-width: 370px) {
	.xs-logo {
		font-size: 1.2rem !important;
		align-items: center;
	}

	.xs-title {
		font-size: 1.25rem !important;
	}
}
</style>
