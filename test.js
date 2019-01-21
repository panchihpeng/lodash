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
    console.log(a,b)
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