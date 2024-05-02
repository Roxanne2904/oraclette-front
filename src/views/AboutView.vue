<script setup>
const teams = [
	{
		name: "Arthur",
		avatar: "/assets/images/team/arthur.webp",
		role: "Développeur front-end",
	},
	{
		name: "Baptiste",
		avatar: "/assets/images/team/baptiste.webp",
		role: "Développeur front & back-end",
	},
	{
		name: "Roxanne",
		avatar: "/assets/images/team/roxanne.webp",
		role: "Développeuse front & back-end",
	},
	{
		name: "Leo",
		avatar: "/assets/images/team/leo.webp",
		role: "Développeur back-end",
	},
	{
		name: "Peter",
		avatar: "/assets/images/team/peter.webp",
		role: "Développeur back-end",
	},
];
</script>

<template>
	<v-container
		fluid
		class="py-12"
	>
		<v-row>
			<v-col
				cols="12"
				md="10"
				lg="8"
				class="mx-auto"
			>
				<v-container
					fluid
					class="d-flex flex-column pa-0 ga-6"
				>
					<v-row class="flex-column flex-lg-row align-center ga-4">
						<v-col class="d-flex flex-column ga-2">
							<h1>L'application <span class="text-primary">O'Raclette</span></h1>
							<p>
								Bienvenue chez O'Raclette, la plateforme qui met à l'honneur le pouvoir
								rassembleur de la raclette. Nous croyons en l'idée que derrière chaque
								morceau de fromage fondant se cache une opportunité de connexion
								humaine. O'Raclette va au-delà de l'amour pour ce plat traditionnel
								suisse ; c'est une célébration de l'amitié, du partage, et de la joie
								qui naissent lorsque des personnes se réunissent autour de la table pour
								savourer ce délice fromager. Plongez dans notre communauté où la
								raclette devient le prétexte parfait pour créer des liens authentiques,
								vivre des expériences gourmandes et construire des souvenirs mémorables.
							</p>
						</v-col>
						<v-col>
							<v-img
								max-width="350"
								class="mx-auto"
								src="/assets/images/logo.svg"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col class="d-flex flex-column ga-2">
							<h2>La raison d'être de <span class="text-primary">O'Raclette</span></h2>
							<p>
								O'Raclette trouve son origine dans la conviction que les meilleures
								relations naissent souvent autour d'une table garnie de fromages et
								d'accompagnements délicieux. La création de cette application découle de
								la volonté de transformer le simple acte de manger en une expérience
								sociale significative. O'Raclette a pour mission de faciliter la
								rencontre entre les amateurs de raclette, de rendre l'organisation de
								soirées conviviales plus accessible, et d'encourager les échanges
								passionnés autour de ce plat réconfortant. Nous croyons fermement que la
								raclette peut être bien plus qu'un repas ; elle peut être le catalyseur
								de connexions authentiques et de moments joyeux. Avec O'Raclette, chaque
								instant partagé autour de ce festin de fromages devient une occasion de
								célébrer le plaisir simple de la compagnie et de créer des liens
								durables.
							</p>
						</v-col>
					</v-row>
				</v-container>
			</v-col>
		</v-row>
	</v-container>
	<v-container
		fluid
		class="bg-grey-200 py-12"
	>
		<v-row>
			<v-col
				cols="12"
				md="10"
				lg="8"
				class="d-flex flex-column ga-2 mx-auto"
			>
				<h2>L'équipe</h2>
				<div class="or-team-list">
					<v-card
						v-for="member in teams"
						rounded
						width="100%"
						max-width="250"
						elevation="0"
						color="transparent"
						class="mx-auto"
					>
						<v-img
							width="100%"
							cover=""
							:src="member.avatar"
						/>
						<v-list-item
							:title="member.name"
							:subtitle="member.role"
							class="pa-4"
						/>
					</v-card>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
.or-about-container {
	background: linear-gradient(rgba(var(--v-theme-grey-100), 0.5),
			rgba(var(--v-theme-grey-900), 0.5)),
		url("/assets/images/raclette-party-1.jpg");
	background-attachment: fixed;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

.or-team-list {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	justify-content: center;
	gap: 1rem;
}

@media only screen and (min-width: 768px) {
	.or-team-list {
		grid-template-columns: repeat(3, 1fr);
	}
}

@media only screen and (min-width: 1024px) {
	.or-team-list {
		gap: 1.5rem;
		grid-template-columns: repeat(4, 1fr);
	}
}

@media only screen and (min-width: 1280px) {
	.or-team-list {
		grid-template-columns: repeat(5, 1fr);
	}
}
</style>
