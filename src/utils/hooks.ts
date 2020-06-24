import {
	computed,
	SetupContext,
	ref,
	onMounted,
	toRefs,
	reactive,
	onUnmounted
} from "@vue/composition-api";
import { formColumns, formModes } from "./format";
import { IStore } from "../store";

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
		currentConfig.value.config
			.filter((item) => item.able)
			.map((item) => item.label)
	);
	const columns = computed(() => {
		let result = currentConfig.value.config
			.filter((item) => item.able)
			.map((item) => formColumns(item));
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

	const searchMode = ref(formModes(currentConfig.value.config));

	return {
		columns,
		tableData,
		labelList,
		searchMode,
	};
}

export function useCountDown(target: string, useFullDay: boolean = true) {
	let timeHandler: number;
	const targetDate = new Date(target).getTime();

	const monthAddToDay = (month: number) => {
		let result: number = 0;
		const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		for (let i = 0; i < month; i++) {
			result += monthDays[i];
		}

		return result;
	};
	const compareDate = () => {
		const today = new Date().getTime();
		const compareTime = new Date(targetDate - today);
		return {
			month: compareTime.getMonth() + 1,
			day: useFullDay
				? monthAddToDay(compareTime.getMonth()) + compareTime.getDate() - 1
				: compareTime.getDate(),
			hour: compareTime.getDate(),
			minute: compareTime.getMinutes(),
			second: compareTime.getSeconds(),
		};
	};

	const countDown = reactive({
		month: 0,
		day: 0,
		hour: 0,
		minute: 0,
		second: 0,
	});

	onMounted(() => {
		timeHandler = setInterval(() => {
			const getCompareDate = compareDate();
			countDown.month = getCompareDate.month;
			countDown.day = getCompareDate.day;
			countDown.hour = getCompareDate.hour;
			countDown.minute = getCompareDate.minute;
			countDown.second = getCompareDate.second;
		});
	});

	onUnmounted(() => {
		clearInterval(timeHandler);
	});

	return {
		...toRefs(countDown),
	};
}
 