<script setup>
import { useEventStore } from "@/store/EventStore";
import { useUserStore } from "@/store/UserStore";
import { ref } from "vue";
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const eventStore = useEventStore();
const userStore = useUserStore();

const props = defineProps({
	userId: {
		type: Number,
		required: true,
	},
	eventId: {
		type: Number,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	moderation: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

const screenWidth = ref(screen.width);
</script>

<template>
	<v-card class="ma-2 ma-lg-4 pa-2 pa-lg-4">
		<div
			class="d-flex flex-column flex-md-row flex-wrap flex-lg-nowrap justify-center justify-lg-space-between align-center"
		>
			<v-avatar>
				<v-img :src="props.avatar"></v-img>
			</v-avatar>
			<v-card-title class="text-center text-truncate">
				{{ props.name }}
			</v-card-title>

			<v-card-actions
				v-if="props.moderation"
				class="pa-0 w-100 w-lg-auto justify-center justify-lg-start"
			>
				<v-btn
					class="mx-1 mx-lg-4"
					variant="text"
					append-icon="mdi-check"
					color="accent"
					@click="
						eventStore.acceptUser(
							props.eventId,
							props.userId
						)
					"
					>Valider</v-btn
				>
				<v-btn
					class="mx-1 mx-lg-4"
					variant="text"
					append-icon="mdi-close"
					color="error"
					@click="
						eventStore.refuseUser(
							props.eventId,
							props.userId
						)
					"
					>Refuser</v-btn
				>
				<v-btn
					class="mx-1 mx-lg-4"
					variant="text"
					color="red"
					append-icon="mdi-cancel"
					@click="
						eventStore.banUser(
							props.eventId,
							props.userId
						)
					"
					>Bannir</v-btn
				>
			</v-card-actions>
			<v-card-actions v-else class="pb-0">
				<v-btn
					v-if="
						props.isAdmin &&
						props.userId !==
							userStore.userDetails.id
					"
					class="mx-1 mx-lg-4"
					variant="text"
					color="red"
					append-icon="mdi-cancel"
					@click="
						eventStore.banUser(
							props.eventId,
							props.userId
						)
					"
					><p>Bannir</p></v-btn
				>
			</v-card-actions>
		</div>
	</v-card>
</template>

<style lang="scss" scoped></style>
