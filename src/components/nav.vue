<template>
	<div id="app-nav">
		<mu-appbar
			style="position: fixed; width: 100%; z-index: 10"
			color="primary"
		>
			<mu-button icon slot="left" @click="open = !open">
				<mu-icon :value="open ? 'close' : 'menu'"></mu-icon>
			</mu-button>
			{{ currentConfig.title }}
		</mu-appbar>
		<mu-drawer :open.sync="open" v-clickoutside="clickOutside">
			<mu-list @click="open = false">
				<mu-list-item
					button
					:to="{ name: item.name, query: { index } }"
					v-for="item in routes"
					:key="item.name"
					:exact="false"
					:class="[$route.name === item.name ? 'link-active' : '']"
				>
					<mu-list-item-action>
						<mu-icon :value="item.meta.icon"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>{{ item.meta.name }}</mu-list-item-title>
				</mu-list-item>
			</mu-list>
		</mu-drawer>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/composition-api";
import { getCurrentConfig } from "../utils/hooks";
import { routes } from "../plugin/router";
import { IStore } from "../store";

export default defineComponent({
	name: "app-nav",
	setup(props, ctx) {
		const open = ref(false);
		const { currentConfig, index } = getCurrentConfig(ctx);

		function clickOutside(e: HTMLElement) {
			if (e.className !== "mu-ripple-wrapper") {
				open.value = false;
			}
		}

		return {
			open,
			index,
			routes,
			currentConfig,
			clickOutside,
		};
	},
});
</script>

<style lang="scss">
#app-nav {
	.mu-drawer {
		z-index: 1;
		padding-top: 66px;
		background-color: #fafafa;
		border-right: solid thin lightgrey;
		@media screen and (max-width: 600px) {
			padding-top: 58px;
		}
		.link-active {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
}
</style>
