export const state = () => ({
  active: false,
  zIndex: 0,
})

export const mutations = {
  activate(state) {
    state.active = true
  },
  deactivate(state) {
    state.active = false
  },
  setZIndex(state, payload) {
    state.zIndex = payload
  },
}
