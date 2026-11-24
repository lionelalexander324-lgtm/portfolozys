import { MousePointer2 } from 'lucide-react'
import { useState } from 'react'
import type { PortfolioItem } from '../data/portfolio'
import { ExternalLinkButton } from './ExternalLinkButton'

export function StackingCard({ item, index }: { item: PortfolioItem, index: number, total: number }) {
  const [loaded, setLoaded] = useState(false)
  const [previewEnabled, setPreviewEnabled] = useState(false)
  const [interactive, setInteractive] = useState(false)
  const host = item.url ? new URL(item.url).hostname.replace('www.', '') : ''

  const togglePreview = () => {
    if (!previewEnabled) {
      setPreviewEnabled(true)
      setInteractive(true)
      return
    }
    setInteractive(current => !current)
  }

  return <article className={`web-project-card web-project-${index}`}>
    <div className="stack-copy"><span>0{index + 1} / WEB EXPERIENCE</span><h3>{item.title}</h3><p>{item.description}</p>{item.url && <ExternalLinkButton href={item.url}>打开网页</ExternalLinkButton>}</div>
    <div className="stack-shot">
      <div className="live-preview">
        <div className="preview-bar">
          <span className="preview-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="preview-host">{previewEnabled ? <b>LIVE</b> : <b>SHOT</b>}{host}</span>
          <button type="button" aria-pressed={interactive} onClick={togglePreview}><MousePointer2 size={15} />{!previewEnabled ? '载入实时预览' : interactive ? '退出操作' : '进入操作'}</button>
        </div>
        <div className="preview-window">
          <img className={loaded && previewEnabled ? 'preview-fallback is-loaded' : 'preview-fallback'} src={item.image} alt={item.alt} loading="lazy" decoding="async" />
          {previewEnabled && item.url && <iframe className={`${loaded ? 'is-loaded' : ''} ${interactive ? 'is-interactive' : ''}`} src={item.url} title={`${item.title} 实时网页预览`} loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" referrerPolicy="no-referrer" tabIndex={interactive ? 0 : -1} onLoad={() => setLoaded(true)} />}
          {previewEnabled && !loaded && <span className="preview-loading">正在载入真实网页…</span>}
        </div>
      </div>
    </div>
  </article>
}
