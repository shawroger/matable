import { Config } from "./type";

export function formColumns(item: Config["config"][0]) {
	const { label, sort } = item;

	return {
		name: label,
		title: label,
		align: "center",
		sortable: sort,
	};
}

export function formModes(item: Config["config"]) {
	return item.map((val) => ({
		name: val.label,
		mode: val.mode,
		val: "",
		isText: typeof val.mode === "string",
		isSelect: Array.isArray(val.mode),
		equal: val.mode === "[=]" || Array.isArray(val.mode),
	}));
}
