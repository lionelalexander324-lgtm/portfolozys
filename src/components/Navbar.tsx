import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Menu, X } from 'lucide-react'
import { requestPageTransition } from './PageTransition'

const links = [
  ['首页', '#top'], ['关于我', '#about'], ['作品目录', '#work-index'],
  ['01 活动企划', '#campaigns'], ['02 启动视觉', '#splash'],
  ['03 互动网页', '#web'], ['04 动态创作', '#motion'], ['联系方式', '#contact'],
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    lastScroll.current = window.scrollY
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const current = window.scrollY
        if (open || current < 72) {
          setHidden(false)
          lastScroll.current = current
        } else if (current > lastScroll.current + 5) {
          setHidden(true)
          lastScroll.current = current
        } else if (current < lastScroll.current - 5) {
          setHidden(false)
          lastScroll.current = current
        }
        frame = 0
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [open])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    return () => document.documentElement.classList.remove('menu-open')
  }, [open])

  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false)
    requestPageTransition(event, href)
  }

  return <header className={`nav${hidden ? ' is-hidden' : ''}${open ? ' is-menu-open' : ''}`}>
    <button className="nav-toggle" type="button" aria-expanded={open} aria-label={open ? '关闭菜单' : '打开菜单'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}<span>{open ? '关闭' : '菜单'}</span></button>
    <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="主导航">
      <div className="nav-link-list">{links.map(([label, href], index) => <a key={href} href={href} onClick={event => navigate(event, href)}><small>{String(index).padStart(2, '0')}</small><span>{label}</span></a>)}</div>
    </nav>
    <a className="nav-brand" href="#top" aria-label="张雅书 ZYS 标志，返回首页" onClick={event => navigate(event, '#top')} style={{ backgroundImage: "url('./assets/brand/zys-logo-tight.webp')" }} />
  </header>
}
