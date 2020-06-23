<template>
	<div id="home-display">
		<mu-container>
			<mu-card>
				<mu-expansion-panel :zDepth="0" @change="isSearch = !isSearch">
					<div slot="header">切换{{ isSearch ? "数据" : "检索" }}</div>
					<div class="search-cols">
						<template v-for="item in searchMode">
							<mu-text-field
								v-model="item.val"
								v-if="item.isText"
								:key="item.name"
								:placeholder="
									'在' +
										item.name +
										'中检索 ' +
										(item.equal ? '（全字匹配）' : '（部分匹配）')
								"
							></mu-text-field>

							<mu-select
								v-if="item.isSelect"
								v-model="item.val"
								:key="item.name"
							>
								<mu-option
									:label="'在' + item.name + '中检索 '"
									value=""
								></mu-option>
								<mu-option
									v-for="option in item.mode"
									:key="item.name + '@' + option.key"
									:label="option.key"
									:value="option.val"
								></mu-option>
							</mu-select>
						</template>
						
						<mu-card-actions>
							<mu-button @click="resetSearchMode">重置</mu-button>
						</mu-card-actions>
					</div>
				</mu-expansion-panel>
				<template v-if="!isSearch">
					<mu-divider></mu-divider>
					<mu-data-table
						:columns="columns"
						:data="pageData.slice(page * 10 - 10, page * 10)"
						:sort.sync="sortTemp"
						@sort-change="sortData"
					>
						<template #default="scope">
							<td v-if="currentConfig.index" class="is-center">
								{{ scope.$index + page * 10 - 9 }}
							</td>
							<td v-for="item in labelList" :key="item" class="is-center">
								{{ scope.row[item] }}
							</td>
						</template>
					</mu-data-table>
					<div class="page-slider">
						<mu-slider
							:step="1"
							:min="1"
							:max="pageCount"
							v-model="page"
						></mu-slider>
					</div>
					<mu-card-actions>
						<mu-button flat :disabled="page <= 1" @click="page = page - 1"
							><mu-icon value="arrow_back"></mu-icon
						></mu-button>
						<p>{{ page }} / {{ pageCount }}</p>
						<mu-button
							flat
							:disabled="page >= pageCount"
							@click="page = page + 1"
							><mu-icon value="arrow_forward"></mu-icon
						></mu-button>
					</mu-card-actions> </template></mu-card
		></mu-container>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	reactive,
	ref,
	computed,
	watch,
	onUnmounted,
} from "@vue/composition-api";
import { getTableData, getCurrentConfig } from "../utils/hooks";

export default defineComponent({
	name: "home-display",
	setup(props, ctx) {
		const page = ref(1);
		const isSearch = ref(false);
		const pageCount = computed(() =>
			Math.ceil(pageData.value.length / 10) > 0
				? Math.ceil(pageData.value.length / 10)
				: 1
		);

		const sortTemp = reactive({
			name: "",
			order: "asc",
		});

		const { currentConfig } = getCurrentConfig(ctx);
		const { columns, tableData, labelList, searchMode } = getTableData(ctx);

		const pageData = computed({
			get: () => {
				let result = tableData.value;

				searchMode.forEach((item) => {
					if (item.mode === null || item.val === "") return;
					if (item.equal) {
						result = result.filter(
							(val) => String(val[item.name]) === String(item.val)
						);
					} else {
						result = result.filter((val) =>
							String(val[item.name]).includes(String(item.val))
						);
					}
				});
				return result;
			},
			set: (val) => val,
		});

		const watchPageCount = watch([() => pageCount.value], () => {
			page.value = 1;
		});

		onUnmounted(() => watchPageCount());

		function sortData(params: { name: string; order: "asc" | "desc" }) {
			const { name, order } = params;

			pageData.value = pageData.value.sort((a: any, b: any) =>
				order === "asc" ? a[name] - b[name] : b[name] - a[name]
			);
		}

		function resetSearchMode() {
			searchMode.forEach((item) => {
				item.val = "";
			});
			page.value = 1;
		}
		
		return {
			page,
			pageData,
			pageCount,
			isSearch,
			columns,
			sortData,
			labelList,
			sortTemp,
			searchMode,
			currentConfig,
			resetSearchMode,
		};
	},
});
</script>

<style lang="scss">
#home-display {
	padding-top: 99px;

	@media screen and (max-width: 768px) {
		padding-top: 90px;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		.mu-card {
			width: 65%;
			@media screen and (max-width: 1200px) {
				width: 80%;
			}
			@media screen and (max-width: 768px) {
				width: 95%;
			}

			.search-cols {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				.mu-input {
					width: 85%;
				}
			}

			.mu-card-actions {
				display: flex;
				justify-content: space-around;
			}

			.page-slider {
				display: flex;
				justify-content: center;
				transform: translateY(20px);
				.mu-slider {
					width: 80%;
				}
			}
		}
	}

	.mu-table {
		width: 100%;
	}
}
</style>
