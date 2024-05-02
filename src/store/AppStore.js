import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAppStore = defineStore("AppStore", () => {
	const notification = ref({
		message: "",
		type: "",
	});

	/**
	 * @function setNotification
	 * @description Set the notification.
	 * @param {String} message The notification message.
	 * @param {String} type The notification type.
	 * @returns {void}
	 */
	function setNotification(message, type) {
		notification.value.message = message;
		notification.value.type = type;
	}

	/**
	 * @function unsetNotification
	 * @description Unset the notification.
	 * @returns {void}
	 */
	function unsetNotification() {
		notification.value.message = "";
		notification.value.type = "";
	}

	const getNotification = computed(() => notification);

	return { notification, setNotification, unsetNotification, getNotification };
});