"use client";

import { type ChangeEvent, type FormEvent, type MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

type ContactStatus = "idle" | "sending" | "success" | "error";
type CookieConsent = "accepted" | "essential" | "rejected" | null;

type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  category: string;
  demoUrl: string;
  featured: boolean;
};

const fallbackProjects: PortfolioProject[] = [];

const services = [
  {
    eyebrow: "Web",
    title: "Strony internetowe",
    text: "Projektujemy szybkie, responsywne strony, które dobrze wyglądają, jasno komunikują ofertę i prowadzą użytkownika do kontaktu."
  },
  {
    eyebrow: "Landing",
    title: "Landing page",
    text: "Tworzymy strony sprzedażowe pod kampanie, usługi i marki osobiste. Każda sekcja ma konkretny cel, a nie tylko ładnie świeci."
  },
  {
    eyebrow: "Systemy",
    title: "Systemy webowe",
    text: "Budujemy formularze wycen, panele, integracje i automatyzacje, które zamieniają stronę w narzędzie pracy."
  },
  {
    eyebrow: "Design",
    title: "UX/UI Design",
    text: "Układamy strukturę, teksty, sekcje i interakcje tak, żeby użytkownik rozumiał ofertę bez mapy skarbów."
  },
  {
    eyebrow: "SEO",
    title: "SEO techniczne",
    text: "Dbamy o semantykę, metadata, sitemap, szybkość, responsywność i czytelny kod gotowy pod dalsze pozycjonowanie."
  },
  {
    eyebrow: "Opieka",
    title: "Rozwój i opieka",
    text: "Po wdrożeniu możemy rozwijać stronę, dodawać sekcje, poprawiać treści i utrzymywać projekt w dobrej formie."
  }
];

const processSteps = [
  {
    title: "Analiza",
    text: "Ustalamy cel strony, grupę odbiorców, styl marki i najważniejsze akcje użytkownika.",
    icon: "◎"
  },
  {
    title: "Projekt",
    text: "Tworzymy strukturę, design i kierunek wizualny, zanim kod zacznie składać cyfrowe origami.",
    icon: "✦"
  },
  {
    title: "Realizacja",
    text: "Kodujemy stronę w Next.js, dodajemy animacje, responsywność i integracje.",
    icon: "⌘"
  },
  {
    title: "Wdrożenie",
    text: "Publikujemy projekt, sprawdzamy wydajność, SEO i działanie na telefonie oraz komputerze.",
    icon: "▲"
  }
];

const reasons = [
  "Indywidualne podejście zamiast gotowego szablonu przebranego w nowe kolory.",
  "Nowoczesny design, który nie tylko wygląda, ale też prowadzi użytkownika.",
  "Technologia gotowa pod rozwój: Next.js, animacje, integracje i czysty kod.",
  "Komunikacja po ludzku: bez dymu technicznego, za to z konkretnym efektem."
];

const navLinks = [
  { label: "Start", href: "#start" },
  { label: "O nas", href: "#about" },
  { label: "Usługi", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Proces", href: "#process" },
  { label: "Kontakt", href: "#contact" }
];

const legalLinks = [
  { label: "Polityka prywatności", href: "/privacy-policy" },
  { label: "RODO", href: "/rodo" },
  { label: "Polityka cookies", href: "/cookies" },
  { label: "Regulamin", href: "/terms" }
];

const reveal = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState<PortfolioProject[]>(fallbackProjects);
  const [portfolioSource, setPortfolioSource] = useState("stripe");
  const [isMounted, setIsMounted] = useState(false);
  const [contactStatus, setContactStatus] = useState<ContactStatus>("idle");
  const [contactMessage, setContactMessage] = useState("");
  const [cookieConsent, setCookieConsent] = useState<CookieConsent>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const signalRef = useRef<HTMLElement | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-250, 250], [4, -4]);
  const rotateY = useTransform(mouseX, [-250, 250], [-5, 5]);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, shouldReduceMotion ? 0 : 120]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0.25]);

  const { scrollYProgress: signalProgress } = useScroll({
    target: signalRef,
    offset: ["start end", "end start"]
  });
  const signalY = useTransform(signalProgress, [0, 1], [shouldReduceMotion ? 0 : 100, shouldReduceMotion ? 0 : -120]);
  const signalRotateX = useTransform(signalProgress, [0, 1], [shouldReduceMotion ? 0 : 18, shouldReduceMotion ? 0 : -14]);
  const signalRotateZ = useTransform(signalProgress, [0, 1], [shouldReduceMotion ? 0 : -7, shouldReduceMotion ? 0 : 7]);

  const filteredProjects = useMemo(() => projects.filter((project) => project.featured), [projects]);

  useEffect(() => {
    const savedConsent = window.localStorage.getItem("fluxbase-cookie-consent-v6") as CookieConsent;
    if (savedConsent === "accepted" || savedConsent === "essential" || savedConsent === "rejected") {
      setCookieConsent(savedConsent);
    }

    setIsMounted(true);
  }, []);

  useEffect(() => {
    document.body.removeAttribute("data-theme");
    window.localStorage.removeItem("fluxbase-theme-v6");
  }, []);

  useEffect(() => {
    return () => {
      if (pointerFrameRef.current !== null) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }
    };
  }, []);


  useEffect(() => {
    if (cookieConsent !== "accepted") return;

    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId || document.querySelector(`script[data-fluxbase-ga="${gaId}"]`)) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.dataset.fluxbaseGa = gaId;
    document.head.appendChild(script);

    const win = window as unknown as {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };

    win.dataLayer = win.dataLayer || [];
    win.gtag = (...args: unknown[]) => {
      win.dataLayer?.push(args);
    };

    win.gtag("js", new Date());
    win.gtag("config", gaId);
  }, [cookieConsent]);

  useEffect(() => {
    let isActive = true;

    async function loadPortfolio() {
      try {
        const response = await fetch("/api/portfolio", { cache: "no-store" });
        const data = await response.json();

        if (isActive && Array.isArray(data.projects)) {
          setProjects(data.projects);
          setPortfolioSource(data.source || "stripe");
        }
      } catch {
        if (isActive) {
          setProjects([]);
          setPortfolioSource("empty");
        }
      }
    }

    loadPortfolio();

    return () => {
      isActive = false;
    };
  }, []);

  function saveCookieConsent(value: Exclude<CookieConsent, null>) {
    window.localStorage.setItem("fluxbase-cookie-consent-v6", value);
    setCookieConsent(value);
  }

  function openCookieSettings() {
    window.localStorage.removeItem("fluxbase-cookie-consent-v6");
    setCookieConsent(null);
  }

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    if (shouldReduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    pointerTargetRef.current = {
      x: event.clientX - rect.left - rect.width / 2,
      y: event.clientY - rect.top - rect.height / 2
    };

    if (pointerFrameRef.current !== null) return;

    pointerFrameRef.current = window.requestAnimationFrame(() => {
      mouseX.set(pointerTargetRef.current.x);
      mouseY.set(pointerTargetRef.current.y);
      pointerFrameRef.current = null;
    });
  }

  function scrollPortfolio(direction: "left" | "right") {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: direction === "left" ? -420 : 420,
      behavior: "smooth"
    });
  }

  function handleContactChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setContactForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (contactStatus === "sending") return;

    setContactStatus("sending");
    setContactMessage("Wysyłamy wiadomość...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contactForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Nie udało się wysłać formularza.");
      }

      setContactStatus("success");
      setContactMessage("Dzięki! Wiadomość została wysłana. Odezwę się możliwie szybko.");
      setContactForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setContactStatus("error");
      setContactMessage(error instanceof Error ? error.message : "Coś poszło nie tak. Spróbuj ponownie.");
    }
  }

  return (
    <main className="site-shell" id="start">
      <svg className="glass-filter-svg" aria-hidden="true" focusable="false">
        <filter id="container-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="8" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="1.8" result="softNoise" />
          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <motion.div className="scroll-progress" style={{ scaleX: smoothProgress }} />
      <div className="scroll-orbital-bg" />
      <div className="noise-layer" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="navbar-wrap">
        <nav className="navbar liquid-glass" aria-label="Główna nawigacja">
          <a className="brand" href="#start" aria-label="FluxBase strona główna">
            <span className="brand-mark brand-mark-logo"><img src="/favicon.png" alt="FluxBase logo" /></span>
            <span>fluxbase</span>
          </a>

          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">

            <a className="nav-cta" href="#contact">
              Napisz do nas
            </a>

            <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Otwórz menu">
              <span />
              <span />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <motion.div className="mobile-menu liquid-glass" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      <section className="hero-section" ref={heroRef} onMouseMove={handleMouseMove}>
        <motion.div className="hero-copy" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.span className="pill" initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.7 }}>
            ✦ Projektujemy przyszłość w sieci
          </motion.span>

          <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.8, delay: 0.08 }}>
            Tworzymy cyfrowe doświadczenia, <span>które pracują na Twój wizerunek.</span>
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.8, delay: 0.16 }}>
            FluxBase projektuje nowoczesne strony internetowe, landing page i systemy webowe dla firm, które chcą wyglądać profesjonalnie, działać szybciej i zamieniać uwagę w realny kontakt.
          </motion.p>

          <motion.div className="hero-actions" initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.8, delay: 0.24 }}>
            <a className="primary-button magnetic" href="#portfolio">
              Zobacz portfolio
            </a>
            <a className="secondary-button" href="#contact">
              Omów projekt <span>→</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          style={shouldReduceMotion ? undefined : { rotateX, rotateY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-depth-grid" />
          <div className="holo-ring holo-ring-one" />
          <div className="holo-ring holo-ring-two" />
          <div className="liquid-sheet liquid-sheet-one" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="floating-rock rock-one" />
          <div className="floating-rock rock-two" />
          <div className="floating-rock rock-three" />
          <div className="glass-cube">
            <div className="cube-glow" />
            <div className="cube-star">✦</div>
          </div>
          <div className="glass-card metric-card">
            <span>Performance</span>
            <strong>98</strong>
            <small>Core Web Vitals ready</small>
          </div>
          <div className="glass-card stack-card">
            <span>Stack</span>
            <strong>Next.js</strong>
            <small>UX / UI / SEO</small>
          </div>
        </motion.div>

        <div className="scroll-hint">
          <span />
          Przewiń w dół
        </div>
      </section>

      <section className="about-section section-pad" id="about">
        <motion.div className="section-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={reveal} transition={{ duration: 0.7 }}>
          <div>
            <span className="section-eyebrow">O nas</span>
            <h2>Czym się zajmujemy?</h2>
            <p>
              FluxBase to studio tworzące strony i cyfrowe systemy dla marek, które chcą wejść do internetu z mocniejszym wrażeniem niż zwykła wizytówka. Łączymy design, technologię, UX i automatyzacje.
            </p>
            <a className="text-link" href="#services">
              Poznaj usługi <span>→</span>
            </a>
          </div>

          <div className="about-panel liquid-panel">
            <p>
              Nie składamy przypadkowych sekcji. Budujemy stronę jak dobrze ustawioną scenę: pierwszy kadr zatrzymuje uwagę, kolejne bloki tłumaczą ofertę, a finał prowadzi do kontaktu.
            </p>
            <div className="about-tags">
              <span>Next.js</span>
              <span>UX/UI</span>
              <span>SEO</span>
              <span>Integracje</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="signal-section section-pad" ref={signalRef} aria-hidden="true">
        <motion.div className="signal-stage" style={shouldReduceMotion ? undefined : { y: signalY, rotateX: signalRotateX, rotateZ: signalRotateZ }}>
          <div className="signal-floor" />
          <div className="signal-column signal-column-one" />
          <div className="signal-column signal-column-two" />
          <div className="signal-column signal-column-three" />
          <div className="signal-plane signal-plane-one" />
          <div className="signal-plane signal-plane-two" />
          <div className="signal-plane signal-plane-three" />
          <div className="signal-beam signal-beam-one" />
          <div className="signal-beam signal-beam-two" />
        </motion.div>
      </section>

      <section className="services-section section-pad" id="services">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={reveal} transition={{ duration: 0.7 }}>
          <span className="section-eyebrow">Usługi</span>
          <h2>Co możemy dla Ciebie zrobić?</h2>
          <p>Od pierwszego ekranu po wdrożenie. Design, kod, treść, technika i efekt końcowy w jednym cyfrowym warsztacie.</p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.article
              className="service-card liquid-panel"
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={reveal}
              whileHover={shouldReduceMotion ? undefined : { y: -12, rotateX: 6, rotateY: index % 2 === 0 ? -4 : 4, scale: 1.02 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <span>{service.eyebrow}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="portfolio-section section-pad" id="portfolio">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={reveal} transition={{ duration: 0.7 }}>
          <span className="section-eyebrow">Portfolio</span>
          <h2>Wybrane realizacje</h2>
        
          <small className="source-badge">Źródło portfolio: {portfolioSource === "stripe" ? "Stripe" : "oczekuje na projekty"}</small>
        </motion.div>

        {filteredProjects.length > 0 ? (
          <div className="portfolio-carousel-shell">
            <button
              className="portfolio-side-arrow portfolio-side-arrow-left"
              type="button"
              onClick={() => scrollPortfolio("left")}
              aria-label="Przewiń portfolio w lewo"
            >
              ←
            </button>

            <div className="portfolio-carousel" ref={carouselRef}>
              {filteredProjects.map((project, index) => (
                <motion.article
                  className="portfolio-card"
                  key={project.id}
                  initial={{ opacity: 0, y: 40, rotateX: -8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={shouldReduceMotion ? undefined : { y: -12, rotateX: 4, rotateY: index % 2 === 0 ? -3 : 3 }}
                  transition={{ duration: 0.7, delay: index * 0.06 }}
                >
                  <div className="portfolio-image-wrap">
                    {project.image ? <img src={project.image} alt={`Podgląd projektu ${project.title}`} /> : <div className="portfolio-image-fallback">✦</div>}
                  </div>
                  <div className="portfolio-content">
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {project.demoUrl && project.demoUrl !== "#" ? (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer">
                        Zobacz stronę <span>↗</span>
                      </a>
                    ) : (
                      <span className="portfolio-soon">Demo wkrótce</span>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>

            <button
              className="portfolio-side-arrow portfolio-side-arrow-right"
              type="button"
              onClick={() => scrollPortfolio("right")}
              aria-label="Przewiń portfolio w prawo"
            >
              →
            </button>
          </div>
        ) : (
          <div className="portfolio-empty liquid-panel">
            <span>✦</span>
            <h3>Portfolio czeka na projekty ze Stripe</h3>
            <p>Dodaj produkt w Stripe, ustaw metadata <code>type=portfolio</code> oraz <code>demo_url</code>, a karta pojawi się tutaj automatycznie.</p>
          </div>
        )}
      </section>

      <section className="process-section section-pad" id="process">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={reveal} transition={{ duration: 0.7 }}>
          <span className="section-eyebrow">Proces</span>
          <h2>Jak pracujemy?</h2>
          <p>Jasno, etapami i bez chaosu. Od rozmowy do gotowej strony, która nie wygląda jak kolejny klon z internetu.</p>
        </motion.div>

        <div className="process-line">
          {processSteps.map((step) => (
            <motion.article
              className="process-step"
              key={step.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={reveal}
              whileHover={shouldReduceMotion ? undefined : { y: -10, rotateX: 5, scale: 1.02 }}
              transition={{ duration: 0.65 }}
            >
              <div className="process-icon">{step.icon}</div>
              <span>Etap</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="why-section section-pad">
        <motion.div className="why-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={reveal} transition={{ duration: 0.7 }}>
          <div>
            <span className="section-eyebrow">Dlaczego my?</span>
            <h2>Bo dobra strona ma pracować, nie tylko pozować.</h2>
            <p>
              W FluxBase projektujemy strony, które są estetyczne, szybkie i gotowe pod realne działania: kontakt, wycenę, sprzedaż usługi, prezentację marki albo automatyzację.
            </p>
          </div>

          <div className="reasons-list">
            {reasons.map((reason, index) => (
              <motion.div
                className="reason-item liquid-panel"
                key={reason}
                variants={reveal}
                whileHover={shouldReduceMotion ? undefined : { x: 8, rotateY: -3 }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
              >
                <span>✦</span>
                <p>{reason}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <motion.div className="contact-card liquid-panel" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={reveal} transition={{ duration: 0.7 }}>
          <div className="contact-copy">
            <span className="section-eyebrow">Kontakt</span>
            <h2>Masz pomysł na projekt?</h2>
            <p>Wypełnij formularz, a wiadomość trafi bezpośrednio na mail FluxBase. Im więcej konkretów podasz, tym szybciej da się dobrać zakres, styl, płatność Stripe i sensowną wycenę.</p>

            <div className="contact-details">
              <a href="mailto:office@fluxbase.pl">office@fluxbase.pl</a>
              <a href="tel:+48694873748">+48 694 873 748</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label>
              Imię lub firma
              <input name="name" value={contactForm.name} onChange={handleContactChange} placeholder="np. Jan / Studio X" required />
            </label>

            <label>
              E-mail
              <input name="email" type="email" value={contactForm.email} onChange={handleContactChange} placeholder="twoj@email.pl" required />
            </label>

            <label>
              Telefon
              <input name="phone" value={contactForm.phone} onChange={handleContactChange} placeholder="opcjonalnie" />
            </label>

            <label>
              Wiadomość
              <textarea name="message" value={contactForm.message} onChange={handleContactChange} placeholder="Opisz krótko projekt, branżę i czego potrzebujesz." rows={5} required />
            </label>

            <button className="primary-button" type="submit" disabled={contactStatus === "sending"}>
              {contactStatus === "sending" ? "Wysyłanie..." : "Wyślij wiadomość"}
            </button>

            {contactMessage && <p className={`form-status ${contactStatus}`} aria-live="polite">{contactMessage}</p>}
          </form>
        </motion.div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <a className="brand" href="#start">
            <span className="brand-mark brand-mark-logo"><img src="/favicon.png" alt="FluxBase logo" /></span>
            <span>fluxbase</span>
          </a>
          <p>Tworzymy nowoczesne strony internetowe, systemy webowe i cyfrowe doświadczenia dla firm, które chcą rosnąć w sieci.</p>
          <button className="footer-cookie-button" type="button" onClick={openCookieSettings}>Ustawienia cookies</button>
        </div>

        <div className="footer-links">
          {legalLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </footer>

      {cookieConsent === null && (
        <motion.aside
          className="cookie-modal liquid-glass"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          role="dialog" aria-modal="true" aria-labelledby="cookie-title"
        >
          <div>
            <span className="cookie-icon">✦</span>
            <h2 id="cookie-title">Ustawienia prywatności</h2>
            <p>
              Używamy plików cookies i localStorage. Niezbędne pomagają stronie działać, a analityczne i marketingowe pomagają mierzyć ruch oraz skuteczność działań. Możesz wybrać zakres zgody.
            </p>
            <div className="cookie-types">
              <article>
                <strong>Niezbędne</strong>
                <small>działanie strony, tryb jasny/ciemny, zapamiętanie decyzji cookies</small>
              </article>
              <article>
                <strong>Analityczne i marketingowe</strong>
                <small>Google Analytics i podobne narzędzia tylko po akceptacji</small>
              </article>
            </div>
            <div className="cookie-links">
              {legalLinks.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="cookie-actions">
            <button type="button" className="secondary-button" onClick={() => saveCookieConsent("rejected")}>
              Odrzuć
            </button>
            <button type="button" className="secondary-button" onClick={() => saveCookieConsent("essential")}>
              Tylko niezbędne
            </button>
            <button type="button" className="primary-button" onClick={() => saveCookieConsent("accepted")}>
              Akceptuję wszystkie
            </button>
          </div>
        </motion.aside>
      )}

      {!isMounted && <span className="sr-only">Ładowanie strony FluxBase</span>}
    </main>
  );
}
