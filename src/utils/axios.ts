import axios from "axios";
import store from "../store";
import { csvToJson } from "rexine";

export function getAllData(force: boolean = false) {
	const config = store.state.config;

	if (config.length <= Object.keys(store.state.data).length && !force) {
		return;
	}

	config.forEach(async (item, index) => {
		const res = await axios.get(item.data);
		const data = csvToJson(
			res.data,
			item.config.map((val) => val.label)
		);
		// if (item.index) {
		// 	data.forEach((val, index) => (val["$_id"] = index));
		// }
		store.state.data = {
			...store.state.data,
			[String(index)]: data,
		};
	});
}
