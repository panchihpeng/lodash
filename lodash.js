// forEach
function forEach(array, action) {
  for (let i = 0; i < array.length; i++) {
    action(array[i])
  }
}
// map
function map(array, action) {
  let newArray = []
  array.forEach(function (item, index) {
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

function compact(array) {
  return array.filter((item) => {
    return Boolean(item)
  })
}
compact([0, 1, false, 2, '', 3])

//reverse
function reverse(array) {
  let newArray = []
  for (let i = array.length - 1; i >= 0; i--) {
    newArray.push(array[i])
  }
  return newArray
}
reverse([1, 2, 3])

// reduce
function reduce (ary, combiner, initialValue) {
  for (let i = 0; i < ary.length; i++) {
    initialValue = combiner(initialValue,ary[i]) // = 下次还需要调用
  }
  return initialValue
}

function reduce(array, fn, initialValue) {
  let result = initialValue
  for (let i = 0; i < array.length; i++) {
    result = fn(...[result].concat(array[i]))
    // result = func.apply(null, [result].concat(array[i]));
  }
  return result
}

let res = reduce([1, 2, 3], function (previousValue, currentValue) {
  return previousValue + currentValue
}, 0)
console.log(res)
// 6

// find 
function find(array, test) {
  for (let i = 0; i < array.length; i++) {
    if (test(array[i])) {
      return i
    }
  }
}

function find(array, test) {
  return array.forEach(function (item) {
    if (test(item)) {
      return item
    }
  })
}

//difference
function difference() {}

// debounce
function debounce() {

}

// throttle
function throttle() {

}