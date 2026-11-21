/* 人数 → 配役と台本。ブラウザでも node でも動く（node: require('./engine.js')(data)） */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory;
  else root.TomoriEngine = factory(root.TOMORI_DATA);
})(this, function (D) {
  var NUM = ['', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧'];
  var SEGS = D.SEGS, SI = {}; SEGS.forEach(function (s, i) { SI[s] = i; });
  var MAINBY = {}; D.MAIN.forEach(function (m) { MAINBY[m.id] = m; });
  var NAME2MAIN = {}; D.MAIN.forEach(function (m) { NAME2MAIN[m.name] = m; });
  var CHAR2GROUP = {}; D.GROUPS.forEach(function (g) { g.chars.forEach(function (c) { CHAR2GROUP[c] = g; }); });
  var LINES = D.blocks.filter(function (b) { return b.t === 'line'; });

  /* 元の話し手 → {kind, ...} */
  function parseSp(sp) {
    var m = sp.match(/^(.+?)([①②③④])?$/);
    var base = m[1], slot = m[2] || '';
    if (NAME2MAIN[base]) return { kind: 'main', main: NAME2MAIN[base], slot: slot };
    if (CHAR2GROUP[sp]) return { kind: 'char', ch: sp, group: CHAR2GROUP[sp] };
    return { kind: 'crowd', text: sp };
  }

  /* 名前が出てくるか（「パン屋の見習い」「パン屋の子」は「パン屋」と数えない） */
  function mentions(text, o) {
    var t = text;
    if (o === 'パン屋') t = t.split('パン屋の見習い').join('').split('パン屋の子').join('');
    return t.indexOf(o) >= 0;
  }
  function state(N) {
    var k = {}; D.MAIN.forEach(function (m) { k[m.id] = 1; });
    var on = {}; D.GROUPS.forEach(function (g) { g.chars.slice(0, D.MIN_KEEP).forEach(function (c) { on[c] = true; }); });
    var split = {};
    var steps = Math.min(N, D.NMIN + D.OPS.length) - D.NMIN;
    for (var i = 0; i < steps; i++) {
      var op = D.OPS[i].split(':');
      if (op[0] === 'main') k[op[1]]++;
      else if (op[0] === 'char') on[op[1]] = true;
      else if (op[0] === 'split') split[op[1]] = true;
    }
    return { k: k, on: on, split: split, narrators: Math.max(0, N - (D.NMIN + D.OPS.length)) };
  }

  /* 主役級：場面 → 何人目か（0から） */
  function mainIdx(m, k, seg) {
    var cuts = m.cuts[k]; var idx = 0;
    cuts.forEach(function (c) { if (SI[seg] >= SI[c]) idx++; });
    return idx;
  }
  /* 主役級の表示名（フラムは若き日を②に入れる） */
  function mainLabel(m, k, idx) {
    if (m.young) { var n = idx === 0 ? 1 : idx + 2; return m.name + NUM[n]; }
    return k === 1 ? m.name : m.name + NUM[idx + 1];
  }
  function youngLabel(m) { return m.name + '②'; }

  function assign(N) {
    N = Math.max(D.NMIN, Math.min(D.NMAX, Math.round(N)));
    var st = state(N);
    var actors = {}, order = [];
    function actor(label, info) { if (!actors[label]) { actors[label] = Object.assign({ label: label, lines: 0, segs: {}, also: [] }, info); order.push(label); } return actors[label]; }

    /* 魔女・猫・店主・住民：休む役のセリフを、残る役に回す（続けて1人で話す所が少なくなる相手を選ぶ） */
    var mergeTo = {};
    D.GROUPS.forEach(function (g) {
      var keep = g.chars.filter(function (c) { return st.on[c]; });
      var off = g.chars.filter(function (c) { return !st.on[c]; });
      var cluster = {}; keep.forEach(function (c) { cluster[c] = [c]; });
      var cnt = {}; keep.forEach(function (c) { cnt[c] = LINES.filter(function (b) { return b.sp === c; }).length; });
      off.forEach(function (o) {
        var best = null, bestScore = null;
        keep.forEach(function (c) {
          var conf = 0;
          for (var i = 1; i < LINES.length; i++) {
            var a = LINES[i - 1].sp, b = LINES[i].sp;
            if ((a === o && cluster[c].indexOf(b) >= 0) || (b === o && cluster[c].indexOf(a) >= 0)) conf++;
          }
          var score = conf * 1000 + cnt[c];
          if (bestScore === null || score < bestScore) { best = c; bestScore = score; }
        });
        mergeTo[o] = best; cluster[best].push(o);
        cnt[best] += LINES.filter(function (b) { return b.sp === o; }).length;
      });
    });

    function charLabel(c, seg) {
      var t = mergeTo[c] || c;
      if (st.split[t]) return t + (SI[seg] >= SI[D.SPLIT[t]] ? '②' : '①');
      return t;
    }
    function spLabel(sp, seg) {
      var p = parseSp(sp);
      if (p.kind === 'main') {
        var m = p.main;
        if (m.young && p.slot === m.young) return youngLabel(m);
        return mainLabel(m, st.k[m.id], mainIdx(m, st.k[m.id], seg));
      }
      if (p.kind === 'char') return charLabel(p.ch, seg);
      return sp;
    }
    /* ト書き・セリフの中の「ノア③」などを、その場面で演じる人の名前に */
    function fixMentions(text, seg) {
      return text.replace(/(ノア|ルーチェ|チャチャ|フラム|町長|マーバ)([①②③④])/g, function (all, base, slot) {
        var m = NAME2MAIN[base];
        if (m.young && slot === m.young) return youngLabel(m);
        var oseg = m.orig[slot]; if (!oseg) return all;
        var cuts = Object.keys(m.orig).map(function (s) { return m.orig[s]; }).sort(function (a, b) { return SI[a] - SI[b]; });
        var start = SI[oseg], next = cuts.filter(function (c) { return SI[c] > start; })[0];
        var end = next ? SI[next] : SEGS.length;
        var useSeg = (SI[seg] >= start && SI[seg] < end) ? seg : oseg;
        return mainLabel(m, st.k[m.id], mainIdx(m, st.k[m.id], useSeg));
      });
    }

    /* 役の一覧（表の順） */
    D.MAIN.forEach(function (m) {
      var k = st.k[m.id];
      for (var i = 0; i < k; i++) {
        var segsOf = SEGS.filter(function (s) { return mainIdx(m, k, s) === i; });
        actor(mainLabel(m, k, i), { group: '主な役', role: m.name, desc: m.desc, range: segsOf });
        if (m.young && i === 0) actor(youngLabel(m), { group: '主な役', role: m.name, desc: '若き日のフラム（四場の回想）', range: ['S4a'] });
      }
    });
    D.GROUPS.forEach(function (g) {
      g.chars.forEach(function (c) {
        if (!st.on[c]) return;
        var d = D.CHARDESC[c] ? D.CHARDESC[c] : '';
        if (st.split[c]) {
          actor(c + '①', { group: g.name, role: c, desc: d, range: SEGS.filter(function (s) { return SI[s] < SI[D.SPLIT[c]]; }) });
          actor(c + '②', { group: g.name, role: c, desc: d, range: SEGS.filter(function (s) { return SI[s] >= SI[D.SPLIT[c]]; }) });
        } else actor(c, { group: g.name, role: c, desc: d });
      });
    });
    Object.keys(mergeTo).forEach(function (o) { actors[mergeTo[o]].also.push(o); });

    /* 語り部：1人4文まで。入りきるつなぎだけを、大事な順に使う（T5しめくくり→T0はじまり→T3森へ→…） */
    var X = st.narrators, narrSp = {}, narrLabel = {}, useT = {};
    if (X > 0) {
      var cap = D.NARR_MAX * X, used = 0, cnt = {};
      D.narr.forEach(function (n) { cnt[n.k] = (cnt[n.k] || 0) + 1; });
      D.NARR_ORDER.forEach(function (k) { if (used + cnt[k] <= cap) { useT[k] = true; used += cnt[k]; } });
      var idx = []; D.narr.forEach(function (n, i) { if (useT[n.k]) idx.push(i); });
      var S = idx.length, lists = idx.map(function () { return []; }), team = (2 * X > S);
      if (!team) { for (var s = 0; s < S; s++) lists[s].push(s % X); }   /* 少ない時：1文を1人で順番に */
      else { for (var j = 0; j < X; j++) { lists[(2 * j) % S].push(j); lists[(2 * j + 1) % S].push(j); } }   /* 多い時：2文ずつの組で声をそろえる */
      var teamOf = {};
      lists.forEach(function (l, p) {
        var who = l.sort(function (a, b) { return a - b; }).map(function (n) { return n + 1; });
        narrSp[idx[p]] = who;
        var grp = team && who.length >= 2;   /* 組と呼ぶのは2人以上そろう時だけ */
        narrLabel[idx[p]] = grp ? ('語り部' + (Math.floor(p / 2) + 1) + '組') : ('語り部' + who.join('・'));
        if (grp) who.forEach(function (n) { teamOf[n] = Math.floor(p / 2) + 1; });
      });
      for (var j2 = 1; j2 <= X; j2++) actor('語り部' + j2, { group: '星の語り部', role: '星の語り部', desc: teamOf[j2] ? ('語り部' + teamOf[j2] + '組（' + lists.filter(function (l, p) { return Math.floor(p / 2) + 1 === teamOf[j2]; })[0].length + '人で声をそろえる）') : '場面のつなぎを語る' });
    }

    /* 台本を組み立てる */
    var blocks = [], review = [];
    var prevLine = null;
    var lastMainActor = {};
    D.blocks.forEach(function (b, bi) {
      if ((b.narr || b.t === 'narr') && (X === 0 || !useT[b.narr || b.k])) return;
      if (b.t === 'narr') {
        var who = narrSp[b.ni];
        var lab = narrLabel[b.ni];
        who.forEach(function (n) { var a = actors['語り部' + n]; a.lines++; a.segs[b.seg] = 1; });
        blocks.push({ t: 'line', seg: b.seg, sp: lab, who: who, text: b.text, narr: true, src: bi });
        prevLine = null; return;
      }
      if (b.t !== 'line') {
        var nb = { t: b.t, seg: b.seg, text: fixMentions(b.text, b.seg), song: b.song, src: bi };
        /* 主役級が四場の途中で交代する所に、交代のト書きを入れる */
        if (b.t === 'h2') {
          D.MAIN.forEach(function (m) {
            var k = st.k[m.id]; if (k < 2) return;
            var segNow = b.seg; var i = SEGS.indexOf(segNow);
            m.cuts[k].forEach(function (c) {
              if (c === segNow && /^S4[bcd]$/.test(c)) {
                var from = mainLabel(m, k, mainIdx(m, k, SEGS[i - 1])), to = mainLabel(m, k, mainIdx(m, k, segNow));
                nb.swap = (nb.swap || []).concat([from + ' → ' + to]);
              }
            });
          });
        }
        blocks.push(nb);
        if (b.t === 'dir') prevLine = null;
        return;
      }
      var label = spLabel(b.sp, b.seg);
      var text = fixMentions(b.text, b.seg);
      var flags = [];
      if (prevLine && prevLine.sp === label && prevLine.origSp !== b.sp && actors[label]) flags.push('続けて同じ人が話す（前のセリフは元は「' + prevLine.origSp + '」）');
      Object.keys(mergeTo).forEach(function (o) {
        if (mentions(text, o)) flags.push('「' + o + '」は' + mergeTo[o] + 'が兼ねています→呼び名を「' + mergeTo[o] + '」に直すか、' + mergeTo[o] + 'が二役を受け持つ形にする');
      });
      var line = { t: 'line', seg: b.seg, sp: label, origSp: b.sp, text: text, flags: flags, src: bi };
      if (mergeTo[b.sp]) line.asRole = b.sp;
      blocks.push(line);
      if (actors[label]) { actors[label].lines++; actors[label].segs[b.seg] = 1; }
      prevLine = line;
      if (flags.length) review.push({ seg: b.seg, sp: label, text: text, why: flags, src: bi });
    });
    /* ト書きに出てくる休む役の名前 */
    blocks.forEach(function (b) {
      if (b.t !== 'dir') return;
      var why = [];
      Object.keys(mergeTo).forEach(function (o) { if (mentions(b.text, o)) why.push('「' + o + '」は' + mergeTo[o] + 'が兼ねています→ト書きの名前を直す'); });
      if (Object.keys(mergeTo).length && /([0-9０-９]+|[三四五六七八九十]+)(人|匹)|[0-9０-９]組/.test(b.text)) why.push('人数が書いてあります→この人数に合わせて直す');
      if (why.length) { b.flags = why; review.push({ seg: b.seg, sp: 'ト書き', text: b.text, why: why, src: b.src }); }
    });

    review.sort(function (x, y) { return x.src - y.src; });
    var list = order.map(function (l) { return actors[l]; });
    return { N: N, state: st, actors: list, blocks: blocks, review: review, mergeTo: mergeTo, narrators: X };
  }

  return { assign: assign, NMIN: D.NMIN, NMAX: D.NMAX, SEGNAME: D.SEGNAME, SEGS: SEGS };
});
