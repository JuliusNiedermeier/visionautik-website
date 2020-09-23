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

  remove(state, id) {
    const index = state.stack.findIndex(
      (notification) => notification.id === id
    )
    if (index >= 0) state.stack.splice(index, 1)
  },
}

export const actions = {
  show({ commit }, payload) {
    if (!payload.id) payload.id = Date.now()
    commit('add', payload)
    setTimeout(() => commit('remove', payload.id), 5000)
  },
}
