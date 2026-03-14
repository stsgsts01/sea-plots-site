document.addEventListener("DOMContentLoaded", function () {
  const site = window.SITE_DATA || {};
  const phone1 = site.contacts?.phone1?.display || "+7 926 086-31-41";
  const phone2 = site.contacts?.phone2?.display || "+7 978 511-63-98";

  function findPhoneButton() {
    // 1. Прямой id
    let btn = document.getElementById("topPhoneBtn");
    if (btn) return btn;

    // 2. Кнопка/ссылка с текстом "Позвонить"
    const candidates = Array.from(document.querySelectorAll("a, button"));
    btn = candidates.find(el => (el.textContent || "").trim() === "Позвонить");
    if (btn) return btn;

    // 3. Запасной поиск по href tel:
    btn = document.querySelector('a[href^="tel:"]');
    if (btn) return btn;

    return null;
  }

  const phoneBtn = findPhoneButton();
  if (!phoneBtn) return;

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
    showBadge();
  });

  phoneBtn.addEventListener("mouseenter", function () {
    overButton = true;
    if (badge.classList.contains("show")) {
      showBadge();
    }
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
    if (badge.classList.contains("show")) {
      positionBadge();
    }
  });

  window.addEventListener("scroll", function () {
    if (badge.classList.contains("show")) {
      positionBadge();
    }
  });
});