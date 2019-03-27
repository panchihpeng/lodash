const getType = val => {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
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
  } else if (typeof val === 'string'){
    return val.match(/([0-9]+)|([a-zA-Z0-9_$]+)/g)
  } else if (getType(val) === 'array') {
    return val
  } else {
    return [val.toString()]
  }
}

const get = (obj, path, defaultVal) =>{
  const paths = toPath(obj)
  let res = obj 
  try {
    paths.forEach(path=>{
      return res = res[path]
    })
  } catch(e){
    return defaultVal
  }
  return res ===  undefined ? defaultVal : res 
}