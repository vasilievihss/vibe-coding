(() => {
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
})();
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile burger menu
  const burger = $("[data-burger]");
  const nav = $("[data-nav]");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav--open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu on link click (mobile)
    $$("a.nav__link", nav).forEach((a) => {
      a.addEventListener("click", () => {
        if (nav.classList.contains("nav--open")) {
          nav.classList.remove("nav--open");
          burger.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Contact form (mailto)
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailTo = form.getAttribute("data-email") || "hello@example.com";
      const fd = new FormData(form);

      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const service = String(fd.get("service") || "").trim();
      const message = String(fd.get("message") || "").trim();
      const needSeo = fd.get("needSeo") ? "да" : "нет";
      const needUrgent = fd.get("needUrgent") ? "да" : "нет";

      // Basic safety (browser will still validate required fields)
      if (!name || !email || !service) return;

      const subject = `Заявка на копирайт: ${service}`;
      const bodyLines = [
        `Имя: ${name}`,
        `Email: ${email}`,
        `Услуга: ${service}`,
        `Нужен SEO: ${needSeo}`,
        `Срочно: ${needUrgent}`,
        "",
        "Описание задачи:",
        message ? message : "(не указано)",
      ];

      const mailto =
        `mailto:${encodeURIComponent(emailTo)}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(bodyLines.join("\n"))}`;

      // Opens mail client
      window.location.href = mailto;
    });
  }
})();

