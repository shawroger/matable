import Vue from "vue";

/* v-no-drag */
Vue.directive("no-drag", {
	bind(el) {
		el.ondragstart = () => false;
	},
});

/* v-clickoutside */

interface ClickOutSideElement extends HTMLElement {
	clickOutside?: (e: MouseEvent) => void
}
Vue.directive("clickoutside", {
	bind(el: ClickOutSideElement, binding) {
		const documentHandler = (e: MouseEvent) => {
			if (el.contains(e.target as Node)) return;

			binding.value(e.target);
		};
		el.clickOutside = documentHandler;
		document.addEventListener("click", documentHandler);
	},
	unbind(el: ClickOutSideElement) {
		document.removeEventListener("click", el.clickOutside!);
		delete el.clickOutside;
	},
});
