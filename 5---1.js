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

// todos

const differenceBy = (array, iteratee, ...values) => {
  let predicate = _.iteratee(iteratee) // 这是一个变化的函数
  let _values = values.reduce((a, b) => {
    return a.cancat(b)
  })
  // array 的每一项在 values中有没有
  // some  只要存在 返回真
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

const flatten = array => {
  let ret = []
  array.forEach(item => {
    if (Array.isArray(item)) {
      item.forEach(it => {
        ret.push(it)
      })
    } else {
      ret.push(item)
    }
  })
  return ret
}

const flatten = array => {
  return array.reduce((acc, cur, idx, src) => {
    if (Array.isArray(cur)) {
      cur.forEach(item => {
        acc.push(item)
      })
    } else {
      acc.push(cur)
    }
    return acc
  }, [])
}

const flatten = array => [].concat(...array)

const flatten = array => {
  return array.reduce((acc, cur) => {
    let _res = acc.concat(cur)
    return _res
  }, [])
}

const flatten = array => array.reduce((acc, cur) => acc.concat(cur), [])

const flatten = array => Array.prototype.concat.apply([], array)

// todo
const flattenDeep = array => {
  return array.reduce((acc, cur, index, src) => {
    if (Array.isArray(cur)) {
      flattenDeep(cur).forEach(it => {
        acc.push(it)
      })
    } else {
      acc.push(cur)
    }
    return acc
  }, [])
}

const flattenDeep = array => array.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val)), [])

const flattenDeepth = (ary, depth = 1) => {
  if (depth === 0) {
    return ary
  }
  return ary.reduce((result, val) => {
    if (Array.isArray(val)) {
      flattenDeepth(val, depth - 1).forEach(item => {
        result.push(item)
      })
    } else {
      result.push(val)
    }
    return result
  }, [])
}
// 计算数组中每个元素出现的次数

const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']

const countedNames = array => {
  return array.reduce((acc, cur, index, src) => {
    if (cur in acc) {
      acc[cur]++
    } else {
      acc[cur] = 1
    }
    return acc
  }, {})
}

const people = [{ name: 'Alice', age: 21 }, { name: 'Max', age: 20 }, { name: 'Jane', age: 20 }]
const groupBy = (array, property) => {
  return array.reduce((acc, cur, idx, src) => {
    let key = cur[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(cur)
    return acc
  }, {})
}

const fromPairs = array => {
  return array.reduce((acc, cur) => {
    acc[cur[0]] = cur[1]
    return acc
  }, {})
}

const indexOf = (array, value, fromIndex = 0) => {
  let len = array.length
  if (fromIndex < 0) {
    fromIndex += len
  }
  for (let i = 0; i < len; i++) {
    if (array[i] === value) {
      return i
    }
  }
  return -1
}

const initial = array => array.splice(0, array.length - 1)

const intersection = new Set([...a].filter(x => b.has(x)))

const intersection = (...arrays) => {
  let flagElement = arrays.shift()

  return flagElement.reduce((acc, cur) => {
    if (arrays.every(array => array.includes(cur))) {
      acc.push(cur)
    }
    return acc
  }, [])
}

// todo
const intersectionBy = (predicate, ...arrays) => {
  let predicate = _.iteratee(predicate)
  let initArrays = arrays.map(it => predicate(it))
  let flagElement = initArrays.shift()

  return flagElement.reduce((acc, cur) => {
    if (initArrays.every(array => array.includes(cur))) {
      acc.push(cur)
    }
    return acc
  }, [])
}

const intersectionBy = (...arrays) => {
  let predicate = _.iteratee(arrays.pop())
  let flagArray = arrays.shift()
  return arrays.reduce((result, val) => {
    let val = val.map(it => predicate(it))
    flagArray.forEach(it => {
      if (val.includes(predicate(it))) {
        result.push(it)
      }
    })
    return result
  }, [])
}

const join = (array, separator) => {
  return array.reduce((acc, cur) => {
    acc = acc + cur + separator
    return acc
  }, '')
}

const last = array => array.splice(array.length - 1, array.length)

const last = array => array[array.length - 1]

const lastIndexof = (array, value, fromIndex = array.length - 1) => {
  for (let i = fromIndex; i >= 0; i--) {
    if (array[i] === value) {
      return i
    }
  }
  return -1
}

const nth = (array, n) => array[n >= 0 ? n : n + array.length]

const pull = (array, ...value) => array.filter(item => !value.includes(item))

const pullBy = (array, predicate, ...values) => {
  let _predicate = _.iteratee(predicate)
  let _values = values.map(it => _predicate(it))
  return array.filter(item => !_values.includes(item))
}
