import * as VegaLite from 'vega-lite'
import * as Vega from 'vega'
import type { RequestHandler } from '@sveltejs/kit/types/endpoint';

export const post: RequestHandler<Record<string, unknown>, VegaLite.TopLevelSpec>  = async ({body}) => {
  const {spec} = VegaLite.compile(body)
  const svg = await new Vega.View(
    Vega.parse(spec), 
    {renderer: 'none'}
  ).toSVG()
  return {
    body: svg
  }
}