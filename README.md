### Vue 3 + TypeScript + Vite

> 这是一个使用 Vue 3 + TypeScript + Vite + elementPlus 构建的前端项目模板

#### 特点：

- 自动导入 Vue | vueRouter | pinia 相关的 api
- 自动导入 elementPlus 组件
- 自动导入 src/components 下面的自定义组件
- 可以使用@别名

#### 注意：

- 页面必须有唯一的根组件，因为 Transition 组件只能对单组件有效

#### 依赖：

- Vue 3：框架
- Vue Router：路由
- TypeScript：语言
- pinia：状态管理
- Vite：构建工具-数据持久化
- elementPlus：组件库
- gm-crypt：加密
- echarts：图表
- @amap/amap-jsapi-loader：高德地图
- animate.css：动画库
- axios：网络请求
- v-scale-screen：大屏自适应组件

#### 环境配置：

- 开发环境：npm run dev
- 测试环境：npm run test
- 生产环境：npm run build

#### 工具函数：

- 获取图片的地址：utils/index.ts - getImageUrl(地址)

  ```ts
  getImageUrl("logo.png");
  ```

- 时间格式化：utils/index.ts - formatDate(时间, 格式)

  ```ts
  formatDate(new Date(), "yyyy-MM-dd");
  ```

- 模糊查询数组对象中指定的属性值：utils/index.ts - fuzzySearch(数据, 关键字)

  ```ts
  fuzzySearch([{ name: "张三" }, { name: "李四" }], "name", "张三");
  ```

- 深度拷贝：utils/index.ts - deepClone(对象)

  ```ts
  deepClone({ name: "张三", age: 18 });
  ```

- 防抖：utils/index.ts - debounce(函数, 时间)

  ```ts
  debounce(() => {
  	console.log("防抖");
  }, 1000);
  ```

- 节流：utils/index.ts - throttle(函数, 时间)

  ```ts
  throttle(() => {
  	console.log("节流");
  }, 1000);
  ```

- 加密：utils/sm4.ts - encrypt(数据)
  ```ts
  encrypt("123456");
  ```
- 解密：utils/sm4.ts - decrypt(数据)
  ```ts
  decrypt("123456");
  ```

#### 自定义指令：

- 数字增长动画：v-increase = "数字"
- 图片懒加载：v-lazyImg = "图片地址"
- 防抖：v-debounce:事件 = "函数"
- 节流：v-throttle:事件 = "函数"

#### 自定义组件：不需要引入，直接使用即可，组件大写

- 表格：components/Table/index.vue

  - 使用方法：

    ```html
    <table :data="data" :option="option" :maxHeight="650" isPage>
    	<!-- 表格操作 -->
    	<template #operation>
    		<el-button type="primary" plain :icon="Plus">新增</el-button>
    		<el-button type="danger" plain :icon="Delete">删除</el-button>
    		<el-button type="info" plain :icon="Upload">导入</el-button>
    		<el-button type="warning" plain :icon="Download">导出</el-button>
    	</template>
    	<!-- 表格项操作，需要配置option上配置slot -->
    	<template #action="{ row }">
    		<el-link type="primary" :underline="false" :icon="EditPen">编辑</el-link>
    		<el-link type="danger" :underline="false" :icon="Delete">删除</el-link>
    	</template>
    </table>
    ```

  - 属性：

    ```ts
    interface Props {
    	option: OptionType[]; // 配置项
    	data: DataType[]; // 数据
    	border?: boolean; // 是否显示边框, 默认为 true
    	loading?: boolean; // 是否显示加载中, 默认为false
    	stripe?: boolean; // 是否显示斑马纹, 默认为 false
    	emptyData?: string; // 空数据默认展示内容
    	maxHeight?: string | number; // 表格最大高度
    	highlightCurrentRow?: boolean; // 是否高亮当前行, 默认为false
    	selectKey?: string; // 多选框的 key 值
    	noSelectableList?: any[]; // 禁用可选择的行, 传入多选框的 key 值['key1','key2'...], 必须搭配 selectKey 使用
    	isExpand?: boolean; // 是否展开行, 默认为 false, 需要配合具名 expand 插槽使用
    	showSummary?: boolean; // 是否显示合计行, 默认为 false
    	summaryList?: any[]; // 需要合计的表格项, 必须搭配 showSummary 使用
    	isPage?: boolean; // 是否分页, 默认为 false
    	pageOption?: PageOption; // 分页配置项
    	pageSizes?: number[]; // 每页显示条数选项, 默认为[10, 20, 30, 40, 50, 100, 200, 500]
    }
    ```

  - 事件：

    - current-table-change：选中某一个表格行时触发
    - selection-table-change：选中多个表格行时触发
    - current-page-change：当前页码改变时触发

  - 表格配置：

    ```ts
    interface OptionType {
    	type?: "index" | "selection"; // 类型：index-序号、selection-多选
    	prop?: string; // 属性名
    	label?: string; // 标签名
    	width?: string | number; // 宽度
    	align?: string; // 对齐方式
    	showOverflowTooltip?: boolean; // 是否显示溢出提示
    	slot?: string; // 插槽名
    	fixed?: "left" | "right" | boolean; // 固定位置
    	sortable?: boolean; // 是否支持排序
    	formatter?: (row: any, column: any, cellValue: any, index: number) => any; // 格式化函数
    }
    ```

  - 分页配置：

    ```ts
    interface PageOption {
    	pageCurrent: number; // 当前页码, 默认为 1
    	pageSize: number; // 每页显示条数, 默认为 10
    	pageTotal: number; // 总条数, 默认为 0
    	size?: "small" | "default" | "large"; // 分页大小,可选值为 small / default / large, 默认为 default
    	background?: boolean; // 是否显示背景, 默认为 true
    	align?: "left" | "center" | "right"; // 分页对齐方式,可选值为 left / center / right, 默认为 right
    }
    ```

- 图表：components/Echart/index.vue

  - 使用方法：
    ```html
    <Echart :options="options" @handlerClick="handlerClick" width="300px" height="300px" />
    ```
  - 属性：
    ```ts
    interface Props {
    	options: any; // 图表配置项
    	theme?: "vintage" | "chalk" | "dark" | "essos" | "infographic" | "macarons" | "purple-passion" | "roma" | "shine" | "walden" | "westeros"; // 主题
    	customTheme?: ThemeOption;
    	width?: string; // 宽度
    	height?: string; // 高度
    }
    ```
  - 事件：
    - handlerClick(row)：点击图表项时触发, difference 区别当前点击的位置(0-空白处, 1-图表项, 2-图例)
    - getEchartsRef(instance)：获取图表实例, 可以通过该实例调用图表的方法例如：加载 loading 动画等

- 高德地图：components/Map/index.vue

  - 使用方法：
    ```html
    <map :mapOptions="mapOptions" width="300px" height="300px" />
    ```
  - 属性：

    ```ts
    interface MapOptions {
    	securityJsCode: string; // 安全密钥
    	key: string; // 开发者Key
    	version?: string; // 版本号,默认2.0
    	plugins?: string[]; // 需要使用的的插件列表
    }
    interface Options {
    	viewMode?: string; // 地图模式，默认3D
    	zoom?: number; // 初始化地图级别,默认11
    	center?: number[]; // 初始化地图中心点位置,默认[116.397428, 39.90923]
    	theme?: "normal" | "dark" | "light" | "whitesmoke" | "fresh" | "grey" | "graffiti" | "macaron" | "blue" | "darkblue" | "wine"; // 地图样式
    }
    interface Props {
    	width?: string; // 宽度
    	height?: string; // 高度
    	mapOptions?: MapOptions; // 地图配置项
    	options?: Options; // 配置项
    }
    ```

  - 事件：
    - getMapRef(AMap, map)：获取地图实例,以便于添加插件、状态、地图事件等功能

#### pinia 状态管理：

- 创建方法：

  ```ts
  import { defineStore } from "pinia";
  const 变量 = defineStore("名称", {
    // 数据
  state: () => ({})
  getters: {}, // 计算属性
  actions: {} // 方法
  persist: true, // 是否开启持久化
  // 自定义持久化
  persist: {
    enabled: true, // 是否开启持久化
    strategies: [
      {
        key: "名称", // 存储的 key
        storage: localStorage, // 存储的位置
        paths: [] // 指定 state 中哪些数据需要被持久化
      }
    ]
  }
  });
  export default 变量;
  ```

- 使用方法：
  ```ts
  import { useUserStore } from "@/store/user/index";
  const userStore = useUserStore();
  ```

#### 路由配置：在 router 文件夹下的 page.ts 文件中配置

- 配置方法：
  ```ts
  {
  	path: "/路由地址",
  	name: "命名路由",
  	component: () => import("地址"),
  	meta: {
  		title: "", // 路由标题
  		icon: "", // 路由图标
  		requiresAuth: false, //是否需要登录
  	}
  }
  ```

#### 目录结构：

> - assets：静态资源
> - components：自定义组件
> - directives：自定义指令
> - layouts：布局
> - pages：页面
> - router：路由
> - store：状态管理
> - utils：工具函数
> - App.vue：入口文件
> - main.ts：入口文件
