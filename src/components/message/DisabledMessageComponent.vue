<script setup>
import { toRefs, defineProps } from "vue";

const props = defineProps({
	msg: {
		type: Object,
		required: true,
	},
	event: {
		type: Object,
		required: true,
	},
});

const { msg, event } = toRefs(props);

const on = {};

const displayCreatorEvent = (currentEvent) => {
	if (!currentEvent) return "le créateur";

	return `${currentEvent.creator.lastname} ${currentEvent.creator.firstname}`;
};
</script>

<template>
	<div
		:class="{
			'd-flex flex-row-reverse  ': msg.isItMyMessage,
		}"
	>
		<div class="d-flex flex-column align-start fit-content">
			<div
				:class="
					msg.isItMyMessage ? 'align-self-end mt-4 mx-3 f-size' : ' ml-4 f-size'
				"
			>
				Supprimé par
				<strong>{{ displayCreatorEvent(event) }}</strong>
			</div>

			<v-chip
				variant="flat"
				rounded
				:color="'grey-200'"
				dark
				style="height: auto; white-space: normal"
				:class="{
					'py-2 px-6 mb-2 message': true,
					'align-self-end': msg.isItMyMessage,
				}"
				v-on="on"
			>
				<div class="d-flex flex-column">
					<em class="f-size"
						>Ce message a été supprimé par le créateur de l'évènement</em
					>
				</div>
			</v-chip>
			<div
				:class="
					msg.isItMyMessage
						? 'd-flex justify-end ml-3 ga-1 px-6 pb-6 w-100'
						: 'd-flex justify-start ml-2 ga-1 pb-6 w-100'
				"
			>
				<sub class="ml-2" style="font-size: 0.5rem">
					Crée le
					<strong>{{ msg.createdAt }}</strong></sub
				>
				<sub class="ml-2" v-if="msg.hasBeenUpdated" style="font-size: 0.5rem">
					Supprimé le
					<strong>{{ msg.updatedAt }}</strong></sub
				>
			</div>
		</div>
	</div>
</template>

<style scoped>
.f-size {
	font-size: 0.7rem;
}
.f-size-smaller {
	font-size: 0.6rem;
}
</style>
