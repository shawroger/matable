<template>
	<div id="app-footer">
		<p v-if="currentConfig.footer">
			<a href="https://github.com/shawroger/matable">Matable</a> &copy;
			{{ year }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { getCurrentConfig } from "../utils/hooks";

export default defineComponent({
	name: "app-footer",
	setup(props, ctx) {
		const year = new Date().getFullYear();
		const { currentConfig } = getCurrentConfig(ctx);
		return {
			year,
			currentConfig,
		};
	},
});
</script>

<style lang="scss">
#app-footer {
	text-align: center;
	color: gray;
	padding: 20px;

	a {
		color: grey;
		&:hover {
			color: orange;
		}
	}
}
</style>
