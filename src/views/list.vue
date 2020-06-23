<template>
	<div id="view-voca">
		<show-list></show-list>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

import showList from "../components/list.vue";
export default defineComponent({
	name: "view-list",
	components: {
		showList
	},
});
</script>

<style lang="scss"></style>
