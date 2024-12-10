import { Directive } from "vue";

// 动画持续时间，ms
const DURATION = 1500;

/**
 * 数字增长动画
 * @param el 绑定元素
 * @param binding 绑定值
 */
export const increase: Directive = {
	mounted(el, binding) {
		const { value: maxCount } = binding;
		el.$animation = animate((progress) => {
			el.innerText = Math.floor(maxCount * progress);
		}, DURATION);
	},
	unmounted(el) {
		el.$animation.cancel();
	}
};

export const animate = function (fn: (progress: number) => void, duration: number): { cancel: () => void } {
	const animate = () => {
		animation = requestAnimationFrame(animate);
		const now = new Date().getTime();
		const progress = Math.floor(((now - START) / duration) * 100) / 100;
		fn(progress > 1 ? 1 : progress);
		if (now - START > duration) {
			cancel();
		}
	};
	const cancel = () => {
		cancelAnimationFrame(animation);
	};
	const START = new Date().getTime();
	let animation = requestAnimationFrame(animate);
	return {
		cancel: () => {
			cancelAnimationFrame(animation);
		}
	};
};
