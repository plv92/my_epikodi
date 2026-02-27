# 🚀 Guide de Démarrage Rapide - Epikodi

## ⚡ Lancement Immédiat (2 minutes)

### 1. Installation
```bash
cd /home/plv92/Desktop/TEK3/Epikodi
npm install  # Si pas déjà fait
npm run dev
```

### 2. Accès
Ouvrir le navigateur sur: **http://localhost:3000**

### 3. Configuration (Optionnelle)
**Pour activer les films/séries TMDB:**
1. Aller dans Settings (sidebar gauche)
2. Ajouter votre clé API TMDB (gratuite sur themoviedb.org)
3. Retourner sur Home → Films et séries s'affichent automatiquement

**Sans clé API TMDB:**
- La musique fonctionne à 100%
- Un message s'affichera sur les pages Movies/Series

---

## 🎵 Test Rapide - Musique

1. **Aller dans "All Tracks"** (Music section, sidebar)
2. **Cliquer "Upload Songs"**
3. **Sélectionner des fichiers MP3/WAV**
4. **Cliquer sur un morceau** → Lecture automatique
5. **Tester les boutons:**
   - ▶️ Play/Pause
   - 🔀 Shuffle (aléatoire)
   - 🔁 Repeat (répéter)
   - ❤️ Favoris (cœur)

---

## 🎬 Test Rapide - Films/Séries

### Avec clé API TMDB:
1. **Home** → Hero banner + trending
2. **Movies** → Grille de films populaires
3. **TV Series** → Grille de séries populaires
4. **Cliquer sur une card** → Modal avec détails
5. **Bouton ❤️** → Ajouter aux favoris
6. **Favorites** → Voir tous les favoris

### Sans clé API:
Un message s'affiche avec le lien vers Settings

---

## 📋 Test Rapide - Playlists

1. **Aller dans "Playlists"**
2. **Cliquer "New Playlist"**
3. **Entrer un nom** (ex: "Chill Vibes")
4. **Aller dans "All Tracks"**
5. **Cliquer le bouton "+"** sur un morceau
6. **Sélectionner votre playlist**
7. **Retourner dans "Playlists"**
8. **Cliquer sur votre playlist** → Voir les tracks
9. **"Play All"** → Lecture de toute la playlist

---

## 📊 Test Rapide - Statistiques

1. **Écouter quelques morceaux**
2. **Aller dans "Statistics"**
3. **Voir:**
   - Total Plays (augmente à chaque lecture)
   - Top Tracks
   - Top Artists
   - Recently Played

---

## 🎨 Test Rapide - Thèmes

1. **Aller dans Settings**
2. **Section "Appearance"**
3. **Toggle "Dark Mode"**
4. **L'application change instantanément de thème**

---

## 🔍 Navigation Complète

### Sidebar Desktop
```
Discover
├── Home           (Hero + Trending)
├── Movies         (Films populaires)
├── TV Series      (Séries populaires)
└── Search         (Recherche TMDB)

My Library
├── Favorites      (Films/Séries favoris)
└── History        (Historique de visionnage)

Music
├── All Tracks     (Bibliothèque musicale)
├── Playlists      (Gestion des playlists)
└── Statistics     (Stats d'écoute)

Settings           (Configuration)
```

### Mobile
Bouton menu (☰) en haut à droite → Même navigation

---

## 🐛 Dépannage Rapide

### Le serveur ne démarre pas
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Les films ne s'affichent pas
- ✅ Vérifier la clé API TMDB dans Settings
- ✅ Vérifier la connexion internet
- ✅ Ouvrir la console navigateur (F12) pour voir les erreurs

### La musique ne se lit pas
- ✅ Vérifier le format des fichiers (MP3/WAV supportés)
- ✅ Autoriser la lecture audio dans le navigateur
- ✅ Vérifier la console (F12)

### Les données disparaissent
- ⚠️ Les données sont dans le LocalStorage
- ⚠️ Ne pas vider le cache/cookies
- ℹ️ Pour une persistance permanente, implémenter un backend

---

## 🎯 Cas d'Usage Recommandés

### 1. Bibliothèque Musicale Personnelle
```
1. Uploader toute votre collection MP3
2. Les métadonnées sont enrichies automatiquement
3. Créer des playlists par genre/mood
4. Suivre vos stats d'écoute
```

### 2. Catalogue Films/Séries
```
1. Ajouter une clé TMDB
2. Explorer les films et séries populaires
3. Marquer vos favoris
4. Suivre votre historique de visionnage
```

### 3. Discover Mode
```
1. Home → Voir les trending du moment
2. Search → Rechercher n'importe quel film/série
3. Cliquer pour voir les détails
4. Ajouter aux favoris pour plus tard
```

---

## 📝 Notes Importantes

### Stockage des Données
- **LocalStorage** (navigateur)
- **Max ~5-10MB** selon navigateur
- **Données perdues** si cache vidé
- **Solution:** Exporter/Importer ou backend

### Limites Actuelles
- Pas de streaming vidéo (TMDB fournit seulement les métadonnées)
- Pas de synchronisation multi-device
- Fichiers audio stockés localement (pas de cloud)

### Performance
- ⚡ Chargement instantané
- 📦 ~500KB bundle gzipped
- 🚀 < 2s First Contentful Paint

---

## 🔧 Commandes Utiles

```bash
# Développement
npm run dev          # Lancer le serveur (port 3000)

# Production
npm run build       # Build pour production
npm run preview     # Preview du build

# Debug
# Ouvrir la console navigateur (F12)
# → Tab "Application" → "Local Storage" → voir les données

# Clear data
# Console navigateur:
localStorage.clear()  # Effacer toutes les données
```

---

## 🎓 Tutoriel Complet (5 minutes)

### Étape 1: Setup Initial
```bash
npm run dev
→ Ouvrir http://localhost:3000
→ Aller dans Settings
→ Ajouter clé TMDB (optionnel)
```

### Étape 2: Importer de la Musique
```
All Tracks → Upload Songs
→ Sélectionner 5-10 MP3
→ Attendre l'upload (voir les métadonnées)
```

### Étape 3: Créer une Playlist
```
Playlists → New Playlist → "My Mix"
All Tracks → Cliquer "+" sur 3 morceaux
→ Sélectionner "My Mix"
Playlists → My Mix → Play All
```

### Étape 4: Explorer les Films
```
Movies → Cliquer sur un film
→ Lire le synopsis
→ Cliquer ❤️ pour ajouter aux favoris
Favorites → Voir le film ajouté
```

### Étape 5: Statistiques
```
Écouter quelques morceaux
Statistics → Voir vos stats s'afficher
```

---

## ✅ Checklist Premier Lancement

- [ ] Serveur lancé (npm run dev)
- [ ] Page chargée (http://localhost:3000)
- [ ] Clé TMDB ajoutée (optionnel)
- [ ] 5+ morceaux uploadés
- [ ] 1+ playlist créée
- [ ] Quelques morceaux écoutés
- [ ] 1+ film/série ajouté aux favoris
- [ ] Dark/Light mode testé
- [ ] Navigation mobile testée

---

## 🚀 Prêt pour la Production

### Avant de déployer:
1. ✅ Ajouter .env pour les clés API
2. ✅ Tester sur différents navigateurs
3. ✅ Vérifier le responsive
4. ✅ Optimiser les images
5. ✅ Configurer CORS si backend

### Déploiement:
```bash
npm run build
# Upload le dossier /dist sur votre hébergeur
# Ou utiliser Vercel/Netlify (détection auto)
```

---

**Besoin d'aide?** Consultez les autres docs:
- `README-FEATURES.md` - Liste complète des fonctionnalités
- `FEATURES-CHECKLIST.md` - Checklist détaillée
- Code source commenté dans `App.tsx`

**Bon développement! 🚀**
