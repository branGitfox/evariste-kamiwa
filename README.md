# Evariste Kamiwa — site vitrine

Site vitrine premium en HTML5 + Tailwind CSS CDN + JavaScript vanilla + Lucide Icons.

## Structure

- `index.html` — structure et contenu principal
- `css/style.css` — styles personnalisés, responsive et animations
- `js/main.js` — données produits, WhatsApp, filtres, FAQ, thème, menu mobile
- `assets/images/evariste-profile.jpg` — photo fournie d'Evariste
- `assets/images/iphone-1.jpg` — photo fournie de l'iPhone

## Avant publication

### 1. Configurer WhatsApp

Dans `js/main.js` :

```js
const CONTACT = {
  whatsapp: "TON_NUMERO_ICI",
  facebook: "https://web.facebook.com/evaristekamiwa"
};
```

Remplacer `TON_NUMERO_ICI` par le numéro au format international sans `+`, espaces ou parenthèses.

### 2. Remplacer les produits DEMO

Le tableau `products` dans `js/main.js` contient uniquement des données de démonstration. Ne pas les présenter comme un stock réel.

### 3. Ajouter de vraies photos produit

Remplacer ou ajouter les fichiers dans `assets/images/`, puis modifier le champ `image` des objets produits.

## Lancement

Le site peut être ouvert directement dans un navigateur en double-cliquant sur `index.html`.

Pour un serveur local :

```bash
python3 -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Dépendances CDN

- Tailwind CSS CDN
- Lucide Icons CDN
- Google Fonts (Inter + Manrope)

Une connexion internet est donc nécessaire pour charger ces ressources CDN.
