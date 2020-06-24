import Vue from "vue";
import Vuex from "vuex";

import { Config } from "../utils/type";

Vue.use(Vuex);

type ITableData = Array<{ [p: string]: string }>;

export interface IStore {
	data: {
		[p: string]: ITableData;
	};
	config: Config[];
	index: number;
	globalConfig: {
		title?: string;
		countdown?: {
			name: string,
			date: string
		}[];
	};
}

export default new Vuex.Store<IStore>({
	state: {
		data: {},
		config: [],
		index: 0,
		globalConfig: {
			title: document.title,
			countdown: [],
		},
	},
	actions: {},
	modules: {},
});
