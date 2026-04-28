(function () {
  if (document.getElementById("ztv-shared-nav")) return;

  var path = (location.pathname || "/").replace(/\/+$/, "") || "/";
  function current(href) {
    if (href === "/#testers") {
      return (
        (path === "/" || path === "/index.html") &&
        (location.hash || "").toLowerCase() === "#testers"
      );
    }
    if (href === "/") {
      if (!(path === "/" || path === "/index.html")) return false;
      if ((location.hash || "").toLowerCase() === "#testers") return false;
      return true;
    }
    return path === href || path.indexOf(href.replace(/\/$/, "")) === 0;
  }

  var links = [
    { href: "/", label: "Home" },
    { href: "/#testers", label: "Testers" },
    { href: "/news/", label: "News" },
    { href: "/privacy/", label: "Privacy" },
    { href: "/terms/", label: "Terms" },
  ];

  var navDesktop = links
    .map(function (L) {
      return (
        '<a href="' +
        L.href +
        '"' +
        (current(L.href) ? ' aria-current="page"' : "") +
        ">" +
        L.label +
        "</a>"
      );
    })
    .join("");

  var navMobile = links
    .map(function (L) {
      return '<a href="' + L.href + '">' + L.label + "</a>";
    })
    .join("");

  var header = document.createElement("header");
  header.id = "ztv-shared-nav";
  header.className = "ztv-shell-header";
  header.innerHTML =
    '<div class="ztv-header-inner">' +
    '<a class="ztv-brand-block" href="/">' +
    '<img src="/_ASSETS/banner.png" width="40" height="40" alt="ZaZa The Vibe logo" />' +
    '<span class="ztv-brand-copy">' +
    '<span class="ztv-brand-title">ZaZa The Vibe</span>' +
    '<span class="ztv-brand-tag">Apps on Google Play</span>' +
    "</span></a>" +
    '<nav class="ztv-nav-desktop" aria-label="Primary">' +
    navDesktop +
    "</nav>" +
    '<button type="button" class="ztv-nav-toggle" id="ztv-nav-toggle" aria-expanded="false" aria-controls="ztv-mobile-panel" aria-label="Open menu">' +
    '<span class="ztv-burger" aria-hidden="true"><span></span><span></span><span></span></span>' +
    "</button></div>";

  var panel = document.createElement("div");
  panel.id = "ztv-mobile-panel";
  panel.setAttribute("hidden", "");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-label", "Menu");
  panel.innerHTML = navMobile;

  var first = document.body.firstElementChild;
  if (first && first.classList && first.classList.contains("ztv-skip")) {
    document.body.insertBefore(header, first.nextSibling);
  } else {
    document.body.insertBefore(header, document.body.firstChild);
  }
  document.body.insertBefore(panel, header.nextSibling);

  var btn = document.getElementById("ztv-nav-toggle");
  function openMenu() {
    panel.classList.add("is-open");
    panel.removeAttribute("hidden");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
  }
  function closeMenu() {
    panel.classList.remove("is-open");
    panel.setAttribute("hidden", "");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
  }

  btn.addEventListener("click", function () {
    if (panel.classList.contains("is-open")) closeMenu();
    else openMenu();
  });

  panel.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      closeMenu();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
})();
