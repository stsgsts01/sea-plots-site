document.addEventListener("DOMContentLoaded", function () {
  const phoneBtn = document.getElementById("topPhoneBtn");
  if (!phoneBtn) return;

  const site = window.SITE_DATA || {};
  const phone1 = site.contacts?.phone1?.display || "+7 926 086-31-41";
  const phone2 = site.contacts?.phone2?.display || "+7 978 511-63-98";

  const badge = document.createElement("div");
  badge.className = "phone-badge";
  badge.innerHTML = `
    <div class="phone-badge-title">Телефоны для связи</div>
    <div>${phone1}</div>
    <div>${phone2}</div>
  `;
  document.body.appendChild(badge);

  let hideTimer = null;

  phoneBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const rect = phoneBtn.getBoundingClientRect();
    badge.style.left = Math.max(12, rect.left) + "px";
    badge.style.top = rect.bottom + 10 + "px";

    badge.classList.add("show");

    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      badge.classList.remove("show");
    }, 5000);
  });

  document.addEventListener("click", function (e) {
    if (!badge.contains(e.target) && e.target !== phoneBtn) {
      badge.classList.remove("show");
    }
  });
});