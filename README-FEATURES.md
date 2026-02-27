# 🎬🎵 Epikodi - Media Center Application

Epikodi est une application de gestion de médias complète inspirée de Plex, combinant streaming de films/séries (via TMDB API) et lecture de musique locale avec des fonctionnalités avancées.

![Epikodi Banner](https://via.placeholder.com/1200x300/0ea5e9/ffffff?text=Epikodi+Media+Center)

## ✨ Fonctionnalités

### 🎬 Films & Séries TV
- ✅ **Intégration TMDB API** - Accès à des millions de films et séries
- ✅ **Pages dédiées** - Pages séparées pour films et séries populaires
- ✅ **Recherche avancée** - Recherche multi-média dans la base TMDB
- ✅ **Gestion des favoris** - Marquez vos films/séries préférés
- ✅ **Historique de visionnage** - Suivez ce que vous avez regardé
- ✅ **Détails enrichis** - Modales avec synopsis, notes, dates de sortie

### 🎵 Musique
- ✅ **Upload de fichiers locaux** - Importez vos MP3/WAV
- ✅ **Métadonnées enrichies** - Intégration TheAudioDB pour artistes et albums
- ✅ **Lecteur audio complet** - Play/Pause, Next, Previous
- ✅ **Mode Shuffle** - Lecture aléatoire
- ✅ **Mode Repeat** - Répétition de pistes
- ✅ **Gestion des favoris musicaux** - Marquez vos morceaux préférés
- ✅ **Statistiques d'écoute** - Suivez vos habitudes musicales
  - Total de lectures
  - Morceaux les plus écoutés
  - Artistes préférés
  - Historique récent

### 📋 Playlists
- ✅ **Création de playlists** - Organisez votre musique
- ✅ **Gestion complète** - Ajoutez/retirez des morceaux
- ✅ **Lecture de playlists** - Lancez toute une playlist
- ✅ **Pages dédiées** - Vue détaillée de chaque playlist

### 🎨 Interface & Design
- ✅ **Design moderne style Plex** - Interface élégante et intuitive
- ✅ **Mode sombre/clair** - Thème adaptatif
- ✅ **Design responsive** - Fonctionne sur tous les appareils
- ✅ **Animations fluides** - Transitions et hover effects
- ✅ **Navigation intuitive** - Sidebar organisée par catégories

### 💾 Stockage
- ✅ **LocalStorage** - Persistance des données côté client
- ✅ **Pas de serveur requis** - Application 100% frontend

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone <your-repo-url>
cd Epikodi
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'API TMDB**
   - Créez un compte sur [The Movie Database](https://www.themoviedb.org/)
   - Obtenez votre API Key (v3 auth)
   - Ajoutez-la dans les **Settings** de l'application (onglet Settings dans la sidebar)

4. **Lancer le serveur de développement**
```bash
npm run dev
```

5. **Ouvrir l'application**
   - Accédez à `http://localhost:3000`

## 📖 Guide d'utilisation

### Configuration initiale

1. **Ajouter votre clé API TMDB**
   - Cliquez sur "Settings" dans la sidebar
   - Collez votre clé API TMDB
   - Les films et séries s'afficheront automatiquement

2. **Importer de la musique**
   - Allez dans "All Tracks" (Music section)
   - Cliquez sur "Upload Songs"
   - Sélectionnez vos fichiers MP3/WAV
   - Les métadonnées seront automatiquement enrichies via TheAudioDB

### Navigation

#### Discover (Films & Séries)
- **Home** : Tendances et hero banner avec film/série du moment
- **Movies** : Parcourir les films populaires
- **TV Series** : Parcourir les séries populaires
- **Search** : Recherche multi-média

#### My Library
- **Favorites** : Tous vos films/séries favoris
- **History** : Historique de visionnage (50 derniers items)

#### Music
- **All Tracks** : Bibliothèque musicale complète
  - Vue "All" : Tous les morceaux
  - Vue "Favorites" : Morceaux favoris uniquement
- **Playlists** : Gérez vos playlists
- **Statistics** : Statistiques d'écoute détaillées

### Fonctionnalités du lecteur audio

Le lecteur audio en bas de l'écran offre :
- ⏯️ Play/Pause
- ⏭️ Next track
- ⏮️ Previous track
- 🔀 Shuffle mode (lecture aléatoire)
- 🔁 Repeat mode (répéter la piste actuelle)
- 🔊 Contrôle du volume
- 📊 Barre de progression avec seek

### Gestion des favoris

- **Films/Séries** : Cliquez sur le cœur sur les cards ou dans la modale de détails
- **Musique** : Cliquez sur le cœur dans la liste des morceaux

### Créer une playlist

1. Allez dans "Playlists"
2. Cliquez sur "New Playlist"
3. Donnez un nom à votre playlist
4. Dans "All Tracks", utilisez le bouton "+" pour ajouter des morceaux
5. Accédez à votre playlist pour la lire

## 🛠️ Technologies utilisées

### Frontend
- **React 19** - Framework UI
- **TypeScript** - Typage statique
- **React Router 7** - Navigation
- **Vite 6** - Build tool
- **TailwindCSS** - Styling (via CDN)
- **Lucide React** - Icônes

### APIs externes
- **TMDB API** - Films et séries
- **TheAudioDB** - Métadonnées musicales (clé publique 523532)

### Stockage
- **LocalStorage** - Persistance côté client

## 📁 Structure du projet

```
Epikodi/
├── App.tsx                 # Composant principal avec routing et state management
├── index.tsx              # Point d'entrée de l'application
├── index.html             # Template HTML
├── types.ts               # Définitions TypeScript
├── constants.tsx          # Constantes (legacy, non utilisé)
├── components/
│   ├── AudioPlayer.tsx    # Lecteur audio avec contrôles
│   └── MediaCard.tsx      # Card pour films/séries
├── services/
│   ├── tmdb.ts           # Service TMDB API
│   └── audiodb.ts        # Service TheAudioDB
├── prisma/
│   └── schema.prisma     # Schema Prisma (placeholder, non utilisé)
└── package.json          # Dépendances
```

## 🎯 Fonctionnalités détaillées

### Pages disponibles

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil avec trending et hero banner |
| `/movies` | Films populaires TMDB |
| `/series` | Séries TV populaires TMDB |
| `/search` | Recherche multi-média TMDB |
| `/favorites` | Films/séries favoris |
| `/history` | Historique de visionnage |
| `/music` | Bibliothèque musicale |
| `/playlists` | Liste des playlists |
| `/playlists/:id` | Détails d'une playlist |
| `/stats` | Statistiques musicales |
| `/settings` | Configuration de l'application |

### Statistiques musicales

La page Statistics affiche :
- **Total Plays** : Nombre total de lectures
- **Total Tracks** : Nombre de morceaux dans la bibliothèque
- **Favorites** : Nombre de morceaux favoris
- **Top 10 Tracks** : Morceaux les plus écoutés
- **Top 10 Artists** : Artistes les plus écoutés
- **Recently Played** : Derniers morceaux écoutés avec dates

### Tracking automatique

L'application track automatiquement :
- Nombre de lectures par morceau (`playCount`)
- Date de dernière lecture (`lastPlayed`)
- Favoris (`isFavorite`)
- Ces données sont utilisées pour les statistiques

## 🎨 Thèmes

L'application supporte deux thèmes :
- **Dark Mode** (par défaut) - Fond sombre pour réduire la fatigue oculaire
- **Light Mode** - Fond clair pour une meilleure lisibilité en journée

Changez de thème via Settings > Appearance > Dark Mode toggle

## 🔧 Configuration avancée

### Personnalisation des couleurs

Les couleurs de la marque sont définies dans `index.html` :
```javascript
colors: {
  brand: {
    50: '#f0f9ff',
    500: '#0ea5e9',  // Couleur principale
    600: '#0284c7',
    900: '#0c4a6e',
  }
}
```

### Modifier la clé publique TheAudioDB

Si nécessaire, modifiez la clé dans `services/audiodb.ts` :
```typescript
const AUDIO_DB_BASE_URL = 'https://www.theaudiodb.com/api/v1/json/YOUR_KEY';
```

## 🐛 Dépannage

### Les films ne s'affichent pas
- Vérifiez que vous avez ajouté une clé API TMDB valide dans Settings
- Vérifiez votre connexion internet

### La musique ne se lit pas
- Assurez-vous que les fichiers audio sont au format MP3 ou WAV
- Vérifiez les permissions de votre navigateur pour la lecture audio

### Les données disparaissent
- Les données sont stockées dans le LocalStorage du navigateur
- Ne videz pas le cache/cookies si vous voulez conserver vos données
- Pour une persistance permanente, considérez d'implémenter un backend

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`

### Déployer sur Vercel/Netlify

1. Push votre code sur GitHub
2. Connectez votre repo sur Vercel/Netlify
3. La configuration est automatique (détectée via `vite.config.ts`)

## 📝 TODO / Améliorations futures

- [ ] Backend avec base de données pour persistance multi-device
- [ ] Support de streaming vidéo pour films/séries
- [ ] Système de recommendations basé sur l'historique
- [ ] Support de sous-titres
- [ ] Partage de playlists
- [ ] Export/Import de bibliothèque
- [ ] Support de plus de formats audio (FLAC, OGG)
- [ ] Visualiseur audio
- [ ] Égaliseur audio

## 👨‍💻 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [TMDB](https://www.themoviedb.org/) - API films et séries
- [TheAudioDB](https://www.theaudiodb.com/) - API métadonnées musicales
- [Plex](https://www.plex.tv/) - Inspiration design
- [Lucide Icons](https://lucide.dev/) - Icônes

## 📞 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

**Fait avec ❤️ et beaucoup de ☕**
