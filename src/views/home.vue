<template>
	<div id="view-home">
		<home-display></home-display>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import homeDisplay from "../components/display.vue";

export default defineComponent({
	name: "view-home",
	components: {
		homeDisplay
	},
});
</script>

<style lang="scss"></style>
