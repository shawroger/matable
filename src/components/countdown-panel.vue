<template>
	<div id="countdown-panel">
		<mu-container>
			<mu-card>
				<h2 class="countdown-title">{{ name }}</h2>
				<mu-linear-progress></mu-linear-progress>
				<slot></slot>
				<mu-row gutter class="sm-center" v-if="show">
					<mu-col span="6" sm="6" lg="3" xl="3" class="d-flex-center">
						<mu-paper class="demo-paper" circle :z-depth="3">
							<h2 class="text-countdown">{{ countDownData.day }} 天</h2>
						</mu-paper>
					</mu-col>

					<mu-col span="6" sm="6" lg="3" xl="3" class="d-flex-center">
						<mu-paper class="demo-paper" circle :z-depth="3">
							<h2 class="text-countdown">{{ countDownData.hour }} 时</h2>
						</mu-paper>
					</mu-col>

					<mu-col span="6" sm="6" lg="3" xl="3" class="d-flex-center">
						<mu-paper class="demo-paper" circle :z-depth="3">
							<h2 class="text-countdown">{{ countDownData.minute }} 分</h2>
						</mu-paper>
					</mu-col>

					<mu-col span="6" sm="6" lg="3" xl="3" class="d-flex-center">
						<mu-paper class="demo-paper" circle :z-depth="3">
							<h2 class="text-countdown">{{ countDownData.second }} 秒</h2>
						</mu-paper>
					</mu-col>
				</mu-row></mu-card
			>
		</mu-container>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import { useCountDown } from "../utils/hooks";

export default defineComponent({
	name: "countdown-panel",
	props: {
		name: {
			required: true,
			type: String,
		},
		date: {
			required: true,
			type: String,
		},
		show: {
			default: true,
			type: Boolean,
		},
	},

	setup(props, ctx) {
		const countDownData = useCountDown(props.date);
		return {
			countDownData,
		};
	},
});
</script>

<style lang="scss">
#countdown-panel {

	margin-top: 35px;
	h2 {
		font-size: 1.5rem;
		font-weight: 200;
		&.text-title {
			padding-left: 15px;
			padding-bottom: 5px;
		}
		&.text-countdown {
			font-size: 1.8rem;
			font-weight: 400;
		}
		@media screen and (max-width: 768px) {
			font-size: 1.2rem;
			&.text-title {
				text-align: center;
				padding-left: 0px;
			}
		}
	}

	.d-flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		.mu-card {
			width: 70%;
			padding: 25px 0px;
			@media screen and (max-width: 1200px) {
				width: 80%;
			}
			@media screen and (max-width: 768px) {
				width: 95%;
			}

			h2.countdown-title,
			.mu-linear-progress {
				transform: translateY(-20px);
				text-align: center;
				font-weight: 300;
			}
			.mu-paper {
				width: 10rem;
				height: 10rem;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 1rem 0;
				cursor: pointer;
				&:hover {
					transform: scale(1.1);
				}
				@media screen and (max-width: 768px) {
					width: 7rem;
					height: 7rem;
					margin: 1.2rem 0;
				}
			}
		}
	}
}
</style>
