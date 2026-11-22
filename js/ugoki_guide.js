/* 動きページ「はじめての先生へ」。本番の録画（68人・約40分）を場面ごとに見て作った手順・声かけ・つまずき。
   録画は配っていない。ここには役名と動きだけを書く（子どもの名前・写真は入れない）。
   手順の b は図の「何番目の動きか」（go(b) でその動きのあとの図を出す）。 */
(function () {
  var G = {
    pro: { sec: 80, aim: '猫が客席に話しかけて、お客さんを物語の中へ招き入れる。',
      steps: [
        { b: 2, t: '猫3匹は下手から幕の前の段へ。プロローグのあいだは、ずっと幕の前で演じる。3匹の間は大また3歩ずつあけて横一列。' },
        { b: 3, t: '3匹そろっておじぎをしてから「みなさん、こんにちは」。' },
        { b: 4, t: '言う猫だけが手で形を作る。ほかの2匹は止まって待つ。' },
        { b: 6, t: '「星ふるバザール！」で3匹そろって両手を上へ。' },
        { b: 7, t: '「始まるよ」で上手へ走りこむ。同時に幕が開く。' }],
      koe: ['「見ててね」は、客席の右・真ん中・左をゆっくり見わたしてから言おう。', '幕の前ぜんぶが、きみたち3匹の場所だよ。'],
      ng: [['1匹がとなりに寄って、真ん中が空いた。', '幕の前の床に、3匹の立つ所の小さなテープを貼る。'],
        ['走り去るときにふり返って、幕を開ける係と目が合わない。', '「始まるよ」を幕の合図に決め、猫はふり返らずに走る。']],
      cue: '客席の明かりを落とす → 猫の入場。「始まるよ」で幕を開ける。' },
    ichi: { sec: 672, aim: 'にぎやかな「いつものバザール」と、その裏のないしょ話の落差を見せる。',
      steps: [
        { b: 1, t: '幕が開く前に、店主は自分の屋台の前に立っておく。明るくなった時には、もうお店の人。' },
        { b: 2, t: 'よび込みは、言う人だけ一歩前へ。言い終わったら元の場所にもどる。' },
        { b: 4, t: '銅鑼の合図で、魔女の列が客席の横の通路から入場。' },
        { b: 6, t: '魔女はひな壇から舞台へ上がり、それぞれの屋台の前へ散る。' },
        { b: 7, t: '買い物のかけ合いは、話すペアだけが屋台の前で向かい合う。' },
        { b: 14, t: '鐘の音で、全員がトモリのまわりへ。町長とマーバは火の左右。' },
        { b: 15, t: '全員の「トモリ！」「友の火！」のかけ合いで、こぶしを上げる。' },
        { b: 18, t: '照明を落として、ないしょ話へ。言うペアだけ明るい所へ出る。' },
        { b: 23, t: 'トモリのちらつきに気づく猫4匹は、下手の2階ギャラリーの手すりから見ている（本番）。' },
        { b: 25, t: 'ノアとルーチェの場面。立つのは2人だけで、ほかは座って2人を見る。' },
        { b: 31, t: '全員でトモリを囲んで合唱（前の列はすわる・後ろは立つ）。歌い終わったら、魔女は下手・町の人は上手へ退場。' },
        { b: 36, t: '夜の広場。もどってきたノアが、お守りを台座に置いて下手へ去る。' },
        { b: 37, t: '入れちがいに、上手から黒いフードの影が台座へ。' }],
      koe: ['明るくなった時は、もうお店は開いているよ。最初から売っていよう。', '魔女の列は客席のすぐ横を通るよ。前の人とこぶし2つあけて、ゆっくり大きく歩こう。', 'ノアとルーチェが話している間は、座ったまま2人を見よう。見ている人がいると、2人の話が大事に見えるよ。'],
      ng: [['全員が集まると、町長とマーバがほかの人と重なって見えなかった。', '町長とマーバの前の1mは空けておく決まりにする。'],
        ['ノアとルーチェの2分間、後ろの町の人が手持ちぶさたで体をゆらしていた。', '「パンをのぞきこむ」「となりとうなずく」など、小さなふりを1人1つ決めておく。'],
        ['退場のあと、店の台を運ぶ子が夜の照明の中に残った。', '台はその店の人が持って出る。出口（魔女は下手・町は上手）も先に決める。'],
        ['トモリのちらつきを猫が見る場面を2階のギャラリーで演じたため、客席から猫がほとんど見えなかった。', '台本どおり広場の高い所（平台の上）で演じる。ギャラリーを使うならスポットを当てる。']],
      cue: '照明の切りかえが4回：にぎわい → ないしょ話（暗く） → ノアとルーチェ → 合唱 → 夜の広場。' },
    hen1: { sec: 20, aim: '暗いうちに2つだけ：トモリを台座から外す・書割をまっすぐにする。',
      steps: [
        { b: 1, t: '暗転。黒いフードの役がトモリを持ち去る（光るランプは体でかくす）。同時に、書割を直す係2人が書割をまっすぐにする。' },
        { b: 2, t: '二場で最初に出る人は、入場口に集まっておく。' },
        { b: 3, t: '客席の後ろにいた魔女は、裏へ回って二場の出番を待つ。' }],
      koe: ['暗いうちにやるのは2つだけ。トモリを外す、書割をまっすぐにする。', '明かりがついても舞台にいたら、あわてず、かがんだまま下手へ。'],
      ng: [['明かりがついた時、書割を直す係の2人がまだ舞台に残っていた。', '照明係は、係が「はけた」手の合図を見てから明るくする。']],
      cue: '暗転は約15秒。係の合図 → 朝の明かり。' },
    ni: { sec: 315, aim: '町の人と魔女が左右に分かれていく。ルーチェのうその自白で、全員が止まる。',
      steps: [
        { b: 1, t: 'ランプ屋が下手から登場し、空の台座を見つける。' },
        { b: 3, t: '悲鳴で住民が左右から駆けこみ、台座を半円に囲む。' },
        { b: 5, t: '台座の下から布きれ。高く上げて客席にも見せる。' },
        { b: 8, t: '魔女の行列が、客席の横の通路から入場。上手の階段から舞台へ上がる。' },
        { b: 10, t: '対立の形：町の人は下手、魔女は上手。真ん中は主役のためにあけておく。' },
        { b: 17, t: 'ノアが人垣をかき分けて真ん中へ。住民がノアを責めるたびに、下手の住民が一歩ずつ前へ。' },
        { b: 21, t: '「——わたしが、やりました。」で全員がぴたっと止まる。' },
        { b: 26, t: '魔女は全員同じ向きにマントをひるがえして退場（台本は下手へ・客席の横を通る。本番では上手へ出た。会場の出口に合わせて決める）。' },
        { b: 31, t: 'ノアがひとり残り、台座の前でうずくまる。暗転して幕を閉める。' }],
      koe: ['住民は下手、魔女は上手。真ん中は主役の場所だから、あけておこう。', 'ルーチェが「やりました」と言ったら、全員ぴたっと止まる。まばたきもがまんするくらいで。', '体は半分お客さんに、顔だけノアに向けよう。'],
      ng: [['舞台に30人以上いて、下手の奥の人が前の人にかくれた。', '2列にして、後ろの列は前の列のすき間に立つ（たがいちがい）。'],
        ['前列の魔女が舞台のふちや階段の上に立っていた。', '舞台のふちから50cmの所に「ここより前に出ない」テープを貼る。'],
        ['住民がみんなノアの方を向き、客席に背中が向いた。', '「体は半分客席、顔だけノア」を合言葉にする。'],
        ['最後の暗い場面（町長が台座に置いた布を、リナが拾ってノアに無言で返す動き）が客席から見えなかった。', 'その場面だけ、ノアとリナにスポットを当てる。']],
      cue: '魔女の入場は銅鑼か曲で合図。最後は照明をしぼってノア1人 → 暗転 → 幕。' },
    hen2: { sec: 10, aim: '幕を閉めるだけ。幕前の三場にして、幕の中で四場の準備をする。',
      steps: [
        { b: 1, t: 'ノアがはけたら幕を閉める。' },
        { b: 2, t: '幕が閉まりきったら、チャチャは幕前の真ん中へ。猫は3方向で待つ。' }],
      koe: ['幕の合わせ目の前に立てば、光が当たるよ。'], ng: [],
      cue: '幕が閉まりきる → 幕前に青い明かり。' },
    san: { sec: 248, aim: '猫たちが手がかりをつなぎ、みんなが森の塔へ向かう。客席も一緒に考える場面。',
      steps: [
        { b: 1, t: 'チャチャが幕前の真ん中で指笛「しゅうごーう！」。' },
        { b: 2, t: '猫が上手・下手・客席横の通路の3方向から幕前へ。横一列は、となりと半歩ずつ前後にずらす。' },
        { b: 6, t: '客席に問いかけたら、答えが返るまで2秒待つ。' },
        { b: 8, t: '証言は、話す猫だけ一歩前へ。話し終わったら一歩もどる。' },
        { b: 12, t: 'ノアはフロアから入り、幕前の猫を見上げて話す。' },
        { b: 13, t: '「しゅっぱーつ！」で猫とノアは上手へ走りこむ。この間に、幕の中で四場の準備を進める。' },
        { b: 15, t: '入れかわりに、下手のフロアからランタンを持った捜索隊。' },
        { b: 17, t: '上手の幕のすき間から追跡隊とルーチェ。左右に分かれて鉢合わせ。' },
        { b: 21, t: '「——森だ！！」のあと暗転。' }],
      koe: ['幕前はせまいよ。前の人と重ならないように、半歩ずらそう。', 'しゃがむ人の後ろに立つ人は、少し横にずれて顔を出そう。', '魔女が幕から出たら、町人は一歩下がって驚こう。間をあけるほど、にらみ合いに見えるよ。'],
      ng: [['幕前の両はしの猫が、客席のはしから見えなかった。', '幕前の左右のはし1mは使わない。'],
        ['くつ屋がしゃがむと、後ろの町人が縦に重なった。', '後ろの人は、しゃがむ人の左右に分かれる。'],
        ['ウタガイーネの長いセリフの間、両方の組が止まったままだった。', '聞く側の反応（顔を見合わせる・一歩引く）を2つ決めておく。']],
      cue: '幕前だけ明るく。猫の出発のあと、捜索隊の入場までに幕の中で四場の準備を終える。' },
    hen3: { sec: 27, aim: '幕の中で森の塔へ。開いた時には、もうフラムがトモリを抱いている。',
      steps: [
        { b: 2, t: 'フラムは幕が開く前に、トモリを抱いて塔の石段に座っておく。' },
        { b: 3, t: '四場で入る人は、3つの入場口に分かれて待つ。' }],
      koe: ['暗転の間に、次に出る人は自分の入場口で静かに待とう。', 'フラムは、開いた時にはもう役に入っているように。'], ng: [],
      cue: '映像を「森の塔」に切りかえ → 幕を開ける（はじめは真ん中だけ明るく）。' },
    yon: { sec: 625, aim: '犯人は町の人と魔女の全員だった。思い出を1人ずつ差し出して、火にもどす。いちばん長い場面。',
      steps: [
        { b: 1, t: '幕が開くとフラムが座っている。「消えるな」。' },
        { b: 2, t: '猫とノア → 捜索隊 → 追跡隊の順に、下手のフロアと上手からなだれこみ、フラムを囲む。' },
        { b: 9, t: '回想（30年前）はフロアにスポット。舞台の上の人は止まって、フロアを見る。' },
        { b: 14, t: '「——おまえたち、全員だ」。' },
        { b: 15, t: '悪口の回想は上手のひな壇にスポット。4人は明るくなる前に立っておく。' },
        { b: 19, t: '縄がほどかれ、ノアとルーチェが真ん中で手を取る。' },
        { b: 20, t: 'フラムがトモリを石段の前の切り株へ。ここから差し出しの「八の字」：火を頂点に、町の人は下手・山の人は上手へ斜めに並ぶ。' },
        { b: 22, t: '最初にランプ屋が火の前へ。思い出を言うと火が立ち上がり、すぐに沈む。' },
        { b: 26, t: 'そのあとは一人ずつ、自分の列の場所から（歩いて出ない）。言い終わったら一瞬だけ自分の手を見る。火が沈むたび、全員が半歩ずつ火へ寄る。（本番では、言い終わったらその場でひざをつく形に変えた）' },
        { b: 35, t: 'ノアが差し出そうとし、ルーチェが止める。' },
        { b: 37, t: 'ルーチェが火の前でひざまずいて歌い出す。まわりは全員ゆっくりしゃがみ、立っているのはルーチェだけ。' },
        { b: 39, t: 'サビで全員の声が重なる → 「ともった！！」→ 静かに座る。（本番では、歌の途中でルーチェとノアがひな壇を下り、フロアのまん中で歌った）' }],
      koe: ['思い出は、胸から両手で取り出すように言おう。言い終わったら、一瞬だけ自分の手を見る。', '前の人が言い終わって、火が沈んでから次の人が言おう。重なると聞こえないよ。', 'しゃがんだら顔を火の方へ向けて、動かない。それがいちばんの演技。'],
      ng: [['なだれこみで、下手のひな壇と舞台の下手に人がつまった。', '入る口を3つ（下手のフロア・上手・舞台の下手）に分けて、どこから入るかを決める。'],
        ['主役が横一列に並ぶと、火（トモリ）の前に人が立って見えなかった。', '火の正面は、だれも立たない決まりにする。'],
        ['差し出しの列が上手から下手へ移る所で、少し間が空いた。', '次に言う人を、列の順番で先に決めておく。火が沈んだらすぐ言う。'],
        ['回想は暗く、フロアの演技が前の客席の頭でかくれた。', '回想の人は舞台のふち近くに立ち、スポットを上から当てる。客席の頭でかくれない高さで演じる。']],
      cue: '照明の切りかえ：回想①（フロア）・回想②（上手のひな壇）は暗くしてスポット、終わったら戻す。歌のいちばん盛り上がる所でトモリを明るく。' },
    ketsu: { sec: 120, aim: 'ルーチェは思い出を失う。それでも2人は「はじめまして」から、もう一度。',
      steps: [
        { b: 1, t: '明るいのはルーチェ・ノア・トモリだけ。ほかは座ったまま動かない。' },
        { b: 3, t: 'ノアがお守りを差し出す。2人はほとんど動かず、体だけ少し客席に開く。' },
        { b: 6, t: '「はじめまして」の前に、3つ数えるくらい待つ。' },
        { b: 7, t: '指切りのあと、チャチャが階段を下りてフロアの真ん中へ。客席に語る。' }],
      koe: ['ルーチェとノアは、トモリのそばから動かなくていい。', 'まわりのみんなは、手や足を動かさないのがいちばんの演技。', 'チャチャは、客席の一人ひとりを見るつもりで話そう。'],
      ng: [['指切りのあと、だれが次に動くのか分かりにくい間があった。', 'チャチャは、指切りの手がはなれた瞬間に歩き出す。'],
        ['ひな壇のはしの人が、足をフロアに出していた。', '結末の間は、ひざをかかえて座る。']],
      cue: '本番では、人や道具の出し入れをせず、映像の切りかえ（塔 → 青い空 → 流れ星 → バザール）で場面を進めた。セリフ（フラムの「見ろ」・マーバと町長のことば）は台本どおり。' },
    hen4: { sec: 45, aim: '暗いうちに、広場を一年後のバザールにもどす。',
      steps: [
        { b: 1, t: '屋台の台を運ぶ。自分の運ぶ物だけを持ち、決めた場所へまっすぐ。' },
        { b: 2, t: '置いたら、その場で配置について待つ。' }],
      koe: ['暗転は40秒ほど。走らない。ぶつかりそうになったら止まって待とう。'],
      ng: [['映像の光で、運ぶ人の影が客席から見えた。', '重い台は2人で1つを持つ（1人が持つのは1つ）。低い姿勢で運び、映像は暗めにしておく。']],
      cue: '映像を先にバザールへ切りかえておくと、暗くても「次はバザール」と伝わる。' },
    epi: { sec: 230, aim: '一年後。また人間と魔女が一緒に笑うバザール。最後は全員の合唱。',
      steps: [
        { b: 1, t: '明るくなったら、お店はもう開いている。魔女は上手から流れこむ。' },
        { b: 2, t: '薬を持った魔女は、フロアの上手から舞台前へ走って来る。' },
        { b: 5, t: 'ルーチェとノアは舞台前の真ん中。まわりは座って見る。指切り（二回目）。' },
        { b: 6, t: '鐘で全員集合。「トモリー！」で全員が手を上げる。' },
        { b: 8, t: 'そのまま合唱の並びへ歩く（前の人を追いこさない）。そろったら正面を見て止まる。' }],
      koe: ['最初からしゃべって動いていよう。明るくなった時は、もう一年後のバザールだよ。', '「トモリー！」で手を上げたら、そのまま自分の合唱の場所へ。'],
      ng: [['舞台の人が多く、薬を持ってきた魔女とルーチェがかくれた。', '主役が話す舞台前の真ん中1mは、だれも立たない。'],
        ['全員が同時に動き、合唱の並びがそろうまで約25秒かかった。', '合唱の立ち位置を床のテープで先に決め、近い人から順に入る。'],
        ['合唱の後ろの列の顔が、前の列の魔女の帽子でかくれた。', '合唱の時は、前の列の魔女は帽子を胸にかかえる。']],
      cue: '合唱が終わったら幕。' }
  };
  var RULES = [
    ['真ん中は主役の場所', '群衆は左右に分かれ、「ハの字」（奥がせまく手前が広い形）で客席に開く。四場の差し出しだけは、火を頂点にした「八の字」。'],
    ['話す人だけ一歩前', '言い終わったら元の場所へもどる。だれが話しているか、客席にすぐ分かる。'],
    ['聞く人が止まると、話す人が立つ', '大事なセリフの間、まわりは「ぴたっと止まる」。小さなふりは1人1つまで。'],
    ['明かりで場所を変える', '回想・ないしょ話は、スポットが当たる前にその場所に立っておく。'],
    ['暗転で運ぶ物は1人1つ', '決めた場所へまっすぐ。走らない。照明は係の合図を見てから。']
  ];
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function mmss(s) { s = Math.round(s / 10) * 10; var m = Math.floor(s / 60), r = s % 60; return m ? (m + '分' + (r ? r + '秒' : '')) : r + '秒'; }
  function keyIdx(k) { for (var i = 0; i < SCENES.length; i++) if (SCENES[i].key === k) return i; return -1; }

  var css = document.createElement('style');
  css.textContent =
    '#gTop{margin:10px 0;border:1px solid rgba(255,207,110,.45);border-radius:14px;background:rgba(255,207,110,.07);padding:4px 12px 10px}' +
    '#gTop>summary,#gCard>summary{cursor:pointer;font-weight:800;color:var(--gold);padding:8px 0;font-size:1rem;list-style:none}' +
    '#gTop>summary::before,#gCard>summary::before{content:"▶ ";font-size:.8em}#gTop[open]>summary::before,#gCard[open]>summary::before{content:"▼ "}' +
    '#gTop .gnote{font-size:.82rem;color:var(--dim);margin:0 0 8px}' +
    '#gBar{display:flex;height:34px;border-radius:9px;overflow:hidden;margin:6px 0 4px;border:1px solid var(--line)}' +
    '#gBar button{border:0;border-right:1px solid rgba(0,0,0,.35);color:#1b1300;font-weight:700;font-size:.72rem;line-height:1.1;font-family:inherit;cursor:pointer;padding:0 2px;overflow:hidden;white-space:nowrap;min-width:6px}' +
    '#gBar button.hen{background:#55608f;color:#dfe3ff}#gBar button.on{outline:3px solid #fff;outline-offset:-3px}' +
    '#gTop .glg{font-size:.75rem;color:var(--dim)}' +
    '#gTop ol{margin:8px 0 0 1.4em;font-size:.92rem}#gTop ol li{margin:3px 0}#gTop ol b{color:#ffe1a0}' +
    '#gCard{margin:6px 0 10px;border:2px solid rgba(255,207,110,.55);border-radius:14px;background:rgba(10,18,48,.6);padding:2px 12px 10px}' +
    '#gCard .gaim{font-size:.95rem;margin:2px 0 8px}#gCard .gaim small{color:var(--dim)}' +
    '#gCard .gst{list-style:none;margin:0;padding:0;counter-reset:g}#gCard .gst li{counter-increment:g;display:flex;gap:8px;align-items:flex-start;padding:6px 0;border-top:1px dashed var(--line);font-size:.93rem}' +
    '#gCard .gst li::before{content:counter(g);flex:0 0 1.6em;height:1.6em;border-radius:50%;background:var(--gold);color:#3a2500;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:.8rem;margin-top:2px}' +
    '#gCard .gst li span{flex:1}#gCard .gst button{flex:0 0 auto;font-weight:700;font-size:.78rem;font-family:inherit;padding:5px 9px;border-radius:8px;border:1px solid rgba(255,207,110,.6);background:#26305c;color:#ffe1a0;cursor:pointer;white-space:nowrap}' +
    '#gCard h4{margin:10px 0 4px;font-size:.88rem;color:#ffe1a0}#gCard .gk{font-size:.9rem;margin:0 0 0 1.2em}#gCard .gk li{margin:2px 0}' +
    '#gCard .gng{width:100%;border-collapse:collapse;font-size:.86rem}#gCard .gng td{border-top:1px solid var(--line);padding:5px 4px;vertical-align:top}#gCard .gng td:first-child{color:#ffb4b4;width:50%}#gCard .gng td:last-child{color:#c8f3d6}' +
    '#gCard .gcue{margin-top:8px;font-size:.84rem;color:var(--dim)}' +
    '@media (max-width:600px){#gCard .gng td{display:block;width:auto!important;border-top:0;padding:1px 0}#gCard .gng tr{display:block;border-top:1px solid var(--line);padding:4px 0}#gCard .gst li{flex-wrap:wrap}#gCard .gst li span{flex:1 1 calc(100% - 2.4em)}#gCard .gst button{margin-left:2.2em}}' +
    '@media print{#gTop,#gCard{display:none}}';
  document.head.appendChild(css);

  var tabs = document.getElementById('sceneTabs'), stitle = document.getElementById('stitle');
  if (!tabs || !stitle || typeof SCENES === 'undefined') return;
  var COL = ['#ffcf6e', '#f7b267', '#f4845f', '#c9a7ff', '#7fd8c8', '#9fd36b', '#ffd98a'];
  var tot = 0; SCENES.forEach(function (s) { tot += (G[s.key] || {}).sec || 0; });
  var top = document.createElement('details'); top.id = 'gTop'; top.open = true;
  var bar = '', ci = 0;
  SCENES.forEach(function (s, i) {
    var g = G[s.key]; if (!g) return; var hen = /^hen/.test(s.key);
    var nm = s.t.split('・')[0].split('「')[0].replace(/　.*/, '');
    bar += '<button type="button" data-i="' + i + '" class="' + (hen ? 'hen' : '') + '" style="flex:' + g.sec + ' 1 0;' + (hen ? '' : 'background:' + COL[ci++ % COL.length]) + '" title="' + esc(nm + '（約' + mmss(g.sec) + '）') + '">' + (g.sec >= 200 ? esc(nm) : '') + '</button>';
  });
  top.innerHTML = '<summary>🔰 はじめての先生へ（本番の録画から）</summary>' +
    '<p class="gnote">68人で上演した本番（劇は約' + Math.round(tot / 60) + '分）の録画を、場面ごとに見て書きました。録画そのものは配っていません。下の帯は本番の時間の長さです。押すとその場面へ。</p>' +
    '<p class="gnote">会場がちがうときの置きかえ：スクリーンの映像がない学校は、書割と照明で。左右のひな壇がない会場は、舞台の左右の低い台や床で。2階のギャラリーは使わなくてよい。「本番では」とある所は、台本を変えて上演した所です。</p>' +
    '<div id="gBar">' + bar + '</div><div class="glg">色＝場面　灰色＝転換（暗転・幕）</div>' +
    '<ol>' + RULES.map(function (r) { return '<li><b>' + esc(r[0]) + '</b>　' + esc(r[1]) + '</li>'; }).join('') + '</ol>';
  tabs.parentNode.insertBefore(top, tabs);
  var card = document.createElement('details'); card.id = 'gCard'; card.open = true;
  stitle.parentNode.insertBefore(card, stitle.nextSibling);

  function show(i) {
    var s = SCENES[i], g = G[s.key];
    Array.prototype.forEach.call(document.querySelectorAll('#gBar button'), function (b) { b.classList.toggle('on', +b.getAttribute('data-i') === i); });
    if (!g) { card.style.display = 'none'; return; }
    card.style.display = '';
    var h = '<summary>🔰 この場面の教え方（本番では約' + mmss(g.sec) + '）</summary>' +
      '<p class="gaim">' + esc(g.aim) + '</p><ol class="gst">' +
      g.steps.map(function (x) { return '<li><span>' + esc(x.t) + '</span><button type="button" data-b="' + x.b + '">図で見る ▶</button></li>'; }).join('') + '</ol>';
    if (g.koe.length) h += '<h4>💬 子どもへの声かけ</h4><ul class="gk">' + g.koe.map(function (k) { return '<li>' + esc(k) + '</li>'; }).join('') + '</ul>';
    if (g.ng.length) h += '<h4>⚠️ 本番でつまずいた所 → こうすると良い</h4><table class="gng">' + g.ng.map(function (n) { return '<tr><td>' + esc(n[0]) + '</td><td>→ ' + esc(n[1]) + '</td></tr>'; }).join('') + '</table>';
    if (g.cue) h += '<p class="gcue">🎚️ 先生・係の合図：' + esc(g.cue) + '</p>';
    var wasOpen = card.open; card.innerHTML = h; card.open = wasOpen;
    Array.prototype.forEach.call(card.querySelectorAll('button[data-b]'), function (b) {
      b.addEventListener('click', function () {
        var k = Math.min(+b.getAttribute('data-b'), SCENES[sceneIdx].beats.length);
        try { stop(); } catch (e) {}
        go(k);
        var st = document.getElementById('stageWrap') || document.getElementById('stage');
        if (st && st.scrollIntoView) st.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
  Array.prototype.forEach.call(top.querySelectorAll('#gBar button'), function (b) {
    b.addEventListener('click', function () { var i = +b.getAttribute('data-i'); try { stop(); } catch (e) {} loadScene(i); card.open = true; card.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  });
  var orig = loadScene;
  loadScene = function (i) { orig(i); show(i); };
  show(typeof sceneIdx === 'number' ? sceneIdx : 0);
})();
