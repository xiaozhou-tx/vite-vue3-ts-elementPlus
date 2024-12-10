import { Directive } from "vue";

/**
 * 图片懒加载
 * @param el 绑定元素
 * @param binding 绑定值
 */
export const lazyImg: Directive = {
	mounted(el, binding) {
		const observe = new IntersectionObserver((entry) => {
			entry.forEach((item) => {
				el.style.transition = "all 1s ease";
				if (item.isIntersecting) {
					el.setAttribute("src", binding.value);
					el.style.transform = "";
				} else {
					el.style.setProperty("transform", "scale(0.9)");
				}
			});
		});
		observe.observe(el);
	}
};
