export const state = () => ({
  active: false,
  zIndex: 0,
})

export const mutations = {
  activate(state, payload) {
    state.zIndex = payload || 0
    state.active = true
  },
  deactivate(state) {
    state.active = false
  },
  setZIndex(state, payload) {
    state.zIndex = payload
  },
}
