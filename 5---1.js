const chunk = (array, size = 1) => {
  let res = []
  let len = array.length
  for (let i = 0; i < len; i = i + size) {
    res.push(array.slice(i, i + size))
  }
  return res
}

const compact = array => {
  return array.filter(item => !!item)
}

const concat = (...args) => {
  return [].concat(...args)
}

const difference = (array, ...values) => {
  let _values = [].concat(...values)
  return array.filter(item => {
    return !_values.includes(item)
  })
}

const difference = (arrA, arrB) => {
  return new Set([...arrA].filter(item => !arrB.has(arrB)))
}

const differenceBy = (array, iteratee, ...values) => {
  let predicate = _.iteratee(iteratee) // 这是一个变化的函数
  let _values = values.reduce((a, b) => {
    return a.cancat(b)
  })
  return array.filter(ele => {
    return !_values.some(unionEle => {
      return predicate(ele) === predicate(unionEle)
    })
  })
}

const drop = (array, n = 1) => array.splice(n, array.length)

const dropRight = (array, n = 1) => {
  if (array.length - n >= 0) {
    array.splice(array.length - n, array.length)
  } else {
    array.splice(0, array.length)
  }
  return array
}

const dropRightWhile = (array, predicate) => {
  let predicate = _.iteratee(predicate)
  let len = array.length
  let pos
  for (let i = len; i >= 0; i--) {
    if (!predicate(array[i])) {
      pos = i
      break
    }
  }
  return array.slice(0, pos + 1)
}

const dropWhile = (array, predicate) => {
  let _predicate = _.iteratee(predicate)
  let flagIndex = array.findIndex(item => !_predicate(item))
  return array.slice(flagIndex)
}

const dropWhile = (array, predicate) => {
  return array.slice(array.findIndex(item => !_.iteratee(predicate)(item)))
}

const fill = (array, value, start = 0, end = array.length) => {
  for (let i = start; i < end; i++) {
    array[i] = value
  }
  return array
}

const findIndex = (array, predicate, fromIndex = 0) => {
  let _predicate = _.iteratee(predicate)
  for (let i = fromIndex; i < array.length; i++) {
    if (_predicate(array[i])) {
      return i
    }
  }
  return -1
}

const findLastIndex = (array, predicate, fromIndex = array.length - 1) => {
  let _predicate = _.iteratee(predicate)
  for (let i = fromIndex; i >= 0; i--) {
    if (_predicate(array[i])) {
      return i
    }
  }
  return -1
}

const head = array => array[0]