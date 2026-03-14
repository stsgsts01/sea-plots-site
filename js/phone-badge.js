document.addEventListener("DOMContentLoaded", function () {

  const phoneBtn = document.querySelector(".header-phone");
  if (!phoneBtn) return;

  const phones = window.SITE_DATA?.phones || [
    "+7 926 086-31-41",
    "+7 978 511-63-98"
  ];

  const badge = document.createElement("div");
  badge.className = "phone-badge";

  phones.forEach(p => {
    const link = document.createElement("a");
    link.href = "tel:" + p.replace(/\D/g,"");
    link.textContent = p;
    badge.appendChild(link);
  });

  document.body.appendChild(badge);

  phoneBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const rect = phoneBtn.getBoundingClientRect();

    badge.style.left = rect.left + "px";
    badge.style.top = rect.bottom + 10 + "px";

    badge.classList.add("show");

    setTimeout(() => {
      badge.classList.remove("show");
    }, 5000);
  });

});