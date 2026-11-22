/* あらすじ（紙芝居）。押すと次へ・音は最初に選ぶ・結末の手前で止める */
(function () {
  /* 絵は assets/story/sNN.jpg（_作り直し用/story_img で作る）。ch＝章（変わると章の題を出す）・fx＝縦長の画面で見せる横の位置・p＝光の粒の多さ */
  var IMG = function (n) { return 'assets/story/s' + n + '.jpg'; };
  var SCENES = [
    { bg: IMG('01'), bgm: '00', ch: "プロローグ", fx: 50, p: 1, lines: ["人間の住む町と、魔女の住む山。"], tip: "幕の前の猫3匹が語り部。客席の右・真ん中・左を見わたしてから話すと、お客さんが物語に入ってきます。" },
    { bg: IMG('25'), bgm: '00', fx: 32, p: 1, lines: ["<q>猫は、なんでも見ている。</q>", "今夜のお話は、みんなにも、よーく見ていてもらわなくちゃ。"], tip: "猫は「見ててね」で手をおでこにかざし、お客さんに「見る役」をわたします。3匹は大また3歩ずつあけて横一列。" },
    { bg: IMG('02'), bgm: '00', fx: 50, p: 2, lines: ["町の広場には、百年間、一度も消えたことのない火が燃えています。", "友の火、<b>トモリ</b>。", "これは、その火が消えた夜のお話です。"], tip: "トモリは舞台のまん中の奥。この火の前は、劇のあいだずっと「主役の場所」です。" },
    { bg: IMG('03'), bgm: '03', ch: "第一章　星ふるバザール", fx: 60, p: 3, lines: ["年に一度、星がふる夜にだけ、", "魔女が山を下りてくる。"], tip: "魔女の列は客席の横の通路から入ります。お客さんの目の前なので、前の人とこぶし2つあけて、ゆっくり大きく。" },
    { bg: IMG('26'), bgm: '03', fx: 50, p: 3, lines: ["<q>焼きたてだよー！ ラテルナ名物、はちみつパン！</q>　<q>朝とれの魚！</q>", "町の店主たちの声が、広場じゅうにひびきます。"], tip: "幕が開く前に、店主は自分の屋台の前へ。よび込みは言う人だけ一歩前へ出て、言い終わったらもどります。" },
    { bg: IMG('04'), bgm: '03', fx: 50, p: 3, lines: ["人間と魔女が、けんかもせずに買い物をする", "<b>「星ふるバザール」</b>。"], tip: "明るくなった時には、もうお店は開いています。最初から売り買いのふりを続けると「いつものバザール」に見えます。" },
    { bg: IMG('27'), bgm: '03', fx: 50, p: 2, lines: ["りんご屋と魔女の、値切り合戦。", "にらみ合っていても、ほんとうは楽しいのです。"], tip: "買い物のかけ合いは、話すペアだけが屋台の前で向かい合います。ほかのペアは声を小さく。" },
    { bg: IMG('28'), bgm: '03', fx: 50, p: 3, lines: ["鐘が鳴ると、みんなが火のまわりへ。", "<q>この火の、名は！</q>——<q>トモリ！</q>"], tip: "全員がトモリを囲み、こぶしを上げます。町長とマーバは火の左右に。2人の前は空けておきます。" },
    { bg: IMG('09'), bgm: '07', ch: "第二章　ないしょ話", fx: 50, p: 0, lines: ["笑顔のうらで、", "町の人も魔女も、こっそり悪口を言い合っていました。"], tip: "照明を落とし、言うペアだけが明るい所へ。ほかの人は動きを止めず、小さく話しているふりを続けます。" },
    { bg: IMG('10'), bgm: '07', fx: 50, p: 1, lines: ["悪口が言い終わったとき、トモリが、はっきりと一度ちらつく。", "この火は、<b>信じ合う心</b>で燃えていたのです。"], tip: "悪口の4組が全部終わったところで、火を一度だけ大きくちらつかせます（照明係の合図は1回）。" },
    { bg: IMG('29'), bgm: '07', fx: 45, p: 1, lines: ["火がふるえたことに気づいたのは、", "高い所から見ていた、猫たちだけ。"], tip: "猫の場面は、客席から見える高い所で。見えにくい場所を使うなら、スポットを当てます。" },
    { bg: IMG('05'), bgm: '08', ch: "第三章　ふたりの宝物", fx: 42, p: 2, lines: ["町の子ノアと、魔女の子ルーチェ。", "この夜にしか会えない、友だちです。"], tip: "ここからは2人だけが立ち、ほかの全員は座って2人を見ます。見ている人がいると、2人の話が大事に見えます。" },
    { bg: IMG('06'), bgm: '08', fx: 45, p: 1, lines: ["ノアは、初めてひとりで焼いたパンを。"], tip: "2人はトモリをはさんで、体を少し客席に開いて話します。" },
    { bg: IMG('07'), bgm: '08', fx: 30, p: 1, lines: ["ルーチェは、宝物のマントを切って、", "星のししゅうのお守りを。"], tip: "マントを切るしぐさは、ゆっくり。客席に布が見えるように、高めの位置で。" },
    { bg: IMG('08'), bgm: '08', fx: 50, p: 2, lines: ["<q>大切なものはね——あげたら、なくならないの。ふたつに、なるの。</q>", "「来年は、ふたりでお店を出そう」。ゆびきり、げんまん。"], tip: "ゆびきりはトモリの前で。後ろで座っている人は、小さなふり（うなずく・パンをのぞく）を1人1つ決めておきます。" },
    { bg: IMG('30'), bgm: '08', fx: 50, p: 3, lines: ["バザールのしめくくり。", "人間も魔女も、トモリを囲んで歌います。<q>また来年！</q>"], tip: "前の列はすわり、後ろは立って全員の顔を客席へ。歌い終わったら、魔女は下手・町の人は上手へ。出口は先に決めておきます。" },
    { bg: IMG('11'), bgm: '07', fx: 35, p: 1, lines: ["その夜おそく。弱っていくトモリを見たノアは、", "お守りを台座にそっと置きました。", "<q>今夜だけ、貸してあげる。</q>"], tip: "ノアはお守りを置いたら、2回ふり返ってから下手へ。トモリが心配な気持ちを背中で見せます。" },
    { bg: IMG('31'), bgm: '07', fx: 42, p: 1, lines: ["ノアが帰ったあと。", "黒いフードの影が、そっと火に手をのばす——。"], tip: "フードの人はノアが見えなくなってから上手から出ます。火の後ろ（奥）側からのぞきこみ、客席と火の間に体を入れません。" },
    { bg: IMG('12'), bgm: '16', ch: "第四章　消えたトモリ", fx: 50, p: 0, lines: ["朝。", "台座の上から、トモリが消えていました。"], tip: "暗転は約15秒。やるのは「トモリを外す」だけ。照明は、係がはけた合図を見てから明るくします。" },
    { bg: IMG('32'), bgm: '16', fx: 40, p: 0, lines: ["残っていたのは、星のししゅうの布きれ。"], tip: "布きれは高く上げて、客席にも見せます。" },
    { bg: IMG('33'), bgm: '16', fx: 50, p: 0, lines: ["疑いは、魔女たちへ。", "広場は、人間と魔女のまっぷたつに分かれました。"], tip: "町の人は下手、魔女は上手。真ん中は主役のために空けます。体は半分客席、顔だけ相手に。" },
    { bg: IMG('13'), bgm: '16', fx: 45, p: 0, lines: ["<q>魔女の子がトモリを盗んだんだ！</q>", "「ぼくが置いたんだ」というノアの声は、だれにも届きません。"], tip: "ノアを責めるたびに、下手の住民が一歩ずつ前へ。言うたびに少しずつ近づきます。" },
    { bg: IMG('14'), bgm: '16', fx: 62, p: 0, lines: ["責められるノアを見て、ルーチェは一歩前へ出ました。", "<q>わたしが、やりました。</q>"], tip: "このセリフで全員がぴたっと止まります。まばたきもがまんするくらいで。" },
    { bg: IMG('34'), bgm: '16', fx: 40, p: 0, lines: ["バザールは中止。", "魔女たちは山へ帰り、ノアはひとり、空っぽの台座の前に残されました。"], tip: "魔女は全員同じ向きにマントをひるがえして退場。最後は照明をしぼって、ノアひとりにします。" },
    { bg: IMG('15'), bgm: '20', ch: "第五章　猫たちの捜査", fx: 50, p: 1, lines: ["<q>猫は、なんでも見ている。</q>", "猫たちの、捜査会議がはじまります。"], tip: "幕前の場面。幕の中ではこの間に次の場面の準備をします。猫は横一列で、となりと半歩ずつ前後にずらします。" },
    { bg: IMG('35'), bgm: '20', fx: 55, p: 1, lines: ["<q>だいじそうに、だいてたの。</q>", "猫たちの証言が、ひとつにつながっていく。"], tip: "証言は、話す猫だけ一歩前へ。話し終わったら一歩もどります。客席に問いかけたら、答えを2秒待ちます。" },
    { bg: IMG('16'), bgm: '20', fx: 75, p: 1, lines: ["あの夜、黒いフードの人がトモリを抱いて、", "泣きながら森へ歩いていった——。"], tip: "回想は、見えたことを身ぶりで。言う猫が森の方を指さすと、客席の目もそちらへ動きます（指さす向きは、四場でみんなが向かう側にそろえる）。" },
    { bg: IMG('36'), bgm: '20', fx: 35, p: 1, lines: ["<q>ぼくも、行く。</q>", "ノアは、お守りの布をにぎりしめました。"], tip: "ノアはフロアから入り、幕前の猫たちを見上げて話します。高さのちがいで、気持ちが伝わります。" },
    { bg: IMG('37'), bgm: '20', fx: 55, p: 1, lines: ["町の捜索隊も、ルーチェを連れた魔女たちも、", "同じ森へ。"], tip: "捜索隊と追跡隊は、幕前の左右に分かれて鉢合わせ。はしの1mは使わず、その内側で間を大きくあけるほど、にらみ合いに見えます。" },
    { bg: IMG('17'), bgm: '20', fx: 50, p: 1, lines: ["ノアと猫たち、町の人、山の魔女。", "みんなが、森の塔へ向かいます。"], tip: "暗転の間に、次に出る人は静かに待機。入る口は3つに分けて、一か所につまらないようにします。" },
    { bg: IMG('18'), bgm: '22', ch: "第六章　三十年前の夜", fx: 45, p: 1, lines: ["森の塔の石段で、消えかけたトモリを抱いていたのは——", "魔法使い、フラム。"], tip: "フラムは幕が開く前に石段に座っておきます。開いた時には、もう役に入っているように。" },
    { bg: IMG('19'), bgm: '22', fx: 50, p: 0, lines: ["三十年前、消えかけたトモリを助けようとして、", "どろぼうと呼ばれた人。", "<q>誰かひとりでも、私を信じてくれ……！</q>"], tip: "回想はフロアにスポット。舞台の上の人は止まって、フロアの方を見ます。" },
    { bg: IMG('20'), bgm: '22', fx: 68, p: 1, lines: ["そして今、フラムは言いました。", "トモリを消したのは——", "<q>おまえたち、全員だ。</q>"], tip: "フラムは怒るより、かなしそうに。指さされた全員は、顔を見合わせます。" },
    { bg: IMG('38'), bgm: '22', fx: 40, p: 2, lines: ["ルーチェの縄がほどかれ、", "ふたりは、もう一度手を取りました。"], tip: "再会は舞台のまん中で。まわりの人は、火（トモリ）の正面に立たないようにします。" },
    { bg: IMG('21'), bgm: '24', ch: "第七章　差し出す思い出", fx: 50, p: 2, lines: ["トモリをよみがえらせるには、", "「いちばん大切な、信じる心の思い出」を火に差し出すこと。", "それは、大切な思い出を手ばなすということ。"], tip: "ここから差し出しの「八の字」。火を頂点に、町の人は下手・山の人は上手へ斜めに並び、客席に開きます。" },
    { bg: IMG('22'), bgm: '24', fx: 45, p: 1, lines: ["最初に進み出たのは、火の番人のランプ屋。", "けれど火は、一瞬立ち上がって——すぐに沈む。", "<q>疑いが混ざった思い出を、トモリは受け取らない。</q>"], tip: "ランプ屋は列をはなれて火の前へ。受け取られなかったとき、大げさにせず、空になった自分の手をじっと見ます。" },
    { bg: IMG('39'), bgm: '24', fx: 45, p: 2, lines: ["それでも、町長もマーバも、町の人も魔女も、", "ひとりずつ、いちばん大切な思い出を差し出していく。", "火は立ち上がり——また沈む。"], tip: "差し出しは自分の列の場所から（歩いて出ない）。胸から両手で取り出すように言い、言い終わったら一瞬だけ自分の手を見ます。本番では、言い終わったらその場でひざをつく形に変えました。" },
    { bg: IMG('40'), bgm: '24', fx: 50, p: 1, lines: ["火が沈むたび、みんなは半歩ずつ火に寄っていく。", "<q>一番まっすぐな心でも、届かない。</q>"], tip: "火が沈むたびに、八の字の全員で半歩ずつ火へ寄ります。そろって動くと、追いつめられた気持ちが客席に伝わります。" },
    { bg: IMG('23'), bgm: '25', ch: "第八章　ルーチェの歌", fx: 50, p: 2, lines: ["ノアが、自分の思い出を差し出そうとする。", "その手を、ルーチェが止めました。", "<q>わたしの思い出のふたつめは……ノアの中に、あるから。</q>"], tip: "ルーチェは急がずに。ノアの手を止めたら、3つ数えてからセリフを言います。" },
    { bg: IMG('24'), bgm: '25', fx: 42, p: 3, lines: ["<q>——忘れても、友だちだよ。</q>", "ルーチェはひとりで歌い出し、", "歌にのせて、いちばん大切な思い出を火に差し出しました。"], tip: "ルーチェは火を背にひざまずいて歌い出します。まわりは全員ゆっくりしゃがみ、立っているのはルーチェだけ。サビで全員の声が重なります。" },
    { end: true, bg: IMG('24'), bgm: '26', p: 3 }
  ];
  (function () { var c = ''; SCENES.forEach(function (x) { if (x.ch) c = x.ch; x.chap = c; }); })();
  var BGMEXT = { '06': 'm4a', '12': 'm4a', '19': 'm4a' };
  var reduce = false; try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  var tch = ls('tomori_story_tch') === '1';
  var prevWasBack = false, root, layers, cur = -1, sound = false, audio = null, all = [], fadeT = null, open = false, lock = false, top = 0, hidden = [];

  function build() {
    root = document.createElement('div'); root.id = 'story'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'あらすじ');
    root.innerHTML =
      '<div class="st-amb"></div><div class="st-bg"></div><div class="st-bg"></div><div class="st-shade"></div><canvas class="st-fx" aria-hidden="true"></canvas><div class="st-chap" aria-hidden="true"></div><div class="st-prog"><i></i></div>' +
      '<div class="st-start"><div class="st-sub">どんなお話？</div>' +
      '<p>まず、あらすじを見てください（約6分・絵本のように、画面を押すと進みます）。</p>' +
      '<p class="st-tnote">先生は、下の「🎓 先生向け」を押すと、場面ごとの演じ方のコツも出ます。</p>' +
      '<button type="button" class="st-go" data-snd="1">♪ 音ありで見る</button><button type="button" class="st-go st-quiet" data-snd="0">音なしで見る</button>' +
      '<button type="button" class="st-skipnow">あらすじをとばす</button></div>' +
      '<div class="st-text" aria-live="polite"></div>' +
      '<div class="st-bar"><button type="button" class="st-back" aria-label="前の場面へ">‹ もどる</button><div class="st-dots"></div>' +
      '<button type="button" class="st-tch" aria-pressed="false">🎓 先生向け</button><button type="button" class="st-snd" aria-label="音を切りかえる"></button><button type="button" class="st-skip">とばす ›</button></div>' +
      '<div class="st-hint">画面を押すと、次へ</div>';
    document.body.appendChild(root);
    layers = root.querySelectorAll('.st-bg');
    var d = root.querySelector('.st-dots');
    root.querySelectorAll('.st-go').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); sound = b.getAttribute('data-snd') === '1'; begin(); }); });
    root.querySelector('.st-skipnow').addEventListener('click', function (e) { e.stopPropagation(); close(); });
    root.querySelector('.st-skip').addEventListener('click', function (e) { e.stopPropagation(); close(); });
    root.querySelector('.st-back').addEventListener('click', function (e) { e.stopPropagation(); go(cur - 1); });
    var tb = root.querySelector('.st-tch');
    function tchLabel() { tb.setAttribute('aria-pressed', tch ? 'true' : 'false'); tb.classList.toggle('on', tch); }
    tchLabel();
    tb.addEventListener('click', function (e) { e.stopPropagation(); tch = !tch; ls('tomori_story_tch', tch ? '1' : '0'); tchLabel(); if (cur >= 0) { prevWasBack = true; render(cur); } });
    root.querySelector('.st-snd').addEventListener('click', function (e) { e.stopPropagation(); sound = !sound; sndLabel(); if (sound) play(SCENES[cur].bgm); else stopAudio(); });
    root.addEventListener('click', function (e) {
      if (!root.classList.contains('playing')) return;
      if (e.target.closest('button,a')) return;
      go(cur + 1);
    });
    var sx = null, sy = null;
    root.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (sx === null || !root.classList.contains('playing')) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { e.preventDefault(); go(cur + (dx < 0 ? 1 : -1)); }
    });
    document.addEventListener('keydown', function (e) {
      if (!open) return;
      if (e.key === 'Escape') { close(); return; }
      if (!root.classList.contains('playing')) return;
      if ((e.key === ' ' || e.key === 'Enter') && e.target.closest && e.target.closest('button')) return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { e.preventDefault(); go(cur + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
    });
    setBg(SCENES[0].bg, 0);
  }
  function sndLabel() { root.querySelector('.st-snd').textContent = sound ? '♪ 音あり' : '音なし'; }

  var front = 0;
  function setBg(src, i) {
    var next = layers[1 - front];
    next.style.backgroundImage = 'url("' + src + '")';
    next.style.setProperty('--fx', (SCENES[i].fx || 50) + '%');
    root.querySelector('.st-amb').style.backgroundImage = 'url("' + src + '")';
    next.classList.remove('kb0', 'kb1', 'kb2', 'kb3'); void next.offsetWidth; if (!reduce) next.classList.add('kb' + (i % 4));
    next.classList.add('on'); layers[front].classList.remove('on'); front = 1 - front;
    [1, 2].forEach(function (k) { var n = SCENES[i + k]; if (n) { var im = new Image(); im.src = n.bg; } });
  }

  function render(i) {
    var s = SCENES[i], box = root.querySelector('.st-text');
    if (s.end) {
      box.className = 'st-text st-end';
      box.innerHTML = '<p class="l" style="--d:0">トモリが、まぶしく燃え上がる。</p>' +
        '<p class="l" style="--d:1">——そのとき、ルーチェの声だけが、ふっと途切れました。</p>' +
        '<p class="l st-big" style="--d:2.4">この続きは、台本で。</p>' +
        '<p class="l" style="--d:3.2"><button type="button" class="st-tohai">🎟️ 人数を入れて台本を見る</button> <button type="button" class="st-again">もう一度見る</button></p>';
      box.querySelector('.st-tohai').addEventListener('click', function (e) { e.stopPropagation(); close('haiyaku'); });
      box.querySelector('.st-again').addEventListener('click', function (e) { e.stopPropagation(); go(0); });
    } else {
      box.className = 'st-text';
      var first = !!s.ch && (i === 0 || !prevWasBack), wait = first ? 2.5 : 0.4;
      var h = '<div class="k l" style="--d:' + (wait - 0.2) + '">' + s.chap + '</div>';
      s.lines.forEach(function (t, j) { h += '<p class="l" style="--d:' + (wait + j * 1.1) + '">' + t + '</p>'; });
      if (tch && s.tip) h += '<div class="st-tip l" style="--d:' + (wait + s.lines.length * 1.1) + '"><b>🎓 演じ方のコツ</b>' + s.tip + '</div>';
      box.innerHTML = h;
      var cp = root.querySelector('.st-chap');
      cp.classList.remove('on'); void cp.offsetWidth;
      if (first) { var m = s.ch.split('　'); cp.innerHTML = (m[1] ? '<small>' + m[0] + '</small>' : '') + '<span>' + (m[1] || m[0]) + '</span>'; cp.classList.add('on'); }
    }
    root.classList.toggle('ending', !!s.end);
    root.querySelector('.st-prog i').style.width = (i / (SCENES.length - 1) * 100) + '%';
    root.querySelector('.st-dots').textContent = s.end ? '' : (i + 1) + ' / ' + (SCENES.length - 1);
    fxLevel(s.p || 0);
    root.querySelector('.st-back').style.visibility = i > 0 ? 'visible' : 'hidden';
    root.querySelector('.st-hint').style.display = s.end ? 'none' : '';
  }

  function go(i) {
    if (i < 0 || i >= SCENES.length || i === cur || lock) return;
    lock = true; setTimeout(function () { lock = false; }, 450);   /* 連打で場面が飛ばないように */
    var prev = cur; cur = i; prevWasBack = i < prev;
    if (prev < 0 || SCENES[prev].bg !== SCENES[i].bg) setBg(SCENES[i].bg, i);
    render(i);
    if (sound && (prev < 0 || SCENES[prev].bgm !== SCENES[i].bgm)) play(SCENES[i].bgm);
  }

  function play(no) {
    var src = 'assets/bgm/bgm_' + no + '.' + (BGMEXT[no] || 'mp3');
    audio = new Audio(src); audio.loop = true; audio.volume = 0; all.push(audio);
    var p = audio.play(); if (p && p.catch) p.catch(function () {});
    var a = audio, t0 = Date.now();
    var olds = all.filter(function (x) { return x !== a; }).map(function (x) { return { el: x, v: x.volume }; });
    clearInterval(fadeT);
    fadeT = setInterval(function () {   /* 新しい曲を上げ、ほかの曲は全部下げて止める */
      var k = Math.min(1, (Date.now() - t0) / 1500);
      a.volume = 0.7 * k;
      olds.forEach(function (o) { o.el.volume = Math.max(0, o.v * (1 - k)); });
      if (k >= 1) { clearInterval(fadeT); olds.forEach(function (o) { o.el.pause(); }); all = [a]; }
    }, 50);
  }
  function stopAudio() { clearInterval(fadeT); all.forEach(function (x) { x.pause(); }); all = []; audio = null; }

  var cv, cx, parts = [], want = 0, raf = 0;
  function fxLevel(n) { want = reduce ? 0 : [0, 18, 40, 80][n] || 0; if (want && !raf) raf = requestAnimationFrame(tick); }
  function tick() {
    raf = 0; if (!open) { parts = []; return; }
    if (!cv) { cv = root.querySelector('.st-fx'); cx = cv.getContext('2d'); }
    var w = cv.clientWidth, h = cv.clientHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
    if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, w, h);
    while (parts.length < want) parts.push({ x: Math.random() * w, y: h + Math.random() * h * 0.5, r: 0.8 + Math.random() * 2.2, v: 0.25 + Math.random() * 0.6, s: Math.random() * 6.28, a: 0 });
    parts.forEach(function (q) {
      q.y -= q.v; q.s += 0.02; q.x += Math.sin(q.s) * 0.35; q.a = Math.min(1, q.a + 0.01);
      var fade = Math.min(1, q.y / (h * 0.35)) * q.a * (0.55 + 0.45 * Math.sin(q.s * 3));
      cx.beginPath(); cx.arc(q.x, q.y, q.r, 0, 6.29);
      cx.fillStyle = 'rgba(255,214,130,' + Math.max(0, fade).toFixed(3) + ')'; cx.shadowColor = 'rgba(255,190,90,.9)'; cx.shadowBlur = 8; cx.fill();
    });
    parts = parts.filter(function (q) { return q.y > -10; });
    if (parts.length > want) parts.splice(0, parts.length - want > 2 ? 2 : parts.length - want);
    if (want || parts.length) raf = requestAnimationFrame(tick); else cx.clearRect(0, 0, w, h);
  }

  function begin() {
    ls('tomori_story_seen', '1');
    root.classList.add('playing'); sndLabel(); cur = -1; go(0);
  }
  function show() {
    if (!root) build();
    ls('tomori_story_seen', '1');
    open = true; top = window.scrollY; document.documentElement.classList.add('st-lock');
    hidden = []; Array.prototype.forEach.call(document.body.children, function (el) { if (el !== root && el.id !== 'splash' && el.tagName !== 'SCRIPT') { el.inert = true; hidden.push(el); } });
    root.classList.remove('playing', 'ending'); root.classList.add('show');
    root.querySelector('.st-text').innerHTML = ''; cur = -1;
    setTimeout(function () { var b = root.querySelector('.st-go'); if (b) b.focus(); }, 50);
  }
  function close(to) {
    stopAudio(); open = false; want = 0;
    root.classList.remove('show', 'playing'); document.documentElement.classList.remove('st-lock');
    hidden.forEach(function (el) { el.inert = false; }); hidden = [];
    if (to) { var el = document.getElementById(to); if (el) el.scrollIntoView({ block: 'start' }); }
    else window.scrollTo(0, top);
    var b = document.getElementById(to ? 'nRange' : 'storyBtn'); if (b) b.focus({ preventScroll: true });
  }
  window.TomoriStory = { show: show, close: close, seen: function () { return ls('tomori_story_seen') === '1'; } };
})();
