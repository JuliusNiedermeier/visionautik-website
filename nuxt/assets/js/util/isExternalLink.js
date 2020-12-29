export default (to) => {
  return typeof to === 'string' && /^((http|https|ftp):\/\/)/.test(to)
}
