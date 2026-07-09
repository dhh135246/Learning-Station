// 日语学习系统本地静态数据库 (data.js)

// 1. 五十音图数据
const GOJUON_DATA = [
  // 清音
  { hiragana: 'あ', katakana: 'ア', romaji: 'a', type: 'seion', row: 'a' },
  { hiragana: 'い', katakana: 'イ', romaji: 'i', type: 'seion', row: 'a' },
  { hiragana: 'う', katakana: 'ウ', romaji: 'u', type: 'seion', row: 'a' },
  { hiragana: 'え', katakana: 'エ', romaji: 'e', type: 'seion', row: 'a' },
  { hiragana: 'お', katakana: 'オ', romaji: 'o', type: 'seion', row: 'a' },
  
  { hiragana: 'か', katakana: 'カ', romaji: 'ka', type: 'seion', row: 'ka' },
  { hiragana: 'き', katakana: 'キ', romaji: 'ki', type: 'seion', row: 'ka' },
  { hiragana: 'く', katakana: 'ク', romaji: 'ku', type: 'seion', row: 'ka' },
  { hiragana: 'け', katakana: 'ケ', romaji: 'ke', type: 'seion', row: 'ka' },
  { hiragana: 'こ', katakana: 'コ', romaji: 'ko', type: 'seion', row: 'ka' },
  
  { hiragana: 'さ', katakana: 'サ', romaji: 'sa', type: 'seion', row: 'sa' },
  { hiragana: 'し', katakana: 'シ', romaji: 'shi', type: 'seion', row: 'sa' },
  { hiragana: 'す', katakana: 'ス', romaji: 'su', type: 'seion', row: 'sa' },
  { hiragana: 'せ', katakana: 'セ', romaji: 'se', type: 'seion', row: 'sa' },
  { hiragana: 'そ', katakana: 'ソ', romaji: 'so', type: 'seion', row: 'sa' },
  
  { hiragana: 'た', katakana: 'タ', romaji: 'ta', type: 'seion', row: 'ta' },
  { hiragana: 'ち', katakana: 'チ', romaji: 'chi', type: 'seion', row: 'ta' },
  { hiragana: 'つ', katakana: 'ツ', romaji: 'tsu', type: 'seion', row: 'ta' },
  { hiragana: 'て', katakana: 'テ', romaji: 'te', type: 'seion', row: 'ta' },
  { hiragana: 'と', katakana: 'ト', romaji: 'to', type: 'seion', row: 'ta' },
  
  { hiragana: 'な', katakana: 'ナ', romaji: 'na', type: 'seion', row: 'na' },
  { hiragana: 'に', katakana: 'ニ', romaji: 'ni', type: 'seion', row: 'na' },
  { hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu', type: 'seion', row: 'na' },
  { hiragana: 'ね', katakana: 'ネ', romaji: 'ne', type: 'seion', row: 'na' },
  { hiragana: 'の', katakana: 'ノ', romaji: 'no', type: 'seion', row: 'na' },
  
  { hiragana: 'は', katakana: 'ハ', romaji: 'ha', type: 'seion', row: 'ha' },
  { hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi', type: 'seion', row: 'ha' },
  { hiragana: 'ふ', katakana: 'フ', romaji: 'fu', type: 'seion', row: 'ha' },
  { hiragana: 'へ', katakana: 'ヘ', romaji: 'he', type: 'seion', row: 'ha' },
  { hiragana: 'ほ', katakana: 'ホ', romaji: 'ho', type: 'seion', row: 'ha' },
  
  { hiragana: 'ま', katakana: 'マ', romaji: 'ma', type: 'seion', row: 'ma' },
  { hiragana: 'み', katakana: 'ミ', romaji: 'mi', type: 'seion', row: 'ma' },
  { hiragana: 'む', katakana: 'ム', romaji: 'mu', type: 'seion', row: 'ma' },
  { hiragana: 'め', katakana: 'メ', romaji: 'me', type: 'seion', row: 'ma' },
  { hiragana: 'も', katakana: 'モ', romaji: 'mo', type: 'seion', row: 'ma' },
  
  { hiragana: 'や', katakana: 'ヤ', romaji: 'ya', type: 'seion', row: 'ya' },
  { hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu', type: 'seion', row: 'ya' },
  { hiragana: 'よ', katakana: 'ヨ', romaji: 'yo', type: 'seion', row: 'ya' },
  
  { hiragana: 'ら', katakana: 'ラ', romaji: 'ra', type: 'seion', row: 'ra' },
  { hiragana: 'り', katakana: 'リ', romaji: 'ri', type: 'seion', row: 'ra' },
  { hiragana: 'る', katakana: 'ル', romaji: 'ru', type: 'seion', row: 'ra' },
  { hiragana: 'れ', katakana: 'レ', romaji: 're', type: 'seion', row: 'ra' },
  { hiragana: 'ろ', katakana: 'ロ', romaji: 'ro', type: 'seion', row: 'ra' },
  
  { hiragana: 'わ', katakana: 'ワ', romaji: 'wa', type: 'seion', row: 'wa' },
  { hiragana: 'を', katakana: 'ヲ', romaji: 'wo', type: 'seion', row: 'wa' },
  { hiragana: 'ん', katakana: 'ン', romaji: 'nn', type: 'seion', row: 'n' }
];

// 2. 分主题兴趣词汇库
const VOCAB_DATA = [
  // 异世界与种田 (Isekai & Farming)
  { word: '魔法', reading: 'まほう', romaji: 'mahou', meaning: '魔法', category: 'isekai' },
  { word: '開墾', reading: 'かいこん', romaji: 'kaikon', meaning: '开垦', category: 'isekai' },
  { word: 'スローライフ', reading: 'すろーらいふ', romaji: 'suro-raifu', meaning: '慢生活（外来语）', category: 'isekai' },
  { word: '異世界', reading: 'いせかい', romaji: 'isekai', meaning: '异世界', category: 'isekai' },
  { word: '農業', reading: 'のうぎょう', romaji: 'nougyou', meaning: '农业', category: 'isekai' },
  { word: 'ギルド', reading: 'ぎるど', romaji: 'girudo', meaning: '公会（Guild）', category: 'isekai' },
  { word: '収穫', reading: 'しゅうかく', romaji: 'shuukaku', meaning: '收获', category: 'isekai' },
  { word: '魔王', reading: 'まおう', romaji: 'maou', meaning: '魔王', category: 'isekai' },
  { word: '冒険者', reading: 'ぼうけんしゃ', romaji: 'boukensha', meaning: '冒险者', category: 'isekai' },
  { word: '転生', reading: 'てんせい', romaji: 'tensei', meaning: '转生', category: 'isekai' },

  // 运动与竞技 (Sports & Soccer & Baseball)
  { word: 'ストライカー', reading: 'すとらいかー', romaji: 'sutoraika-', meaning: '前锋（Striker）', category: 'sports' },
  { word: 'エゴイスト', reading: 'えごいすと', romaji: 'egoisuto', meaning: '利己主义者/ egoist', category: 'sports' },
  { word: '甲子園', reading: 'こうしえん', romaji: 'koushien', meaning: '甲子园', category: 'sports' },
  { word: '監督', reading: 'かんとく', romaji: 'kantoku', meaning: '教练/导演/监制', category: 'sports' },
  { word: '戦術', reading: 'せんじゅつ', romaji: 'senjutsu', meaning: '战术', category: 'sports' },
  { word: 'シュート', reading: 'しゅーと', romaji: 'shu-to', meaning: '射门/投篮（Shoot）', category: 'sports' },
  { word: '守備', reading: 'しゅび', romaji: 'shubi', meaning: '守备/防守', category: 'sports' },
  { word: '優勝', reading: 'ゆうしょう', romaji: 'yuushou', meaning: '冠军/优胜', category: 'sports' },
  { word: '特訓', reading: 'とっくん', romaji: 'tokkun', meaning: '特训', category: 'sports' },
  { word: 'ライバル', reading: 'らいばる', romaji: 'raibaru', meaning: '宿敌/竞争对手（Rival）', category: 'sports' },

  // 日摇与音乐 (J-Rock & Music)
  { word: '歌詞', reading: 'かし', romaji: 'kashi', meaning: '歌词', category: 'jrock' },
  { word: 'メロディー', reading: 'めろでぃー', romaji: 'merodi-', meaning: '旋律（Melody）', category: 'jrock' },
  { word: 'ライブハウス', reading: 'らいぶはうす', romaji: 'raibuhausu', meaning: 'LiveHouse/Live演出场所', category: 'jrock' },
  { word: '魂', reading: 'たましい', romaji: 'tamashii', meaning: '灵魂/魂魄', category: 'jrock' },
  { word: '叫ぶ', reading: 'さけぶ', romaji: 'sakebu', meaning: '呐喊/大喊（动词）', category: 'jrock' },
  { word: '共鸣', reading: 'きょうめい', romaji: 'kyoumei', meaning: '共鸣', category: 'jrock' },
  { word: 'バンド', reading: 'ばんど', romaji: 'bando', meaning: '乐队/乐团（Band）', category: 'jrock' },
  { word: '情熱', reading: 'じょうねつ', romaji: 'jounetsu', meaning: '情热/激情', category: 'jrock' },
  { word: '響く', reading: 'ひびく', romaji: 'hibiku', meaning: '回响/震动（动词）', category: 'jrock' },
  { word: '鼓動', reading: 'こどう', romaji: 'kodou', meaning: '鼓动/心跳', category: 'jrock' }
];

// 3. 系统语法卡片数据 (N5/N4 核心，中日双语，含动漫名台词/歌词)
const GRAMMAR_DATA = [
  {
    id: 'G001',
    level: 'N5',
    title: '〜は 〜です',
    connection: '名词 + は + 名词 + です',
    meaning: '……是……',
    explanation: '日语最基础的判断句。「は」是提示助词，读作「wa」，提示句子主语；「です」是判断助动词，表示礼貌断定。',
    exampleJp: '俺はスローライフを送る农家です。',
    exampleRomaji: 'ore wa suro-raifu wo okuru nouka desu.',
    exampleCn: '我是过着慢生活的农夫。',
    source: '【异世界种田】日常语境'
  },
  {
    id: 'G002',
    level: 'N5',
    title: '〜たい',
    connection: '动词ます形（去ます）+ たい',
    meaning: '想要（做某事）',
    explanation: '表示说话者主观上想要做某事的意愿。否定式为「〜たくない」。',
    exampleJp: '俺は世界一のストライカーになりたい。',
    exampleRomaji: 'ore wa sekaiichi no sutoraika- ni naritai.',
    exampleCn: '我想成为世界第一的前锋。',
    source: '【运动系】《蓝色监狱》语境'
  },
  {
    id: 'G003',
    level: 'N5',
    title: '〜てください',
    connection: '动词 て形 + ください',
    meaning: '请（做某事）',
    explanation: '用于委婉、礼貌地请求或指示对方做某事。日常和动漫中极其高频。',
    exampleJp: 'あきらめたらそこで試合終了ですよ、信じてください。',
    exampleRomaji: 'akirametara soko de shiai shuuryou desu yo, shinjite kudasai.',
    exampleCn: '如果放弃的话，比赛就结束了哦，请相信我。',
    source: '【运动系】《灌篮高手》安西教练台词改写'
  },
  {
    id: 'G004',
    level: 'N4',
    title: '〜なければならない',
    connection: '动词ない形（去ない）+ なければならない',
    meaning: '必须…… / 不得不……',
    explanation: '表示客观必要性或责任义务，意为“如果不做某事就不行”，语气比较严肃。',
    exampleJp: 'このギルドを守るために、強くならなければならない。',
    exampleRomaji: 'kono girudo wo mamoru tame ni, tsuyoku naranakereba naranai.',
    exampleCn: '为了守护这个公会，我必须变强。',
    source: '【异世界战记】动漫常见语境'
  },
  {
    id: 'G005',
    level: 'N4',
    title: '〜ている',
    connection: '动词 て形 + いる',
    meaning: '正在…… / 保持着……状态',
    explanation: '1. 表示动作正在进行；2. 表示动作完成后状态的持续。在歌词和独白中出现极多。',
    exampleJp: '胸の鼓動がまだ響いている。',
    exampleRomaji: 'mune no kodou ga mada hibiite iru.',
    exampleCn: '胸中的心跳仍在回响。',
    source: '【日摇】歌词常见句型'
  },
  {
    id: 'G006',
    level: 'N4',
    title: '〜たことがある',
    connection: '动词 た形 + ことがある',
    meaning: '曾经做过某事',
    explanation: '表示过去的经历。否定形式为「〜たことがない」（从来没有做过……）。',
    exampleJp: '魔王と戦ったことがありますか？',
    exampleRomaji: 'maou to tatakatta koto ga arimasu ka?',
    exampleCn: '你曾和魔王战斗过吗？',
    source: '【异世界冒险】对话例句'
  }
];

// 4. 打字练习库 (动漫、运动、日摇金句)
const TYPING_SENTENCES = [
  {
    jp: '俺はスローライフを送りたい。',
    romaji: 'ore wa suro-raifu wo okuritai.',
    meaning: '我想过慢生活。',
    category: 'isekai'
  },
  {
    jp: '世界一のストライカーになる。',
    romaji: 'sekaiichi no sutoraika- ni naru.',
    meaning: '我要成为世界第一的前锋。',
    category: 'sports'
  },
  {
    jp: 'あきらめたらそこで試合終了ですよ。',
    romaji: 'akirametara soko de shiai shuuryou desu yo.',
    meaning: '如果放弃的话，比赛就结束了哦。',
    category: 'sports'
  },
  {
    jp: '胸の鼓動を響かせろ。',
    romaji: 'mune no kodou wo hibikasero.',
    meaning: '让胸中的心跳回响吧。',
    category: 'jrock'
  },
  {
    jp: '異世界転生して農業を始めました。',
    romaji: 'isekai tensei shite nougyou wo hajimemashita.',
    meaning: '转生到异世界开始干农活。',
    category: 'isekai'
  },
  {
    jp: '限界を超えた者だけが勝つ。',
    romaji: 'genkai wo koeta mono dake ga katsu.',
    meaning: '只有超越极限的人才能赢。',
    category: 'sports'
  },
  {
    jp: '君の歌が聴こえる。',
    romaji: 'kimi no uta ga kikoeru.',
    meaning: '能听到你的歌声。',
    category: 'jrock'
  }
];

// 5. 导航资源
const NAVIGATION_RESOURCES = [
  { name: '沪江小D日语词典', url: 'https://dict.hjenglish.com/jp/', desc: '支持中日/日中互查，释义权威，附带例句和发音。' },
  { name: 'OJAD 在线声调辞典', url: 'http://www.gavo.t.u-tokyo.ac.jp/ojad/', desc: '方便查询日语动词各种变形后的声调起伏，矫正发音。' },
  { name: '角川 ComicWalker', url: 'https://comic-walker.com/', desc: '日本官方正版免费漫画网，适合利用异世界/运动题材漫画磨练语感。' },
  { name: '成为小说家吧 (小説家になろう)', url: 'https://syosetu.com/', desc: '日本最大的轻小说投稿站，可配合划词翻译插件阅读生肉。' },
  { name: 'Uta-Net 日本歌词网', url: 'https://www.uta-net.com/', desc: '海量日本流行与摇滚乐歌词，可以复制进行精读分析。' },
  { name: '寿司打 (Sushi-da)', url: 'http://neutral.x0.com/home/sushida/play.html', desc: '日本国民级罗马字打字测速网页游戏。' }
];
