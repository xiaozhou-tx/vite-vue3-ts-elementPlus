import { Directive } from "vue";

// 防抖指令封装
export const debounce: Directive = (delay: number) => {
	return {
		beforeMount(el: HTMLElement, binding: any) {
			let timer: NodeJS.Timeout;
			el.addEventListener(binding.arg, () => {
				clearTimeout(timer);
				timer = setTimeout(() => {
					binding.value();
				}, delay);
			});
		}
	};
};

// 节流指令封装
export const throttle: Directive = (delay: number) => {
	return {
		beforeMount(el: HTMLElement, binding: any) {
			let throttled = false;
			el.addEventListener(binding.arg, () => {
				if (!throttled) {
					throttled = true;
					setTimeout(() => {
						binding.value();
						throttled = false;
					}, delay);
				}
			});
		}
	};
};
