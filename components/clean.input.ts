const omitDeepArrayWalk = (arr, key) => {
  return arr.map((val) => {
    if (Array.isArray(val)) return omitDeepArrayWalk(val, key)
    else if (typeof val === 'object') return omitDeep(val, key)
    return val
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const omitDeep = (obj: any, key: string | number): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const keys: Array<any> = Object.keys(obj)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newObj: any = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keys.forEach((i: any) => {
    if (i !== key) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const val: any = obj[i]
      if (val instanceof Date) newObj[i] = val
      else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key)
      else if (typeof val === 'object' && val !== null) newObj[i] = omitDeep(val, key)
      else newObj[i] = val
    }
  })
  return newObj
}

export const cleanInput = <T>(obj: T): T => {
  return omitDeep(obj, '__typename')
}
