/* =========================================================
   EVARISTE KAMIWA — main.js
   Toutes les données faciles à personnaliser sont centralisées ici.
   ========================================================= */

/* IMPORTANT : remplace TON_NUMERO_ICI par le numéro WhatsApp
   au format international SANS +, espaces ni parenthèses.
   Exemple : 261XXXXXXXXX
*/
const CONTACT = {
  whatsapp: "+212674105702",
  facebook: "https://web.facebook.com/evaristekamiwa"
};

/* ---------------------------------------------------------
   PRODUITS DEMO
   Ces données sont volontairement fictives / démonstratives.
   Remplace-les par le stock réel avant publication.
   --------------------------------------------------------- */
const products = [
  {
    demo: true,
    name: "iPhone 15 Pro Max",
    storage: "256 Go",
    color: "Titanium",
    condition: "Comme Neuf",
    price: 3500000,
    available: true,
    image: "assets/images/iphone-1.jpg"
  },
  {
    demo: true,
    name: "iPhone 16 Pro",
    storage: "256 Go",
    color: "À confirmer",
    condition: "À confirmer",
    price: 4000000,
    available: true,
    image: "assets/images/iphone-1.jpg"
  },
  {
    demo: true,
    name: "iPhone 14",
    storage: "512",
    color: "Rose",
    condition: "comme Neuf",
    price: 2500000,
    available: true,
    image: "assets/images/iphone-1.jpg"
  }
];

const filterGroups = ["Tous", "iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14", "iPhone 15", "iPhone 16", "Pro", "Pro Max"];
let activeFilter = "Tous";

function getWhatsAppUrl(message) {
  const number = CONTACT.whatsapp.replace(/\D/g, "");
  if (!number || number === "TON_NUMERO_ICI") {
    return "#whatsapp-not-configured";
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message) {
  const url = getWhatsAppUrl(message);
  if (url === "#whatsapp-not-configured") {
    alert("Le numéro WhatsApp n'est pas encore configuré. Ouvre js/main.js et remplace TON_NUMERO_ICI par le numéro international du vendeur.");
    return false;
  }
  return true;
}

function renderFilters() {
  const container = document.querySelector("#product-filters");
  container.innerHTML = filterGroups.map(filter => `
    <button type="button" class="filter-button ${activeFilter === filter ? "active" : ""}" data-filter="${filter}">
      ${filter}
    </button>
  `).join("");

  container.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      renderFilters();
      renderProducts();
    });
  });
}

function matchesFilter(product, filter) {
  if (filter === "Tous") return true;
  const name = product.name.toLowerCase();
  if (filter === "Pro Max") return name.includes("pro max");
  if (filter === "Pro") return name.includes("pro");
  return name.includes(filter.toLowerCase());
}

function productMessage(product) {
  return `Bonjour Evariste, je suis intéressé par ${product.name} ${product.storage}. Pouvez-vous me confirmer sa disponibilité et son prix ?`;
}

function renderProducts() {
  const grid = document.querySelector("#product-grid");
  const empty = document.querySelector("#empty-products");
  const visibleProducts = products.filter(product => matchesFilter(product, activeFilter));

  empty.classList.toggle("hidden", visibleProducts.length !== 0);
  grid.innerHTML = visibleProducts.map((product, index) => `
    <article class="product-card reveal visible" style="transition-delay:${index * 60}ms">
      <div class="product-media relative">
        <img src="${product.image}" alt="${product.name}, ${product.storage}" width="1536" height="2048" loading="lazy">
        <div class="absolute left-4 top-4 flex gap-2">
          <span class="rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-xl">
            ${product.demo ? "DEMO" : "Disponible"}
          </span>
          ${product.available ? '<span class="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold text-emerald-300 backdrop-blur-xl">Disponible</span>' : ""}
        </div>
      </div>
      <div class="product-body">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="font-display text-lg font-extrabold tracking-[-.025em]">${product.name}</h3>
            <p class="mt-1 text-xs text-zinc-500">${product.storage} · ${product.color}</p>
          </div>
          <span class="rounded-full bg-white/[0.05] px-2 py-1 text-[9px] font-bold text-zinc-400">${product.condition}</span>
        </div>
        <div class="mt-6 flex items-end justify-between gap-3">
          <div>
            <span class="block text-[9px] uppercase tracking-[.14em] text-zinc-600">Prix</span>
            <strong class="mt-1 block text-sm">${product.price ?? "Sur demande"}</strong>
          </div>
          <a href="#" data-product-index="${products.indexOf(product)}" class="product-order primary-cta min-h-10 px-4 py-2 text-[11px]">
            Commander <i data-lucide="arrow-up-right" class="h-3.5 w-3.5"></i>
          </a>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".product-order").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const product = products[Number(link.dataset.productIndex)];
      if (!openWhatsApp(productMessage(product))) return;
      window.open(getWhatsAppUrl(productMessage(product)), "_blank", "noopener,noreferrer");
    });
  });

  if (window.lucide) lucide.createIcons();
}

/* FAQ */
const faqItems = [
  ["Quels iPhone sont disponibles ?", "La disponibilité varie régulièrement. Contactez-nous pour connaître les modèles disponibles."],
  ["Comment commander un iPhone ?", "Contactez-nous directement via WhatsApp."],
  ["Proposez-vous des envois de colis ?", "Oui, des services d'envoi sont proposés entre les destinations indiquées."],
  ["Quels sont les tarifs des colis ?", "Les tarifs dépendent du colis et du trajet. Contactez-nous pour obtenir un devis."],
  ["Puis-je réserver un iPhone ?", "Contactez-nous pour discuter de la disponibilité et des modalités. Aucune réservation n'est promise par le site."]
];

function renderFaq() {
  const list = document.querySelector("#faq-list");
  list.innerHTML = faqItems.map((item, index) => `
    <article class="faq-item">
      <button type="button" class="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded="${index === 0 ? "true" : "false"}" aria-controls="faq-answer-${index}">
        <span class="font-display text-sm font-bold sm:text-base">${item[0]}</span>
        <span class="faq-plus grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03]">
          <i data-lucide="plus" class="h-4 w-4"></i>
        </span>
      </button>
      <div id="faq-answer-${index}" class="${index === 0 ? "" : "hidden"} pb-6 pr-12 text-sm leading-6 text-zinc-500">${item[1]}</div>
    </article>
  `).join("");

  list.querySelectorAll(".faq-item > button").forEach(button => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      const isOpen = !answer.classList.contains("hidden");
      list.querySelectorAll(".faq-item > div").forEach(el => el.classList.add("hidden"));
      list.querySelectorAll(".faq-item > button").forEach(el => el.setAttribute("aria-expanded", "false"));
      if (!isOpen) {
        answer.classList.remove("hidden");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  if (window.lucide) lucide.createIcons();
}

/* Theme */
function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.classList.toggle("dark", theme !== "light");
  localStorage.setItem("evariste-theme", theme);

  const button = document.querySelector("#theme-toggle");
  if (button) {
    button.innerHTML = theme === "light"
      ? '<i data-lucide="moon" class="h-4 w-4"></i>'
      : '<i data-lucide="sun" class="h-4 w-4"></i>';
    button.setAttribute("aria-label", theme === "light" ? "Passer au mode sombre" : "Passer au mode clair");
    if (window.lucide) lucide.createIcons();
  }
}

function initTheme() {
  const saved = localStorage.getItem("evariste-theme");
  applyTheme(saved === "light" ? "light" : "dark");
  document.querySelector("#theme-toggle").addEventListener("click", () => {
    applyTheme(document.documentElement.classList.contains("light") ? "dark" : "light");
  });
}

/* Navigation / scroll */
function initNavigation() {
  const header = document.querySelector("#site-header");
  const mobileMenu = document.querySelector("#mobile-menu");
  const mobileButton = document.querySelector("#mobile-menu-button");
  const mobileCta = document.querySelector("#mobile-cta");
  const progress = document.querySelector("#progress-bar");

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 18);
    mobileCta.classList.toggle("opacity-0", window.scrollY < 420);
    mobileCta.classList.toggle("translate-y-24", window.scrollY < 420);
    mobileCta.classList.toggle("opacity-100", window.scrollY >= 420);
    mobileCta.classList.toggle("translate-y-0", window.scrollY >= 420);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  mobileButton.addEventListener("click", () => {
    const hidden = mobileMenu.classList.toggle("hidden");
    mobileButton.setAttribute("aria-expanded", String(!hidden));
    mobileButton.innerHTML = hidden
      ? '<i data-lucide="menu" class="h-5 w-5"></i>'
      : '<i data-lucide="x" class="h-5 w-5"></i>';
    if (window.lucide) lucide.createIcons();
  });

  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileButton.setAttribute("aria-expanded", "false");
      mobileButton.innerHTML = '<i data-lucide="menu" class="h-5 w-5"></i>';
      if (window.lucide) lucide.createIcons();
    });
  });
}

/* WhatsApp links */
function initContactLinks() {
  const defaultMessage = "Bonjour Evariste, je souhaite connaître les iPhone actuellement disponibles.";
  const navLinks = [
    ["#nav-whatsapp", defaultMessage],
    ["#hero-whatsapp", defaultMessage],
    ["#footer-whatsapp", defaultMessage],
    ["#mobile-whatsapp", defaultMessage]
  ];

  navLinks.forEach(([selector, message]) => {
    const element = document.querySelector(selector);
    if (!element) return;
    element.href = getWhatsAppUrl(message);
    element.addEventListener("click", event => {
      if (!openWhatsApp(message)) event.preventDefault();
    });
  });

  document.querySelectorAll("[data-wa-message]").forEach(element => {
    const message = element.dataset.waMessage;
    element.href = getWhatsAppUrl(message);
    element.addEventListener("click", event => {
      if (!openWhatsApp(message)) event.preventDefault();
    });
  });
}

/* Scroll reveal */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
}

/* Boot */
document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderProducts();
  renderFaq();
  initTheme();
  initNavigation();
  initContactLinks();
  initReveal();
  if (window.lucide) lucide.createIcons();
});
