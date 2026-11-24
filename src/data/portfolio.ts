export type PortfolioItem = {
  id: string
  title: string
  category: 'campaign' | 'splash' | 'web' | 'motion'
  image?: string
  fullImage?: string
  video?: string
  poster?: string
  description: string
  url?: string
  alt: string
}

export const campaigns: PortfolioItem[] = [
  { id: 'true-love', title: 'True Love Arrives', category: 'campaign', image: './assets/banners/true-love-arrives.webp', description: '恋爱主题活动 · 聚焦情感互动的活动视觉', url: 'https://d1m0okuba9ph2x.cloudfront.net/campaigns/true-love-arrives/?v=2069d5e', alt: 'True Love Arrives 活动横幅' },
  { id: 'your-cover', title: 'Your Cover, Your Style', category: 'campaign', image: './assets/banners/your-cover-your-style.webp', description: '个性化封面活动 · 玩法构思、英文文案与上线视觉', url: 'https://d1m0okuba9ph2x.cloudfront.net/campaigns/your-cover-your-style/', alt: 'Your Cover, Your Style 活动横幅' },
  { id: 'trick-or-treat', title: 'Trick or Treat', category: 'campaign', image: './assets/banners/v10/trick-or-treat.webp', description: '累计送出曲奇幸运礼物，达成目标可获得万圣节座驾与金币奖励。', url: 'https://d1m0okuba9ph2x.cloudfront.net/campaigns/trick-or-treat/', alt: 'Trick or Treat 万圣节活动横幅' },
  { id: 'pinoy-henyo', title: 'Pinoy Henyo', category: 'campaign', image: './assets/banners/pinoy-henyo.webp', description: '菲律宾猜词互动 · 房间玩法与活动素材', url: 'https://lionelalexander324-lgtm.github.io/game/', alt: 'Pinoy Henyo 猜词活动横幅' },
  { id: 'team-up', title: 'Team Up for Love', category: 'campaign', image: './assets/banners/team-up-for-love.webp', description: '组队恋爱主题活动 · 视觉物料与互动机制', url: 'https://d1m0okuba9ph2x.cloudfront.net/campaigns/team-up-for-love/', alt: 'Team Up for Love 活动横幅' },
  { id: 'official-host', title: '活动主播官方招募', category: 'campaign', image: './assets/banners/v10/official-host-recruitment.webp', description: '推荐官方主播成功入选后，推荐人与主持人均可获得对应奖励。', url: 'https://d1m0okuba9ph2x.cloudfront.net/campaigns/super-idol-official-recruitment/', alt: 'Mimoon 活动主播官方招募横幅' },
  { id: 'dance-challenge', title: 'MIMOON 舞蹈模仿赛', category: 'campaign', image: './assets/banners/v10/mimoon-dance-challenge.webp', description: '模仿 MIMOON 人舞蹈并发布社交软件，优秀作品可获得专属坐骑与金币。', url: 'https://d1m0okuba9ph2x.cloudfront.net/campaigns/mimoon-dance-challenge/', alt: 'MIMOON 舞蹈模仿赛横幅' },
  { id: 'game-fever', title: 'Game Fever Challenge', category: 'campaign', image: './assets/banners/game-fever-challenge.webp', description: '游戏挑战活动 · 竞技氛围与激励信息', url: 'https://d1m0okuba9ph2x.cloudfront.net/campaigns/game-fever-challenge/', alt: 'Game Fever Challenge 活动横幅' },
]

export const splashVisuals: PortfolioItem[] = [
  { id: 'splash-cover', title: 'Your Cover, Your Style', category: 'splash', image: './assets/visuals/your-cover-opener.webp', description: '活动启动页', alt: 'Your Cover, Your Style 完整竖版启动页' },
  { id: 'splash-slime', title: 'Slime Wish Battle', category: 'splash', image: './assets/visuals/slime-wish-opener.webp', description: '活动启动页', alt: 'Slime Wish Battle 完整竖版启动页' },
  { id: 'splash-love', title: 'True Love Arrives', category: 'splash', image: './assets/visuals/true-love-opener.webp', description: '活动启动页', alt: 'True Love Arrives 完整竖版启动页' },
  { id: 'splash-owl', title: 'Owl Fortune Rush', category: 'splash', image: './assets/visuals/owl-fortune-opener.webp', description: '活动启动页', alt: 'Owl Fortune Rush 完整竖版启动页' },
  { id: 'splash-slime-couple', title: 'Slime Couple Event', category: 'splash', image: './assets/visuals/v10/thumbs/4.webp', fullImage: './assets/visuals/v10/full/4.webp', description: '活动启动页', alt: 'Slime Couple Event 竖版启动视觉' },
  { id: 'splash-vip-rewards', title: 'VIP Exclusive Rewards', category: 'splash', image: './assets/visuals/v10/thumbs/5.webp', fullImage: './assets/visuals/v10/full/5.webp', description: '活动启动页', alt: 'VIP Exclusive Rewards 竖版启动视觉' },
  { id: 'splash-star-host', title: 'Star Host', category: 'splash', image: './assets/visuals/v10/thumbs/6.webp', fullImage: './assets/visuals/v10/full/6.webp', description: '活动启动页', alt: 'Star Host 竖版启动视觉' },
  { id: 'splash-besties', title: 'Besties Forever', category: 'splash', image: './assets/visuals/v10/thumbs/7.webp', fullImage: './assets/visuals/v10/full/7.webp', description: '活动启动页', alt: 'Besties Forever 竖版启动视觉' },
  { id: 'splash-birthday-black-gold', title: 'Happy Birthday', category: 'splash', image: './assets/visuals/v10/thumbs/8.webp', fullImage: './assets/visuals/v10/full/8.webp', description: '活动启动页', alt: '黑金 Happy Birthday 竖版启动视觉' },
  { id: 'splash-excellent-family', title: 'Slime Event · Excellent Family', category: 'splash', image: './assets/visuals/v10/thumbs/9.webp', fullImage: './assets/visuals/v10/full/9.webp', description: '活动启动页', alt: 'Slime Event Excellent Family 竖版启动视觉' },
  { id: 'splash-birthday-pink', title: 'Happy Birthday · Sharey', category: 'splash', image: './assets/visuals/v10/thumbs/10.webp', fullImage: './assets/visuals/v10/full/10.webp', description: '活动启动页', alt: '粉色 Happy Birthday 竖版启动视觉' },
  { id: 'splash-power-duo', title: 'Power Duo', category: 'splash', image: './assets/visuals/v10/thumbs/11.webp', fullImage: './assets/visuals/v10/full/11.webp', description: '活动启动页', alt: 'Power Duo 竖版启动视觉' },
]

export const webProjects: PortfolioItem[] = [
  { id: 'sea-treasure', title: '海洋兑换商店', category: 'web', image: './assets/web/sea-treasure.webp', description: '双商店、双货币兑换机制，让活动规则更直观。', url: 'https://lionelalexander324-lgtm.github.io/slime-sea-treasure-3/', alt: '海洋兑换商店真实网页截图' },
  { id: 'top-circle', title: 'Top Circle 会员权益', category: 'web', image: './assets/web/top-circle.webp', description: '高价值用户权益说明，呈现生日会与定制礼物等服务。', url: 'https://lionelalexander324-lgtm.github.io/topcircle/?lang=zh-TW#benefits', alt: 'Top Circle 会员权益真实网页截图' },
  { id: 'cp-battle', title: 'CP Battle', category: 'web', image: './assets/web/cp-battle.webp', description: '多轮二选一互动，选出最心仪的组合。', url: 'https://deansmith0502.github.io/aylio/', alt: 'CP Battle 真实网页截图' },
]

export const motionWorks: PortfolioItem[] = [
  { id: 'owl-kart', title: 'Owl Kart Entrance', category: 'motion', video: './assets/motion/owl-kart.mp4', poster: './assets/motion-posters/owl-kart.webp', description: '猫头鹰进场特效', alt: '猫头鹰卡丁车进场动画' },
  { id: 'diamond', title: 'Diamond Shine', category: 'motion', video: './assets/motion/diamond-shine.mp4', poster: './assets/motion-posters/diamond-shine.webp', description: '万圣节进场特效', alt: '钻石闪耀活动动效' },
  { id: 'game', title: 'Game Time', category: 'motion', video: './assets/motion/game.mp4', poster: './assets/motion-posters/game.webp', description: '游戏主题座位框', alt: '游戏主题座位框动效' },
  { id: 'guitar', title: 'Guitar Mood', category: 'motion', video: './assets/motion/guitar.mp4', poster: './assets/motion-posters/guitar.webp', description: '吉他主题座位框', alt: '吉他主题座位框动效' },
  { id: 'reading', title: 'Reading Corner', category: 'motion', video: './assets/motion/reading.mp4', poster: './assets/motion-posters/reading.webp', description: '阅读主题座位框', alt: '读书主题座位框动效' },
  { id: 'sleeping', title: 'Sleepy Owl', category: 'motion', poster: './assets/motion-posters/sleeping.webp', description: '睡眠主题座位框 · GitHub 轻量版使用静态预览', alt: '睡觉主题座位框动效静态预览' },
  { id: 'purple-yellow', title: 'Purple × Yellow', category: 'motion', video: './assets/motion/purple-yellow.mp4', poster: './assets/motion-posters/purple-yellow.webp', description: '双人座位框', alt: '黄紫双人座位框动效' },
]

export const contact = { phone: '18646390081', contactEmail: 'yashu_zhang@163.com', resumeUrl: '', socialUrl: '' }
