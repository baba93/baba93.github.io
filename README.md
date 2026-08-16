# Portfolio — Baba Cheick Oumar DIAKITE

Site statique, repris à l'identique de la maquette Claude Design
« Portfolio Baba DIAKITE ». Pas de build, pas de dépendance : du HTML, du CSS
et un petit fichier JS.

## Structure

```
index.html                   la page (le balisage vient tel quel de la maquette)
assets/css/design-system.css le design system « Modernist » (tokens + classes .btn/.tag/…)
assets/css/portfolio.css     les styles de page (bloc <helmet> de la maquette) + états :hover
assets/js/portfolio.js       bascule FR/EN, visionneuse, apparition au scroll
assets/*.jpeg|png            portrait et capture DumuniGo
certificats/*.jpg|png        diplômes, certificats et badges ouverts en visionneuse
assets/badges/*.png          badges affichés dans la bande « Badges vérifiables »
sources-pdf/*.pdf            les PDF d'origine — locaux, jamais publiés (.gitignore)
```

## Certificats

Les certificats ne sont **pas** publiés en PDF. Chaque PDF a été converti en
JPEG (150 dpi) et s'ouvre dans une visionneuse intégrée : pas de lien vers un
document, pas de barre d'outils de téléchargement, et `pointer-events:none` sur
l'image pour que le clic droit n'offre pas « Enregistrer l'image sous ».

À garder en tête : cela décourage la récupération occasionnelle, ça ne la rend
pas impossible. Une capture d'écran ou les outils de développement suffisent à
récupérer l'image. La vraie protection contre la réutilisation d'un diplôme,
c'est le filigrane — dis-le si tu veux que je l'ajoute.

Pour régénérer les images après avoir ajouté un PDF dans `sources-pdf/` :

```bash
pdftoppm -jpeg -r 150 -jpegopt quality=82 -singlefile sources-pdf/mon-certificat.pdf certificats/mon-certificat
```

Puis ajouter le lien dans `index.html` avec son `data-cert-title` :

```html
<a href="certificats/mon-certificat.jpg" data-cert-title="Nom affiché dans la visionneuse">…</a>
```

C'est l'attribut `data-cert-title` — et lui seul — qui branche un lien sur la
visionneuse. Sans lui, le lien ouvre le fichier normalement.

## Badges

Les badges de `assets/badges/` sont détourés (marges transparentes et blanches
retirées) et normalisés en carré. Ils sont affichés petit : celui de Packet
Tracer n'existe qu'en 150 × 150 px et devient flou au-delà de ~70 px.

La grille des certifications peint ses séparateurs via le fond du conteneur,
ce qui laisse un aplat gris sur les cellules inoccupées. Un `<div>` neutre en
fin de grille comble la dernière cellule — à ajuster si le nombre de cartes
change.

## Aperçu en local

```bash
python3 -m http.server 4321
```

Puis ouvrir <http://localhost:4321>. (Un simple double-clic sur `index.html`
fonctionne aussi.)

## Les deux interrupteurs

Ils reprennent les props `showReferences` / `showMobilePreviews` de la maquette.
Ils se pilotent depuis les attributs du `<div>` racine, ligne 21 de `index.html` :

```html
<div data-lg="fr" data-references="off" data-mobile-previews="off" …>
```

| Attribut               | Valeurs      | Effet                                                        |
| ---------------------- | ------------ | ------------------------------------------------------------ |
| `data-lg`              | `fr` \| `en` | langue affichée au chargement                                 |
| `data-references`      | `on` \| `off`| section 08 « Références » (coordonnées de Balobo MAIGA et Romain RICHARD) |
| `data-mobile-previews` | `on` \| `off`| bloc « Aperçu mobile — sections clés » en bas de page          |

`data-mobile-previews` est sur `off` : ce bloc est une aide de conception
(il montre le rendu à 390 px), pas du contenu de portfolio. Le reste de la page
est bien responsive de son côté. Passer l'attribut sur `on` le réaffiche.

`data-references` est sur `off` : la section publiait les téléphones et e-mails
personnels de deux anciens responsables. À ne repasser sur `on` qu'avec leur
accord — sur un site public, ces coordonnées sont indexées et récoltées.

## Traduction FR/EN

Chaque chaîne existe en deux exemplaires :

```html
<span data-l="fr">Compétences</span><span data-l="en">Skills</span>
```

Le CSS masque l'une ou l'autre selon `data-lg` sur le `<div>` racine. Pour
ajouter du texte, garder les deux versions côte à côte.

## Mise en ligne

Tout est statique : déposer le dossier tel quel sur GitHub Pages, Netlify,
Cloudflare Pages ou n'importe quel hébergement mutualisé. Une seule ressource
externe est chargée, la police Archivo depuis Google Fonts
(`@import` en tête de `assets/css/design-system.css`).
