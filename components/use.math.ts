import debug from 'debug'
import { formula, init } from 'expressionparser'

const logger = debug('useMath')

export const useMath = (): ((
  expression: string,
  values?: { [id: string]: string | number }
) => boolean) => {
  return (expression, values) => {
    const parser = init(formula, (term: string) => {
      if (values[term]) {
        return values[term]
      }

      throw new Error(`Invalid term: ${term}`);
    })

    try {
      let processed = expression

      Object.keys(values).forEach((key) => {
        const r = new RegExp(key.replace('$', '\\$'), 'ig')

        const test = r.test(processed)

        if (test) {
          processed = processed.replace(r, String(values[key]))
        }
      })

      parser.expressionToValue(expression)

      return Boolean(parser.expressionToValue(expression))
    } catch (e) {
      logger(
        'failed to calculate %O: %s',
        {
          expression,
          values,
        },
        e.message
      )

      throw e
    }
  }
}
