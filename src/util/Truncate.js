const truncate = (str, length = 130) => {
  return str.length > length ? str.substring(0, length - 3) + "..." : str
}

export default truncate
