<template>
	<div id="show-list">
		<mu-container>
			<mu-card class="input-text">
				<mu-auto-complete
					:data="searchName"
					v-model="text"
					placeholder="搜素数据表名称"
				>
					<template #append v-if="text.length > 0">
						<span class="clear-text" @click="text = ''">✖</span>
					</template>
				</mu-auto-complete>
			</mu-card></mu-container
		>

		<div class="card-divide"></div>

		<mu-container>
			<mu-card>
				<mu-card-title title="所有数据列表"></mu-card-title>
				<mu-divider></mu-divider>
				<mu-list>
					<mu-list-item
						button
						v-for="item in searchResult"
						:key="item.data"
						:to="{ name: 'home', query: { index: item.$index } }"
					>
						<mu-list-item-action>
							<mu-icon value="grade"></mu-icon>
						</mu-list-item-action>
						<mu-list-item-title>{{ item.title }}</mu-list-item-title>
						<mu-list-item-action>
							<mu-list-item-after-text
								>{{
									$store.state.data[item.$index]
										? $store.state.data[item.$index].length
										: "??"
								}}
								列</mu-list-item-after-text
							>
						</mu-list-item-action>
					</mu-list-item>
				</mu-list></mu-card
			>
		</mu-container>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/composition-api";
import { getCurrentConfig } from "../utils/hooks";

export default defineComponent({
	name: "show-list",
	setup(props, ctx) {
		const text = ref("");
		const { config } = getCurrentConfig(ctx);
		const searchName = computed(() => config.value.map((item) => item.title));
		const searchResult = computed(() =>
			config.value
				.map((item, index) => ({ ...item, $index: index }))
				.filter((item) => item.title.startsWith(text.value))
		);

		document.title = ctx.root.$store.state.globalConfig.title;

		return {
			text,
			searchName,
			searchResult,
		};
	},
});
</script>

<style lang="scss">
#show-list {
	padding-top: 99px;

	@media screen and (max-width: 768px) {
		padding-top: 90px;
	}

	.card-divide {
		padding: 15px;
	}

	.mu-card-title {
		text-align: center;
	}

	.clear-text {
		cursor: pointer;
	}

	.input-text {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 15px;
		.mu-input {
			width: 85%;
		}
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		.mu-card {
			width: 65%;
			@media screen and (max-width: 1200px) {
				width: 80%;
			}
			@media screen and (max-width: 768px) {
				width: 95%;
			}

			.mu-item-action {
				display: flex;
				flex-direction: row;
				flex-shrink: 0;
				.mu-avatar {
					margin-left: 5px;
				}
			}

			.mu-card-actions {
				display: flex;
				justify-content: space-around;
			}
		}
	}
}
</style>
