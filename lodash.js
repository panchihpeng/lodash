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

function map(array, action) {
  return array.reduce((result, item) => {
    return result.push(action(item))
    // result.push(action(item))
    // return result
  }, [])
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

function filter(array, test) {
  return array.reduce(function (result, item) {
    if (test(item)) {
      result.push(item)
    }
    return result
  }, [])
}

function filter(ary, test) {
  return ary.reduce((res, b) => {
    if (test(b)) {
      res.push(b)
    }
    return res
  }, [])
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
  return array.filter(item => {
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
function reduce(ary, combiner, initialValue) {
  for (let i = 0; i < ary.length; i++) {
    initialValue = combiner(initialValue, ary[i]) // = 下次还需要调用
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

let res = reduce(
  [1, 2, 3],
  function (previousValue, currentValue) {
    return previousValue + currentValue
  },
  0
)
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
function difference(array) {
  var result = arguments[0].slice()
  for (i = 1; i < arguments.length; i++) {
    for (var val of arguments[i]) {
      if (result.indexOf(val) !== -1) {
        result.splice(result.indexOf(val), 1)
      }
    }
  }
  return result
}

function difference(array, ...val) {
  let newArray = [].concat(...val)
  return array.filter((item) => {
    return !newArray.includes(item)
  })
}

// debounce
function debounce() {}

// throttle
function throttle() {}

// fromPairs
function fromPairs(pairs) {
  return pairs.reduce((memo, curr) => {
    let key = curr[0]
    let val = curr[1]
    memo[key] = val
    return memo
  }, {})
}
//[['a',1],['b',2]] =>{a: 1, b:2 }

// flip
function flip(func) {
  return function (...args) {
    return func(...args.reverse)
  }
}
power2 = flip(Math.pow)
power2(2, 3)

// spread
function spread(func) {
  return function (ary) {
    // return func.apply(null,ary)
    return func(...ary)
  }
}

// once
function once(func) {
  let called = false
  let firstResult
  return function fuck(...args) {
    if (!called) {
      called = true
      // let firstResult = func(...args)
      // return firstResult
      return (firstResult = func.apply(fuck, args))
    } else {
      return firstResult
    }
  }
}
// oneRandom = once(Math.random)
// func === Math.random

// negate
function negate(predicate) {
  return function (...args) {
    return !predicate(...args)
  }
}
female = negate(male)

// uary
function uary(f) {
  return function (arg) {
    return f(arg)
  }
}
// parseInt('123',16)
// [1,2,3].map(parseInt)

function ary(f, n = f.length) {
  return function (...args) {
    if (n < args.length) {
      args.length = n
    }
    return f(...args)
  }
}

function property(path) {
  return function (obj) {
    return get(obj, path)
  }
}

function get() {

}

function differenceBy(array, iteratee, ...values) {
  let predicate = _.iteratee(iteratee)
  let allVal = values.reduce((a, b) => {
    return a.concat(b)
  })
  return array.filter((ele) => {
    return !allVal.some((unionEle) => {
      return predicate(ele) === predicate(unionEle)
    })
  })
}

function differenceWith(array, comparator, ...vals) {
  let all = vals.reduce((a, b) => {
    return a.concat(b)
  })
  return array.filter((item) => {
    return !vals.some(val => {
      return comparator(item, val)
    })
  })
}

function drop(array, n) {
  return array.slice(n)
}

function drop(array, n) {
  return array.slice(0, -n)
}

function dropRightWhile(array, predicate) {
  const predicate = _.iteratee(predicate)
  for (let i = array.length - 1; i >= 0; i--) {
    if (!predicate(array[i])) {
      var pos = i
      break
    }
  }
  return array.slice(0, pos + 1)
}

const dropWhile = (arrays, predicate) => {
  return arrays.slice(arrays.findIndex(it => !_.iteratee(predicate)(it)))
}

function fill(array, value, start = 0, end = array.length) {
  for (let i = start; i < end; i++) {
    array[i] = value
  }
  return array
}

function findIndex(array, predicate, fromIndex = 0) {
  predicate = _.iteratee(predicate)
  for (let i = fromIndex; i < array.length; i++) {
    if (predicate(array[i])) {
      return i
    }
  }
  return -1
}

function findLastIndex(array, predicate, fromIndex = array.length - 1) {
  for (let i = fromIndex; i >= 0; i--) {
    if (predicate(array[i])) {
      return i
    }
  }
  return -1
}

function head(array) {
  return array[0]
}

function flatten(array) {
  const result = []
  for (let i = 0; i < array.lenth; i++) {
    if (Array.isArray(ary[i])) {
      for (let j = 0; j < ary[i].length; j++) {
        result.push(ary[i][j])
      }
    } else {
      result.push(ary[i])
    }
  }
  return result
}

function flatten(ary) {
  return ary.reduce((result, val) => {
    if (Array.isArray(val)) {
      val.forEach(item => {
        result.push(item)
      })
    } else {
      result.push(val)
    }
    return result
  }, [])
}

function flatten(ary) {
  return [].concat(...ary)
}

function flattenDeep(ary) {
  return ary.reduce((result, val) => {
    if (Array.isArray(val)) {
      flattenDeep(val).forEach(item => {
        result.push(item)
      })
    } else {
      result.push(val)
    }
    return result
  }, [])
}

function flattenDeepth(ary, depth = 1) {
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

function flattenDepth(ary, depth = 1) {
  for (let i = 0; i < depth; i++) {
    ary = flatten(ary)
  }
  return ary
}

function bind(fn, thisVal)


function fromPairs(pairs) {
  return pairs.reduce((memo, curr) => {
    let key = curr[0]
    let val = curr[1]
    memo[key] = val
    return memo
  }, {})
}

function fromPairs(pairs) {
  let obj = {}
  pairs.forEach((item) => {
    obj[item[0]] = item[1]
  })
  return obj
}

function fromPairs(pairs) {
  let obj = {}
  pairs.forEach(([key, val]) => {
    obj[key] = val
  })
  return obj
}

function indexOf(array, value, fromIndex = 0) {
  if (fromIndex < 0) {
    fromIndex = fromIndex + array.length
  }
  for (let i = fromIndex; i < array.length; i++) {
    if (array[i] === value) {
      return i
    }
  }
  return -1
}

function initial(array) {
  return array.slice(0, array.length - 1)
}
// 集合
function intersection(...arrays) {
  const flagArray = arrays.shift()
  const result = []
  flagArray.forEach((ele) => {
    if (arrays.every((array) => array.includes(ele))) {
      result.push(ele)
    }
  })
  return result
}

function intersection(...arrays) {
  const flagArray = arrays.shift()
  const result = []
  flagArray.forEach((ele) => {
    if (arrays.every((array) => {
        return array.includes(ele)
      })) {
      result.push(ele)
    }
  })
  return result
}

function intersectionBy(...arrays) {
  let predicate = _.iteratee(arrays.pop()) // 取到末尾的函数
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

function intersectionBy(...arrays) {
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

function intersectionWith(...arrays) {
  let comparator = _.iteratee(arrays.pop())
  let flagArray = arrays.shift()
  return arrays.reduce((res, val) => {
    flagArray.forEach(it => {
      val.forEach(item => {
        if (comparator(it, item)) {
          res.push(it)
        }
      })
    })
    return res
  }, [])
}

function join(array, separator) {
  let separator = separator.toString();
  let res = ''
  for (let sub in array) {
    res += array[sub] + separator
  }
  return res[res[length - 1]]
}

function join(array, separator) {
  return array.reduce((a, b) => {
    return a + b + separator
  }, '')
}

function pull(array, values) {
  return array.filter((item) => {
    return !values.includes(item)
  })
}

function pullAllBy(array, values, iteratee) {
  const predicate = _.iteratee(iteratee)
  const val = values.map(it => predicate(it))
  return array.filter(it => values.includes(predicate(it)))
}

function pullAllWith(array, values, [comparator]) {
  array.filter(it => !val.some(val => _.iteratee(compara)(it, val)))
}

function pullAt(array, indexes) {
  const res = []
  indexes.forEach((item, index) => {
    res.push(array[item])
    array.splice(array, 1)
  })
}

function union(setA, setB) {
  let _union = new Set(setA)
  for (let elem of setB) {
    _union.add(elem)
  }
  return _union
}
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
const union = new Set([...a, ...b])
const intersect = new Set([...a].filter(x => b.has(x)))
const difference = new Set([...a].filter(x => !b.has(x)))

function intersection(setA, setB) {
  let _intersection = new Set()
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}
// A 与 B 比较选择不同  A 的不同
function difference(setA, setB) {
  let _difference = new Set(setA)
  for (let elem of setB) {
    _difference.delete(elem)
  }
  return _difference
}

function without(array, ...values) {
  const value = new Set(values)
  const res = []
  array.forEach(val => {
    if (!value.has(val)) {
      res.push(val)
    }
  })
  return res
}

function xor(...arrays) {
  let res = new Set(arrays.shift())
  console.log(arrays)
  arrays.forEach(arr => {
    arr.forEach(val => {
      !res.has(val) ? res.add(val) : res.delete(val)
    })
  })
  return [...res]
}

function zip(...arrays) {
  return arrays.shift().reduce((res, val, index) => {
    let item = [val]
    arrays.forEach((it) => {
      item.push(it[index])
    })
    res.push(item)
    return res
  }, [])
}

function zipObject(props, values) {
  return props.reduce((res, val, index) => {
    res[val] = values[index]
    return res
  }, {})
}

function zipObject(props, values) {
  return props.reduce((res, val, index) => {
    res[val] = values[index]
    return res
  }, {})
}

function countBy(collection, iteratee) {
  const predicate = _.iteratee(iteratee)
  return collection.reduce((res, val) => {
    !res[predicate(val)] ? res[predicate(val)] = 1 : res[predicate(val)]++
    return res
  }, {})
}

function countBy(collection, iteratee) {
  const predicate = _.iteratee(iteratee)
  return collection.reduce((res, val) => {
    !res[predicate(val)] ? res[predicate(val)] = 1 : res[predicate]++
  }, {})
}

function flatMap(collection, iteratee) {
  const predicate = _.iteratee(iteratee)
  return Object.values(collection).reduce((res, val) => {
    res.push(...predicate(val))
    return res
  }, [])
}

function groupBy(collection, iteratee) {
  const predicate = _.iteratee(iteratee)
  return collection.reduce((res, val) => {
    !res[predicate(val)] ? res[predicate(val)] = [val] : res[predicate(val)].push(val)
    return res
  }, {})
}

function includes(collection,values,fromIndex = 0){
  if (typeof collection === 'string') {
    return collection.indexOf(values) > -1
  } else {
    collection = Object.values(collection)
    for (let i = fromIndex; i < collection.length; i++) {
      if (values === collection[i]) {
        return true
      }
    }
    return false
  }
}


function keyBy (collection,iteratee){
  return Object.values(collection).reduce((res,val)=>{
    res[_.iteratee(iteratee)(val)] = val
    return res 
   },{})
}