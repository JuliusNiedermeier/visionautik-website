export default {
  methods: {
    formatCmsResultForProp(result) {
      return {
        uid: result.uid,
        ...result.data,
      }
    },
  },
}
