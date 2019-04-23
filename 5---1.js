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
  return array.filter((item)=>{
    return !_values.includes(item)
  })
}

const difference = (arrayA, arrayB) => {
 return new Set ([...arrayA].filter(item => arrayB.has(item)))
}
const differenceBy = (array, iteratee, ...values,) => {
  let predicate = _.iteratee(iteratee)
  let _values = values.reduce((a,b) => {
    return a.concat(b)
  })
  return array.filter((ele) => {
    return !_values.some((unionEle) => {
      return predicate(ele) === predicate(unionEle)
    })
  })
}