import { useEffect, useRef, useState } from 'react'
import { Copy } from 'lucide-react'
import { contact } from '../data/portfolio'
import { requestPageTransition } from './PageTransition'

function fallbackCopy(value: string) {
  const field = document.createElement('textarea')
  field.value = value
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.appendChild(field)
  field.select()
  const success = document.execCommand('copy')
  field.remove()
  if (!success) throw new Error('copy failed')
}

export function ContactFooter() {
  const [toast, setToast] = useState('')
  const timer = useRef<number | null>(null)

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current) }, [])

  const copyValue = async (value: string, successMessage: string) => {
    try {
      let copied = false
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(value)
          copied = true
        } catch {
          copied = false
        }
      }
      if (!copied) fallbackCopy(value)
      setToast(successMessage)
    } catch {
      setToast('复制失败，请长按文字复制')
    }
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(''), 2200)
  }

  return <footer id="contact" className="footer work-panel panel-contact">
    <div className="contact-heading"><span>LET'S CONNECT.</span><h2>期待相遇。</h2><p>感谢您浏览我的作品集，希望有机会与您进一步交流，分享更多关于创意、运营与实践的想法。</p></div>
    <div className="contact-methods">
      <button type="button" onClick={() => copyValue(contact.phone, '已复制电话号码')}><small>PHONE / 点击复制</small><strong>{contact.phone}</strong><Copy aria-hidden="true" /></button>
      <button type="button" onClick={() => copyValue(contact.contactEmail, '已复制邮箱地址')}><small>EMAIL / 点击复制</small><strong>{contact.contactEmail}</strong><Copy aria-hidden="true" /></button>
    </div>
    <div className={`copy-toast${toast ? ' is-visible' : ''}`} role="status" aria-live="polite">{toast}</div>
    <div className="footer-bottom"><span>ZHANG YASHU © 2026</span><a href="#top" onClick={event => requestPageTransition(event, '#top')}>返回顶部</a></div>
  </footer>
}
