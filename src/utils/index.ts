/**
 * 获取图片的 URL 地址：将相对路径转换为绝对路径
 * @param {string} url - 图片的相对路径
 * @returns {string} - 图片的完整 URL 地址
 */
export function getImageUrl(url: string): string {
	return new URL(`../assets/image/${url}`, import.meta.url).href;
}

/**
 * 模糊查询数据对象中指定的属性值
 * @param {array} array - 要模糊查询的数组
 * @param {string | number} key	- 要模糊查询的属性名
 * @param {string | number} searchTerm	- 要模糊查询的字符串
 * @returns {array} - 模糊查询后的数组
 */
export function fuzzySearch(array: any[], key: string | number, searchTerm: string | RegExp): Array<any> {
	let fuzzyArray: Array<any> = [];
	fuzzyArray = array.filter((item) => item[key].indexOf(searchTerm) > -1);
	return fuzzyArray;
}

/**
 * 深度拷贝：将一个对象或数组进行深拷贝，返回一个新的对象或数组
 * @param obj - 要拷贝的对象
 * @returns 拷贝后的对象
 */
export function deepClone(obj: { [x: string]: any; getTime?: any; reduce?: any } | null) {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}

	if (obj instanceof Date) {
		return new Date(obj.getTime());
	}

	if (obj instanceof Array) {
		return obj.reduce((arr, item, i) => {
			arr[i] = deepClone(item);
			return arr;
		}, []);
	}

	if (obj instanceof Object) {
		return Object.keys(obj).reduce((newObj: { [key: string]: string }, key) => {
			newObj[key] = deepClone(obj[key]);
			return newObj;
		}, {});
	}
}

/**
 * 时间格式化：将时间对象格式化为指定格式的字符串
 * @param {Date} date - 时间对象
 * @param {string} format - 时间格式，默认为'YYYY-MM-DD HH:mm:ss'
 * @returns {string} - 格式化后的时间字符串
 */
export function formatDate(date: Date, format: string = "YYYY-MM-DD HH:mm:ss"): string {
	// 定义时间格式的映射关系
	const formatMap: { [key: string]: number } = {
		Y: date.getFullYear(),
		M: date.getMonth() + 1,
		D: date.getDate(),
		H: date.getHours(),
		m: date.getMinutes(),
		s: date.getSeconds()
	};
	// 遍历时间格式字符串，将对应的时间值替换为映射关系中的值
	for (const key in formatMap) {
		format = format.replace(new RegExp(key + "+", "g"), (match: string) => {
			const value = formatMap[key];
			// 如果是月份或日期，并且小于10，则在前面补0
			if (match.length > 1 && value < 10) {
				return "0" + value.toString(); // 确保返回字符串
			} else {
				return value.toString(); // 确保返回字符串
			}
		});
	}
	// 返回格式化后的时间字符串
	return format;
}

/**
 * 防抖函数：在一段时间内，如果函数被多次触发，只有最后一次触发的函数会被执行，其他的触发将被忽略
 * @param fn - 要防抖的函数
 * @param delay - 防抖的时间间隔
 * @returns 防抖后的函数
 */
export function debounce<This, Args extends any[]>(func: (this: This, ...args: Args) => void, delay: number): (this: This, ...args: Args) => void {
	let timer: NodeJS.Timeout;
	return function (this: This, ...args: Args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}

/**
 * 节流函数：一段时间内只能执行一次，在这段时间内再次触发函数，将被忽略，直到这段时间结束，才可以再次执行函数
 * @param fn - 要节流的函数
 * @param delay - 节流的时间间隔
 * @returns 节流后的函数
 */
export function throttle<This, Args extends any[]>(func: (this: This, ...args: Args) => void, delay: number): (this: This, ...args: Args) => void {
	let timer: NodeJS.Timeout | null;
	return function (this: This, ...args: Args) {
		if (!timer) {
			timer = setTimeout(() => {
				func.apply(this, args);
				timer = null;
			}, delay);
		}
	};
}
