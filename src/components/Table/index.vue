<script lang="ts" setup>
	import { OptionType, Props } from "./type";
	import { useSlots } from "vue";

	const props = withDefaults(defineProps<Props>(), {
		data: () => [],
		option: () => [],
		border: true,
		stripe: false,
		emptyData: "-",
		highlightCurrentRow: false,
		selectKey: "",
		noSelectableList: () => [],
		isExpand: false,
		showSummary: false,
		summaryList: () => [],
		isPage: false,
		loading: false,
		pageOption: () => {
			return {
				pageCurrent: 1,
				pageSize: 10,
				pageTotal: 0,
				size: "default",
				background: true,
				align: "right"
			};
		},
		pageSizes: () => [10, 20, 30, 40, 50, 100, 200, 500]
	});

	const emit = defineEmits(["current-table-change", "selection-table-change", "current-page-change"]);

	// 多选框配置项
	const selectionOption = computed(() => {
		return props.option.find((item) => item.type === "selection");
	});
	//  序号配置项
	const indexOption = computed(() => {
		return props.option.find((item) => item.type === "index");
	});
	const indexMethod = (index: number) => {
		return index + 1 + props.pageOption.pageSize * (props.pageOption.pageCurrent - 1);
	};
	// 其他配置项
	const otherOption = computed(() => {
		return props.option.filter((item) => !item.type);
	});

	// 配置是否支持可选择的行
	const selectable = (row: any) => !props.noSelectableList.includes(row[props.selectKey]);

	// 选中某一个表格行
	const handleCurrentChange = (val: OptionType) => {
		emit("current-table-change", val);
	};
	// 选中多个表格行
	const handleSelectionChange = (val: any) => {
		emit("selection-table-change", val);
	};

	// 表格合计行的计算方法
	let rows = ref(0);
	const getSummaries = (param: any) => {
		const { columns, data } = param;
		const sums: any = [];
		let colspan = 0;
		columns.forEach((column: any, index: number) => {
			if (index === 0) sums[index] = "合计";
			if (column.type !== "default") colspan++;
			if (props.summaryList.includes(column.property)) {
				const values = data.map((item: any) => Number(item[column.property]));
				if (!values.every((value: any) => isNaN(value))) {
					sums[index] = values.reduce((prev: any, curr: any) => {
						const value = Number(curr);
						if (!isNaN(value)) {
							return prev + curr;
						} else {
							return prev;
						}
					}, 0);
					sums[index] = sums[index].toFixed(2);
				} else {
					sums[index] = "";
				}
			}
		});
		rows.value = colspan;
		return sums;
	};

	// 合并行和列
	const TableRef = ref();
	const objectSpanMethod = () => {
		// 合并 合计行 中不属于表格项的列
		nextTick(() => {
			if (TableRef.value.$el && props.showSummary) {
				let current = TableRef.value.$el.querySelector(".el-table__footer");
				let cell = current.rows[0].cells;
				cell[0].style.textAlign = "center";
				cell[1].style.display = "none";
				cell[0].colspan = rows.value;
			}
		});
		return {
			rowspan: 1,
			colspan: 1
		};
	};

	// 切换当前页
	const pageCurrentChange = (val: number) => {
		emit("current-page-change", val);
	};
	// 切换每页显示条数
	const pageSizeChange = () => {
		emit("current-page-change", 1);
	};
</script>

<template>
	<div class="table">
		<!-- 操作表格 -->
		<div class="operation" v-if="!!useSlots().operation">
			<slot name="operation"></slot>
		</div>
		<!-- 表格 -->
		<el-table
			ref="TableRef"
			:data="data"
			:border="border"
			:stripe="stripe"
			style="width: 100%"
			:row-key="rowKey"
			:height="maxHeight"
			v-loading="loading"
			:maxHeight="maxHeight"
			:show-summary="showSummary"
			:summary-method="getSummaries"
			:span-method="objectSpanMethod"
			@current-change="handleCurrentChange"
			@selection-change="handleSelectionChange"
			:highlight-current-row="highlightCurrentRow"
		>
			<!-- 自定义展开行 -->
			<el-table-column v-if="isExpand" type="expand">
				<template #default="{ row }">
					<slot name="expand" :row="row" />
				</template>
			</el-table-column>
			<!-- 多选框 -->
			<el-table-column v-if="selectionOption" type="selection" :selectable="selectable" :width="selectionOption.width" :align="selectionOption.align" />
			<!-- 序号 -->
			<el-table-column
				v-if="indexOption"
				type="index"
				:label="indexOption.label"
				:width="indexOption.width"
				:align="indexOption.align"
				:index="indexMethod"
			></el-table-column>
			<!-- 其他表格项 -->
			<el-table-column
				v-for="item in otherOption"
				:key="item.prop"
				:prop="item.prop"
				:label="item.label"
				:width="item.width"
				:align="item.align"
				:fixed="item.fixed"
				:sortable="item.sortable"
				:show-overflow-tooltip="item.showOverflowTooltip"
				:formatter="item.formatter"
			>
				<template #default="{ row }">
					<slot v-if="item.slot && item.slot != 'action'" :name="item.slot" :row="row">
						<span v-text="row[item.prop as string] || emptyData"></span>
					</slot>
					<div v-else-if="item.slot === 'action'" class="action">
						<slot name="action" :row="row"></slot>
					</div>
					<span v-else v-text="row[item.prop as string] || emptyData"></span>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="pagination" v-if="isPage" :style="{ justifyContent: pageOption.align }">
			<el-pagination
				v-model:current-page="pageOption.pageCurrent"
				v-model:page-size="pageOption.pageSize"
				:total="pageOption.pageTotal"
				:size="pageOption.size"
				:background="pageOption.background"
				:page-sizes="pageSizes"
				layout="total, sizes, prev, pager, next, jumper"
				@current-change="pageCurrentChange"
				@size-change="pageSizeChange"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.table {
		display: flex;
		flex-direction: column;
		gap: 20px;
		.el-table {
			:deep(th.el-table__cell) {
				background-color: #eeeeee;
				color: #666666;
				.cell {
					font-weight: 600;
				}
			}
		}
		.pagination {
			display: flex;
		}
		.action {
			display: flex;
			justify-content: space-around;
		}
	}
</style>
