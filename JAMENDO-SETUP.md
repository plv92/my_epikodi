# Configuration Jamendo API

## 🎵 Qu'est-ce que Jamendo ?

Jamendo est une plateforme de musique libre de droit qui offre un catalogue de plus de 600 000 titres sous licence Creative Commons. Vous pouvez écouter, télécharger et utiliser cette musique gratuitement dans vos projets.

## 🔑 Obtenir votre clé API Jamendo

1. Rendez-vous sur [Jamendo Developer Portal](https://devportal.jamendo.com/)
2. Créez un compte gratuit (ou connectez-vous)
3. Cliquez sur "My Apps" puis "Create a new app"
4. Remplissez les informations :
   - **Application Name**: Epikodi (ou le nom de votre choix)
   - **Application Description**: Personal media center
   - **Website**: http://localhost:3000 (pour le développement)
5. Une fois créé, copiez votre **Client ID**

## ⚙️ Configuration dans Epikodi

### Option 1: Via le fichier .env (Recommandé)

1. Ouvrez le fichier `.env` à la racine du projet
2. Remplacez `your_jamendo_api_key_here` par votre Client ID :
   ```env
   VITE_JAMENDO_API_KEY="votre_client_id_ici"
   ```
3. Redémarrez le serveur de développement

### Option 2: Via l'interface Settings

1. Lancez Epikodi
2. Allez dans **Settings** (⚙️)
3. Dans la section "Jamendo Configuration"
4. Collez votre Client ID dans le champ "Client ID"
5. Cliquez hors du champ pour sauvegarder

## 🎶 Utilisation

Une fois configuré, vous pouvez :

1. **Découvrir de la musique libre** :
   - Allez dans **Free Music** (Radio 📻) dans le menu
   - Parcourez les morceaux populaires
   - Recherchez par titre, artiste ou album
   - Filtrez par genre (rock, pop, electronic, jazz, etc.)

2. **Écouter directement** :
   - Cliquez sur le bouton Play (▶️) pour écouter immédiatement
   - Le morceau sera ajouté à la queue de lecture

3. **Ajouter à votre bibliothèque** :
   - Cliquez sur l'icône téléchargement (☁️↓)
   - Le morceau sera disponible dans "All Tracks"
   - Vous pourrez l'ajouter à vos playlists

4. **Vérifier les licences** :
   - Cliquez sur l'icône info (ℹ️) pour voir la licence Creative Commons
   - Important pour une utilisation commerciale

## 📋 Limites et Notes

- **Limite de requêtes**: 20 000 requêtes/jour en mode gratuit
- **Streaming**: Les morceaux sont streamés directement depuis Jamendo
- **Licences**: Vérifiez toujours la licence avant usage commercial
- **Attribution**: Certaines licences nécessitent de créditer l'artiste

## 🎯 Fonctionnalités disponibles

- ✅ Recherche globale (titre, artiste, album)
- ✅ Morceaux populaires
- ✅ Filtrage par genre (10 genres disponibles)
- ✅ Lecture directe via AudioPlayer
- ✅ Ajout à la bibliothèque locale
- ✅ Liens vers les licences Creative Commons
- ✅ Interface responsive (desktop et mobile)

## 🔗 Liens utiles

- [Jamendo Developer Portal](https://devportal.jamendo.com/)
- [Documentation API Jamendo](https://developer.jamendo.com/v3.0)
- [Licences Creative Commons](https://creativecommons.org/licenses/)
- [Catalogue Jamendo](https://www.jamendo.com/)

## 🐛 Dépannage

### La page affiche "Jamendo API Key Required"
→ Vérifiez que votre clé est correctement ajoutée dans Settings ou dans le fichier .env

### Aucun résultat ne s'affiche
→ Vérifiez votre connexion internet
→ Vérifiez que votre Client ID est valide
→ Consultez la console du navigateur pour les erreurs

### Le streaming ne fonctionne pas
→ Vérifiez que votre navigateur autorise l'autoplay
→ Certains bloqueurs de pub peuvent bloquer le streaming

## 💡 Astuce

Pour une meilleure expérience, ajoutez votre clé Jamendo dès maintenant :
1. Copiez votre Client ID depuis le Developer Portal
2. Collez-le dans le fichier `.env` : `VITE_JAMENDO_API_KEY="votre_clé"`
3. Redémarrez le serveur : `npm run dev`
4. Accédez à "Free Music" et profitez de 600 000+ titres ! 🎵
