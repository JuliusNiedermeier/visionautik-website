export const state = () => ({
  sectionAnchors: [],
})

export const mutations = {
  setSectionAnchors(state, payload) {
    state.sectionAnchors = payload
  },
}
