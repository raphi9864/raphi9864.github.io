// ============================================================
//  PORTFOLIO CONFIG — Raphaël Attal
//  Remplis les champs marqués ❓ avec tes vraies infos
// ============================================================

export const config = {

  // ──────────────────────────────────────────────────────────
  //  INFOS OBLIGATOIRES
  // ──────────────────────────────────────────────────────────
  personal: {
    firstName:  "Raphaël",
    lastName:   "Attal",
    email:      "raphaelattal98@gmail.com",
     // ex: linkedin.com/in/raphael-attal
    repoName:   "❓nom-du-repo-portfolio",          // pour le base-href Angular                               // optionnel, laisser vide si pas de compte
    cvPdf:      "/cv/raphael-attal-cv.pdf",         // place ton PDF dans public/cv/
    formspree:  "❓TON_FORMSPREE_ID",               // ex: xpwzgkqb — créer sur formspree.io
  },

  // ──────────────────────────────────────────────────────────
  //  SECTION HERO
  // ──────────────────────────────────────────────────────────
  hero: {
    availability:  "En poste — ouvert aux opportunités",
    title:         "Développeur Fullstack Angular, React & Spring Boot",
    description:   `Étudiant ingénieur 5ème année à CESI Nice, en alternance chez Capgemini.
Passionné par le développement web fullstack, avec une expérience internationale
au sein de RGB à Penang, Malaisie. Je construis des projets end-to-end,
de la base de données au frontend.`,

    stats: [
      { label: "Années d'expérience",  value: "2+" },
      { label: "Projets livrés",        value: "5+" },
      { label: "Techs maîtrisées",      value: "10+" },
      { label: "Langues parlées",       value: "2" }, // ex: "Langues parlées" / "4"
    ],

    tags: [
      "Angular",
      "React",
      "Spring Boot",
      "Node.js",
      "PostgreSQL",
      "Open to work",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  PROJETS
  // ──────────────────────────────────────────────────────────
  //  statut : "live" | "wip" | "archived"
  //  type   : "Application web" | "API REST" | "Application mobile" | "Projet perso" | ...
  // ──────────────────────────────────────────────────────────
  projects: [
    {
      title:       "goodpessah.fr",
      description: "Site e-commerce de livraison de nourriture cachère pour Pessah. Paiement Stripe, authentification Clerk, déploiement Vercel.",
      type:        "Application web",
      status:      "wip",
      stack:       ["Next.js", "React", "PostgreSQL", "Stripe", "Clerk", "Vercel"],
      links: {
        demo:   "https://goodpessah.fr",
        github: "https://github.com/❓/goodpessah",  // ❓
        docs:   "",
      },
    },
    {
      title:       "Biblio — Gestion de bibliothèque",
      description: "Système fullstack de gestion de bibliothèque en ligne : catalogue, emprunts, utilisateurs.",
      type:        "Application web",
      status:      "wip",
      stack:       ["React", "Node.js", "Express", "PostgreSQL", "Docker"],
      links: {
        demo:   "",
        github: "https://github.com/❓/biblio",  // ❓
        docs:   "",
      },
    },
    {
      title:       "Portail d'intégration Capgemini",
      description: "Portail web interne pour faciliter l'onboarding des nouveaux collaborateurs chez Capgemini.",
      type:        "Application web",
      status:      "archived",
      stack:       ["Angular", "Spring Boot", "TypeScript"],
      links: {
        demo:   "",
        github: "",
        docs:   "",
      },
    },
    {
      title:       "Interface de génération de tests par IA",
      description: "Interface frontend permettant de soumettre une image et de générer automatiquement des tests (Angular, Spring Boot, React).",
      type:        "Application web",
      status:      "archived",
      stack:       ["Angular", "React", "Spring Boot"],
      links: {
        demo:   "",
        github: "",
        docs:   "",
      },
    },
    {
      title:       "Système de notification RGB — Penang",
      description: "Application Android et site web Angular pour la gestion de notifications dans des casinos à Penang, Malaisie. App mobile développée en React Native.",
      type:        "Application mobile",
      status:      "archived",
      stack:       ["React Native", "Angular", "TypeScript"],
      links: {
        demo:   "",
        github: "",
        docs:   "",
      },
    },
  ],

  // ──────────────────────────────────────────────────────────
  //  STACK TECHNIQUE (niveau 0–100)
  // ──────────────────────────────────────────────────────────
  stack: {
    Frontend: [
      { name: "Angular",        level: 75 },
      { name: "React",          level: 70 },
      { name: "React Native",   level: 60 },
      { name: "TypeScript",     level: 70 },
      { name: "HTML / CSS",     level: 80 },
    ],
    Backend: [
      { name: "Node.js",        level: 70 },
      { name: "Express",        level: 70 },
      { name: "Spring Boot",    level: 55 },
      { name: "Java",           level: 55 },
    ],
    "Base de données & Infra": [
      { name: "PostgreSQL",     level: 65 },
      { name: "Docker",         level: 50 },
      { name: "Git",            level: 75 },
      { name: "Vercel",         level: 60 },
    ],
    Paiement: [
      { name: "Stripe",         level: 40 },
      { name: "Clerk",          level: 40 },
    ],
  },

};
