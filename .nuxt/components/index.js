export { default as Answers } from '../../components/Answers.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as VuetifyLogo } from '../../components/VuetifyLogo.vue'
export { default as AddQustion } from '../../components/addQustion.vue'
export { default as AnswersResault } from '../../components/answersResault.vue'
export { default as MyQustions } from '../../components/myQustions.vue'
export { default as SuggestedQustion } from '../../components/suggestedQustion.vue'

export const LazyAnswers = import('../../components/Answers.vue' /* webpackChunkName: "components/Answers'}" */).then(c => c.default || c)
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/Logo'}" */).then(c => c.default || c)
export const LazyVuetifyLogo = import('../../components/VuetifyLogo.vue' /* webpackChunkName: "components/VuetifyLogo'}" */).then(c => c.default || c)
export const LazyAddQustion = import('../../components/addQustion.vue' /* webpackChunkName: "components/addQustion'}" */).then(c => c.default || c)
export const LazyAnswersResault = import('../../components/answersResault.vue' /* webpackChunkName: "components/answersResault'}" */).then(c => c.default || c)
export const LazyMyQustions = import('../../components/myQustions.vue' /* webpackChunkName: "components/myQustions'}" */).then(c => c.default || c)
export const LazySuggestedQustion = import('../../components/suggestedQustion.vue' /* webpackChunkName: "components/suggestedQustion'}" */).then(c => c.default || c)
