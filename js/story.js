/* あらすじ（紙芝居）。押すと次へ・音は最初に選ぶ・結末の手前で止める */
(function () {
  var SCENES = [
    { bg: 'img/title.jpg', bgm: '00', kicker: 'プロローグ',
      lines: ['人間の住む町と、魔女の住む山。', '町の広場には、百年間、一度も消えたことのない火が燃えています。', '友の火、<b>トモリ</b>。', 'これは、その火が消えた夜のお話です。'] },
    { bg: 'assets/haikei/bg_02.jpg', bgm: '03', kicker: '星ふるバザール',
      lines: ['年に一度、星がふる夜にだけ、魔女が山を下りてくる。', '人間と魔女が、けんかもせずに買い物をする<b>「星ふるバザール」</b>。', '町の子ノアと、魔女の子ルーチェは、この夜にしか会えない友だちです。'] },
    { bg: 'assets/haikei/bg_05b.jpg', bgm: '08', kicker: 'ふたりの宝物',
      lines: ['ノアは、初めてひとりで焼いたパンを。', 'ルーチェは、宝物のマントを切って、星のししゅうのお守りを。', '<q>大切なものはね——あげたら、なくならないの。ふたつに、なるの。</q>', '「来年は、ふたりでお店を出そう」。ゆびきり、げんまん。'] },
    { bg: 'assets/haikei/bg_05.jpg', bgm: '07', kicker: 'ないしょ話',
      lines: ['笑顔のうらで、町の人も魔女も、こっそり悪口を言い合っていました。', 'ひとこと言うたびに、トモリがふるえる。この火は、<b>信じ合う心</b>で燃えていたのです。', 'その夜おそく。弱っていくトモリを見たノアは、お守りを台座にそっと置きました。', '<q>今夜だけ、貸してあげる。</q>'] },
    { bg: 'assets/haikei/bg_06c.jpg', bgm: '16', kicker: '消えたトモリ',
      lines: ['朝。台座の上から、トモリが消えていました。', '残っていたのは、星のししゅうの布きれ。', '町の人は口々に「魔女の子が盗んだんだ！」。「ぼくが置いたんだ」というノアの声は、だれにも届きません。', '責められるノアを見て、ルーチェは一歩前へ出ました。<q>わたしが、やりました。</q>'] },
    { bg: 'assets/haikei/bg_01.jpg', bgm: '20', kicker: '猫たちの捜査',
      lines: ['<q>猫は、なんでも見ている。</q>', 'あの夜、黒いフードの人がトモリを抱いて、泣きながら森へ歩いていった——。', 'ノアと猫たち、町の人、山の魔女。みんなが、森の塔へ向かいます。'] },
    { bg: 'assets/haikei/bg_09.jpg', bgm: '22', kicker: '三十年前の夜',
      lines: ['塔にいたのは、魔法使いフラム。', '三十年前、消えかけたトモリを助けようとして、どろぼうと呼ばれた人。', '<q>誰かひとりでも、私を信じてくれ……！</q>', 'そして今、フラムは言いました。トモリを消したのは——', '<q>おまえたち、全員だ。</q>'] },
    { bg: 'assets/haikei/bg_08.jpg', bgm: '24', kicker: '差し出す思い出',
      lines: ['トモリをよみがえらせるには、「いちばん大切な思い出」を火に差し出すこと。', 'それは、大切な思い出を手ばなすということ。', 'それでも、町の人も魔女も、次々に思い出を差し出していく。', 'けれど、疑いのまじった思い出を、火は受け取らない。'] },
    { bg: 'assets/haikei/bg_10b.jpg', bgm: '25', kicker: 'ルーチェの歌',
      lines: ['ノアが、自分の思い出を差し出そうとする。その手を、ルーチェが止めました。', '<q>わたしの思い出のふたつめは……ノアの中に、あるから。</q>', '<q>——忘れても、友だちだよ。</q>', 'ルーチェはひとりで歌い出し、歌にのせて、いちばん大切な思い出を火に差し出しました。'] },
    { end: true, bg: 'assets/haikei/bg_10b.jpg', bgm: '26' }
  ];
  var BGMEXT = { '06': 'm4a', '12': 'm4a', '19': 'm4a' };
  var reduce = false; try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  var root, layers, cur = -1, sound = false, audio = null, all = [], fadeT = null, open = false, lock = false, top = 0, hidden = [];

  function build() {
    root = document.createElement('div'); root.id = 'story'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'あらすじ');
    root.innerHTML =
      '<div class="st-bg"></div><div class="st-bg"></div><div class="st-shade"></div>' +
      '<div class="st-start"><div class="st-sub">どんなお話？</div>' +
      '<p>まず、あらすじを見てください（2〜3分・画面を押すと進みます）。</p>' +
      '<button type="button" class="st-go" data-snd="1">♪ 音ありで見る</button><button type="button" class="st-go st-quiet" data-snd="0">音なしで見る</button>' +
      '<button type="button" class="st-skipnow">あらすじをとばす</button></div>' +
      '<div class="st-text" aria-live="polite"></div>' +
      '<div class="st-bar"><button type="button" class="st-back" aria-label="前の場面へ">‹ もどる</button><div class="st-dots"></div>' +
      '<button type="button" class="st-snd" aria-label="音を切りかえる"></button><button type="button" class="st-skip">とばす ›</button></div>' +
      '<div class="st-hint">画面を押すと、次へ</div>';
    document.body.appendChild(root);
    layers = root.querySelectorAll('.st-bg');
    var d = root.querySelector('.st-dots');
    SCENES.forEach(function () { var i = document.createElement('i'); d.appendChild(i); });
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
    next.classList.remove('zoom'); void next.offsetWidth; if (!reduce) next.classList.add('zoom');
    next.classList.add('on'); layers[front].classList.remove('on'); front = 1 - front;
    var n = SCENES[i + 1]; if (n) { var im = new Image(); im.src = n.bg; }
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
      var h = '<div class="k l" style="--d:0">' + s.kicker + '</div>';
      s.lines.forEach(function (t, j) { h += '<p class="l" style="--d:' + (0.5 + j * 1.1) + '">' + t + '</p>'; });
      box.innerHTML = h;
    }
    root.classList.toggle('ending', !!s.end);
    var dots = root.querySelectorAll('.st-dots i');
    dots.forEach(function (d, j) { d.className = j === i ? 'on' : (j < i ? 'done' : ''); });
    root.querySelector('.st-back').style.visibility = i > 0 ? 'visible' : 'hidden';
    root.querySelector('.st-hint').style.display = s.end ? 'none' : '';
  }

  function go(i) {
    if (i < 0 || i >= SCENES.length || i === cur || lock) return;
    lock = true; setTimeout(function () { lock = false; }, 450);   /* 連打で場面が飛ばないように */
    var prev = cur; cur = i;
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
    stopAudio(); open = false;
    root.classList.remove('show', 'playing'); document.documentElement.classList.remove('st-lock');
    hidden.forEach(function (el) { el.inert = false; }); hidden = [];
    if (to) { var el = document.getElementById(to); if (el) el.scrollIntoView({ block: 'start' }); }
    else window.scrollTo(0, top);
    var b = document.getElementById(to ? 'nRange' : 'storyBtn'); if (b) b.focus({ preventScroll: true });
  }
  window.TomoriStory = { show: show, close: close, seen: function () { return ls('tomori_story_seen') === '1'; } };
})();
