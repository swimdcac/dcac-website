import type { ComponentChildren } from 'preact'
import { Link } from 'wouter'
import './Tile.css'
import { Icon } from './Icon.tsx'
import arrowRightSvg from '../assets/icons/arrow-right.svg?raw'

export type TileColor = 'blue' | 'red' | 'purple' | 'deep'

interface TileProps {
  color: TileColor
  title: ComponentChildren
  description: ComponentChildren
  icon?: ComponentChildren
  href?: string
  external?: boolean
  arrow?: boolean
  id?: string
}

export function Tile({ color, title, description, icon, href, external, arrow = !!href, id }: TileProps) {
  const className = `tile t-${color}`
  const inner = (
    <>
      {icon && <span className="ic">{icon}</span>}
      <span><span className="ttl">{title}</span><br /><span className="desc">{description}</span></span>
      {arrow && (
        <span className="arr">
          <Icon svg={arrowRightSvg} />
        </span>
      )}
    </>
  )

  // Internal routes go through wouter so they respect the deploy base path.
  if (href && !external && href.startsWith('/')) {
    return <Link className={className} id={id} href={href}>{inner}</Link>
  }

  if (href) {
    return (
      <a className={className} id={id} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    )
  }

  return <div className={className} id={id}>{inner}</div>
}