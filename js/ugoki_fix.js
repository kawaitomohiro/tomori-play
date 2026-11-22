/* 動きの図を、本番の録画に合わせて直す。
   直しの中身は window.UGOKI_FIX（_作り直し用/video_ana/fix_*.json をまとめた物。make_fix.js が下に書きこむ）。
   1つの直し＝{scene, b, who:[役名], to:[印の名前], place}。b=0 ははじめの位置、b=n は n番目の動きのあとの位置。 */
(function () {
  if (typeof D === 'undefined' || typeof SCENES === 'undefined') return;
  var FIX = window.UGOKI_FIX || [];
  /* 机・のぼりを録画の並びに置き直す（舞台に斜め7台＋左右のひな壇に1台ずつ） */
  var PF = window.UGOKI_PROPS;
  if (PF && D.PROPS) PF.scenes.forEach(function (k) { var re = new RegExp(PF.replace); D.PROPS[k] = (D.PROPS[k] || []).filter(function (p) { return !re.test(p.id); }).concat(PF.props); });
  /* 2階のギャラリー（図の左はし・右はし）。録画で猫などが使った */
  var GAL = { 'ギャ下1': [2, 72], 'ギャ下2': [2, 80], 'ギャ下3': [2, 88], 'ギャ下4': [2, 96], 'ギャ上1': [98, 72], 'ギャ上2': [98, 80], 'ギャ上3': [98, 88], 'ギャ上4': [98, 96] };
  var OFF = { '下手袖': [-8, 34], '上手袖': [108, 34] };
  var MK = {}; D.MARKS.forEach(function (m) { MK[m.n] = [m.x, m.y]; });
  Object.keys(GAL).forEach(function (k) { MK[k] = GAL[k]; });
  var ID = {}; Object.keys(D.ROLES).forEach(function (k) { ID[D.ROLES[k].name] = k; });
  var bad = [];
  FIX.forEach(function (f) {
    var sc = null; SCENES.forEach(function (s) { if (s.key === f.scene) sc = s; });
    if (!sc) { bad.push(f); return; }
    (f.who || []).forEach(function (nm, j) {
      var id = ID[nm], to = (f.to || [])[j], xy = MK[to] || OFF[to];
      if (!xy && /^@-?[\d.]+,-?[\d.]+$/.test(to)) xy = to.slice(1).split(',').map(Number);   /* 印のない所は @x,y で書く */
      if (!id || !xy) { bad.push([f.scene, f.b, nm, to]); return; }
      var p = { x: xy[0], y: xy[1], on: OFF[to] ? 0 : 1, place: f.place ? f.place : to };
      if (!f.b) sc.init[id] = p;
      else { var bt = sc.beats[f.b - 1]; if (!bt) { bad.push([f.scene, f.b, nm]); return; } bt.mv = bt.mv || {}; bt.mv[id] = p; }
    });
    var key = f.b ? sc.beats[f.b - 1] : sc; if (key && f.now) { key._rec = key._rec || []; if (key._rec.indexOf(f.now) < 0) key._rec.push(f.now); }
  });
  if (bad.length && window.console) console.warn('ugoki_fix: 当てられなかった直し', bad);
  /* ギャラリーの帯を図に描く */
  var st = document.getElementById('stage');
  if (st) {
    var css = document.createElement('style');
    css.textContent = '.galz{position:absolute;top:67%;height:32%;width:3.6%;background:rgba(255,160,120,.10);border:1px dashed rgba(255,170,130,.55);border-radius:6px;pointer-events:none;z-index:1}.galz span{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-90deg);white-space:nowrap;font-size:.55rem;color:rgba(255,190,160,.75);letter-spacing:.06em}#galL{left:.2%}#galR{right:.2%}#galR span{transform:translate(-50%,-50%) rotate(90deg)}';
    document.head.appendChild(css);
    st.insertAdjacentHTML('beforeend', '<div class="galz" id="galL"><span>下手ギャラリー（2階）</span></div><div class="galz" id="galR"><span>上手ギャラリー（2階）</span></div>');
  }
  /* 直した動きには、図の説明の下に「本番の録画では」を出す（元の説明は計画のときの文なので） */
  var css2 = document.createElement('style');
  css2.textContent = '.recnote{margin:6px 0 2px;padding:7px 10px;border-radius:9px;background:rgba(255,150,110,.12);border:1px solid rgba(255,160,120,.55);font-size:.86rem;color:#ffd9c8}.recnote b{color:#ffb48f}';
  document.head.appendChild(css2);
  var origRender = render;
  render = function (i) {
    origRender(i);
    var sc = SCENES[sceneIdx], cap = document.getElementById('cap'); if (!cap) return;
    var old = cap.querySelector('.recnote'); if (old) old.remove();
    var src = i > 0 ? sc.beats[i - 1] : sc;
    if (src && src._rec && src._rec.length) {
      var d = document.createElement('div'); d.className = 'recnote';
      d.innerHTML = '<b>📹 本番の録画では：</b>' + src._rec.map(function (t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }).join('／') + '（図は録画に合わせて直してあります。上の説明は計画のときの文です）';
      var h = cap.firstElementChild; if (h && h.nextSibling) cap.insertBefore(d, h.nextSibling); else cap.appendChild(d);
    }
  };
  window.UGOKI_FIX_COUNT = FIX.length;
  try { loadScene(typeof sceneIdx === 'number' ? sceneIdx : 0); } catch (e) {}
})();
