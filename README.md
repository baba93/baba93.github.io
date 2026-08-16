# Portfolio — Baba Cheick Oumar DIAKITE

Site statique, repris à l'identique de la maquette Claude Design
« Portfolio Baba DIAKITE ». Pas de build, pas de dépendance : du HTML, du CSS
et un petit fichier JS.

## Structure

```
index.html                   la page (le balisage vient tel quel de la maquette)
assets/css/design-system.css le design system « Modernist » (tokens + classes .btn/.tag/…)
assets/css/portfolio.css     les styles de page (bloc <helmet> de la maquette) + états :hover
assets/js/portfolio.js       bascule FR/EN et apparition des sections au scroll
assets/*.jpeg|png            portrait et capture DumuniGo
certificats/*.pdf            diplômes et certificats (20 fichiers)
```

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
<div data-lg="fr" data-references="on" data-mobile-previews="off" …>
```

| Attribut               | Valeurs      | Effet                                                        |
| ---------------------- | ------------ | ------------------------------------------------------------ |
| `data-lg`              | `fr` \| `en` | langue affichée au chargement                                 |
| `data-references`      | `on` \| `off`| section 08 « Références » (coordonnées de Balobo MAIGA et Romain RICHARD) |
| `data-mobile-previews` | `on` \| `off`| bloc « Aperçu mobile — sections clés » en bas de page          |

`data-mobile-previews` est sur `off` : ce bloc est une aide de conception
(il montre le rendu à 390 px), pas du contenu de portfolio. Le reste de la page
est bien responsive de son côté. Passer l'attribut sur `on` le réaffiche.

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
