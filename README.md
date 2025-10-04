# 🎲 Lanceur de Dés Biaisés

Une application web interactive qui permet de lancer des dés avec une probabilité biaisée favorisant les chiffres élevés.

## 🚀 Fonctionnalités

- **Sélection du nombre de dés** : Choisissez entre 1 et 10 dés à lancer
- **Nombre de faces personnalisable** : Définissez le nombre de faces par dé (2 à 20 faces, 6 par défaut)
- **Probabilités personnalisables** : Définissez les probabilités de chaque face directement depuis l'interface
- **Probabilités biaisées par défaut** : Configuration initiale favorisant les chiffres élevés :
  - Face 1 : 5%
  - Face 2 : 8%
  - Face 3 : 12%
  - Face 4 : 20%
  - Face 5 : 25%
  - Face 6 : 30%
- **Cohérence des dés** : Contrôlez le pourcentage de chance que les dés montrent des valeurs similaires (0% à 100%)
- **Interface moderne** : Design responsive et animations fluides
- **Historique des lancers** : Consultez les 10 derniers lancers avec horodatage et niveau de cohérence
- **Animations** : Effet de rotation lors du lancement des dés
- **Validation intelligente** : Normalisation automatique des probabilités et alertes de validation

## 🎯 Comment utiliser

1. Ouvrez le fichier `index.html` dans votre navigateur web
2. Sélectionnez le nombre de dés souhaité (1 à 10)
3. Ajustez le niveau de cohérence avec le slider (0% = dés indépendants, 100% = dés identiques)
4. Cliquez sur "Lancer les dés" ou appuyez sur Entrée
5. Observez les résultats avec le total et l'historique

### 🎲 Cohérence des dés

La fonctionnalité de cohérence permet de contrôler la similarité entre les dés lors d'un même lancement :

- **0%** : Chaque dé est lancé indépendamment avec les probabilités biaisées
- **50%** : Les dés ont 50% de chance de montrer des valeurs similaires au premier dé
- **100%** : Tous les dés montrent la même valeur (ou des valeurs très proches)

Cette fonctionnalité est utile pour créer des effets dramatiques ou des situations où les dés "s'accordent" entre eux.

### 🎯 Nombre de faces personnalisable

L'application permet de définir le nombre de faces par dé :

- **Plage de valeurs** : 2 à 20 faces par dé
- **Valeur par défaut** : 6 faces (dé classique)
- **Génération automatique** : Les contrôles de probabilité se mettent à jour automatiquement
- **Probabilités intelligentes** : Pour les dés non-6 faces, génération automatique d'un biais progressif
- **Affichage adaptatif** : Les dés s'ajustent visuellement selon la valeur affichée

#### Exemples d'utilisation :
- **Dé à 2 faces** : Pile ou face (1 ou 2)
- **Dé à 4 faces** : Tétraèdre classique
- **Dé à 8 faces** : Octaèdre
- **Dé à 10 faces** : Pour les jeux de rôle
- **Dé à 12 faces** : Dodécaèdre
- **Dé à 20 faces** : Icosaèdre (D20 classique)

### 🎯 Probabilités personnalisées

L'application permet de définir vos propres probabilités pour chaque face du dé :

- **Modification en temps réel** : Changez les valeurs et voyez les barres se mettre à jour instantanément
- **Validation automatique** : Le total est affiché en couleur (vert=100%, rouge>100%, orange<100%)
- **Bouton "Réinitialiser"** : Remet les probabilités par défaut
- **Bouton "Normaliser"** : Ajuste automatiquement les valeurs pour totaliser 100%
- **Gestion des erreurs** : Alertes si toutes les probabilités sont à 0 ou si le total n'est pas 100%

#### Exemples de configurations :
- **Dés équiprobables** : 16.67% pour chaque face
- **Dés favorisant les faibles** : 30%, 25%, 20%, 12%, 8%, 5%
- **Dés extrêmes** : 50% pour 1 et 6, 0% pour les autres

## 🛠️ Technologies utilisées

- **HTML5** : Structure de la page
- **CSS3** : Styles et animations
- **JavaScript** : Logique des dés biaisés et interactions

## 📁 Structure du projet

```
dice/
├── index.html      # Page principale
├── script.js       # Logique JavaScript
├── style.css       # Styles CSS
└── README.md       # Documentation
```

## 🎲 Algorithme des dés biaisés

L'application utilise un algorithme de probabilité cumulative pour générer des résultats biaisés :

1. Un nombre aléatoire entre 0 et 1 est généré
2. Les probabilités cumulatives sont calculées
3. Le premier chiffre dont la probabilité cumulative dépasse le nombre aléatoire est retourné

Cette méthode garantit que les chiffres élevés ont effectivement plus de chances d'apparaître.

## 🧪 Test des probabilités

Pour tester les probabilités en console, utilisez :
```javascript
testProbabilities(10000); // Teste sur 10 000 lancers
```

## 📱 Compatibilité

- Compatible avec tous les navigateurs modernes
- Interface responsive pour mobile et desktop
- Fonctionne sans connexion internet
