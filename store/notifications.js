export const state = () => ({
  stack: [],
})

export const mutations = {
  add(state, payload) {
    if (!payload.id) throw new Error('Notification object must have an ID!')
    const idExists = state.stack.find(
      (notification) => notification.id == payload.id
    )
    if (!idExists) state.stack.push(payload)
  },

  hide(state, id) {
    const index = state.stack.findIndex(
      (notification) => notification.id === id
    )
    state.stack[index].hide = true
  },

  remove(state, id) {
    const index = state.stack.findIndex(
      (notification) => notification.id === id
    )
    state.stack.splice(index, 1)
  },
}

export const actions = {
  show({ commit }, payload) {
    if (!payload.id) payload.id = Date.now()
    commit('add', { ...payload, hide: false })
    setTimeout(() => commit('hide', payload.id), 5000)
    setTimeout(() => commit('remove', payload.id), 6000)
  },
}
