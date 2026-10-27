import type { SVGAttributes } from 'preact'

type Props = SVGAttributes<SVGSVGElement> & {
  /** The file's markup, imported with `?raw` from src/assets/icons. */
  svg: string
}

const cache = new Map<string, { attrs: Record<string, string>; body: string }>()

/** Splits an icon file into its root <svg> attributes and the shapes inside it. */
function parse(svg: string) {
  let hit = cache.get(svg)
  if (!hit) {
    const [, attrText = '', body = ''] = svg.match(/<svg\b([^>]*)>([\s\S]*)<\/svg>/) ?? []
    const attrs: Record<string, string> = {}
    for (const [, name, value] of attrText.matchAll(/([\w:-]+)="([^"]*)"/g)) {
      if (name !== 'xmlns') attrs[name] = value
    }
    hit = { attrs, body: body.trim() }
    cache.set(svg, hit)
  }
  return hit
}

/**
 * Draws an icon file inline rather than as an <img>, so it still picks up
 * currentColor and the CSS that targets svg elements. Props override the
 * file's own attributes. Icons are decorative unless told otherwise.
 */
export function Icon({ svg, ...props }: Props) {
  const { attrs, body } = parse(svg)
  return <svg aria-hidden="true" {...attrs} {...props} dangerouslySetInnerHTML={{ __html: body }} />
}
