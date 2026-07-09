const SYSTEMATIC_COURSE_DATA = [
  {
    chapterTitle: "第一章：🔤 日文书写系统 (Japanese Writing System)",
    sections: [
      {
        id: "ch1_1",
        title: "1.1 平假名与发音基础",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">1.1 平假名与发音基础</h3>
          <p>平假名 (Hiragana) 是从汉字草书演变而来的，用于拼写日语固有词汇、助词以及动词/形容词的活用词尾（送假名）。</p>
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:1.2rem; border-radius:8px; margin-bottom:1.5rem;">
            <h4 style="color:var(--color-secondary); margin-bottom:0.8rem;">💡 发音要领与五十音</h4>
            <p>五十音图按「あ、い、う、え、お」五个元音（段）与「か、さ、た、な、は、ま、や、ら、わ」九个辅音（行）组合而成。</p>
            <ul style="padding-left:1.5rem; line-height:2;">
              <li><strong>清音</strong>：标准的五十音。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('あ')">🔊 あ (a)</span>、<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('い')">🔊 い (i)</span>。</li>
              <li><strong>浊音 / 半浊音</strong>：清音假名右上角加两点（浊音）或小圆圈（半浊音）。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('が')">🔊 が (ga)</span>、<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('ぱ')">🔊 ぱ (pa)</span>。</li>
              <li><strong>拗音</strong>：以「い」段假名右下角配上缩小的「や、ゆ、よ」。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('きょ')">🔊 きょ (kyo)</span>、<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('しゃ')">🔊 しゃ (sha)</span>。</li>
            </ul>
          </div>
          <p>例句演示：</p>
          <span style="color:var(--color-primary); cursor:pointer; font-size:1.1rem;" onclick="AudioCenter.speak('ありがとう。')">🔊 ありがとう。</span> (谢谢 - 全平假名固有词)<br>
          <span style="color:var(--color-primary); cursor:pointer; font-size:1.1rem;" onclick="AudioCenter.speak('はい、そうです。')">🔊 はい、そうです。</span> (是的，就是这样)
        `
      },
      {
        id: "ch1_2",
        title: "1.2 片假名与外来语",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">1.2 片假名与外来语</h3>
          <p>片假名 (Katakana) 取自汉字楷书的部首或局部，字形硬朗。在现代日语中，片假名主要用于拼写<strong>外来语（来自英语、德语等西方语言的词汇）</strong>、拟音拟态词以及起到特定强调作用。</p>
          
          <table class="course-table">
            <thead>
              <tr>
                <th>片假名</th>
                <th>来源外语词</th>
                <th>汉语意译</th>
                <th>发音朗读</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:bold;">テレビ (terebi)</td>
                <td>Television (英)</td>
                <td>电视机</td>
                <td><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('テレビ')">🔊 播放</span></td>
              </tr>
              <tr>
                <td style="font-weight:bold;">カメラ (kamera)</td>
                <td>Camera (英)</td>
                <td>相机</td>
                <td><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('カメラ')">🔊 播放</span></td>
              </tr>
              <tr>
                <td style="font-weight:bold;">アニメ (anime)</td>
                <td>Animation (英)</td>
                <td>动漫</td>
                <td><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('アニメ')">🔊 播放</span></td>
              </tr>
              <tr>
                <td style="font-weight:bold;">パソコン (pasokon)</td>
                <td>Personal Computer (英)</td>
                <td>个人电脑</td>
                <td><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('パソコン')">🔊 播放</span></td>
              </tr>
            </tbody>
          </table>
        `
      },
      {
        id: "ch1_3",
        title: "1.3 汉字与音读训读",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">1.3 汉字与音读训读</h3>
          <p>日语汉字 (Kanji) 具有复杂的读音系统，每个汉字一般至少有两种读音体系：</p>
          
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem; margin-bottom:1.5rem;">
            <div style="background:rgba(0,240,255,0.02); border:1px solid rgba(0,240,255,0.1); padding:1rem; border-radius:8px;">
              <h4 style="color:var(--color-primary); margin-bottom:0.5rem;">🗣️ 音读 (音読み - Onyomi)</h4>
              <p style="font-size:0.9rem; color:var(--color-text-muted);">模拟古代中国传入日本时的汉字发音。多用于多字组合的名词短语中。</p>
              <p style="margin-top:0.5rem;">例：<strong>「水」</strong>读作 <strong>すい (sui)</strong></p>
              <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('水道')">🔊 水道 (suidou - 自来水)</span>
            </div>
            <div style="background:rgba(255,0,127,0.02); border:1px solid rgba(255,0,127,0.1); padding:1rem; border-radius:8px;">
              <h4 style="color:var(--color-accent); margin-bottom:0.5rem;">🌸 训读 (訓読み - Kunyomi)</h4>
              <p style="font-size:0.9rem; color:var(--color-text-muted);">用日本固有的日语发音来解释汉字含义。多用于单字名词或附带送假名的动词。</p>
              <p style="margin-top:0.5rem;">例：<strong>「水」</strong>读作 <strong>みず (mizu)</strong></p>
              <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('水')">🔊 水 (mizu)</span>
            </div>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "第二章：🎯 入门基本语法 (Basic Grammar)",
    sections: [
      {
        id: "ch2_1",
        title: "2.1 状态表示与肯定否定 (だ / じゃない)",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">2.1 状态表示与肯定否定 (だ / じゃない)</h3>
          <p>在日语中，表达“某物是某物”（陈述状态）时，使用助动词<strong>「だ」</strong>（简体）或<strong>「です」</strong>（敬体）。否定形为<strong>「じゃない」</strong>（简体）或<strong>「じゃありません / ではないです」</strong>（敬体）：</p>
          
          <table class="course-table">
            <thead>
              <tr>
                <th>状态类别</th>
                <th>简体表达 (普通体)</th>
                <th>敬体表达 (礼貌体)</th>
                <th>中文含义与发音</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:bold;">现在肯定</td>
                <td>学生<strong>だ</strong></td>
                <td>学生<strong>です</strong></td>
                <td>是学生 <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('学生です。')">🔊 朗读</span></td>
              </tr>
              <tr>
                <td style="font-weight:bold;">现在否定</td>
                <td>学生<strong>じゃない</strong></td>
                <td>学生<strong>じゃありません</strong></td>
                <td>不是学生 <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('学生じゃありません。')">🔊 朗读</span></td>
              </tr>
            </tbody>
          </table>
          <div class="alert-box" style="margin-top:1.5rem;">
            <strong>💡 概念解析：</strong> 助动词「だ」并不等同于英语中的 “to be” 动词。它代表说话人对事物做出的肯定断定。在口语非正式交流中，简体「だ」常常省略，名词后直接结束。
          </div>
        `
      },
      {
        id: "ch2_2",
        title: "2.2 核心助词入门 (は、も、が)",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">2.2 核心助词入门 (は、も、が)</h3>
          <p>助词接在名词后用于标记句子的焦点与角色关系。以下三个是最核心的基本助词：</p>
          <ul style="padding-left:1.5rem; line-height:2.2;">
            <li><strong>は (提示主题)</strong>：指引整句话讨论的“大方向/主题”，信息重心一般在 <strong>は</strong> 后面。<br>
            例句：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('私は学生です。')">🔊 私は学生です。</span> (我是学生 - 重点在“是学生”)。</li>
            <li><strong>も (表示“也”)</strong>：同类事物属性一致时替代「は」。<br>
            例句：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('アリスも学生です。')">🔊 アリスも学生です。</span> (爱丽丝也是学生)。</li>
            <li><strong>が (指定主语)</strong>：指定具体的主动作方（排他焦点），或者引入新信息时使用。<br>
            例句：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('誰がやりますか。私がやります。')">🔊 誰がやりますか。私がやります。</span> (谁来做？我来做 - 强调“我”做)。</li>
          </ul>
        `
      },
      {
        id: "ch2_3",
        title: "2.3 形容词分类与修饰活用",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">2.3 形容词分类与修饰活用</h3>
          <p>日语形容词根据词尾变形方式，严格划分为<strong>「い形容词」</strong>和<strong>「な形容词」</strong>：</p>
          <ul style="padding-left:1.5rem; line-height:2;">
            <li><strong>い形容词</strong>：词尾以假名「い」结尾。修饰名词时直接把形容词放在名词前面。<br>
            例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('美味しいリンゴ')">🔊 美味しいリンゴ</span> (好吃的苹果)。</li>
            <li><strong>な形容词 (形容动词)</strong>：非「い」结尾（如綺麗、静か）。修饰名词时，必须在形容词后添加 <strong>「な」</strong>。<br>
            例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('綺麗な部屋')">🔊 綺麗な部屋</span> (整洁的房间)。</li>
          </ul>
        `
      },
      {
        id: "ch2_4",
        title: "2.4 动词基础与否定式活用 (ない形)",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">2.4 动词基础与否定式活用 (ない形)</h3>
          <p>日语动词的原形（辞书形）词尾全部以「う段」假名结尾。转为否定形（不去做某事，即「ない形」）的规则如下：</p>
          <ul style="padding-left:1.5rem; line-height:2;">
            <li><strong>一类动词 (五段)</strong>：将词尾假名变到其对应的「あ段」，再加 <strong>ない</strong> (以「う」结尾的词例外变成「わ」)。<br>
            例：行く -> <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('行かない')">🔊 行かない (不去)</span> / 買う -> <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('買わない')">🔊 買わない (不买)</span>。</li>
            <li><strong>二类动词 (一段)</strong>：去掉词尾的「る」，直接加 <strong>ない</strong>。<br>
            例：食べる -> <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('食べない')">🔊 食べない (不吃)</span>。</li>
            <li><strong>三类动词 (不规则)</strong>：做 (する) -> <strong>しない</strong>；来 (来る) -> <strong>こない</strong>。<br>
            例：勉強する -> <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('勉強しない')">🔊 勉強しない</span>。</li>
          </ul>
        `
      },
      {
        id: "ch2_5",
        title: "2.5 过去形时态变化 (动词/形容词/名词)",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">2.5 过去形时态变化 (动词/形容词/名词)</h3>
          <p>过去时的表述用于描述过去发生的事实，不同词性的变化规则各异：</p>
          <table class="course-table">
            <thead>
              <tr>
                <th>词性分类</th>
                <th>原形</th>
                <th>过去肯定形</th>
                <th>中文含义与发音</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>名词 / な形容词</strong></td>
                <td>学生だ / 綺麗だ</td>
                <td>学生<strong>だった</strong> / 綺麗<strong>だった</strong></td>
                <td>以前是学生/曾经整洁 <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('綺麗だった。')">🔊 朗读</span></td>
              </tr>
              <tr>
                <td><strong>い形容词</strong></td>
                <td>美味しい</td>
                <td>美味し<strong>かった</strong> (词尾い变かった)</td>
                <td>以前很好吃 <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('美味しかった。')">🔊 朗读</span></td>
              </tr>
              <tr>
                <td><strong>动词</strong></td>
                <td>食べた / 行った</td>
                <td>食べ<strong>た</strong> / 行っ<strong>た</strong> (与て形音变一致)</td>
                <td>吃了/去了 <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('ご飯を食べた。')">🔊 朗读</span></td>
              </tr>
            </tbody>
          </table>
        `
      },
      {
        id: "ch2_6",
        title: "2.6 动词关联助词 (を、に、へ、で)",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">2.6 动词关联助词 (を、に、へ、で)</h3>
          <p>与动词紧密搭配的四个高频方向、位置、及宾格助词：</p>
          <ul style="padding-left:1.5rem; line-height:2.2;">
            <li><strong>を (宾格)</strong>：接动作的受体（宾语）。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('水を飲む。')">🔊 水を飲む。</span> (喝水)。</li>
            <li><strong>に (位置/时间)</strong>：指明移动的目的地或存在的绝对点。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('学校に行く。')">🔊 学校に行く。</span> (去学校)。</li>
            <li><strong>へ (方向)</strong>：侧重于移动行为的方向（朝向）。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('東京へ向かう。')">🔊 東京へ向かう。</span> (向东京走去)。</li>
            <li><strong>で (工具/场所)</strong>：标记动作发生的地点或使用的媒介。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('電車で帰る。')">🔊 電車で帰る。</span> (坐电车回去)。</li>
          </ul>
        `
      },
      {
        id: "ch2_7",
        title: "2.7 他动词和自动词辨析",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">2.7 他动词和自动词辨析</h3>
          <p>日语动词严格区分自动词（描述客观事实和状态）和他动词（主体施加外界影响于某物）：</p>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem; margin-bottom:1.5rem;">
            <div style="background:rgba(0,240,255,0.02); border:1px solid rgba(0,240,255,0.1); padding:1rem; border-radius:8px;">
              <h4 style="color:var(--color-primary); margin-bottom:0.5rem;">🔋 他动词 (与「を」连用)</h4>
              <p style="font-size:0.9rem; color:var(--color-text-muted);">需要动作发出者对物体产生干预。例：开门。</p>
              <span style="color:var(--color-primary); cursor:pointer; font-weight:bold;" onclick="AudioCenter.speak('ドアを開ける。')">🔊 ドアを開ける (o akeru)</span>
            </div>
            <div style="background:rgba(255,0,127,0.02); border:1px solid rgba(255,0,127,0.1); padding:1rem; border-radius:8px;">
              <h4 style="color:var(--color-accent); margin-bottom:0.5rem;">🪫 自动词 (与「が」连用)</h4>
              <p style="font-size:0.9rem; color:var(--color-text-muted);">事物状态自行发生改变或本处于该状态。例：门开了。</p>
              <span style="color:var(--color-primary); cursor:pointer; font-weight:bold;" onclick="AudioCenter.speak('ドアが開く。')">🔊 ドアが開く (ga aku)</span>
            </div>
          </div>
        `
      },
      {
        id: "ch2_8",
        title: "2.8 关系从句和基本语序",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">2.8 关系从句和基本语序</h3>
          <p>日语的修饰语位置极具特色——<strong>“修饰语永远置于被修饰语的前面”</strong>。关系从句（修饰名词的动作短语）直接摆在名词前，不需要任何关系代词：</p>
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:1.2rem; border-radius:8px;">
            <p style="line-height:2;">
              1. 独立名词：本 (书)<br>
              2. 关系修饰句：<strong>アリスが買った</strong> + 本 ＝ <strong>爱丽丝买的书</strong><br>
              例句：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('これはアリスが買った本です。')">🔊 これはアリスが買った本です。</span> (这是爱丽丝买的书)。<br>
              3. 状态从句：<strong>日本に行く</strong> + 学生 ＝ <strong>去日本的学生</strong><br>
              例句：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('日本に行く学生が多い。')">🔊 日本に行く学生が多い。</span> (去日本的学生很多)。
            </p>
          </div>
        `
      },
      {
        id: "ch2_9",
        title: "2.9 名词关联助词 (と、や、とか、の)",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">2.9 名词关联助词 (と、や、とか、の)</h3>
          <p>连接名词与名词的并列、限定或属性归属标记：</p>
          <ul style="padding-left:1.5rem; line-height:2.2;">
            <li><strong>の (的)</strong>：修饰领属。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('私の本')">🔊 私の本</span> (我的书)。</li>
            <li><strong>と (完全列举)</strong>：列出所有并列项，“和”。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('猫と犬')">🔊 猫と犬</span> (只有猫和狗)。</li>
            <li><strong>や (部分列举)</strong>：代表性列举，暗含还有其他。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('りんごやバナナ')">🔊 りんごやバナナ</span> (苹果和香蕉等)。</li>
            <li><strong>とか (口语列举)</strong>：比较随意的口头并列。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('ビールとかお酒')">🔊 ビールとかお酒</span> (啤酒啦白酒啦之类的)。</li>
          </ul>
        `
      },
      {
        id: "ch2_10",
        title: "2.10 副词和用于结束句子的助词",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">2.10 副词和用于结束句子的助词</h3>
          <p>副词修饰用言描述程度，而句尾的“终助词”为句子画龙点睛，赋予微弱的情绪与交际态度：</p>
          <ul style="padding-left:1.5rem; line-height:2.2;">
            <li><strong>とても (非常)</strong>：程度副词。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('とても美味しい')">🔊 とても美味しい</span> (非常美味)。</li>
            <li><strong>ね (求同语气)</strong>：接在句尾寻求赞同，相当于“……对吧、……呀”。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('いい天気ですね。')">🔊 いい天気ですね。</span> (真是个好天气啊，对吧？)。</li>
            <li><strong>よ (提示语气)</strong>：提示对方未知的新事实，相当于“……哦、……啊”。例：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('明日行くよ。')">🔊 明日行くよ。</span> (明天要去哦！)。</li>
          </ul>
        `
      }
    ]
  },
  {
    chapterTitle: "第三章：🧭 进阶词形变形与词性体系",
    sections: [
      {
        id: "ch3_1",
        title: "3.1 动词分类与十三种活用变形",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">3.1 动词分类与十三种活用变形</h3>
          <p>关于日语中一类、二类、三类动词在日语学习中，更系统的分类名称对应如下：</p>
          <p>动词根据句尾活用形态发生演变。除了五大基础变形，十三种变形对于备考和交流同样非常关键：</p>
          <table class="course-table">
            <thead>
              <tr>
                <th>时态变形</th>
                <th>一类动词 (如：書く)</th>
                <th>二类动词 (如：食べる)</th>
                <th>三类 (する / 来る)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>ます形 (连用形)</td><td>書き<strong>ます</strong></td><td>食べ<strong>ます</strong></td><td>し<strong>ます</strong> / 来ます</td></tr>
              <tr><td>て形 (连用形)</td><td>書<strong>いて</strong></td><td>食べ<strong>て</strong></td><td>し<strong>て</strong> / 来て</td></tr>
              <tr><td>ない形 (未然形)</td><td>書か<strong>ない</strong></td><td>食べ<strong>ない</strong></td><td>し<strong>ない</strong> / 来ない</td></tr>
              <tr><td>た形 (过去形)</td><td>書<strong>いた</strong></td><td>食べ<strong>た</strong></td><td>し<strong>た</strong> / 来た</td></tr>
              <tr><td>可能形 (能力)</td><td>書け<strong>る</strong></td><td>食べ<strong>られる</strong></td><td>でき<strong>る</strong> / 来られる</td></tr>
              <tr><td>意向形 (意志)</td><td>書こ<strong>う</strong></td><td>食べ<strong>よう</strong></td><td>し<strong>よう</strong> / 来よう</td></tr>
              <tr><td>条件形 (ば)</td><td>书け<strong>ば</strong></td><td>食べ<strong>れば</strong></td><td>すれ<strong>ば</strong> / 来れば</td></tr>
              <tr><td>被动形 (受身)</td><td>書か<strong>れる</strong></td><td>食べ<strong>られる</strong></td><td>さ<strong>れる</strong> / 来られる</td></tr>
              <tr><td>使役形 (让度)</td><td>書か<strong>せる</strong></td><td>食べ<strong>させる</strong></td><td>さ<strong>せる</strong> / 来させる</td></tr>
              <tr><td>使役被动 (被迫)</td><td>書か<strong>される</strong></td><td>食べ<strong>させられる</strong></td><td>さ<strong>せられる</strong> / 来させられる</td></tr>
              <tr><td>命令形 (祈使)</td><td>書<strong>け</strong></td><td>食べ<strong>ろ</strong></td><td>し<strong>ろ</strong> / 来(こ)い</td></tr>
              <tr><td>禁止形 (强制)</td><td>書く<strong>な</strong></td><td>食べる<strong>な</strong></td><td>する<strong>な</strong> / 来るな</td></tr>
            </tbody>
          </table>
        `
      },
      {
        id: "ch3_2",
        title: "3.2 用言分类与形式体言高级句式",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">3.2 用言分类与形式体言高级句式</h3>
          <p>体言（名词、代词、数词）无活用，用言（动词、形容词）有活用。除了第一章基础的十类之外，更详尽的活用和形式体言在中高级文章里极为频繁：</p>
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:1.2rem; border-radius:8px;">
            <ul style="padding-left:1.5rem; line-height:2.2;">
              <li><strong>こと (事)</strong>：指代抽象事件。派生：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('ことができる')">🔊 ことができる</span> (能)、<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('ことにする')">🔊 ことにする</span> (个人决定)。</li>
              <li><strong>もの (物)</strong>：表示事物的本质属性、理所当然。派生：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('ものだ')">🔊 ものだ</span> (理应、感叹)。</li>
              <li><strong>ところ (所)</strong>：表示时间切片或空间场景。派生：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('たところ')">🔊 たところ</span> (刚……结果)、<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('ているところだ')">🔊 ているところだ</span> (正在做某事中)。</li>
              <li><strong>わけ (訳)</strong>：表示客观的理由、逻辑道理。派生：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('わけがない')">🔊 わけがない</span> (不可能)、<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('わけにはいかない')">🔊 わけにはいかない</span> (不能)。</li>
            </ul>
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "第四章：🎯 进阶格助词与副助词专题",
    sections: [
      {
        id: "ch4_1",
        title: "4.1 格助词深入精讲",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">4.1 格助词深入精讲</h3>
          <p>关于动作格助词的高阶区分：</p>
          <table class="course-table">
            <thead>
              <tr>
                <th>格助词</th>
                <th>高阶语法概念</th>
                <th>实例说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:bold;">を</td>
                <td>移动经过的空间；离开点</td>
                <td><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('公園を散歩する。')">🔊 公園を散歩する。</span> (在公园里散步)<br><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('国を去る。')">🔊 国を去る。</span> (出国)</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">に</td>
                <td>动作作用于的对象；变化结果</td>
                <td><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('先生に聞く。')">🔊 先生に聞く。</span> (向老师询问)<br><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('氷が水になる。')">🔊 氷が水になる。</span> (冰融化成水)</td>
              </tr>
            </tbody>
          </table>
        `
      },
      {
        id: "ch4_2",
        title: "4.2 副助词精选辨析",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">4.2 副助词精选辨析</h3>
          <p>副助词对名词语义进行列举、限定、添加等：</p>
          <table class="course-table">
            <thead>
              <tr>
                <th>副助词</th>
                <th>表示含义</th>
                <th>典型例句</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:bold;">しか...ない</td>
                <td>表示唯一限定（只有），后续必须接否定</td>
                <td><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('百円しかない。')">🔊 百円しかない。</span> (只有一百日元)</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">ばかり</td>
                <td>表示净是、光是（带有消极不满语气）</td>
                <td><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('肉ばかり食べている。')">🔊 肉ばかり食べている。</span> (光是吃肉)</td>
              </tr>
            </tbody>
          </table>
        `
      }
    ]
  },
  {
    chapterTitle: "第五章：🛑 N5 阶段：基础交际与核心句式",
    sections: [
      {
        id: "ch5_1",
        title: "5.1 存在表达与愿望请求",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">5.1 存在表达与愿望请求</h3>
          <p>N5核心文型的重点在于基础交际，必须掌握事物存在句式、个人想要（物品/动作动作）的表述，以及礼貌地指引动作：</p>
          
          <div style="margin-bottom:1.5rem;">
            <h4 style="color:var(--color-secondary); margin-bottom:0.5rem;">1. 存在表达：あります / います</h4>
            <p><strong>[场所] に [名词] が あります(无生命/植物) / います(有生命/人/动物)</strong></p>
            <p style="margin-top:0.3rem;">例句：</p>
            <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('あそこに猫がいます。')">🔊 あそこに猫がいます。</span> (那里有只猫)<br>
            <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('部屋にテレビがあります。')">🔊 部屋にテレビがあります。</span> (房间里有电视)
          </div>
        `
      },
      {
        id: "ch5_2",
        title: "5.2 许可禁止与并列限定",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">5.2 许可禁止与并列限定</h3>
          <p>本节包含日常交往中行为权限的界定，以及多动作的连接和列举式表述：</p>
          
          <div style="margin-bottom:1.5rem;">
            <h4 style="color:var(--color-secondary); margin-bottom:0.5rem;">1. 许可与禁止：～てもいい / ～てはいけない</h4>
            <p><strong>[动词て形] もいいです</strong>：可以做某事（许可）。</p>
            <p><strong>[动词て形] は行けません</strong>：绝对不可以做某事（强制禁止）。</p>
            <p style="margin-top:0.3rem;">例句：</p>
            <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('ここに入ってもいいですか。')">🔊 ここに入ってもいいですか。</span> (可以进这里吗？)<br>
            <span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('写真を撮ってはいけません。')">🔊 写真を撮ってはいけません。</span> (绝对不可以拍照)
          </div>
        `
      }
    ]
  },
  {
    chapterTitle: "第六章：📈 N4 阶段：复合句式与日常流利",
    sections: [
      {
        id: "ch6_1",
        title: "6.1 假定条件与行为授受",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">6.1 假定条件与行为授受</h3>
          <p>N4语法旨在帮助学生说出复杂的长难句。<strong>假定条件</strong>和<strong>行为授受</strong>是N4等级最具难点、也是考查最密集的专题：</p>
          <table class="course-table">
            <thead>
              <tr>
                <th>句型</th>
                <th>核心语境</th>
                <th>典型例句</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:bold;">～と</td>
                <td>自然规律、机器操作（一……必定发生后项）</td>
                <td><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('春になると、桜が咲く。')">🔊 春になると、桜が咲く。</span> (一到春天樱花就开)</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">～たら</td>
                <td>口语万能假定（表示如果；或者前项做完再做B）</td>
                <td><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('雨が降ったら、行きません。')">🔊 雨が降ったら、行きません。</span> (如果下雨我就不去)</td>
              </tr>
            </tbody>
          </table>
        `
      },
      {
        id: "ch6_2",
        title: "6.2 目的习惯与样态传闻",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">6.2 目的习惯与样态传闻</h3>
          <p>掌握行为背后的目的、自律或他律的习惯、以及依据外表的推测和传闻：</p>
          <ul style="padding-left:1.5rem;">
            <li><strong>[意志动词原形] ために</strong>：主观目的，前后分句主语必须一致。</li>
            <li><strong>[非意志/可能/否定动词] ように</strong>：客观目标，促成某种状态的达成。</li>
          </ul>
        `
      }
    ]
  },
  {
    chapterTitle: "第七章：🚀 N3 阶段：书面过渡与主观表达",
    sections: [
      {
        id: "ch7_1",
        title: "7.1 敬语规范与时间表达",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">7.1 敬语规范与时间表达</h3>
          <p>N3为中级过渡，开始要求精确处理人际关系（敬语体系）及时间伴随状态：</p>
          <table class="course-table">
            <thead>
              <tr>
                <th>类别</th>
                <th>语法作用与典型句型</th>
                <th>代表性特殊变位</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:bold;">尊敬语</td>
                <td>抬高对方动作。句型：<strong>お + ます形 + になる</strong></td>
                <td>食べる -> <strong>召し上がる</strong></td>
              </tr>
              <tr>
                <td style="font-weight:bold;">自谦语</td>
                <td>降低自我动作。句型：<strong>お + ます形 + する</strong></td>
                <td>食べる -> <strong>いただく</strong></td>
              </tr>
            </tbody>
          </table>
        `
      },
      {
        id: "ch7_2",
        title: "7.2 因果关系与特征评价",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">7.2 因果关系与特征评价</h3>
          <p>学习中级书面语中因果关系的多样表达，以及针对事物的基准评价和负面倾向表现：</p>
          <ul style="padding-left:1.5rem; line-height:1.8;">
            <li><strong>～おかげで (多亏)</strong>：表达积极、充满感激的主观因果归因。</li>
            <li><strong>～せいで (由于不好归因)</strong>：用于推卸责任或责怪客观环境。</li>
          </ul>
        `
      },
      {
        id: "ch7_3",
        title: "7.3 形式体言高级句式",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">7.3 形式体言高级句式</h3>
          <p>通过形式体言结合特定接续，表达说话人的强烈主观约束、否定或常理劝诫：</p>
          <ul style="padding-left:1.5rem; line-height:2.2;">
            <li><strong>～わけにはいかない</strong>：迫于道德、法理或社会常识，“不能、不可以”做某事。<br>例句：<span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('休むわけにはいかない。')">🔊 休むわけにはいかない。</span> (不能请假)。</li>
          </ul>
        `
      }
    ]
  },
  {
    chapterTitle: "第八章：🏆 N2 阶段：论理表述与商务通用",
    sections: [
      {
        id: "ch8_1",
        title: "8.1 时间同步与范围限定",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">8.1 时间同步与范围限定</h3>
          <p>N2阶段开始向正式的社论、书面报道过渡。本节囊括了精细的时间交替概念及跨度、典型列举：</p>
          <ul style="padding-left:1.5rem; line-height:1.8;">
            <li><strong>～たとたん</strong>：前项刚刚完成，后项极其意外地瞬间发生。</li>
            <li><strong>～次第 (し次第)</strong>：前项做完之后，**立刻**去做后项（带有浓厚的工作汇报色彩）。</li>
          </ul>
        `
      },
      {
        id: "ch8_2",
        title: "8.2 让步逆接与断定关联",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">8.2 让步逆接与断定关联</h3>
          <p>学习中高级书面表达中的轻微让步、转折、责任责怪以及根据对方诉求进行的回应表达：</p>
          <table class="course-table">
            <thead>
              <tr>
                <th>句型</th>
                <th>语法要点</th>
                <th>典型例句 (点击朗读)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:bold;">～にすぎない</td>
                <td>只不过是、程度极其有限</td>
                <td><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('単なる噂にすぎない。')">🔊 单なる噂にすぎない。</span> (只不过是单纯的谣言)</td>
              </tr>
            </tbody>
          </table>
        `
      },
      {
        id: "ch8_3",
        title: "8.3 否定推论与强制意志",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">8.3 否定推论与强制意志</h3>
          <p>表达并不完全否定、或者出于外部或心理上迫使自己做出的强制选择：</p>
          <ul style="padding-left:1.5rem; line-height:2.2;">
            <li><strong>～わけではない</strong>：双重否定，表示“并非、并不是说……”。</li>
            <li><strong>～ざるを得ない</strong>：由于现实环境或形势所迫，主观虽然抗拒但“不得不做某事”。</li>
          </ul>
        `
      }
    ]
  },
  {
    chapterTitle: "第九章：👑 N1 阶段：政经社论与古语残留 (终极大成)",
    sections: [
      {
        id: "ch9_1",
        title: "9.1 极端否定与强烈意志",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">9.1 极端否定与强烈意志</h3>
          <p>N1语法主要用于高级书面政经社论、文学作品，带有明显的文言文残留和庄重权威色彩：</p>
          <ul style="padding-left:1.5rem; line-height:2.2;">
            <li><strong>～までもない</strong>：程度过浅，或者常理显而易见，“根本用不着、无需”做某事。</li>
            <li><strong>～を禁じ得ない</strong>：心理情感上强烈震颤，“控制不住、禁不住产生”某种情绪。</li>
          </ul>
        `
      },
      {
        id: "ch9_2",
        title: "9.2 条件无关与伴随状态",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">9.2 条件无关与伴随状态</h3>
          <p>掌握文言文接续中排除前项约束、或者双动作在社会生活中高级交互发生的场景：</p>
          <table class="course-table">
            <thead>
              <tr>
                <th>句型</th>
                <th>核心语法剖析</th>
                <th>典型例句</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:bold;">～いかんによらず</td>
                <td>不管前项具体如何、排除前项客观条件的约束</td>
                <td><span style="color:var(--color-primary); cursor:pointer;" onclick="AudioCenter.speak('理由のいかんによらず遅刻は認めない。')">🔊 理由のいかんによらず遅刻は認めない。</span> (不管出于何种理由)</td>
              </tr>
            </tbody>
          </table>
        `
      },
      {
        id: "ch9_3",
        title: "9.3 古语残留与极端书面",
        content: `
          <h3 style="color:var(--color-primary); margin-bottom:1.2rem; border-bottom: 2px solid var(--color-primary-glow); padding-bottom: 0.5rem;">9.3 古语残留与极端书面</h3>
          <p>本节主要总结文言文残留接续，其特征是含有古典否定助动词「ず」或「ぬ」的影子：</p>
          <ul style="padding-left:1.5rem; line-height:2.2;">
            <li><strong>～ずにはいられない</strong>：生理或情感上克制不住，“不能不、忍不住要做某事”（等同于 N3 的 〜ないではいられない）。</li>
          </ul>
        `
      }
    ]
  }
];
