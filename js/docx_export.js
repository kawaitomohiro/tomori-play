/* 配役と台本 → Word（.docx）。ブラウザ: TomoriDocx.build(result, opts) → Blob を返す Promise
   node: require('./docx_export.js')(require('docx')).build(result, opts) → Buffer */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory;
  else root.TomoriDocx = factory(root.docx);
})(this, function (X) {
  var MIN = 'BIZ UD明朝', GOT = 'BIZ UDゴシック';
  var FM = { ascii: MIN, eastAsia: MIN, hAnsi: MIN }, FG = { ascii: GOT, eastAsia: GOT, hAnsi: GOT };
  var SEGCOL = [['P', 'プロ\nローグ'], ['S1', '一場'], ['S2', '二場'], ['S3', '三場'], ['S4', '四場'], ['S4d', '結末'], ['E', 'エピ\nローグ']];
  var W = 9638;

  function fw(t) { return String(t).replace(/!/g, '！').replace(/\?/g, '？').replace(/[0-9]/g, function (d) { return String.fromCharCode(d.charCodeAt(0) + 0xFEE0); }); }
  function runs(text, o) {
    o = o || {}; var out = [];
    String(text).split('**').forEach(function (p, i) {
      if (!p) return;
      out.push(new X.TextRun({ text: o.vertical ? fw(p) : p, bold: i % 2 === 1 || undefined, highlight: o.hl ? 'yellow' : undefined }));
    });
    return out.length ? out : [new X.TextRun('')];
  }
  function P(text, style, o) { o = o || {}; return new X.Paragraph({ style: style, alignment: o.align, pageBreakBefore: o.pb || undefined, children: runs(text, o) }); }
  function border() { var b = { style: X.BorderStyle.SINGLE, size: 4, color: '999999' }; return { top: b, bottom: b, left: b, right: b }; }
  function table(head, rows, widths) {
    var sum = widths.reduce(function (a, b) { return a + b; }, 0);
    function cell(t, w, h) {
      return new X.TableCell({ borders: border(), width: { size: w, type: X.WidthType.DXA }, margins: { top: 40, bottom: 40, left: 80, right: 80 },
        shading: h ? { fill: 'EFE7D5', type: X.ShadingType.CLEAR, color: 'auto' } : undefined,
        children: String(t == null ? '' : t).split('\n').map(function (l) { return new X.Paragraph({ style: 'Hyou', children: [new X.TextRun({ text: l, bold: h || undefined })] }); }) });
    }
    return new X.Table({ width: { size: sum, type: X.WidthType.DXA }, columnWidths: widths,
      rows: [new X.TableRow({ tableHeader: true, children: head.map(function (h, i) { return cell(h, widths[i], true); }) })]
        .concat(rows.map(function (r) { return new X.TableRow({ cantSplit: true, children: r.map(function (c, i) { return cell(c, widths[i]); }) }); })) });
  }

  function build(R, opts) {
    opts = opts || {};
    var names = opts.names || {}, mark = opts.mark !== false;
    var segName = { P: 'プロローグ', S1: '一場', S2: '二場', S3: '三場', S4a: '四場(1)', S4b: '四場(2)', S4c: '四場(3)', S4d: '結末(4)', E: 'エピローグ' };

    /* ---------- 前の部分（横書き） ---------- */
    var F = [];
    F.push(P('★', 'Hyoushi3', { align: X.AlignmentType.CENTER }));
    F.push(P('トモリの火が消えた夜', 'Hyoushi1', { align: X.AlignmentType.CENTER }));
    F.push(P('〜わすれても、ともだち〜', 'Hyoushi2', { align: X.AlignmentType.CENTER }));
    F.push(P('学習発表会のための劇 ／ 上演 約' + (R.narrators ? 42 : 40) + '分', 'Hyoushi3', { align: X.AlignmentType.CENTER }));
    F.push(P(R.N + '人で上演する台本' + (opts.school ? '（' + opts.school + '）' : ''), 'Hyoushi2', { align: X.AlignmentType.CENTER }));
    F.push(P('作：川合智宏', 'Hyoushi3', { align: X.AlignmentType.CENTER }));
    F.push(P('この台本の使い方', 'Midashi1', { pb: true }));
    [
      'この台本は「トモリの火が消えた夜」特設サイトで、人数を入れて作ったものです。役の割りふり・セリフ・ト書きは、Wordでそのまま直せます。',
      'セリフは「セリフ」、ト書きは「ト書き」、場面の見出しは「場面」「小見出し」という名前のスタイルになっています。［ホーム］→［スタイル］でスタイルを変えると、台本全体の文字の大きさや書体がまとめて変わります。',
      '本文は縦書き・A4です。ページ番号は下に入っています。',
      (mark ? '黄色の印の所は、人数に合わせて見直したい所です（1人で2つの役を兼ねた所など）。直したら、印は［ホーム］→［蛍光ペン］→［色なし］で消せます。' : ''),
      (R.narrators ? 'この人数では「星の語り部」（場面のつなぎの群読）が入ります。全体で2分ほど長くなります。' : ''),
      (Object.keys(R.mergeTo).length ? '〈元：〇〇〉とある行は、休む役のセリフを、その組のほかの役がかわりに言う所です。' : '')
    ].filter(Boolean).forEach(function (t) { F.push(P('・' + t, 'Setsumei')); });

    F.push(P('上演・利用について', 'Midashi1'));
    [
      '学校での上演は無料です。連絡はいりません。',
      '台本は、子どもの実態や人数に合わせて自由に直してかまいません。',
      'この台本やサイトの中身を、そのまま、または直したものを、販売したり、ほかのサイトで配ったりすることはできません。',
      '上演の録画を動画サイトなどで公開するときは、合唱曲の部分を外すか、各校で著作権の手続きをしてください。BGM・背景の絵が入ったままの公開はかまいません。',
      '上演したら、Xで教えてもらえるとうれしいです（@rohimotoiwaka）。おねがいで、決まりではありません。'
    ].forEach(function (t) { F.push(P('・' + t, 'Setsumei')); });

    F.push(P('劇中の歌について', 'Midashi1'));
    [
      '劇中で4回、合唱曲を歌います。この劇は合唱曲「大切なもの」（作詞・作曲 山崎朋子）を歌う前提で作っています。',
      '曲は各校で用意してください（楽譜・伴奏）。この台本には歌詞を載せていません。',
      '学校で歌っている別の合唱曲に差しかえてもかまいません。そのときは、一場と四場の「星を数える」しぐさなど、歌に合わせたト書きを直してください。'
    ].forEach(function (t) { F.push(P('・' + t, 'Setsumei')); });

    F.push(P('配役表（' + R.N + '人）', 'Midashi1', { pb: true }));
    var rows = R.actors.map(function (a) {
      var segs = Object.keys(a.segs).sort(function (x, y) { return Object.keys(segName).indexOf(x) - Object.keys(segName).indexOf(y); }).map(function (s) { return segName[s]; });
      var note = a.desc || '';
      if (a.also.length) note += (note ? '／' : '') + a.also.join('・') + 'のセリフも言う';
      if (a.range && /[①-⑨]$/.test(a.label)) note += (note ? '／' : '') + '受け持ち：' + a.range.filter(function (x) { return a.segs[x]; }).map(function (x) { return segName[x]; }).join('・');
      return [a.group, a.label, note, segs.join('・'), a.lines, names[a.label] || ''];
    });
    F.push(table(['組', '役', 'メモ', 'セリフのある場面', 'セリフ', '名前'], rows, [1150, 1650, 2550, 2238, 650, 1400]));
    F.push(P('※四場とエピローグは、ほぼ全員が舞台に上がります。交代で演じる役（①②…）は、エピローグで全員そろって舞台に上がります。', 'Setsumei'));

    F.push(P('登場場面一覧（○＝セリフがある場面）', 'Midashi1'));
    var srow = R.actors.map(function (a) {
      var has = function (k) { if (k === 'S4') return a.segs.S4a || a.segs.S4b || a.segs.S4c; return a.segs[k]; };
      return [a.label].concat(SEGCOL.map(function (c) { return has(c[0]) ? '○' : ''; }));
    });
    F.push(table(['役'].concat(SEGCOL.map(function (c) { return c[1]; })), srow, [2338].concat(SEGCOL.map(function () { return 1042; })).slice(0, 8).map(function (w, i) { return i === 0 ? W - 1042 * 7 : w; })));

    if (R.review.length) {
      F.push(P('人数に合わせて見直したい所（' + R.review.length + 'か所・本文では黄色の印）', 'Midashi1', { pb: true }));
      R.review.forEach(function (r) {
        F.push(P('・' + segName[r.seg] + '　' + r.sp + '「' + r.text.replace(/\*\*/g, '').slice(0, 28) + (r.text.length > 28 ? '…' : '') + '」→ ' + r.why.join('／'), 'Setsumei'));
      });
    }

    /* ---------- 本文（縦書き） ---------- */
    var B = [];
    R.blocks.forEach(function (b) {
      var hl = mark && b.flags && b.flags.length;
      if (b.t === 'h1') { B.push(P(b.text, 'Bamen', { vertical: true })); return; }
      if (b.t === 'h2') { B.push(P(b.text, 'Komidashi', { vertical: true }));
        (b.swap || []).forEach(function (s) { B.push(P('【交代】' + s, 'Togaki', { vertical: true, hl: mark })); }); return; }
      if (b.t === 'h3') { B.push(P(b.text, b.song ? 'Uta' : 'Komidashi', { vertical: true })); return; }
      if (b.t === 'dir') { B.push(P(b.text, 'Togaki', { vertical: true, hl: hl })); return; }
      if (b.t === 'note') { B.push(P(b.text, 'Togaki', { vertical: true })); return; }
      if (b.t === 'line') {
        var kids = [new X.TextRun({ text: fw(b.sp), style: 'Yakumei', highlight: hl ? 'yellow' : undefined })];
        if (b.asRole) kids.push(new X.TextRun({ text: '〈元：' + b.asRole + '〉', size: 16, color: '666666' }));
        kids = kids.concat([new X.TextRun('　')], runs(b.text, { vertical: true, hl: hl }));
        B.push(new X.Paragraph({ style: 'Serifu', children: kids }));
      }
    });

    var page = { size: { width: 11906, height: 16838 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } };
    var footer = { default: new X.Footer({ children: [new X.Paragraph({ alignment: X.AlignmentType.CENTER, children: [new X.TextRun({ children: [X.PageNumber.CURRENT], font: GOT, size: 18 })] })] }) };
    var PS = function (id, name, run, para, extra) { return Object.assign({ id: id, name: name, basedOn: 'Normal', next: 'Normal', quickFormat: true, run: run, paragraph: para }, extra || {}); };
    var doc = new X.Document({
      creator: 'KawaiLab', title: 'トモリの火が消えた夜（' + R.N + '人）', description: '人数に合わせて作った台本',
      styles: {
        default: { document: { run: { font: FM, size: 21 }, paragraph: { spacing: { line: 300 } } } },
        paragraphStyles: [
          PS('Serifu', 'セリフ', { font: FM, size: 22 }, { indent: { left: 1100, hanging: 1100 }, spacing: { after: 60 } }),
          PS('Togaki', 'ト書き', { font: FG, size: 19, color: '444444' }, { indent: { left: 660 }, spacing: { before: 60, after: 80 } }),
          PS('Bamen', '場面', { font: FG, size: 30, bold: true }, { spacing: { before: 240, after: 180 }, keepNext: true, outlineLevel: 0, pageBreakBefore: true }),
          PS('Komidashi', '小見出し', { font: FG, size: 25, bold: true }, { spacing: { before: 200, after: 120 }, keepNext: true, outlineLevel: 1 }),
          PS('Uta', '歌', { font: FG, size: 24, bold: true, color: '7A4E00' }, { spacing: { before: 160, after: 100 }, keepNext: true, outlineLevel: 2 }),
          PS('Midashi1', '前書きの見出し', { font: FG, size: 28, bold: true }, { spacing: { before: 280, after: 140 }, keepNext: true, outlineLevel: 0 }),
          PS('Setsumei', '前書きの本文', { font: FM, size: 21 }, { indent: { left: 210, hanging: 210 }, spacing: { after: 80 } }),
          PS('Hyou', '表の文字', { font: FG, size: 17 }, { spacing: { line: 240 } }),
          PS('Hyoushi1', '表紙の題', { font: FG, size: 64, bold: true }, { spacing: { before: 400, after: 300 } }),
          PS('Hyoushi2', '表紙の副題', { font: FG, size: 30 }, { spacing: { after: 400 } }),
          PS('Hyoushi3', '表紙の文字', { font: FM, size: 24 }, { spacing: { before: 200, after: 120 } })
        ],
        characterStyles: [{ id: 'Yakumei', name: '役名', basedOn: 'DefaultParagraphFont', quickFormat: true, run: { font: FG, bold: true, size: 22 } }]
      },
      sections: [
        { properties: { page: page }, footers: footer, children: F },
        { properties: { page: Object.assign({}, page, { textDirection: X.PageTextDirectionType.TOP_TO_BOTTOM_RIGHT_TO_LEFT }), type: X.SectionType.NEXT_PAGE }, footers: footer, children: B }
      ]
    });
    return (typeof window !== 'undefined' && X.Packer.toBlob) ? X.Packer.toBlob(doc) : X.Packer.toBuffer(doc);
  }
  return { build: build };
});
