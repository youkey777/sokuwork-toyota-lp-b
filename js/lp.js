/* 応募フォーム: このページはデザイン確認用。送信先を持たないので、送らずにお知らせだけ出す */
document.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("このページはデザイン確認用のため、入力内容は送信されません。");
});

/* 悩みの吹き出しを必ず1行に収める（2026-10-09 Z Fold 7 の外側の画面ではみ出した）。
   端末の文字サイズ設定や書体で字の幅が変わるので、開いた端末で実際に測り、はみ出していれば収まるまで小さくする。
   3つの吹き出しは一番小さいものに大きさをそろえる */
(function () {
  function fit() {
    var bubbles = document.querySelectorAll('.nayami-bubble');
    if (!bubbles.length) return;
    var lines = [];
    bubbles.forEach(function (b) { b.querySelectorAll('.nayami-line').forEach(function (l) { l.style.fontSize = ''; lines.push(l); }); });
    var size = Infinity;
    bubbles.forEach(function (b) {
      var first = b.querySelector('.nayami-line');
      var fs = parseFloat(getComputedStyle(first).fontSize);
      var cs = getComputedStyle(b);
      var room = b.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      var r = document.createRange(); r.selectNodeContents(b);
      var used = r.getBoundingClientRect().width;
      var s = used > room ? fs * room / used * 0.97 : fs;
      size = Math.min(size, s);
    });
    lines.forEach(function (l) { l.style.fontSize = size + 'px'; });
  }
  window.addEventListener('load', fit);
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  fit();
})();
