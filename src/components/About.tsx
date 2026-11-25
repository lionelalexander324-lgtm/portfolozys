import { motion } from 'framer-motion'
import { RevealText } from './RevealText'
import { requestPageTransition } from './PageTransition'

const copy = '你好，我是张雅书。热爱创意表达，也享受让想法落地的过程。拥有海外社交 APP 活动运营、AI 视觉内容制作及用户运营经验。从活动策划、内容设计到执行上线再到后续结算，我喜欢探索不同的创意可能，也关注每一个细节背后的用户体验。'

export function About() {
  return <section id="about" className="about section-dark">
    <div className="orb orb-a" /><div className="orb orb-b" />
    <motion.div className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>ABOUT / 关于我</motion.div>
    <motion.h2 className="display-title gradient-title" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .8 }}>ABOUT ME.</motion.h2>
    <RevealText text={copy} />
    <a className="ghost-link" href="#campaigns" onClick={event => requestPageTransition(event, '#campaigns')}>查看精选作品</a>
  </section>
}
