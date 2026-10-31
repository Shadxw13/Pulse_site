# Prompt Claude Code — Site public Pulse

> Colle tout ce qui suit dans Claude Code, lancé à la racine d'un dossier vide `pulse-site/`.
> Dézippe d'abord `pulse-site-reference.zip` dans ce dossier : il crée `design-reference/`.

---

Tu vas coder le site public de **Pulse**, une base FiveM (ESX Legacy + ox_inventory, environ 0,30 ms côté serveur) vendue sous licence. Le site est une vitrine : il présente la base et renvoie vers le Discord, où se passent les commandes (ticket + PayPal validé à la main). Il n'y a **aucun paiement ni compte utilisateur sur ce site**.

Le design est déjà validé. Il est fourni dans `design-reference/` :

- `pages/*.html` : les 6 pages rendues en HTML statique. Ouvre-les dans un navigateur. C'est la référence visuelle exacte : mises en page, textes, couleurs et espacements.
- `captures/*.png` : captures pleine page en 1440 px de large, plus l'Accueil en 390 px (`Site-Accueil_m.png`). Ces captures utilisent une police de secours ; la vraie police est indiquée plus bas.
- `source/*.dc.html` : les sources des maquettes. Le bloc `<script data-dc-script>` de chaque fichier contient la logique des interactions (états, minuteurs, listes de données) : réutilise-la, mais réécris-la en React propre.

Lis d'abord **tous** ces fichiers avant d'écrire du code. Reproduis le design au pixel près, puis ajoute les animations décrites dans la section 5.

## 1. Stack imposée

- **Framework :** Next.js 15 (App Router), TypeScript strict, React Server Components par défaut. `"use client"` uniquement pour les composants animés ou interactifs.
- **Styles :** Tailwind CSS v4. Les jetons de la section 3 vont dans `@theme` de `app/globals.css`. Aucune couleur en dur dans les composants.
- **Animations :** `motion` (paquet `motion`, import `motion/react`) pour les entrées, les transitions d'état et les effets au survol.
- **Animations pilotées par le défilement :** `gsap` avec `ScrollTrigger`, `SplitText` et `DrawSVGPlugin`. GSAP est entièrement gratuit, plugins compris, depuis son rachat par Webflow. Passe par `@gsap/react` (`useGSAP`) pour le nettoyage.
- **Défilement fluide :** `lenis`, synchronisé avec ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` et `gsap.ticker`).
- **Polices :** `next/font/google`. **Bricolage Grotesque** (titres, axe `opsz`, graisses 500 à 800), **Instrument Sans** (texte courant, 400 à 600), **JetBrains Mono** (chiffres techniques, commandes), **Barlow Semi Condensed** et **Fraunces** (seulement pour l'aperçu des polices du configurateur).
- **Pas d'autre UI kit :** ni shadcn, ni MUI, ni Chakra. Tous les composants sont écrits à la main.
- **Contenu :** fichiers TypeScript typés dans `content/` (voir section 6), pas de CMS.
- **Outillage :** gestionnaire `pnpm`, ESLint + Prettier, `next build` sans avertissement.

## 2. Arborescence attendue

```
app/
  layout.tsx            ← polices, <SmoothScroll>, <SiteHeader>, <SiteFooter>, métadonnées
  page.tsx              ← Accueil
  fonctionnalites/page.tsx
  tarifs/page.tsx
  avis/page.tsx
  faq/page.tsx
  discord/page.tsx
  mentions-legales/page.tsx   ← page simple, texte à compléter (placeholders [À COMPLÉTER])
  not-found.tsx
  sitemap.ts, robots.ts, opengraph-image.tsx
components/
  layout/   SiteHeader, SiteFooter, SmoothScroll, PulseLine
  ui/       Button, Eyebrow, Tag, Card, Section, CopyCommand, Accordion
  motion/   Reveal, SplitHeading, ScrambleText, CountUp, Magnetic, Spotlight, Marquee, DrawLine, DotField
  home/     Hero, GameStage, PerfBand, EveningStory, TerritoryMap, ManageSwitch, HudConfigurator, ReleaseDeck, TestAndReview, OfferPicker, HomeFaq, FinalCta
content/    offers.ts, faq.ts, releases.ts, reviews.ts, systems.ts, territories.ts, evening.ts, site.ts
lib/        motion.ts (courbes, durées), useReducedMotion, cn.ts
public/     favicon.svg (le logo), og.png
```

Les liens internes des maquettes (`Site-Tarifs.dc.html`, etc.) deviennent des routes : `/tarifs`, `/fonctionnalites`, `/avis`, `/faq`, `/discord`. Les liens vers l'espace client (`Main.dc.html`, `Client-*.dc.html`) pointent vers `process.env.NEXT_PUBLIC_PANEL_URL`, par défaut `https://panel.pulsedev.fr`.

## 3. Direction artistique (jetons exacts)

Thème **clair uniquement**, aucun mode sombre automatique. Des zones sombres existent volontairement (bandeau performances, cartes « écran de jeu », carte Lifetime) : ce sont des surfaces, pas un thème.

| Jeton                                   | Valeur                            | Usage                                              |
| --------------------------------------- | --------------------------------- | -------------------------------------------------- |
| `bg`                                    | `#F5F4F1`                         | fond de page (gris chaud)                          |
| `surf`                                  | `#FFFFFF`                         | cartes, sections alternées                         |
| `sunk`                                  | `#ECEAE5`                         | pistes, zones enfoncées, segmented control         |
| `line`                                  | `#E3E0DA`                         | filets                                             |
| `line-2`                                | `#D3CFC7`                         | bordures de boutons et d'inputs                    |
| `ink`                                   | `#16151A`                         | titres, boutons noirs                              |
| `ink-2`                                 | `#3E3C43`                         | texte courant                                      |
| `muted`                                 | `#67646C`                         | texte secondaire (contraste 5,3:1 sur `bg`)        |
| `red`                                   | `#C8161D`                         | **seul accent** : bouton principal, traits, points |
| `red-hover`                             | `#A91219`                         | survol du rouge                                    |
| `red-soft` / `red-text`                 | `#FBEAEA` / `#A8121A`             | tags rouges                                        |
| `dark` / `dark-2` / `dark-line`         | `#17161B` / `#211F25` / `#2E2C33` | surfaces sombres, interfaces en jeu                |
| `dark-text` / `dark-muted`              | `#EEECE8` / `#A3A0A8`             | texte sur surfaces sombres                         |
| `ok` (sur sombre) / `warn` (sur sombre) | `#6FCF97` / `#E8B04B`             | états dans les UI de jeu                           |
| `green` (sur clair)                     | `#1D7A46`                         | coches                                             |
| `star`                                  | `#B57F00`                         | étoiles d'avis                                     |

Couleurs secondaires, **sourdes**, réservées aux illustrations :

- tuiles de tablette : rouge `#D23A40→#7E0E13`, ardoise `#46648C→#1D2C44`, sauge `#5F8C6E→#24392B`, graphite `#55535C→#1D1C21` ;
- gangs : Lynx `#3D5A80`, Corbeaux `#C8161D`.

**Interdits :** violet, dégradés néon, bleu Discord (les boutons Discord sont noirs), glassmorphism, emojis, icônes génériques en grille de trois cartes.

**Typographie :**

- titres en Bricolage Grotesque 700 :
  - `h1` : `clamp(40px, 5.8vw, 76px)`, interligne .98, letter-spacing −0,04em ;
  - `h2` : `clamp(30px, 3.8vw, 50px)`, interligne 1.02, −0,035em ;
  - `text-wrap: balance` ;
- texte courant : Instrument Sans 16-17 px, interligne 1.6 ;
- surtitres : petit trait rouge de 18×2 px, puis le libellé en `muted` 13,5 px.

**Formes :**

- boutons en pilule, 48 px de haut (40 px en petite taille) ;
- cartes en rayon 18-22 px ;
- ombres douces : `0 30px 70px rgba(22,21,26,.18)` pour les éléments flottants, rien sur les cartes à plat.

**Logo :** SVG, viewBox `240 350 560 324`, couleur `#C8161D` sur clair, `#E0353B` sur sombre :

```
M245 480C300 474 330 445 360 420C410 378 465 356 520 354L520 511C465 513 410 535 360 577C330 602 300 631 245 637ZM520 512C575 506 605 477 635 452C685 410 740 388 795 386L795 543C740 545 685 567 635 609C605 634 575 663 520 669Z
```

**Signature visuelle :** une **ligne de pouls** façon ECG. Elle apparaît sous le titre de l'Accueil, dans le moniteur resmon et en haut du pied de page. Elle est réutilisée comme séparateur, jamais comme décor gratuit.

## 4. Pages et sections

Reprends **mot pour mot** les textes des fichiers `pages/*.html`. Ordre des sections de l'Accueil :

1. **Rideau d'ouverture** : couche encre, puis les lettres « Pulse » qui montent une à une. Elles repartent vers le haut, puis la couche encre et une couche rouge descendent l'une après l'autre pour découvrir le site, en 3,5 s au total. Le rideau ne s'affiche qu'à la première visite de la session (`sessionStorage`, avec try/catch), jamais si `prefers-reduced-motion`.
2. **Hero** :
   - badge, titre et ligne de pouls tracée sous « tient la charge », sous-titre, deux boutons ;
   - `GameStage` : scène SVG (ciel au crépuscule, buildings, palmiers, route) avec HUD (notification de territoire, minicarte, compteur 87 km/h) ;
   - carte Banque et tablette `/gestion` flottantes, en parallaxe à la souris.
3. **PerfBand** (fond `dark`) :
   - paragraphe révélé mot par mot au défilement ;
   - moniteur resmon : ECG qui défile en boucle, valeur live qui varie entre 0,28 et 0,32 ;
   - 3 cartes de stats.
4. **EveningStory** :
   - 5 moments, de 18:00 à 02:00, avec des barres de progression façon stories : avance auto toutes les 5 s, pause au survol, l'auto s'arrête au clic ;
   - le ciel change de dégradé à chaque moment ;
   - la carte d'info affiche « Se règle dans ».
5. **TerritoryMap** :
   - carte SVG de 6 quartiers, liste cliquable synchronisée avec la carte ;
   - le quartier contesté pulse ;
   - fiche flottante du quartier sélectionné.
6. **ManageSwitch** : segmented control « Tablette en jeu / Espace client ». L'appareil se transforme de tablette (560×400, bord 12 px, rayon 30) en fenêtre de navigateur (100 %×430, rayon 14), avec fondu croisé des contenus et changement des 3 points d'explication.
7. **HudConfigurator** : 6 couleurs, curseur d'arrondis de 0 à 20 px, 3 polices, et un aperçu HUD en direct (menu mécano, facture, aide de touche E, compteur, barres).
8. **ReleaseDeck** : pile de cartes de version (←/→), avec le libellé « (exemples) » tant que `content/releases.ts` contient des données fictives.
9. **TestAndReview** :
   - carte sombre avec `connect 51.254.128.242:30120` et un bouton Copier (« Copié » pendant 1,6 s) ;
   - carte de l'avis de hxayato.
10. **OfferPicker** : liste des 3 offres à gauche, détail de l'offre choisie à droite (fond `dark`) ; Lifetime est sélectionnée par défaut.
11. **HomeFaq** : 4 questions numérotées 01-04, le « + » tourne à 45°.
12. **FinalCta** : deux rangées de noms de systèmes qui défilent en sens inverse, et une carte centrale qui les chevauche.

Les autres pages (Fonctionnalités, Tarifs, Avis, FAQ, Discord) suivent leurs fichiers de référence. La FAQ a des filtres par catégorie. Sur la page Avis, `[NOTE]` et `[NOMBRE]` viennent de `content/reviews.ts` : si aucun avis n'a encore été publié, le bloc de note est masqué au lieu d'afficher un placeholder.

## 5. Animations (le cœur de la demande)

Le site doit paraître vivant et un peu futuriste, **sans jamais gêner la lecture**. Règles générales :

- Une seule courbe maison : `cubic-bezier(.2,.75,.2,1)`, exportée depuis `lib/motion.ts`.
- Durées de 0,35 à 0,9 s ; jamais de rebond.
- `prefers-reduced-motion` : tout est désactivé, sauf les fondus de moins de 200 ms ; le contenu reste visible.
- Seulement `transform` et `opacity` (pas de layout thrash), `will-change` posé à la demande puis retiré.
- Mobile (moins de 860 px) : pas de parallaxe souris ni de Lenis ; les animations au défilement restent, mais plus courtes.

Bibliothèque de composants `components/motion/` à créer, puis à utiliser partout :

| Composant      | Effet                                                                                                                                  | Où                                                                               |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `Reveal`       | fondu + translation 36 px à l'entrée dans le viewport (Motion `whileInView`, `once: true`, décalage en cascade des enfants de 60 ms)   | toutes les sections                                                              |
| `SplitHeading` | titres découpés en mots (GSAP SplitText) qui montent depuis un masque, en cascade                                                      | tous les `h1` / `h2`                                                             |
| `ScrambleText` | texte qui se « décrypte » (caractères aléatoires `A-Z0-9#$%` puis le vrai texte, sur 600 ms)                                           | numéros de version, `connect …`, prix au changement d'offre, valeur resmon       |
| `CountUp`      | compteur de 0 à la valeur, au format fr-FR                                                                                             | « 0,30 ms », revenus des territoires, prix                                       |
| `DrawLine`     | tracé SVG progressif (DrawSVG)                                                                                                         | ligne de pouls du hero, contours des quartiers à l'entrée, ligne du pied de page |
| `Magnetic`     | le bouton suit légèrement le curseur (max 8 px, ressort Motion)                                                                        | boutons principaux                                                               |
| `Spotlight`    | halo radial rouge très léger (`rgba(200,22,29,.07)`) qui suit la souris sur une carte, et bordure qui s'éclaire près du curseur        | cartes d'offres, cartes Fonctionnalités, cartes FAQ                              |
| `DotField`     | grille de points `line-2` en fond de hero ; les points proches du curseur grossissent légèrement (canvas 2D, 60 fps, pause hors écran) | Hero, et la page Fonctionnalités en version discrète                             |
| `Marquee`      | défilement infini, vitesse liée à la vitesse de scroll (accélère quand on défile)                                                      | FinalCta                                                                         |
| `PulseLine`    | ECG animé en boucle (SVG dupliqué, translation −50 %)                                                                                  | PerfBand                                                                         |

Animations spécifiques en plus :

- **Scroll pinné de l'histoire du soir** (ScrollTrigger, `pin: true`, desktop uniquement) : le défilement fait avancer les 5 moments, et la barre de progression suit le scroll. L'avance automatique ne sert que de repli quand la section n'est pas pinnée (mobile).
- **Révélation mot par mot de PerfBand** : ScrollTrigger `scrub`, de `#4A4850` à `dark-text`.
- **GameStage** : légère inclinaison 3D au défilement (rotateX de 8° à 0° quand la scène arrive au centre) en plus de la parallaxe souris.
- **Transitions de page** : fondu de 250 ms et légère montée du `<main>` (template.tsx + Motion). Pas de transitions lourdes.
- **En-tête** : il passe en fond flouté (`rgba(245,244,241,.86)` + `backdrop-filter: blur(10px)`) après 24 px de défilement. Il se cache en descendant et réapparaît en remontant. Le lien actif a un soulignement animé partagé (`layoutId`).
- **Boutons** : la flèche « → » glisse de 3 px au survol. Au clic, petit éclat de 6 traits rouges (style « click spark »), uniquement sur les boutons principaux.

Inspirations à **ne pas copier** : unbbound.com (profondeur, texte révélé), adveo.ch (texte géant en contour qui défile, tracés de lignes), reactbits.dev (Decrypted Text, Dot Field, Magic Bento, Scroll Stack). Ne reprends ni leurs textes, ni leurs mises en page, ni leurs couleurs ; seule la mécanique des effets t'intéresse.

## 6. Contenu éditable (`content/`)

Tout ce qui change sans toucher au design est typé et centralisé :

- `site.ts` : nom, URL du Discord (`https://discord.gg/pulsedev`, à confirmer), commande `connect`, URL du panel, liens YouTube (placeholder), mentions légales (placeholders) ;
- `offers.ts` : Mensuelle 25 € / 30 jours, Lifetime 150 € une fois (recommandée), Unlock 300 € une fois, avec les avantages de chaque offre tels qu'ils figurent dans les références ;
- `releases.ts` : versions (données d'exemple marquées `example: true`) ;
- `reviews.ts` : l'avis de hxayato, plus une note et un nombre calculés automatiquement ;
- `faq.ts`, `systems.ts`, `territories.ts`, `evening.ts`.

Mentions obligatoires : « TVA non applicable, art. 293 B du CGI » sous les prix, et « Pulse n'est pas affilié à Rockstar Games ni à Cfx.re » dans le pied de page.

## 7. Qualité

- **Accessibilité :**
  - boutons de la FAQ en `aria-expanded`, segmented et sélecteurs en `aria-pressed` ;
  - focus visible (2 px `ink`) ;
  - textes alternatifs pour les illustrations (`role="img"` + `aria-label`) ;
  - contrastes AA déjà validés : ne change pas les couleurs.
- **Lighthouse mobile :** au moins 90 dans les 4 catégories. Les canvas et GSAP sont importés dynamiquement côté client ; aucune image lourde (tout est en SVG).
- **SEO :**
  - `metadata` par page en français ;
  - Open Graph généré (`opengraph-image.tsx` avec le logo et le titre) ;
  - `sitemap.ts`, `robots.ts` ;
  - `lang="fr"`.
- **Responsive :** 390, 768, 1024 et 1440 px, sans aucun défilement horizontal.
- **Sécurité :**
  - headers via `next.config.ts` : CSP stricte (self + fonts Google déjà auto-hébergées par next/font), `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` minimale ;
  - aucun secret dans le dépôt.

## 8. Déploiement sur le VPS (à faire seulement quand je te le dis)

Le VPS IONOS (Ubuntu) héberge **d'autres projets en production : n'y touche jamais.** Règles strictes :

1. Avant tout, liste l'existant **en lecture seule** : `pm2 ls`, `ss -ltnp`, `ls /etc/nginx/sites-enabled`. Choisis un port libre (essaie 3100 et vérifie qu'il est libre).
2. Build en production (`pnpm build`), puis lancement avec PM2 sous le nom `pulse-site` (`pm2 start pnpm --name pulse-site -- start -p <port>`), puis `pm2 save`.
3. Nginx : crée **uniquement** un nouveau fichier `/etc/nginx/sites-available/pulse-site.conf`, avec reverse proxy, gzip et cache long sur `/_next/static`. Fais une sauvegarde horodatée de tout fichier nginx avant d'y toucher. Lance `sudo nginx -t` et ne fais `systemctl reload nginx` que s'il passe.
4. HTTPS avec certbot, seulement pour le domaine du site.
5. Ne logge jamais de token, de clé ou d'URL de webhook, et n'en écris jamais en clair dans les fichiers versionnés.

## 9. Méthode de travail

1. Lis `design-reference/` en entier et résume-moi en 10 lignes ce que tu as compris, avec la liste des composants.
2. Initialise le projet, pose les jetons de couleur et les polices, puis code `SiteHeader` et `SiteFooter`.
3. Code l'Accueil section par section. Après chaque section, compare-la visuellement à `captures/Site-Accueil.png` (lance `pnpm dev` et prends une capture avec Playwright à 1440 et 390 px).
4. Code les 5 autres pages.
5. Ajoute la couche d'animation (section 5), puis vérifie `prefers-reduced-motion` avec l'émulation de Playwright.
6. Lighthouse, accessibilité (axe-core via Playwright), `next build` sans avertissement.
7. Donne-moi la liste de tous les placeholders restants (`[À COMPLÉTER]`, données d'exemple).

Critère de fin : le site est identique aux références, toutes les animations listées fonctionnent, rien ne déborde en mobile, et le build passe.
