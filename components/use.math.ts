import { all, create } from 'mathjs'
import { useState } from 'react'

export const useMath = (): ((
  expression: string,
  values?: { [id: string]: string | number }
) => boolean) => {
  const [math] = useState(create(all, {}))

  return (expression, values) => {
    try {
      let processed = expression

      Object.keys(values).forEach((key) => {
        const r = new RegExp(key.replace('$', '\\$'), 'ig')

        if (r.test(processed)) {
          processed = processed.replace(r, String(values[key]))
        }
      })

      const result = math.evaluate(processed)

      return Boolean(result)
    } catch (e) {
      throw e
    }
  }
}
