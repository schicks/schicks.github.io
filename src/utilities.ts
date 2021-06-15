import type {TopLevelSpec} from 'vega-lite'


/* converts record of named vega lite specs to record of named svgs at compile time when used as a module load function.
*/
export const loadVegaLiteCharts = <T extends {[name: string]: TopLevelSpec}>(
  charts: T
) => async (
  {fetch: injectedFetch}: {fetch: typeof fetch}
): Promise<{props: {[name in keyof T]: string}}> => {
  const props = Object.fromEntries(await Promise.all(
    Object.entries(charts)
    .map(async ([key, spec]) => {
      const response = await injectedFetch(
        '/vegalite.svg',
        {
          method: 'POST',
          body: JSON.stringify(spec),
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      return [key, await response.text()]
    })
  ))
  return {props}
}