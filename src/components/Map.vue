<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted } from "vue";
import { watch } from "vue";
import { useRouter } from "vue-router";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: "assets/icons/marker-icon-2x.png",
	iconUrl: "assets/icons/marker-icon.png",
	shadowUrl: "assets/icons/marker-shadow.png",
});

const props = defineProps({
	events: Array,
});

const router = useRouter();

const center = [46.928, 1.538];

let mapDiv = null;
let layerGroup = null;

L.Map.addInitHook(function () {
	mapDiv = this;
	layerGroup = L.featureGroup().addTo(mapDiv);
});

function setupLeafletMap() {
	L.map("mapContainer", {
		dragging: !L.Browser.mobile,
		tap: !L.Browser.mobile,
	}).setView(center, 6);

	L.tileLayer("https://tile.oraclette.com/tile/{z}/{x}/{y}.png", {
		maxZoom: 18,
	}).addTo(mapDiv);

	updateLeafletMap();
}

function updateLeafletMap() {
	layerGroup.clearLayers();

	props.events.forEach((event, index, array) => {
		if (event.latitude && event.longitude) {
			L.marker(L.latLng(event.latitude, event.longitude), {
				title: event.adress,
			})
				.addTo(layerGroup)
				.on("click", () =>
					router.push({ name: "EventDetail", params: { id: event.id } })
				);
		}
	});

	mapDiv.fitBounds(layerGroup.getBounds());
}

onMounted(() => setupLeafletMap());

watch(() => props.events, updateLeafletMap);
</script>

<template>
	<div id="mapContainer"></div>
</template>

<style scoped>
#mapContainer {
	width: 100%;
	height: min(50vh, 700px);
}
</style>
