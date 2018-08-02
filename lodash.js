// forEach
function forEach(array, action) {
  for (let i = 0; i < array.length; i++) {
    action(array[i])
  }
}
// map
function map(array, action) {
  let newArray = []
  array.forEach(function(item, index) {
    newArray.push(action(item, index, array))
  })
  return newArray
}
function map(array, action) {
  let newArray = []
  for (let i = 0; i < array.length; i++) {
    newArray.push(action(item, index, array))
  }
  return newArray
}
// filter
function filter(array, test) {
  let newArray = []
  for (let i = 0; i < array.length; i++) {
    if (test(array[i])) {
      newArray.push(array[i])
    }
  }
  return newArray
}
// sigma
function sigma(f, start, end) {
  let sum = 0
  for (let i = start; i <= end; i++) {
    // sum = sum + f(i)
    sum += f(i)
  }
  return sum
}

// chunck
function chunck(array, size) {
  let newArray = []
  for (let i = 0; i < array.length; i = i + size) {
    newArray.push(array.slice(i, i + size))
  }
  return newArray
}
chunck(['a', 'b', 'c', 'd'], 3)

// compact
function compact(array) {
  let newArray = []
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      newArray.push(array[i])
    }
  }
  return newArray
}
compact([0, 1, false, 2, '', 3])

//difference
function difference() {}

//reverse
function reverse(array) {
    let newArray = []
    for (let i = array.length - 1; i >= 0; i--) {
        newArray.push(array[i])
    }
    return newArray
}
reverse([1, 2, 3])

function find(array,test) {
	for (let i = 0; i < array.length; i++) {
		if(test(array[i])) {
			return i 
		}
	}
}
