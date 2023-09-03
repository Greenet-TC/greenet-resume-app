// 页面路径：store/index.js
import { createStore } from 'vuex'

const store = createStore({
	state:{//存放状态
		"username":"foo",
		"age":18
	},
    mutations: {
		add(state) {
			// 变更状态
			state.count += 2
		}
	}
})

export default store