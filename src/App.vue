<template>
	<div id="app">
		<app-nav></app-nav>

		<router-view></router-view>

		<app-footer></app-footer>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import appNav from "./components/nav.vue";
import appFooter from "./components/footer.vue";

import { getAllData } from "./utils/axios";

export default defineComponent({
	name: "app",
	components: {
		appNav,
		appFooter,
	},
	setup() {
		getAllData();
	},
});
</script>

<style lang="scss"></style>
