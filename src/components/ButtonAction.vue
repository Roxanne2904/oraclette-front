<script setup>
import { toRefs, computed } from "vue";

const props = defineProps({
	label: {
		type: String,
		default: "Button",
		required: true,
	},
	type: {
		type: String,
		default: "button",
		required: false,
	},
	btnStyle: {
		type: String,
		default: "primary",
		required: false,
	},
	action: {
		type: Function,
		default: () => {},
		required: false,
	},
	isDisabled: {
		type: Boolean,
		default: false,
		required: false,
	},
	variant: {
		type: String,
		default: "elevated",
		required: false,
	},
	color: {
		type: String,
		required: false,
	},
	addClass: {
		type: String,
		required: false,
	},
	height: {
		type: String,
		default: "fit-content",
		required: false,
	},
});

const {
	label,
	type,
	btnStyle,
	action,
	isDisabled,
	variant,
	color,
	addClass,
	height,
} = toRefs(props);

const classnameWithBg = computed(() => {
	switch (btnStyle.value) {
		case "primary":
			return "bg-primary";
		case "secondary":
			return "bg-secondary";
		case "custom":
			return;

		default:
			return "bg-primary";
	}
});
</script>

<template>
	<v-btn
		:disabled="isDisabled"
		:type="type"
		:class="`${addClass} ${classnameWithBg} or-button text-uppercase`"
		flat
		@click="action ? action() : () => {}"
		:text="label"
		:variant="variant"
		:color="color"
		:height="height"
	/>
</template>

<style scoped>
.or-button {
	width: fit-content;
	text-transform: initial;
}
</style>
