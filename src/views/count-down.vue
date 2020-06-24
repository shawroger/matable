<template>
	<div id="view-count-down">
       <count-down-show></count-down-show>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import countDownShow from "../components/count-down.vue";

export default defineComponent({
	name: "view-count-down",
	components: {
		countDownShow
	},
});
</script>

<style lang="scss"></style>
