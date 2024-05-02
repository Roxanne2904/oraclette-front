<script setup>
import { computed, watch, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "@/store/UserStore.js";

const router = useRouter();
const userStore = useUserStore();

const drawer = ref(false);
const group = ref(null);

const isLogged = computed(() => userStore.getLoginStatus);

watch(group, () => {
	drawer.value = false;
});
</script>

<template>
	<v-app-bar flat class="or-app-bar">
		<v-toolbar class="px-2 bg-secondary or-toolbar">
			<v-toolbar-title>
				<router-link title="Retour à l'accueil" to="/">
					<img
						src="/assets/icons/favicon.svg"
						class="or-logo"
					/>
				</router-link>
			</v-toolbar-title>
			<v-toolbar-items class="d-flex ga-1">
				<v-btn
					text="Accueil"
					height="fit-content"
					class="or-main-nav-button"
					@click="() => router.push({ name: 'Home' })"
				/>
				<v-btn
					text="Évènements"
					height="fit-content"
					class="or-main-nav-button"
					@click="
						() => router.push({ name: 'Events' })
					"
				/>
				<v-btn
					v-if="isLogged"
					text="Profil"
					height="fit-content"
					class="or-main-nav-button"
					@click="
						() => router.push({ name: 'Profile' })
					"
				/>
				<v-btn
					v-if="!isLogged"
					text="Inscription"
					height="fit-content"
					class="bg-primary or-main-nav-button"
					@click="
						() =>
							router.push({
								name: 'Register',
							})
					"
				/>
				<v-btn
					v-if="!isLogged"
					text="Connexion"
					border="2"
					height="fit-content"
					class="border-primary or-main-nav-button"
					@click="() => router.push({ name: 'Login' })"
				/>
			</v-toolbar-items>
		</v-toolbar>
	</v-app-bar>
</template>

<style scoped>
.or-app-bar,
.or-toolbar {
	overflow: visible;
}

.or-logo {
	position: absolute;
	width: 65px;
	padding: 0.75rem;
	left: 1%;
	top: 25%;
	z-index: 1;
	border-radius: 999px;
	background-color: rgb(var(--v-theme-secondary));
}

.or-main-nav-button {
	height: fit-content;
	align-self: center;
	padding: 0.5rem 1rem;
}
</style>
