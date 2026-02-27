<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🎬 Epikodi - Media Center Application

Un centre multimédia complet inspiré de Plex avec support de films, séries TV, et musique libre de droit.

## ✨ Fonctionnalités Principales

### 🎬 Films & Séries
- ✅ Catalogue TMDB (films populaires et séries TV)
- ✅ **Boutons Play interactifs** sur chaque carte
- ✅ Détails complets (synopsis, note, date de sortie, backdrop)
- ✅ Système de favoris multi-média
- ✅ Historique de visionnage

### 🎵 Musique
- ✅ Bibliothèque audio locale avec upload
- ✅ **Musique libre de droit via Jamendo API** (600 000+ titres)
- ✅ Enrichissement automatique des métadonnées (TheAudioDB)
- ✅ Lecteur audio avec shuffle et repeat
- ✅ Système de playlists
- ✅ Statistiques d'écoute détaillées

### 🎨 Interface & UX
- ✅ Design moderne inspiré de Plex
- ✅ Mode sombre/clair
- ✅ Interface responsive (desktop & mobile)
- ✅ Animations fluides

## 🆕 Dernières Nouveautés

### Boutons Play (Films & Séries)
Les cartes de films et séries affichent maintenant un bouton Play cliquable au survol.

### Jamendo Music Integration
Découvrez et écoutez de la musique libre de droit :
- 🔍 Recherche globale
- 🎼 Morceaux populaires
- 🎸 10 genres musicaux
- ▶️ Lecture instantanée
- ☁️ Ajout à la bibliothèque

👉 **[Guide complet des nouvelles fonctionnalités](NOUVELLES-FONCTIONNALITES.md)**

## 🚀 Installation Rapide

**Prérequis :** Node.js 18+

1. **Cloner et installer**
   ```bash
   git clone <repo-url>
   cd Epikodi
   npm install
   ```

2. **Configurer les APIs** (Optionnel)
   
   Copiez `.env.example` vers `.env` et ajoutez vos clés :
   ```env
   # TMDB (Films & Séries)
   TMDB_API_KEY="votre_clé_tmdb"
   
   # Jamendo (Musique Libre)
   VITE_JAMENDO_API_KEY="votre_client_id_jamendo"
   ```

3. **Lancer l'application**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 🔑 Obtenir les Clés API

### TMDB (Films & Séries)
1. Compte gratuit sur [themoviedb.org](https://www.themoviedb.org/)
2. Allez dans Settings → API
3. Copiez votre API Key (v3 auth)

### Jamendo (Musique Libre)
1. Compte gratuit sur [devportal.jamendo.com](https://devportal.jamendo.com/)
2. Créez une nouvelle application
3. Copiez votre Client ID

👉 **[Guide détaillé Jamendo](JAMENDO-SETUP.md)**

## 📚 Documentation

- **[NOUVELLES-FONCTIONNALITES.md](NOUVELLES-FONCTIONNALITES.md)** - Dernières mises à jour
- **[JAMENDO-SETUP.md](JAMENDO-SETUP.md)** - Configuration Jamendo
- **[QUICKSTART.md](QUICKSTART.md)** - Guide de démarrage
- **[FEATURES-CHECKLIST.md](FEATURES-CHECKLIST.md)** - Liste complète des fonctionnalités

## 🛠️ Technologies

- **Frontend** : React 19, TypeScript 5.8, Vite 6
- **Routing** : React Router 7
- **Styling** : TailwindCSS (via CDN)
- **Icons** : Lucide React
- **APIs** : TMDB, TheAudioDB, Jamendo
- **Storage** : LocalStorage (client-side persistence)

## 📱 Pages Disponibles

| Route | Description |
|-------|-------------|
| `/` | Accueil - Contenus tendances |
| `/movies` | Films populaires TMDB |
| `/series` | Séries TV populaires |
| `/favorites` | Favoris multi-média |
| `/history` | Historique de visionnage |
| `/music` | Bibliothèque musicale locale |
| `/jamendo` | **Musique libre Jamendo** 🆕 |
| `/playlists` | Gestion des playlists |
| `/stats` | Statistiques d'écoute |
| `/settings` | Configuration (APIs, thème, profil) |

## 🎯 Roadmap

- [ ] Lecteur vidéo intégré
- [ ] Trailers YouTube
- [ ] Téléchargement Jamendo
- [ ] Recherche globale avancée
- [ ] Multi-utilisateurs
- [ ] Serveur backend (Prisma + PostgreSQL)

## 📝 License

Ce projet est open source (MIT License).

### Crédits APIs
- **TMDB** : Métadonnées films/séries
- **TheAudioDB** : Métadonnées musicales
- **Jamendo** : Musique sous licence Creative Commons

---

**Développé avec ❤️ par votre équipe**
