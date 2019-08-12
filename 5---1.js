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

const pullAt = (array, ...indexs) => {
  let _array = indexs.map(item => array[item])
  return array.filter(item => !_array.includes(item))
}

const remove = (array, predicate) => {
  let _predicate = _.iteratee(predicate)
  return array.filter(it => !_predicate(it))
}

const reverse = array => {
  return array.reduceRight((acc, cur) => {
    acc.push(cur)
    return acc
  }, [])
}

// 如果找到 target 返回相应的 index  如果没有找到 就返回 -1
const binarySearch = (array, target) => {
  let len = array.length
  let left = 0
  let right = len - 1
  //  在 array 为 [left ... right] 中查找
  // floo 最先出现, ceil 最后出现
  while (left <= right) {
    // let mid = ((left + right) / 2) | 0
    let mid = (left + (right - left) / 2) | 0
    if (array[mid] === target) {
      return mid
    }
    if (array[mid] > target) {
      // 在 array[left...mid-1]中查找target
      right = mid - 1
    } else {
      // target > arr[mid]
      // 在array[mid+1...right]中查找target
      left = mid + 1
    }
  }
  return -1
}

const tail = array => array.slice(1, array.length)

const take = (array, n = 1) => array.slice(0, n)

const takeRight = (array, n) => array.slice(array.length - n >= 0 ? array.length - n : 0, array.length)

const takeWhile = (array, predicate) => {
  let _predicate = _.iteratee(predicate)
  for (let i = 0; i < array.length; i++) {
    if (!_predicate(array[i])) {
      return array.slice(0, i)
    }
  }
}

const union = (...arrays) => {
  return [
    ...new Set(
      arrays.reduce((acc, cur) => {
        acc.push(...cur)
        return acc
      }, [])
    )
  ]
}

// todo
const unionBy = (predicate, ...arrays) => {
  let _predicate = _.iteratee(predicate)
  return arrays.reduce((array, val) => {
    val.forEach(res => {
      if (!array.map(it => _predicate(it)).includes(_predicate(res))) {
        array.push(res)
      }
    })
    return array
  }, [])
}

const uniq = array => [...new Set(array)]

const uniq = array => {
  return array.reduce((acc, cur) => {
    if (!acc.includes(cur)) {
      acc.push(cur)
    }
    return acc
  }, [])
}

const array = [
  {
    name: 'ZYTX',
    age: 'Y',
    gender: 'A'
  },
  {
    name: 'ZYTA',
    age: 'Y',
    gender: 'B'
  },
  {
    name: 'ZDTX',
    age: 'Y',
    gender: 'C'
  },
  {
    name: 'ZYTX',
    age: 'Y',
    gender: 'A'
  }
]

// 数组对象属性去重
// todo

const uniqueArrayObject = array => {
  let hash = {}
  return array.reduce((acc, cur) => {
    // hash[cur.name] ? '' : (hash[cur.name] = true && acc.push(cur))
    // return acc
    if (!hash[cur.name]) {
      hash[cur.name] = true
      acc.push(cur)
    }
    return acc
  }, [])
}

const uniqueArrayObject = array => {
  let _map = new Map()
  array.forEach(item => {
    if (!map.has(item.name)) {
      map.set(item.name, item)
    }
  })
  return [..._map.values()]
}

const uniqueArrayObject = array => {
  let _map = new Map()
  return array.filter(item => {
    return !_map.has(item.name) && _map.set(item.name)
  })
}

// todo
const unzip = array => {
  return array.shift().reduce((acc, cur) => {
    let _cur = [cur]
    array.forEach(it => {
      _cur.push(it.shift())
    })
    acc.push(_cur)
    return acc
  }, [])
}

const without = (array, ...values) => {
  return array.filter(item => {
    return !values.includes(item)
  })
}

// todo
const xor = (...arrays) => {
  let res = new Set(arrays.shif())
  arrays.forEach(arr => {
    arr.forEach(val => {
      !res.has(val) ? res.add(val) : res.delete(val)
    })
  })
  return [...res]
}

const zip = (...arrays) => {
  let _array = arrays.shift()
  return _array.reduce((acc, cur, index) => {
    let _cur = [cur]
    arrays.forEach(item => {
      _cur.push(item[index])
    })
    acc.push(_cur)
    return acc
  }, [])
}

const zipObject = (arrayKey, arrayValue) => {
  return arrayKey.reduce((acc, cur, index) => {
    acc[cur] = arrayValue[index]
    return acc
  }, {})
}

// Collection

const countBy = (array, predicate) => {
  let _predicate = _.iteratee(predicate)
  return array.reduce((acc, cur) => {
    acc[_predicate(cur)] ? acc[_predicate(cur)]++ : (acc[_predicate(cur)] = 1)
    return acc
  }, {})
}

const forEach = (array, fn) => {
  let len = array.length
  for (let i = 0; i < len; i++) {
    fn(array[i])
  }
}

const eachRight = (array, fn) => {
  let len = array.length
  for (let i = len; i <= 0; i--) {
    fn(array[i])
  }
}

const every = (array, predicate) => {
  let _predicate = _.iteratee(predicate)
  for (let key of array) {
    if (!_predicate(key)) {
      return false
    }
  }
  return true
}

const filter = (array, predicate) => {
  let _predicate = _.iteratee(predicate)
  return array.reduce((acc, cur) => {
    if (_predicate(cur)) {
      acc.push(cur)
    }
    return acc
  }, [])
}

const findIndex = (array, predicate, fromIndex = 0) => {
  let _predicate = _.iteratee(predicate)
  let len = array.length
  for (let i = fromIndex; i < len; i++) {
    if (_predicate(array[i])) {
      return i
    }
  }
  return -1
}

const groupBy = (array, predicate) => {
  let _predicate = _.iteratee(predicate)
  return array.reduce((acc, cur) => {
    if (!acc[_predicate(cur)]) {
      acc[_predicate(cur)] = []
    }
    acc[_predicate(cur)].push(cur)
    return acc
  }, {})
}

const includes = (collection, values) => {
  if (typeof collection === 'string') {
    return collection.indexOf(values) > -1
  } else {
    let _collection = Object.values(collection)
    for (let key of _collection) {
      if (key === values) {
        return true
      }
    }
    return false
  }
}

const invokeMap = (collection, path, args) => {
  let _predicate
  if (typeof path === 'string') {
    _predicate = Object.values(collection)[path]
  } else {
    _predicate = path
  }
  return collection.reduce((res, val) => {
    res.push(_predicate.call(val, args))
    return res
  }, [])
}

const keyBy = (collection, predicate) => {
  let _predicate = _.iteratee(predicate)
  return Object.values(collection).reduce((acc, cur) => {
    acc[_predicate(cur)] = cur
    return acc
  }, {})
}

const map = (collection, predicate) => {
  let _predicate = _.iteratee(predicate)
  return Object.values(collection).reduce((acc, cur) => {
    acc.push(_predicate(cur))
    return acc
  }, [])
}

const res = [
  {
    GameName: '辨识力-找相同',
    Score: 4.0,
    Level: 1,
    PersonId: 2671701,
    CheckTime: '2019/5/8 10:33:00',
    Percent: 80.0
  },
  {
    GameName: '辨识力-找不同',
    Score: 4.0,
    Level: 1,
    PersonId: 2671701,
    CheckTime: '2019/5/8 10:33:00',
    Percent: 80.0
  },
  {
    GameName: '辨识力-几何',
    Score: 4.0,
    Level: 1,
    PersonId: 2671701,
    CheckTime: '2019/5/8 10:33:00',
    Percent: 80.0
  },
  {
    GameName: '辨识力-辩色',
    Score: 4.0,
    Level: 1,
    PersonId: 2671701,
    CheckTime: '2019/5/8 10:33:00',
    Percent: 80.0
  },
  {
    GameName: '记忆力-数字',
    Score: 4.0,
    Level: 1,
    PersonId: 2671701,
    CheckTime: '2019/5/8 10:33:00',
    Percent: 80.0
  },
  {
    GameName: '记忆力-颜色',
    Score: 4.0,
    Level: 1,
    PersonId: 2671701,
    CheckTime: '2019/5/8 10:33:00',
    Percent: 80.0
  },
  {
    GameName: '辨识力-找相同',
    Score: 4.0,
    Level: 1,
    PersonId: 2671701,
    CheckTime: '2019/5/9 10:33:00',
    Percent: 40.0
  },
  {
    GameName: '辨识力-找不同',
    Score: 4.0,
    Level: 1,
    PersonId: 2671701,
    CheckTime: '2019/5/9 10:33:00',
    Percent: 40.0
  },
  {
    GameName: '辨识力-几何',
    Score: 4.0,
    Level: 1,
    PersonId: 2671701,
    CheckTime: '2019/5/9 10:33:00',
    Percent: 40.0
  },
  {
    GameName: '辨识力-辩色',
    Score: 4.0,
    Level: 1,
    PersonId: 2671701,
    CheckTime: '2019/5/9 10:33:00',
    Percent: 80.0
  },
  {
    GameName: '记忆力-数字',
    Score: 4.0,
    Level: 1,
    PersonId: 2671701,
    CheckTime: '2019/5/9 10:33:00',
    Percent: 80.0
  },
  {
    GameName: '记忆力-颜色',
    Score: 4.0,
    Level: 1,
    PersonId: 2671701,
    CheckTime: '2019/5/9 10:33:00',
    Percent: 80.0
  }
]

const groupBy = (array, property) => {
  return array.reduce((acc, cur) => {
    let key = cur[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(cur)
    return acc
  }, {})
}

let _res = groupBy(res, 'CheckTime')
let array = []
for (let key in _res) {
  let obj = {}
  obj['日期'] = key
  let _skills = _res[key].map(item => {
    let _obj = {}
    let _gameName = item['GameName'].replace('-', '')
    let _percent = item['Percent']
    _obj[_gameName] = _percent
    return _obj
  })
  let skills = Object.assign(obj, ..._skills)
  array.push(skills)
}

let allData = array.map(item => {
  let gameData = {
    columns: ['日期', '辨识力找相同', '辨识力找不同', '辨识力几何', '记忆力颜色', '记忆力数字'],
    rows: [item]
  }
  let time = item['日期']
  return {
    gameData,
    time
  }
})
let correctData = allData.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5)
console.log(correctData, 'correctData')

const orderBy = (collection, predicate, order) => {
  let _predicate = _.iteratee(predicate)
  if (order === 'desc') {
    return collection.sort((a, b) => _predicate(b) > _predicate(a))
  } else {
    return collection.sort((a, b) => _predicate(a) > _predicate(b))
  }
}

const partition = (collection, predicate) => {
  let _predicate = _.iteratee(predicate)
  return collection.reduce(
    (acc, cur) => {
      if (_predicate(cur)) {
        acc[0].push(cur)
      } else if (!_predicate(cur)) {
        acc[1].push(cur)
      }
      return acc
    },
    [[], []]
  )
}

// combiner is function must return sth
const reduce = (array, combiner, initialValue) => {
  for (let i = 0; i < array.length; i++) {
    initialValue = combiner(initialValue, array[i])
    // initialValue 不断的在迭代
  }
  return initialValue
}

const reject = (collection, predicate) => {
  let _predicate = _.iteratee(predicate)
  return collection.filter(item => {
    return !_predicate(item)
  })
}

const sample = collection => {
  return Object.values(collection)[(Math.random() * Object.values(collection).length) | 0]
}

const size = collection => {
  if (typeof collection === 'object') {
    return Object.values(collection).length
  } else {
    return collection.length
  }
}

const judgeType = collection => {
  return Object.prototype.toString.call(collection).slice(8, -1)
}

const some = (collection, predicate) => {
  let _predicate = _.iteratee(predicate)
  for (let key of collection) {
    if (_predicate(collection[key])) {
      return true
    }
  }
  return false
}

const max = array => {
  return array.reduce((a, b) => (a > b ? a : b))
}

const max = array => array.reduce((a, b) => (a > b ? a : b))

const maxAndMin = array => {
  let _max = array[0]
  let _min = array[0]
  for (let i = 0; i < array.length; i++) {
    if (array[i] > _max) {
      _max = array[i]
    }
    if (array[i] < _min) {
      _min = array[i]
    }
  }
  return [_max, _min]
}

const shuffle = ([...arr]) => {
  let m = arr.length
  while (m) {
    const i = (Math.floor(Math.random() * m--)[(arr[m], arr[i])] = [arr[i], arr[m]])
  }
  return arr
}

const dec2X = (decNumber, x) => {
  let stack = []
  let _decNumber
  while (decNumber > 0) {
    _decNumber = decNumber % x
    stack.push(_decNumber)
    decNumber = (decNumber - _decNumber) / x
  }
  return stack.reverse().join('')
}

const accum = text => {
  return text
    .split('')
    .map((item, index) => {
      return item.toUpperCase() + item.toLowerCase().repeat(index)
    })
    .join('-')
}

const accum = text =>
  text
    .split('')
    .map((item, index) => item.toUpperCase() + item.toLowerCase().repeat(index))
    .join('_')

// accum("abcd") => "A-Bb-Ccc-Dddd"

// 柯里化 如果参数传过够以后就直接调用函数,
// 如果没有就继续传继续调用函数, 最关键的是递归

const curry = (fn, len = func.length) => {
  return (...args) => {
    // 这里的 ...args 是给柯里化函数传的参数
    if (args.length >= len) {
      return fn(...args)
    } else {
      return curry(fn.bind(null, ...args), len - args.length)
    }
  }
}

// 比较多次接受的参数总数与函数定义时的入参数量，当接受参数的数量大于或等于被 Currying 函数的传入参数数量时，就返回计算结果，否则返回一个继续接受参数的函数。
function curry (fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return curry(fn, ...args, ...args2)
  }
}


function debounce(f, duration) {
  let timer

  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    // 运行之间要取消
    // 未来运行
    timer = setTimeout(() => {
      f.call(this, ...args)
    }, duration)
  }
}

// 实际上这个函数的作用就是如此，它可以将一个函数的调用频率限制在一定阈值内，例如 1s，那么 1s 内这个函数一定不会被调用两次.

function throttle(fn, duration) {
  let lastRuntime = 0
  // -Infinity
  let lastResult
  return function(...args) {
    let now = Date.now()
    if (now - lastRuntime > duration) {
      lastResult = fn.call(this, ...args)
      lastRuntime = now
    }
    return lastResult
  }
}

function throttle(fn, duration) {
  let lastRuntime = 0
  let lastResult
  return function(...args) {
    let now = Date.now()
    if (now - lastRuntime > duration) {
      lastResult = fn.call(this, ...args)
      lastRuntime = now
    }
    return lastResult
  }
}

const getType = value =>
  Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase()

const isEqual = (value, other) => {
  let typeValue = getType(value)
  let typeOther = getType(other)

  if (value === other) return true
  if (_.isNaN() && _.isNaN()) return true
  if (value.toString() === other.toString()) return true
  if (typeValue !== typeOther) return false
  if (typeValue === 'string' || typeValue === 'boolean' || typeValue === 'number' || typeValue === 'date') {
    return value.toString() === other.toString()
  }
  if (typeValue === 'array' || typeValue === 'object') {
    let keyValue = Object.keys(value)
    let keyOther = Object.keys(other)
    if (keyValue.length !== keyOther.length) return false
    return keyValue.every(key => isEqual(value[key], other[key]))
  }
  return false
}

const reduce = (array, fn, initialVal) => {
  for (let i = 0; i < array.length; i++) {
    initialVal = fn(initialVal, array[i], [i], array)
  }
  return initialVal
}

function debounce(fn, duration) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.bind(this, ...args)
    }, duration)
  }
}

function debounce(fn, duration) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.bind(this, ...args)
    }, duration)
  }
}

function throttle(fn, duration) {
  let lastRuntime = 0
  let lastResult
  return function(...args) {
    let now = Date.now()
    if (now - lastRuntime > duration) {
      lastResult = fn.call(this, ...args)
      lastRuntime = now
    }
    return lastResult
  }
}

function throttle(fn, duration) {
  let lastRuntime = 0
  let lastResult
  return function(...args) {
    let now = Date.now()
    if (now - lastRuntime > duration) {
      lastResult = fn.call(this, ...args)
      lastRuntime = now
    }
    return lastResult
  }
}

const curry = (fn, len = fn.length) => {
  return (...args) => {
    // 这里的 ...args 是给柯里化函数传的参数
    if (args.length >= len) {
      return fn(...args)
    } else {
      return curry(fn.bind(null, ...args), len - args.length)
    }
  }
}

const curry = (fn, len = fn.length) => {
  return (...args) => {
    if (args.length >= len) {
      return fn(...args)
    } else {
      return curry(fn.bind(null, ...args), len - args.length)
    }
  }
}

// bind() 方法会创建一个新函数。
// 当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，
// 之后的一序列参数将会在传递的实参前传入作为它的参数

const _bind = (func, ...fixedArgs) => {
  return (...args) => {
    return func(...fixedArgs, ...args)
  }
}

// call
const _call = function(context, ...args) {
  var context = context || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn()
  return result
}

const trim = () => {}

const cloneDeep = () => {}

function throttle(fn, duration) {
  let lastRuntime = 0
  let lastResult
  return function(...args) {
    let now = Date.now()
    if (now - lastRuntime >= duration) {
      lastResult = fn.bind(this, ...args)
      lastRuntime = now
    }
    return lastResult
  }
}

const PriorityQueue = function() {
  let queue = []

  const queueElement = function(element, priority) {
    this.element = element
    this.priority = priority
  }
  // 插入方法
  PriorityQueue.prototype.enqueue = function(element, priority) {
    // 创建 queueElement 对象
    let _queueElement = new queueElement(element, priority)

    // 若队列为空无需比较
    if (this.queue.length === 0) {
      this.queue.push(_queueElement)
    } else {
      // 不为空
      let flag = false
      for (let i = 0; i < this.queue.length; i++) {
        if (_queueElement.priority < this.queue[i].priority) {
          this.queue.splice(i, 0, _queueElement)
          flag = true
          break // 已经找到优先级高的
        }
      }
      // 到最后都没有添加
      if (!flag) {
        this.queue.push(_queueElement)
      }
    }
  }
  return queue
}

var one = new PriorityQueue()
one.enqueue('A', 111)
one.enqueue('B', 110)
one.enqueue('C', 124)
