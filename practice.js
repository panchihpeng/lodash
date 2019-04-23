const getType = val => {
  return Object.prototype.toString
    .call(val)
    .slice(8, -1)
    .toLowerCase()
}

const argBeArray = (a, b) => {
  return Array.prototype.slice.call(arguments)
  // [].slice.call(arguments)
  // Array.from(arguments)
  // [...arguments] 展开运算符
}

const identity = (...vals) => vals[0]

const isNil = val => val === null || val === undefined

const eq = (first, second) => {
  if (Number.isNaN(first) && Number.isNaN(second)) {
    return true
  } else {
    return first === second
  }
}

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

const get = (obj, path, defaultVal) => {
  const paths = toPath(path)
  let res = obj
  try {
    paths.forEach(path => {
      return (res = res[path])
    })
  } catch (e) {
    return defaultVal
  }
  return res === undefined ? defaultVal : res
}

const propertyOf = obj => {
  return path => {
    return get(obj, path, null)
  }
}

const nthArg = n => {
  return (...agrs) => {
    n = n >= 0 ? n : n + agrs.length
    return agrs[n]
  }
}

const methodOf = (obj, ...args) => {
  return path => {
    return get(obj, path)(...args)
  }
}

const method = (obj, ...args) => {
  return path => {
    return get(obj, path)(...args)
  }
}

const flow = (...funcs) => {
  let funcs = flatMapDeep(funcs)
  return (...args) => {
    let val = funcs.shift()(...args)
    return funcs.reduce((val, func) => {
      func.call(null, val)
      return func
    }, val)
  }
}


// Debounce 防抖

// 防抖原理 :你尽管触发事件，但是我一定在事件触发 n 秒后才执行，
// 如果你在一个事件触发的 n 秒内又触发了这个事件，
// 那我就以新的事件的时间为准，n 秒后才执行，
// 总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行，真是任性呐!


function  debounce(func, await) {
  let timeout
  return function() {
    let context = this
    let args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function(){
      func.apply(context, args)
    })
  }
}