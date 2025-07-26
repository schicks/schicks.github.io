import * as VegaLite from 'vega-lite'
import * as Vega from 'vega'
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler<Record<string, string>, string> = async (event) => {
  const body = await event.request.json()
  const { spec } = VegaLite.compile(body)
  const svg = await new Vega.View(Vega.parse(spec), { renderer: 'none' }).toSVG()
  return {
    body: svg
  }
}
