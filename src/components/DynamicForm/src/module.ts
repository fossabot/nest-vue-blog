import { defineAsyncComponent } from 'vue';

export const text = defineAsyncComponent(() => import('../module/text.vue'));
export const code = defineAsyncComponent(() => import('../module/code.vue'));
export const password = defineAsyncComponent(() => import('../module/password.vue'));