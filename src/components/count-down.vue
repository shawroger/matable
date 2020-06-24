<template>
	<div id="count-down-show">
		<template v-if="countDownList.length > 0"
			><count-down-panel
				v-for="item in countDownList"
				:key="item.name"
				:date="item.date"
				:name="item.name"
			></count-down-panel></template
		><template v-else>
			<count-down-panel
				key="$defaultCountDown"
				name="暂未设置倒计时"
				:show="false"
				date=""
			>
				<center>
					<img
						alt="默认贴图"
						v-no-drag
						style="width: 60%"
						src="https://pic.downk.cc/item/5ef2adba14195aa594aeb27e.png"
					/>
				</center>
			</count-down-panel>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import countDownPanel from "./countdown-panel.vue";

export default defineComponent({
	name: "count-down-show",
	components: {
		countDownPanel,
	},
	setup(props, ctx) {
		const countDownList = computed(
			() => ctx.root.$store.state.globalConfig.countdown
		);

		document.title = ctx.root.$store.state.globalConfig.title;

		return {
			countDownList,
		};
	},
});
</script>

<style lang="scss">
#count-down-show {
	padding-top: 64px;

	@media screen and (max-width: 768px) {
		padding-top: 55px;
	}
}
</style>
