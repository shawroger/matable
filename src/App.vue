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

import { getCurrentConfig } from "./utils/hooks";
import { getAllData } from "./utils/axios";

export default defineComponent({
	name: "app",
	components: {
		appNav,
		appFooter,
	},
	setup(props, ctx) {
		const { index } = getCurrentConfig(ctx);
		if (ctx.root.$route.query.index !== String(index.value)) {
			ctx.root.$router.push({ query: { index: String(index.value) } });
		}

		getAllData();
	},
});
</script>

<style lang="scss"></style>
