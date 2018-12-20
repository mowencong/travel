const tool = {
  namespaced:true,
  state: {
    recruitScrollY:0  //滚动条距离
  },
  getters: {
    recruitScrollY:state => state.recruitScrollY
  },
  mutations: {
    changeRecruitScrollY(state,recruitScrollY) {
      state.recruitScrollY = recruitScrollY
    }
  },
}

export default tool
