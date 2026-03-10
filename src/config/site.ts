// ===========================================
// 網站配置 - 後台可管理
// ===========================================

// 網站基本配置
export const siteConfig = {
  // 頂部導航
  logo: '', // LOGO 圖片路徑，例如：/images/logo.png
  siteName: '翡翠原石專業買手', // 備用文字
  navLinks: [
    { label: '關於我們', href: '#about' },
    { label: '產品展示', href: '#products' },
    { label: '聯繫我們', href: '#contact' }
  ]
};

// Hero 區域
export const heroConfig = {
  title: {
    line1: '專業翡翠原石',
    line2: '買手推薦'
  },
  subtitle: '10年行業經驗 | 瑞麗公司 | 一物一證',
  subtitle2: '為您精選高品質翡翠原石',
  buttons: {
    primary: '查看產品',
    secondary: '立即咨詢'
  }
};

// 視頻區域
export const videoConfig = {
  youtubeId: '', // YouTube 視頻 ID，例如：abc123
  enabled: true
};

// 品牌故事
export const brandConfig = {
  title: '關於我們',
  subtitle: '專業翡翠原石買手 10年行業經驗',
  image: '', // 品牌故事圖片路徑
  content: {
    title: '10年專注，只為好石',
    paragraphs: [
      '我們是中緬邊境曼德勒翡翠原石市場的專業買手，從事行業10年以上。2014年開始接觸雕刻，潛心學習5年，後開始轉做直播，最終創立自己的事業。',
      '我們始終堅持「不割韭菜，真實做生意」的理念，憑藉獨特的眼光和誠信經營，贏得了眾多客戶的信任。目前已有5位以上客戶跟隨我們超過3年。'
    ]
  },
  highlights: [
    { number: '10+', label: '年行業經驗' },
    { number: '5+', label: '年復購客戶' },
    { number: '20%', label: '透明代購費' }
  ]
};

// 信任保證
export const trustConfig = {
  title: '信任保證',
  subtitle: '讓您購買無憂',
  items: [
    { icon: '📜', title: '一物一證', desc: '每件翡翠原石均附帶專業鑒定證書，保證品質真實' },
    { icon: '💰', title: '本地匯率', desc: '匯率走本地匯率，比國際匯率低近50%，價格更優惠' },
    { icon: '🛡️', title: '源頭直採', desc: '親赴緬甸礦區直接採購，省去中間環節，品質更有保障' },
    { icon: '📊', title: '20%代購費', desc: '收費透明，只賺取20%代購費，不隱藏費用' },
    { icon: '🏢', title: '瑞麗公司', desc: '瑞麗設有公司，誠信經營，資質齊全' },
    { icon: '🔧', title: '合作工廠', desc: '擁有合作的加工廠，提供一站式服務' }
  ]
};

// 產品參數配置
export const productParams = [
  { key: 'weight', label: '重量' },
  { key: 'mine', label: '礦區' },
  { key: 'skin', label: '皮殼' },
  { key: 'water', label: '種水' },
  { key: 'size', label: '尺寸' }
];

// 產品列表
export const products = [
  {
    id: 1,
    name: '莫西沙 · 冰種',
    image: '',
    params: { weight: '2.5kg', mine: '莫西沙', skin: '翻砂', water: '冰種', size: '12×8×6cm' }
  },
  {
    id: 2,
    name: '會卡 · 糯種',
    image: '',
    params: { weight: '1.8kg', mine: '會卡', skin: '蠟皮', water: '糯種', size: '10×7×5cm' }
  },
  {
    id: 3,
    name: '木那 · 玻璃種',
    image: '',
    params: { weight: '3.2kg', mine: '木那', skin: '脫沙', water: '玻璃種', size: '15×10×8cm' }
  },
  {
    id: 4,
    name: '後江 · 冰糯種',
    image: '',
    params: { weight: '2.1kg', mine: '後江', skin: '油皮', water: '冰糯種', size: '11×7×5cm' }
  },
  {
    id: 5,
    name: '南奇 · 糯冰種',
    image: '',
    params: { weight: '1.5kg', mine: '南奇', skin: '莽帶', water: '糯冰種', size: '9×6×4cm' }
  },
  {
    id: 6,
    name: '莫灣基 · 冰種',
    image: '',
    params: { weight: '2.8kg', mine: '莫灣基', skin: '黑烏沙', water: '冰種', size: '14×9×7cm' }
  }
];

// 為什麼選擇我們
export const whyChooseConfig = {
  title: '為什麼選擇我們',
  subtitle: '四大核心優勢',
  reasons: [
    {
      number: '01',
      title: '價格優勢',
      desc: '收貨量大，能拿到品質高、價格低的原石。本地匯率比國際匯率低近50%，讓您享受實在的優惠。'
    },
    {
      number: '02',
      title: '品質保證',
      desc: '瑞麗設有公司和加工廠，一物一證，品質真實可靠。多年行業經驗，精準判斷原石價值。'
    },
    {
      number: '03',
      title: '專業可靠',
      desc: '10年行業經驗，14年雕刻學徒出身，擁有獨特的買原石邏輯。保證客戶買到的原石都能做貨。'
    },
    {
      number: '04',
      title: '客戶口碑',
      desc: '不割韭菜，真實做生意。5位以上客戶跟隨3年以上，誠信經營，口碑良好。'
    }
  ]
};

// 聯繫方式彈窗
export const contactModalConfig = {
  wechat: '',   // 微 信號
  line: '',     // Line ID
  enabled: true
};

// 頁腳
export const footerConfig = {
  brand: '翡翠原石專業買手',
  tagline: '10年行業經驗 | 瑞麗公司 | 一物一證',
  links: [
    { label: '關於我們', href: '#about' },
    { label: '產品展示', href: '#products' },
    { label: '聯繫我們', href: '#contact' }
  ],
  social: {
    instagram: '',
    youtube: '',
    facebook: ''
  },
  copyright: '翡翠原石專業買手. All rights reserved.'
};
