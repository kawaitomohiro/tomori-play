/* あらすじ（紙芝居）。押すと次へ・音は最初に選ぶ・結末の手前で止める */
(function () {
  /* 絵は assets/story/sNN.jpg（_作り直し用/story_img で作る）。ch＝章（変わると章の題を出す）・fx＝縦長の画面で見せる横の位置・p＝光の粒の多さ */
  var IMG = function (n) { return 'assets/story/s' + n + '.jpg'; };
  var SCENES = [
    { bg: IMG('01'), bgm: '00', ch: 'プロローグ', fx: 50, p: 1, lines: ['人間の住む町と、魔女の住む山。'] },
    { bg: IMG('02'), bgm: '00', fx: 50, p: 2, lines: ['町の広場には、百年間、一度も消えたことのない火が燃えています。', '友の火、<b>トモリ</b>。', 'これは、その火が消えた夜のお話です。'] },
    { bg: IMG('03'), bgm: '03', ch: '第一章　星ふるバザール', fx: 60, p: 3, lines: ['年に一度、星がふる夜にだけ、', '魔女が山を下りてくる。'] },
    { bg: IMG('04'), bgm: '03', fx: 50, p: 3, lines: ['人間と魔女が、けんかもせずに買い物をする', '<b>「星ふるバザール」</b>。'] },
    { bg: IMG('05'), bgm: '03', fx: 42, p: 2, lines: ['町の子ノアと、魔女の子ルーチェ。', 'この夜にしか会えない、友だちです。'] },
    { bg: IMG('06'), bgm: '08', ch: '第二章　ふたりの宝物', fx: 45, p: 1, lines: ['ノアは、初めてひとりで焼いたパンを。'] },
    { bg: IMG('07'), bgm: '08', fx: 30, p: 1, lines: ['ルーチェは、宝物のマントを切って、', '星のししゅうのお守りを。'] },
    { bg: IMG('08'), bgm: '08', fx: 50, p: 2, lines: ['<q>大切なものはね——あげたら、なくならないの。ふたつに、なるの。</q>', '「来年は、ふたりでお店を出そう」。ゆびきり、げんまん。'] },
    { bg: IMG('09'), bgm: '07', ch: '第三章　ないしょ話', fx: 50, p: 0, lines: ['笑顔のうらで、', '町の人も魔女も、こっそり悪口を言い合っていました。'] },
    { bg: IMG('10'), bgm: '07', fx: 50, p: 1, lines: ['ひとこと言うたびに、トモリがふるえる。', 'この火は、<b>信じ合う心</b>で燃えていたのです。'] },
    { bg: IMG('11'), bgm: '07', fx: 35, p: 1, lines: ['その夜おそく。弱っていくトモリを見たノアは、', 'お守りを台座にそっと置きました。', '<q>今夜だけ、貸してあげる。</q>'] },
    { bg: IMG('12'), bgm: '16', ch: '第四章　消えたトモリ', fx: 50, p: 0, lines: ['朝。', '台座の上から、トモリが消えていました。', '残っていたのは、星のししゅうの布きれ。'] },
    { bg: IMG('13'), bgm: '16', fx: 45, p: 0, lines: ['<q>魔女の子が盗んだんだ！</q>', '「ぼくが置いたんだ」というノアの声は、だれにも届きません。'] },
    { bg: IMG('14'), bgm: '16', fx: 62, p: 0, lines: ['責められるノアを見て、ルーチェは一歩前へ出ました。', '<q>わたしが、やりました。</q>'] },
    { bg: IMG('15'), bgm: '20', ch: '第五章　猫たちの捜査', fx: 50, p: 1, lines: ['<q>猫は、なんでも見ている。</q>'] },
    { bg: IMG('16'), bgm: '20', fx: 75, p: 1, lines: ['あの夜、黒いフードの人がトモリを抱いて、', '泣きながら森へ歩いていった——。'] },
    { bg: IMG('17'), bgm: '20', fx: 50, p: 1, lines: ['ノアと猫たち、町の人、山の魔女。', 'みんなが、森の塔へ向かいます。'] },
    { bg: IMG('18'), bgm: '22', ch: '第六章　三十年前の夜', fx: 45, p: 1, lines: ['森の塔の石段で、消えかけたトモリを抱いていたのは——', '魔法使い、フラム。'] },
    { bg: IMG('19'), bgm: '22', fx: 50, p: 0, lines: ['三十年前、消えかけたトモリを助けようとして、', 'どろぼうと呼ばれた人。', '<q>誰かひとりでも、私を信じてくれ……！</q>'] },
    { bg: IMG('20'), bgm: '22', fx: 68, p: 1, lines: ['そして今、フラムは言いました。', 'トモリを消したのは——', '<q>おまえたち、全員だ。</q>'] },
    { bg: IMG('21'), bgm: '24', ch: '第七章　差し出す思い出', fx: 50, p: 2, lines: ['トモリをよみがえらせるには、', '「いちばん大切な、信じる心の思い出」を火に差し出すこと。', 'それは、大切な思い出を手ばなすということ。'] },
    { bg: IMG('22'), bgm: '24', fx: 45, p: 1, lines: ['それでも、町の人も魔女も、次々に思い出を差し出していく。', 'けれど、疑いのまじった思い出を、火は受け取らない。'] },
    { bg: IMG('23'), bgm: '25', ch: '第八章　ルーチェの歌', fx: 50, p: 2, lines: ['ノアが、自分の思い出を差し出そうとする。', 'その手を、ルーチェが止めました。', '<q>わたしの思い出のふたつめは……ノアの中に、あるから。</q>'] },
    { bg: IMG('24'), bgm: '25', fx: 42, p: 3, lines: ['<q>——忘れても、友だちだよ。</q>', 'ルーチェはひとりで歌い出し、', '歌にのせて、いちばん大切な思い出を火に差し出しました。'] },
    { end: true, bg: IMG('24'), bgm: '26', p: 3 }
  ];
  (function () { var c = ''; SCENES.forEach(function (x) { if (x.ch) c = x.ch; x.chap = c; }); })();
  var BGMEXT = { '06': 'm4a', '12': 'm4a', '19': 'm4a' };
  var reduce = false; try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  var prevWasBack = false, root, layers, cur = -1, sound = false, audio = null, all = [], fadeT = null, open = false, lock = false, top = 0, hidden = [];

  function build() {
    root = document.createElement('div'); root.id = 'story'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'あらすじ');
    root.innerHTML =
      '<div class="st-amb"></div><div class="st-bg"></div><div class="st-bg"></div><div class="st-shade"></div><canvas class="st-fx" aria-hidden="true"></canvas><div class="st-chap" aria-hidden="true"></div><div class="st-prog"><i></i></div>' +
      '<div class="st-start"><div class="st-sub">どんなお話？</div>' +
      '<p>まず、あらすじを見てください（約4分・絵本のように、画面を押すと進みます）。</p>' +
      '<button type="button" class="st-go" data-snd="1">♪ 音ありで見る</button><button type="button" class="st-go st-quiet" data-snd="0">音なしで見る</button>' +
      '<button type="button" class="st-skipnow">あらすじをとばす</button></div>' +
      '<div class="st-text" aria-live="polite"></div>' +
      '<div class="st-bar"><button type="button" class="st-back" aria-label="前の場面へ">‹ もどる</button><div class="st-dots"></div>' +
      '<button type="button" class="st-snd" aria-label="音を切りかえる"></button><button type="button" class="st-skip">とばす ›</button></div>' +
      '<div class="st-hint">画面を押すと、次へ</div>';
    document.body.appendChild(root);
    layers = root.querySelectorAll('.st-bg');
    var d = root.querySelector('.st-dots');
    root.querySelectorAll('.st-go').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); sound = b.getAttribute('data-snd') === '1'; begin(); }); });
    root.querySelector('.st-skipnow').addEventListener('click', function (e) { e.stopPropagation(); close(); });
    root.querySelector('.st-skip').addEventListener('click', function (e) { e.stopPropagation(); close(); });
    root.querySelector('.st-back').addEventListener('click', function (e) { e.stopPropagation(); go(cur - 1); });
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
