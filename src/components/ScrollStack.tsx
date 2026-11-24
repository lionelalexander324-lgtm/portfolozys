import { Children, type CSSProperties, type ReactNode } from 'react'
import './ScrollStack.css'

type ScrollStackProps = {
  children: ReactNode
  className?: string
}

type ScrollStackItemProps = {
  children: ReactNode
  itemClassName?: string
  style?: CSSProperties
}

export function ScrollStackItem({ children, itemClassName = '', style }: ScrollStackItemProps) {
  return <div className={`section-flow-item ${itemClassName}`.trim()} style={style}>{children}</div>
}

export default function ScrollStack({ children, className = '' }: ScrollStackProps) {
  return <div className={`section-flow ${className}`.trim()}>{Children.map(children, child => child)}</div>
}
