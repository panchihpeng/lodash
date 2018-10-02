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
  return array.reduce(function(result, item) {
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
  function(previousValue, currentValue) {
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
  return array.forEach(function(item) {
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
function difference(array,...val) {
  let newArray = [].concat(...val)
    return array.filter((item)=>{
      return  !newArray.includes(item)
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
  return function(...args) {
    return func(...args.reverse)
  }
}
power2 = flip(Math.pow)
power2(2, 3)

// spread
function spread(func) {
  return function(ary) {
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
  return function(...args) {
    return !predicate(...args)
  }
}
female = negate(male)

// uary
function uary(f) {
  return function(arg) {
    return f(arg)
  }
}
// parseInt('123',16)
// [1,2,3].map(parseInt)

function ary(f, n = f.length) {
  return function(...args) {
    if (n < args.length) {
      args.length = n
    }
    return f(...args)
  }
}
function property(path) {
  return function(obj) {
    return get(obj,path)
  }
}

function get() {

}
function differenceBy(array,iteratee,...values,) {
  let predicate = _.iteratee(iteratee)
  let allVal = values.reduce((a,b)=>{
    return a.concat(b)
  })
 return array.filter((ele)=>{
   return !allVal.some((unionEle)=>{
     return predicate(ele) === predicate(unionEle)
   })
 })
}
function differenceWith(array,comparator,...vals){
let all = vals.reduce((a,b)=>{
  return a.concat(b)
})
return array.filter((item)=>{
  return !vals.some(val=>{
    return comparator(item,val)
  })
})
}

function drop(array,n){
   return array.slice(n)
}
function drop(array,n){
  return array.slice(0,-n)
}

function dropRightWhile(array,predicate){
  const predicate = _.iteratee(predicate)
  for (let i = array.length -1; i >= 0; i--) {
    if (!predicate(array[i])){
      var pos = i
      break
    }
  }
  return array.slice(0,pos+1)
}

const dropWhile = (arrays, predicate)=>{
  return arrays.slice(arrays.findIndex(it => !_.iteratee(predicate)(it)))
}
function fill(array,value,start = 0,end = array.length) {
  for (let i = start; i < end; i++) {
    array[i] = value
  }
  return array
}
function findIndex(array,predicate,fromIndex = 0){
  predicate = _.iteratee(predicate)
  for (let i = fromIndex; i < array.length; i++) {
    if (predicate(array[i])) {
      return i
    }
  }
  return -1
}
function findLastIndex (array, predicate ,fromIndex=array.length-1){
  for (let i = fromIndex; i >= 0; i--) {
    if (predicate(array[i])) {
      return i
    }
  }
  return -1
}

function head(array){
  return array[0]
}
function flatten(array){
  const  result = []
  for (let i = 0; i < array.lenth; i++) {
    if (Array.isArray(ary[i])) {
      for (let j = 0; j < ary[i].length; j++){
        result.push(ary[i][j])
      }
    } else {
      result.push(ary[i])
    }
  }
  return result
}
function flatten(ary) {
  return ary.reduce((result,val)=>{
    if (Array.isArray(val)){
      val.forEach(item =>{
        result.push(item)
      })
    } else  {
      result.push(val)
    }
    return result
  },[])
}
function flatten(ary) {
  return [].concat(...ary)
}
function flattenDeep(ary) {
  return ary.reduce((result,val) => {
    if (Array.isArray(val)) {
      flattenDeep(val).forEach(item => {
        result.push(item)
      })
    } else  {
      result.push(val)
    }
    return result
  },[])
}
function flattenDeepth(ary,depth = 1) {
  if (depth === 0) {
    return ary 
  }
  return ary.reduce((result,val) => {
    if (Array.isArray(val)) {
      flattenDeepth(val, depth - 1).forEach(item => {
        result.push(item)
      })
    } else  {
      result.push(val)
    }
    return result
  },[])
}
function flattenDepth (ary, depth = 1) {
  for (let i = 0; i < depth; i++) {
    ary = flatten(ary)
  }
  return ary 
}
function bind (fn, thisVal)