(function(){
  if (document.getElementById("ztv-shared-nav")) return;
  const header=document.createElement("header");
  header.id="ztv-shared-nav";
  header.className="ztv-page-header";
  header.innerHTML=`
    <img src="/_ASSETS/banner.png" alt="ZaZa The Vibe">
    <div>
      <div class="t1">ZaZa The Vibe Apps on Google Play</div>
      <div class="t2">Official home of ZaZa The Vibe apps.</div>
    </div>
    <nav class="nav">
      <a href="/">Home</a>
      <a href="/news/">News</a>
      <a href="/privacy/">Privacy</a>
      <a href="/terms/">Terms</a>
    </nav>`;
  document.body.insertBefore(header,document.body.firstChild);
})();

