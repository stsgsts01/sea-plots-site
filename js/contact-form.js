
(function () {
  function buildEmail(site) {
    return site.contacts.emailUser + '@' + site.contacts.emailDomain;
  }

  function safe(v) {
    return (v || '').toString()
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

  function plotContext() {
    var plot = window.PLOT_DATA || null;
    if (!plot) {
      return {
        title: 'Все участки проекта',
        subject: 'Запрос по участкам у моря',
        lead: 'Задайте нам интересующие вас вопросы: стоимость, документы, условия сделки, торг, коммуникации, подъезд или подбор подходящего участка.',
        placeholder: 'Ваш вопрос по участкам, условиям сделки или дополнительным материалам'
      };
    }

    var plotLabel = plot.title || 'участку';
    return {
      title: plotLabel,
      subject: 'Запрос по участку: ' + plotLabel,
      lead: 'Уточните детали по стоимости, документам, условиям сделки, торгу, возможностям застройки или запросите дополнительные материалы по объекту.',
      placeholder: 'Комментарий или вопрос по объекту: ' + plotLabel
    };
  }

  function buildMarkup(site) {
    var ctx = plotContext();
    var email = buildEmail(site);
    var telegramUrl = 'https://t.me/' + site.contacts.telegramHandle;

    return `
<section class="section contact unified-contact" id="contact">
  <div>
    <div class="section-kicker">обратная связь</div>
    <h2 class="section-title contact-title">Задайте нам интересующие вас вопросы</h2>
    <p class="section-lead">${safe(ctx.lead)}</p>

    <div class="contact-points">
      <div class="contact-point">
        Мы ответим по телефону, e-mail или в Telegram. Если Telegram станет недоступен, используйте форму и телефон — это основные каналы связи.
      </div>
    </div>

    <div class="quick-links">
      <a class="quick-link" href="tel:${safe(site.contacts.phone1.link)}">Позвонить</a>
      <a class="quick-link" href="mailto:${safe(email)}">Написать на e-mail</a>
      <a class="quick-link" href="${safe(telegramUrl)}" target="_blank" rel="noopener noreferrer">Открыть Telegram</a>
    </div>

    <div class="reveal-box">
      <button class="btn dark" type="button" id="revealContactsBtnUnified">Показать контакты</button>
      <div class="reveal-note">Контакты берутся из общего файла сайта и обновляются сразу на всех страницах.</div>
      <div class="contact-points" id="revealedContactsUnified" style="display:none;"></div>
    </div>
  </div>

  <form class="form" id="contactFormUnified">
    <input class="input" name="name" placeholder="Ваше имя" type="text"/>
    <input class="input" name="phone" placeholder="Телефон" type="text"/>
    <input class="input" name="email" placeholder="E-mail" type="email"/>
    <textarea class="textarea" name="message" placeholder="${safe(ctx.placeholder)}"></textarea>
    <div class="contact-form-note">После нажатия «Отправить» откроется ваше почтовое приложение с уже подготовленным письмом.</div>
    <div><button class="btn dark" type="submit">Отправить</button></div>
  </form>
</section>
`;
  }

  function injectStyles() {
    if (document.getElementById('unifiedContactStyles')) return;
    var style = document.createElement('style');
    style.id = 'unifiedContactStyles';
    style.textContent = `
.unified-contact{
  background:#fff;border:1px solid rgba(16,32,45,.10);border-radius:30px;
  box-shadow:0 20px 44px rgba(16,32,45,.10);padding:24px;
  display:grid;grid-template-columns:1fr .95fr;gap:26px;
}
.unified-contact .contact-title{margin-top:10px}
.unified-contact .contact-points{margin-top:18px;display:grid;gap:10px}
.unified-contact .contact-point{
  display:flex;gap:10px;align-items:flex-start;padding:14px 16px;background:#fffaf3;
  border:1px solid rgba(16,32,45,.10);border-radius:18px;font-size:14px;line-height:1.7;
}
.unified-contact .form{display:grid;gap:12px}
.unified-contact .input,.unified-contact .textarea{
  width:100%;border:1px solid rgba(16,32,45,.10);background:#fffaf3;border-radius:16px;
  padding:14px 16px;font-size:14px;color:#10202d;outline:none;
}
.unified-contact .textarea{min-height:140px;resize:vertical}
.unified-contact .reveal-box{
  margin-top:18px;padding:16px;border:1px dashed rgba(16,32,45,.18);
  border-radius:18px;background:#fffaf3;
}
.unified-contact .reveal-note{margin-top:10px;font-size:13px;color:#68757f;line-height:1.7}
.unified-contact .quick-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
.unified-contact .quick-link{
  display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:0 14px;
  border-radius:999px;background:#fff;border:1px solid rgba(16,32,45,.10);font-size:13px;font-weight:700;
}
.unified-contact .contact-form-note{font-size:13px;color:#68757f;line-height:1.7}
@media (max-width:1200px){
  .unified-contact{grid-template-columns:1fr}
}
`;
    document.head.appendChild(style);
  }

  function attachBehavior(site) {
    var revealBtn = document.getElementById('revealContactsBtnUnified');
    var revealBox = document.getElementById('revealedContactsUnified');
    var form = document.getElementById('contactFormUnified');
    if (!revealBtn || !revealBox || !form) return;

    revealBtn.addEventListener('click', function () {
      if (revealBox.dataset.loaded === '1') {
        revealBox.style.display = 'grid';
        return;
      }

      var email = buildEmail(site);
      var telegramUrl = 'https://t.me/' + site.contacts.telegramHandle;
      revealBox.innerHTML = `
        <div class="contact-point"><strong>Telegram:</strong>&nbsp;<a href="${safe(telegramUrl)}" target="_blank" rel="noopener noreferrer">@${safe(site.contacts.telegramHandle)}</a></div>
        <div class="contact-point"><strong>E-mail:</strong>&nbsp;<a href="mailto:${safe(email)}">${safe(email)}</a></div>
        <div class="contact-point"><strong>Телефон 1:</strong>&nbsp;<a href="tel:${safe(site.contacts.phone1.link)}">${safe(site.contacts.phone1.display)}</a></div>
        <div class="contact-point"><strong>Телефон 2:</strong>&nbsp;<a href="tel:${safe(site.contacts.phone2.link)}">${safe(site.contacts.phone2.display)}</a></div>
      `;
      revealBox.dataset.loaded = '1';
      revealBox.style.display = 'grid';
    });

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var email = buildEmail(site);
      var ctx = plotContext();
      var fd = new FormData(form);
      var name = (fd.get('name') || '').toString().trim();
      var phone = (fd.get('phone') || '').toString().trim();
      var fromEmail = (fd.get('email') || '').toString().trim();
      var message = (fd.get('message') || '').toString().trim();

      var body = [
        'Страница: ' + window.location.href,
        'Объект: ' + ctx.title,
        name ? 'Имя: ' + name : '',
        phone ? 'Телефон: ' + phone : '',
        fromEmail ? 'E-mail: ' + fromEmail : '',
        '',
        'Сообщение:',
        message || 'Пользователь открыл форму и не ввёл текст сообщения.'
      ].filter(Boolean).join('\n');

      window.location.href = 'mailto:' + encodeURIComponent(email) +
        '?subject=' + encodeURIComponent(ctx.subject) +
        '&body=' + encodeURIComponent(body);
    });
  }

  function replaceExistingBlock(site) {
    injectStyles();
    var markup = buildMarkup(site);
    var existing = document.querySelector('section.contact');
    if (existing) {
      existing.outerHTML = markup;
      return;
    }
    var footer = document.querySelector('footer');
    if (footer && footer.parentNode) {
      footer.insertAdjacentHTML('beforebegin', markup);
    } else {
      document.body.insertAdjacentHTML('beforeend', markup);
    }
  }

  function init() {
    var site = window.SITE_DATA || null;
    if (!site || !site.contacts) return;
    replaceExistingBlock(site);
    attachBehavior(site);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
