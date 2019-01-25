const getType = val => {
  return Object.prototype.toString
    .call(val)
    .slice(8, -1)
    .toLowerCase()
  // like "array"
}

const values = obj => {
  return Object.values(obj)
}

const identity = (...vals) => {
  return vals[0]
}

const isNil = val => {
  return val === null || val === undefined
}

const eq = (first, second) => {
  if (Number.isNaN(first) && Number.isNaN(second)) return true
  else return first === second
}

// Converts value to a property path array.

const toPath = val => {
  if (isNil(val)) {
    return []
  } else if (typeof val === 'string') {
    return val.match(/([0-9]+)|([a-zA-Z0-9_$]+)/g)
  } else if (getType(val) === 'array') {
    return val
  } else {
    return [val.toString()]
  }
}

//Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.

const get = (obj, path, defaultVal) => {
  const paths = toPath(path)
  let res = obj
  try {
    paths.forEach(path => {
      return (res = res[path])
      // 🤮 的过程
    })
  } catch (e) {
    return defaultVal
  }
  return res === undefined ? defaultVal : res
}

// Creates a function that returns the value at path of a given object.
// 给路径求值

const property = path => {
  return obj => get(obj, path, null)
}

// The opposite of _.property; this method creates a function that returns the value at a given path of object.

const propertyOf = obj => {
  return path => {
    return get(obj, path, null)
  }
}

// Creates a function that performs(执行) a partial deep comparison between a given object and source, returning true if the given object has equivalent property values, else false.

const matches = src => {
  return obj => {
    for (key in src) {
      if (src[key] !== obj[key]) {
        return false
      }
    }
    return true
  }
}

// Creates a function that performs a partial deep comparison between the value at path of a given object to srcValue,
// returning true if the object value is equivalent, else false.

const matchesProperty = (path, srcVal) => {
  return obj => {
    if (typeof path === 'string') {
      if (obj[path] === srcVal) {
        return true
      } else {
        return false
      }
    } else {
      return path.reduce((accumulator, currVal) => accumulator[currVal], obj) === srcVal
    }
  }
}

// Creates a function that invokes func(调用) with the arguments of the created function.
//  If func is a property name, the created function returns the property value for a given element.
//  If func is an array or object, the created function returns true for elements that contain the equivalent source properties, otherwise it returns false.

const iteratee = val => {
  let type = getType(val)
  return (...args) => {
    if (type === 'function') {
      return val(...args)
    } else if (type === 'object') {
      return matches(val)(identity(...args))
    } else if (type === 'string') {
      return property(val)(identity(...args))
    } else if (type === 'array') {
      return matchesProperty(...val)(identity(...args))
    }
  }
}

// Checks if predicate returns truthy for any element of collection.
// Iteration is stopped once predicate returns truthy.
// The predicate is invoked with three arguments: (value, index|key, collection).
const _some = (collection, predicate) => {
  let _predicate = iteratee(predicate)
  let values = Object.values(collection)
  for (let key in values) {
    if (_predicate(key)) {
      return true
    }
  }
  return false
}

// Gets the size of collection by returning its length for array-like values or the number of own enumerable(可枚举的) string keyed properties for objects.

const _size = collection => {
  return getType(collection) === 'object' ? Object.values(collection).length : collection.length
}

// Creates an array of shuffled values, using a version of the Fisher-Yates shuffle.

const _shuffle = collection => {
  let values = Object.values(collection)
  let result = newArray(values.length).fill(0)
  return result.map(() => {
    let randomIndex = Math.floor(Math.random() * values.length)
    return values.splice(randomIndex, 1).pop()
  })
}

// Gets n random elements at unique keys from collection up to the size of collection.

const _sampleSize = (collection, n) => {
  let values = Object.values(collection)
  let len = n > values.length ? values.length : n
  let result = new Array(len).fill(0)
  return result.map(() => values.splice(Math.floor(Math.random() * values.length), 1).pop())
}

// Gets a random element from collection.
const sample = collection => {
  return Object.values(collection)[Math.floor(Math.random() * values.length)]
}

// The opposite of _.filter;
// this method returns the elements of collection that predicate does not return truthy for.

const reject = (collection, predicate) => {
  let values = Object.values(collection)
  let _predicate = iteratee(predicate)
  return values.filter(val => _predicate(val) === false)
}

// combine is a function

const _reduce = (array, combine, init) => {
  for (let i = 0; i < array.length; i++) {
    init = combine(init, array[i], i)
  }
  return init
}

// map 

const _map = (array,fn) => {
  let newArray = []
  const LEN = array.length
  for (let i = 0; i < LEN; i++) {
      newArray.push(fn(array[i], i))
  }
  return newArray
}

// forEach

const _forEach = (array, fn) => {
  const LEN = array.length
  for (let i = 0; i < LEN; i++) {
      fn(array[i], i)
  }
}

//  Creates an array of elements split into two groups, 
// the first of which contains elements predicate returns truthy for, 
// the second of which contains elements predicate returns falsey for. 
// The predicate is invoked with one argument: (value).

const _partition = (collection, predicate) => {
  let values = Object.values(collection)
  let _predicate = iteratee(predicate)
  let newArray = [[],[]]
  values.forEach((item)=>{
    _predicate(item) ? newArray[0].push(item) : newArray[1].push(item) 
  })
  return newArray
}


// This method is like _.sortBy except(除了) that it allows specifying(指定) the sort orders of the iteratees to sort by.
// If orders is unspecified, all values are sorted in ascending(上升) order.
//  Otherwise, specify an order of "desc" for descending or "asc" for ascending sort order of corresponding values.

const _orderBy = (collection, iteratees, orders = new Array(iteratees.length).fill('asc')) => {
  const vals = Object.values(collection)
  const _predicates = iteratees.map(it => iteratee(it)).reverse()
  let _orders = orders.reverse()
  _predicates.forEach((predicate, i) => {
    const compareFn = (a, b) => {
      const _a = predicate(a)
      const _b = predicate(b)
      if (_orders[i] === 'asc') {
        if (_a < _b) return -1
        else if (_a > _b) return 1
        else return 0
      } else {
        if (_a < _b) return 1
        else if (_a > _b) return -1
        else return 0
      }
    }
    vals.sort(compareFn)
  })
  return vals
}


// _.keyBy
// Creates an object composed(构成) of keys generated(生成) from the results of running each element of collection thru iteratee.
//  The corresponding value of each key is the last element responsible for generating the key. 
// The iteratee is invoked with one argument: (value).b

const _keyBy = (collection,it = identity) => {
   const keys = Object.keys(collection)
   const _predicate = iteratee(it)
   return keys.reduce((res,key)=>{
      res[_predicate(collection[key])] = collection[key]
      return res
   },{})
}



//Invokes the method at path of each element in collection, returning an array of the results of each invoked method. 
//Any additional arguments are provided to each invoked method. 
//If path is a function, it's invoked for, and this bound to (be bound to 必定), each element in collection.

const invokeMap = (collection, path, ...args)=>{
  const type = getType(path)
  const keys = Object.keys(collection)
  const fn 
  if (type === 'string') {
    fn = collection[keys[0]][path]
  } else if(type === 'function') {
    fn = path
  }
  return keys.map(key => {
    let currVal = collection[key]
    if (getType(currVal) === 'number') currVal += ''
    return fn.apply(currVal, args)
  })
}


// Checks if value is in collection. If collection is a string, it's checked for a substring of value, otherwise SameValueZero is used for equality comparisons. 
// If fromIndex is negative, it's used as the offset from (代替)  the end of collection.

const _includes = (collection, val, fromIndex = 0)=> {
  const type = getType(collection)
  if (type === 'array') {
    let newArray = fromIndex >= 0 ? collection.slice(0, collection.length + fromIndex) : collection.slice(fromIndex)
    return newArray.some(item => eq(item,val))
  } else if (type === 'string') {
    let newString = fromIndex >= 0 ?collection.substring(0, collection.length + fromIndex) : collection.substring(fromIndex)
    return newString.includes(val)
  } else if(type === 'object') {
    let keys = Object.keys(collection)
    return keys.some(key => eq(collection[key], val))
  }
}


// Creates an object composed of keys generated from the results of running each element of collection thru iteratee. 
// The order of grouped values is determined by the order they occur in collection.
// The corresponding value of each key is an array of elements responsible for generating the key.
// The iteratee is invoked with one argument: (value).

const _groupBy = (collection, it ) => {
  let keys = Object.keys(collection)
  const _predicate = iteratee(it)
  const res = {}
  keys.forEach(key => {
    let currVal = collection[key]
    if (res[_predicate(currVal)] === undefined) {
      res[_predicate(currVal)] = [currVal]
    } else {
      res[_predicate(currVal)].push(currVal)
    }
  })
  return res 
}

const _groupBy = (collection, it)=>{
  let keys = Object.keys(collection)
  console.log(keys)
  const _predicate = iteratee(it)
  return keys.reduce((res,key)=>{
      let currVal = collection[key]
      console.log(currVal)
      if (res[_predicate(currVal)] === undefined) {
          res[_predicate(currVal)] = [currVal]
      } else {
          res[_predicate(currVal)].push(currVal)
      }
      return res
  }
  , {})
}



// Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
// The corresponding value of each key is the number of times the key was returned by iteratee.
// The iteratee is invoked with one argument: (value).

const _countBy = (collection, it ) => {
  let keys = Object.keys(collection)
  let _predicate = iteratee(it)
  return keys.reduce((res, key) => {
    if (res[_predicate(collection[key])]) {
      res[_predicate(collection[key])]++
    } else {
      res[_predicate(collection[key])] = 1
    }
    return res
  },{})
}


// Checks if predicate returns truthy for all elements of collection.
// Iteration is stopped once predicate returns falsey.
// The predicate is invoked with three arguments: (value, index|key, collection).


const _every = (collection,it) => {
  let _predicate = iteratee(it)
  for (let val of collection) {
      if (!_predicate(val))
          return false
  }
  return true
}

// const _every = (collection,it)=>{
//   let values = Object.values(collection)
//   let _predicate = iteratee(it)
//   values.forEach((ele,index)=>{
//       if (!_predicate(ele)) {
//           return false
//       }
//   }
//   )
//   return true
// }
// _every([true, 1, null, 'yes'], Boolean)


//Iterates over elements of collection, returning an array of all elements predicate returns truthy for. 
//The predicate is invoked with three arguments: (value, index|key, collection).

const _filter = (collection, predicate) => {
  let values = Object.values(collection)
  let _predicate = iteratee(predicate)
  let newArray = []
  values.forEach((item, index)=>{
    if (_predicate(item)) {
      newArray.push(item)
    }
  })
  return newArray
}


// Iterates over elements of collection, returning the first element predicate returns truthy for. 
// The predicate is invoked with three arguments: (value, index|key, collection).

const _find = (collection, predicate, fromIndex=0 ) =>{
  let values = Object.values(collection)
  let _predicate = iteratee(predicate)
 for (let i = fromIndex; i < values.length; i++) {
   if (_predicate(i)) {
     return values[i]
   }
 }
 return undefined
}




//Creates a flattened array of values by running each element in collection thru iteratee and flattening the mapped results.
// The iteratee is invoked with three arguments: (value, index|key, collection).
const _flatMap = (collection, iteratee) =>{
  let values = Object.values(collection)
  let _predicate =  iteratee(iteratee)
  let newArray = []
  values.forEach((item)=>{
    res.push(..._predicate(item))
  })
  return newArray
}

const _flatMapDeep = (collection, iteratee, depth = 1)=> {
  let values = Object.values(collection)
  let _predicate = iteratee(iteratee)
  return values.reduce((res, val)=>{
    res.push(..._flatMapDeep(_predicate(val)))
    return res 
},[])
}


// call apply throttle debounce curry

// 将函数设为对象的属性
// 执行该函数
// 删除该函数

const _call_apply = (context, ...args) => {
  // 可以通过 this 获取调用 call 的函数
  context.fn = this
  let res = context.fn(...args)
  delete context.fn
  return res 
}



// throttle (节流)

//首先我们来看看 throttle 函数的工作方式，从字面意思上看可以理解为事件在一个管道中传输，加上这个节流阀以后，事件的流速就会减慢。
// 实际上这个函数的作用就是如此，它可以将一个函数的调用频率限制在一定阈值内，例如 1s，那么 1s 内这个函数一定不会被调用两次.
//上方的时间轴代表上游事件，可能是用户的输入事件或设备传感器发出的回调事件，如果没有经过 throttle 函数处理，那么每次事件就会对应一次响应，
//假设一个用户某次输入了 10 个字符的搜索关键字，那么服务器就需要处理 10 次检索请求，
//而如果加上节流阀，并且用户输入文字的手速很快，那么可能服务器就会收到两次请求。

//方法1 ：使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )，
// 如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。

const throttle = (fn, wait) => {
  let context;
  let args;
  let previous = 0
   return () => {
     let nowTime = +new Date()
     context = this
     args = arguments
     if (nowTime - previous > wait){
       fn.apply(context, args)
       previous = nowTime
     }
   }
}

// container.onmousemove = throttle(getUserAction, 1000);




 function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
 }


//  curry 的概念很简单：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。
// 是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

function _curry(fn){
  let args = [].slice.call(arguments, 1)
  return function () {
    let newArgs = args.concat([].slice.call(arguments))
    return fn.apply(null, newArgs)
  }
}

//Defers(延期) invoking the func until the current call stack has cleared. 
//Any additional arguments are provided to func when it's invoked.

const defer = (fn, ...args) => {
  return setTimeout(() => {
  return  fn(...args)
  }, 0);
}


// Invokes func after wait milliseconds. 
// Any additional arguments are provided to func when it's invoked.
const delay = (fn, wait, ...args)=>{
  return setTimeout(() => {
    return fn(...args)
  }, wait);
}


// Performs a SameValueZero comparison between two values to determine if they are equivalent.

// Casts value as an array if it's not one.

_castAarry = (value)=> {
  let type = getType(value)
  if (type === 'array') {
    return value
  } else {
    return [value]
  }
}



// Checks if value is greater than other.

_gte = (value, other)=>{
  return value >= other
}


// Checks if value is array-like.
// A value is considered array-like if it's not a function and has a value.
// length that's an integer greater than or equal to 0 and less than or equal to Number.MAX_SAFE_INTEGER.

_isArrayLike = (val)=>{
  let type = getType(val)
  let len = val.length
  if(type === 'function' || type === 'null'){
    return false
  }
  if (len === undefined){
    return false
  }
  return getType(length) === 'number' && length >= 0 && length < Number.MAX_SAFE_INTEGER
}


_isElement = val => val instanceof Element

_toArray = (value) =>  {
  return (value === null || value === undefined) ? [] :  Array.from(Object.values(value))
}