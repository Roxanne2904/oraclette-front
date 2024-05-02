<script setup>
import { toRefs, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
	label: {
		type: String,
		default: "Button",
		required: true,
	},
	route: {
		type: String,
		required: false,
	},
	type: {
		type: String,
		default: "button",
		required: false,
	},
	isPrimary: {
		type: Boolean,
		default: true,
		required: false,
	},
});

const { label, route, type, isPrimary } = toRefs(props);

const classnameWithBg = computed(() =>
	isPrimary.value ? "bg-primary" : "bg-secondary"
);
</script>

<template>
	<v-btn
		:type="type"
		:class="`${classnameWithBg} or-button text-uppercase`"
		flat
		@click="router.push({ name: route })"
		:text="label"
	/>
</template>

<style scoped>
.or-button {
	width: fit-content;
	text-transform: initial;
}
</style>
