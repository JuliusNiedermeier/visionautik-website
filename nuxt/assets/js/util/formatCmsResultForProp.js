export default (result) => {
  if (!result) return null
  return {
    uid: result.uid,
    type: result.type,
    ...result.data,
  }
}
