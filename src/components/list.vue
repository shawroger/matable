<template>
	<div id="show-list">
		<mu-container>
			<mu-card>
				<mu-card-title title="所有数据列表"></mu-card-title>
				<mu-divider></mu-divider>
				<mu-list>
					<mu-list-item
						button
						v-for="(item, index) in config"
						:key="item.data"
						:to="{ name: 'home', query: { index } }"
					>
						<mu-list-item-action>
							<mu-icon value="grade"></mu-icon>
						</mu-list-item-action>
						<mu-list-item-title>{{ item.title }}</mu-list-item-title>
					</mu-list-item>
				</mu-list></mu-card
			>
		</mu-container>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { getCurrentConfig } from "../utils/hooks";

export default defineComponent({
	name: "show-list",
	setup(props, ctx) {
		const { config } = getCurrentConfig(ctx);
		return {
			config
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
