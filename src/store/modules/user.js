
// state设置变量
// actions 异步-得到结果 - mutations 操作数据-getters监听数据变动
// 最后返回的是监听数据变动

export default {
    // namespaced: true, // 是否开启命名空间
    // data 存储数据
    state: {
        user: {},
        token:'',
        userId:''
    },
    // 异步
    actions: {
      setUserAction(context,user){
        context.commit('setUser', user)
      },
      setTokenAction(context,token){
        context.commit('setToken', token)
      },
      setUserIdAction(context,id){
        context.commit('setUserId', id)
      },
      resetUserAction(context){
        context.commit('resetUser')
      }
    },
    //  操控 state 里面的数据的   methods
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
        },
        setUserId(state, id){
            state.userId = id
        },
        resetUser(state){
            console.log("reset---------");
            state.userId = ''
            state.token = ''
            state.user = {}

        },
   
    },
    // Getters 可以用于监听、state中的值的变
    getters: {
        getUser: state => {
            return state.user
        },
        getToken: state => {
            return state.token
        },
        getUserId: state => {
            return state.adminMenu
        },
    },
}
