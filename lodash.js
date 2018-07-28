// chunck
function chunck(array, size) {
  let newArray = []
  for (let i = 0; i < array.length; i = i + size) {
      newArray.push(array.slice(i, i + size))
  }
  return newArray
}
chunck(['a', 'b', 'c', 'd'], 3)
