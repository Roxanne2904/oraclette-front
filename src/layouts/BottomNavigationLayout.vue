<script setup>
import { useUserStore } from "@/store/UserStore.js";
import { computed } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const isLogged = computed(() => userStore.getLoginStatus);

const router = useRouter();
</script>

<template>
	<v-bottom-navigation
		:elevation="3"
		active
		bg-color="secondary"
	>
		<v-btn
			class="or-bottom-nav-button"
			value="home"
			@click="router.push({ name: 'Home' })"
		>
			<v-icon>mdi-home</v-icon>
			<span>Accueil</span>
		</v-btn>
		<v-btn
			class="or-bottom-nav-button"
			value="events"
			@click="router.push({ name: 'Events' })"
		>
			<v-icon>mdi-calendar-blank</v-icon>
			<span>Événements</span>
		</v-btn>
		<v-btn
			class="or-bottom-nav-button"
			v-if="isLogged"
			value="profile"
			@click="router.push({ name: 'Profile' })"
		>
			<v-icon>mdi-account</v-icon>
			<span>Profil</span>
		</v-btn>
		<v-btn
			class="or-bottom-nav-button"
			v-else
			value="login"
			@click="router.push({ name: 'Login' })"
		>
			<v-icon>mdi-login</v-icon>
			<span>Connexion</span>
		</v-btn>
	</v-bottom-navigation>
</template>

<style scoped>
.or-bottom-nav-button {
	flex: 1;
}
</style>