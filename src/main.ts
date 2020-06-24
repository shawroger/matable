import Vue from "vue";
import App from "./App.vue";

import "./plugin/muse-ui";
import "./plugin/directives";
import "./plugin/composition-api";

import store, { IStore } from "./store";
import router from "./plugin/router";
import { Config, mergeOptions } from "./utils/type";

Vue.config.productionTip = false;

class Matable {
	vue = Vue;
	VERSION = "1.2.6";
	options: Config[] = [];

	constructor(public globalConfig?: IStore["globalConfig"]) {}

	/**
	 * @param config 用户的配置
	 */
	add(config: Config | Config[]) {
		if (!Array.isArray(config)) {
			this.options.push(mergeOptions(config));
		} else {
			config.forEach((item) => this.options.push(mergeOptions(item)));
		}
		return this;
	}

	/**
	 * @param target 待渲染节点
	 */
	render(target: string) {
		/**
		 * 在 vuex 中混入配置数据
		 */
		store.state.config = this.options;

		if (
			typeof this.globalConfig !== "undefined" &&
			typeof this.globalConfig.title !== "undefined" &&
			typeof this.globalConfig.countdown !== "undefined"
		) {
			store.state.globalConfig = {
				...store.state.globalConfig,
				...this.globalConfig,
			};
		}

		new this.vue({
			store,
			router,
			render: (h) => h(App),
		}).$mount(target);

		return this;
	}
}

export const init = (globalConfig?: IStore["globalConfig"]) =>
	new Matable(globalConfig);

if (process.env.NODE_ENV === "development") {
	(window as any).Matable = { init };
}
