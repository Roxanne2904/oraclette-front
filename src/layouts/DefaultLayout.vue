<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import AppBarLayout from "@/layouts/AppBarLayout.vue";
import BottomNavigationLayout from "@/layouts/BottomNavigationLayout.vue";
import FooterLayout from "@/layouts/FooterLayout.vue";
import ViewLayout from "@/layouts/ViewLayout.vue";

const isMobile = ref(false);

const checkDeviceType = () => {
	isMobile.value = window.innerWidth <= 1024;
};

onMounted(() => {
	checkDeviceType();
	window.addEventListener("resize", checkDeviceType);
});

onUnmounted(() => {
	window.removeEventListener("resize", checkDeviceType);
});
</script>

<template>
	<v-app>
		<app-bar-layout v-if="!isMobile" />
		<view-layout />
		<bottom-navigation-layout v-if="isMobile" />
		<footer-layout />
	</v-app>
</template>
