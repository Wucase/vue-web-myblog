// state设置变量
// actions 异步-得到结果 - mutations 操作数据-getters监听数据变动
// 最后返回的是监听数据变动

export default {
  // namespaced: true, // 是否开启命名空间
  // data 存储数据
  state: {
    artical: {},
  },
  // 异步
  actions: {
    setArticalAction(context, artical) {
      context.commit("setArtical", artical);
    },
  },
  //  操控 state 里面的数据的   methods
  mutations: {
    setArtical(state, artical) {
      state.artical = artical;
    },
  },
  // Getters 可以用于监听、state中的值的变
  getters: {
    getArtical: (state) => {
      return state.artical;
    },
  },
};
