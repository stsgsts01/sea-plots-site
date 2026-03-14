window.addEventListener("load", function () {
  const header = document.querySelector(".topbar");
  const inner = document.querySelector(".topbar-inner");
  if (!header || !inner) return;

  if (!document.getElementById("header-shrink-styles")) {
    const style = document.createElement("style");
    style.id = "header-shrink-styles";
    style.textContent = `
      .topbar{
        transition: background .25s ease, box-shadow .25s ease, border-color .25s ease;
      }
      .topbar-inner{
        transition: padding .25s ease, gap .25s ease;
      }
      .topbar.is-compact{
        background: rgba(243,237,227,.96);
        box-shadow: 0 8px 24px rgba(16,32,45,.08);
      }
      .topbar.is-compact .topbar-inner{
        padding-top: 8px !important;
        padding-bottom: 8px !important;
        gap: 12px !important;
      }
      .topbar.is-compact .brand-title,
      .topbar.is-compact .brand .title{
        font-size: 20px !important;
      }
      .topbar.is-compact .brand-sub,
      .topbar.is-compact .brand .sub{
        font-size: 10px !important;
        letter-spacing: .18em !important;
      }
      .topbar.is-compact .btn{
        min-height: 36px !important;
        padding: 0 14px !important;
        font-size: 13px !important;
      }
      .topbar.is-compact .nav{
        font-size: 13px !important;
        gap: 14px !important;
      }
      @media (max-width: 820px){
        .topbar.is-compact .topbar-inner{
          padding-top: 8px !important;
          padding-bottom: 8px !important;
        }
        .topbar.is-compact .brand-title,
        .topbar.is-compact .brand .title{
          font-size: 15px !important;
        }
        .topbar.is-compact .brand-sub,
        .topbar.is-compact .brand .sub{
          font-size: 8px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function updateHeader() {
    if (window.scrollY > 60) header.classList.add("is-compact");
    else header.classList.remove("is-compact");
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
});
