import Vue from "vue";
import VueRouter from "vue-router";
import viewHome from "../views/home.vue";
import viewList from "../views/list.vue";

import store from "../store";

Vue.use(VueRouter);

export const routes = [
	{
		path: "/",
		name: "home",
		component: viewHome,
		meta: {
			name: "首页",
			icon: "home",
		},
	},
	{
		path: "/list",
		name: "list",
		component: viewList,
		meta: {
			name: "清单",
			icon: "assignment",
		},
	},
];

const router = new VueRouter({
	mode: "hash",
	routes,
});

router.beforeEach((to, from, next) => {
	const index = Number(to.query.index);
	if (0 <= index && index < store.state.config.length) {
		store.state.index = index;
	} else {
		store.state.index = 0;
	}
	next();
});

export default router;
