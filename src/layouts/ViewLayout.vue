<script setup>
import { reactive, computed, watchEffect, onMounted, watch } from "vue";
import { useAppStore } from "@/store/AppStore.js";

const appStore = useAppStore();

const notification = reactive({
	message: "",
	type: "",
	isDisplayed: false,
});

const status = computed(() => {
	switch (notification.type) {
		case "success":
			return "green";
		case "error":
			return "red";
		default:
			return "blue";
	}
});

const closeSnackbar = () => {
	notification.isDisplayed = false;
	appStore.unsetNotification();
};

const setNotification = () => {
	const { message, type } = appStore.getNotification.value;

	notification.message = message;
	notification.type = type;
};

// Lifecycle

onMounted(() => {
	setNotification();
});

watchEffect(() => {
	setNotification();

	if (notification.message && notification.type) {
		notification.isDisplayed = true;
	}
});

watch(
	() => notification.isDisplayed,
	(newValue) => {
		if (!newValue) {
			closeSnackbar();
		}
	}
);
</script>

<template>
	<v-main class="bg-grey-100">
		<router-view />
		<v-snackbar
			v-if="notification.message && notification.type"
			:color="status"
			v-model="notification.isDisplayed"
			close-delay="3000"
			location="top"
			timer="true"
		>
			{{ notification.message }}
			<template v-slot:actions>
				<v-btn
					color="grey-100"
					variant="text"
					@click="closeSnackbar"
				>
					<v-icon icon="mdi-close"></v-icon>
				</v-btn>
			</template>
		</v-snackbar>
	</v-main>
</template>

<style>
@media only screen and (max-width: 1024px) {
	.v-main {
		padding-bottom: 0 !important;
	}
}
</style>
