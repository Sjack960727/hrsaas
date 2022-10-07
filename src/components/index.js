// import PageTools from './PageTools'
import * as directives from '@/directives'
import * as filters from '@/filters'
// const components = [PageTools]

// export default {
//   install: function(Vue) {
//     components.forEach(item => {
//       Vue.component(item.name, item)
//     })
//   }
// }

const fn = require.context('./', true, /\.vue$/)
// console.log(fn)
// console.log(fn.keys())
// console.log(fn('./PageTools/index.vue'))

const components = fn.keys().map(item => fn(item))
export default (Vue) => {
  components.forEach(item => {
    Vue.component(item.default.name, item.default)
  })
  Object.keys(directives).forEach(ele => {
    Vue.directive(ele, directives[ele])
  })
  Object.keys(filters).forEach(ele => {
    Vue.filter(ele, filters[ele])
  })
}
