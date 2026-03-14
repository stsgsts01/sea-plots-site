window.addEventListener("load", function () {
  const site = window.SITE_DATA || {};
  const phone1 = site.contacts?.phone1?.display || "+7 926 086-31-41";
  const phone2 = site.contacts?.phone2?.display || "+7 978 511-63-98";

  const originalBtn = document.getElementById("topPhoneBtn");
  if (!originalBtn) return;

  // Inject styles so the badge works on every page, even if CSS was added only to index.html
  if (!document.getElementById("phone-badge-styles")) {
    const style = document.createElement("style");
    style.id = "phone-badge-styles";
    style.textContent = `
      .phone-badge{
        position:fixed;
        background:#fff;
        border-radius:12px;
        box-shadow:0 10px 25px rgba(0,0,0,.15);
        padding:12px 16px;
        display:flex;
        flex-direction:column;
        gap:6px;
        opacity:0;
        transform:translateY(-10px);
        transition:all .25s ease;
        z-index:9999;
        pointer-events:none;
        min-width:220px;
        border:1px solid rgba(16,36,48,.10);
      }
      .phone-badge.show{
        opacity:1;
        transform:translateY(0);
        pointer-events:auto;
      }
      .phone-badge-title{
        font-size:13px;
        font-weight:700;
        color:#68757f;
        margin-bottom:2px;
      }
    `;
    document.head.appendChild(style);
  }

  // Replace the button with a clean clone to strip any previous click handlers
  const phoneBtn = originalBtn.cloneNode(true);
  phoneBtn.setAttribute("href", "#");
  originalBtn.parentNode.replaceChild(phoneBtn, originalBtn);

  const badge = document.createElement("div");
  badge.className = "phone-badge";
  badge.innerHTML = `
    <div class="phone-badge-title">Телефоны для связи</div>
    <div>${phone1}</div>
    <div>${phone2}</div>
  `;
  document.body.appendChild(badge);

  let hideTimer = null;
  let overButton = false;
  let overBadge = false;

  function positionBadge() {
    const rect = phoneBtn.getBoundingClientRect();
    badge.style.left = Math.max(12, rect.left) + "px";
    badge.style.top = rect.bottom + 10 + "px";
  }

  function showBadge() {
    positionBadge();
    badge.classList.add("show");
    clearTimeout(hideTimer);
  }

  function hideBadgeSoon() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      if (!overButton && !overBadge) {
        badge.classList.remove("show");
      }
    }, 700);
  }

  phoneBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    showBadge();
  });

  phoneBtn.addEventListener("mouseenter", function () {
    overButton = true;
    if (badge.classList.contains("show")) showBadge();
  });

  phoneBtn.addEventListener("mouseleave", function () {
    overButton = false;
    hideBadgeSoon();
  });

  badge.addEventListener("mouseenter", function () {
    overBadge = true;
    clearTimeout(hideTimer);
  });

  badge.addEventListener("mouseleave", function () {
    overBadge = false;
    hideBadgeSoon();
  });

  document.addEventListener("click", function (e) {
    if (!badge.contains(e.target) && e.target !== phoneBtn) {
      overButton = false;
      overBadge = false;
      badge.classList.remove("show");
    }
  });

  window.addEventListener("resize", function () {
    if (badge.classList.contains("show")) positionBadge();
  });

  window.addEventListener("scroll", function () {
    if (badge.classList.contains("show")) positionBadge();
  });
});
