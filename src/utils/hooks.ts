import { computed, SetupContext, reactive } from "@vue/composition-api";
import { IStore } from "../store";
import { formColumns, formModes } from "./format";

export function getCurrentConfig(ctx: SetupContext) {
	const index = computed(() => ctx.root.$store.state.index as number);
	const data = computed(() => ctx.root.$store.state.data as IStore["data"]);
	const config = computed(
		() => ctx.root.$store.state.config as IStore["config"]
	);
	const currentConfig = computed(
		() => config.value[index.value] || config.value[0]
	);

	return {
		data,
		index,
		config,
		currentConfig,
	};
}

export function getTableData(ctx: SetupContext) {
	const { index, data, currentConfig } = getCurrentConfig(ctx);
	const tableData = computed({
		get: () => data.value[String(index.value)] ?? [],
		set: (val) => {
			data.value[String(index.value)] = val;
		},
	});
	const labelList = computed(() =>
		currentConfig.value.config.map((item) => item.label)
	);
	const columns = computed(() => {
		let result = currentConfig.value.config.map((item) => formColumns(item));
		if (currentConfig.value.index) {
			result = [
				{
					name: "#",
					title: "#",
					align: "center",
					sortable: false,
				},
				...result,
			];
		}

		return result;
	});

	const searchMode = reactive(formModes(currentConfig.value.config));

	return {
		columns,
		tableData,
		labelList,
		searchMode,
	};
}
