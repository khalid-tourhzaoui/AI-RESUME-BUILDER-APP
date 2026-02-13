# 🚀 AI Resume Builder - Builder de CV Intelligent

<div align="center">

![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Inertia](https://img.shields.io/badge/Inertia.js-1.0-9553E9?style=for-the-badge&logo=inertia)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)

**Application web moderne pour créer des CV professionnels avec l'aide de l'IA**

[🌐 Demo en ligne](#) • [📖 Documentation](#-installation) • [🎯 Fonctionnalités](#-fonctionnalités)

</div>

---

## 📑 Table des matières

- [À propos du projet](#-à-propos-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Technologies utilisées](#-technologies-utilisées)
- [Installation](#-installation)
- [Structure du projet](#-structure-du-projet)


---

## 🎯 À propos du projet

**AI Resume Builder** est une application web full-stack construite avec **Laravel** et **React (Inertia.js)**, permettant aux utilisateurs de créer, gérer et partager des CV professionnels avec l'assistance de l'intelligence artificielle. Le projet combine la puissance du backend Laravel avec une interface utilisateur moderne et réactive en React.

### 🎨 Concept du Design
- **Interface Brutalist** - Design moderne avec bordures épaisses et ombres prononcées
- **Système de cartes** - Organisation visuelle claire des CV
- **Preview en temps réel** - Visualisation instantanée des modifications
- **Partage intelligent** - Système de liens publics/privés
- **Responsive Design** - Adaptation parfaite sur tous les appareils
- **Animations fluides** - Transitions et effets visuels soignés

---

## ✨ Fonctionnalités

### 👤 Gestion des Utilisateurs
- ✅ **Authentification complète** - Inscription, connexion, réinitialisation de mot de passe
- ✅ **OAuth Social** - Connexion via Google/GitHub avec Laravel Socialite
- ✅ **Profil utilisateur** - Gestion des informations personnelles
- ✅ **Vérification email** - Système de vérification d'email intégré
- ✅ **Gestion de session** - Sécurité et persistance des données

### 📄 Gestion des CV
- ⚡ **Création rapide** - Interface intuitive pour créer des CV
- 🎨 **Thèmes personnalisables** - Choix de couleurs pour chaque CV
- 📊 **Sections structurées** - Informations personnelles, expérience, éducation, compétences
- 🔄 **Édition en temps réel** - Modifications instantanées avec preview
- 🗑️ **Système d'archivage** - Gestion des CV archivés/actifs
- 📱 **Export et partage** - Téléchargement PDF et liens de partage

### 🤖 Intelligence Artificielle
- 🧠 **Génération de contenu** - Utilisation de Google Gemini AI
- ✍️ **Suggestions automatiques** - Aide à la rédaction de résumés et descriptions
- 🎯 **Optimisation** - Amélioration du contenu avec l'IA
- 💡 **Recommandations** - Suggestions contextuelles pour améliorer le CV

### 🎨 Interface Utilisateur
- ✅ **Design Brutalist** - Style moderne avec effets de profondeur
- ✅ **Composants UI modernes** - Bibliothèque Radix UI et shadcn/ui
- ✅ **Animations** - Transitions fluides avec Tailwind Animate
- ✅ **Preview Modal** - Visualisation complète en modal
- ✅ **Drag & Drop** - Upload de photos de profil
- 📱 **Mobile First** - Responsive sur tous les appareils

### 🔒 Sécurité & Partage
- 🔐 **Statuts de partage** - Public, privé, archivé
- 🌐 **Liens publics** - Génération de liens partageables
- 📋 **Copie rapide** - Système de copie d'URL avec feedback
- 🔄 **Toggle visibilité** - Basculer facilement entre public/privé
- 🛡️ **Protection des données** - Middleware de sécurité Laravel

---

## 🏗️ Architecture

### Stack Technique

**Backend (Laravel)**
```
API Routes → Controllers → Models → Database
     ↓
Middleware (Auth, Logging)
     ↓
Inertia.js Response
```

**Frontend (React + Inertia)**
```
Pages → Components → UI Components → Tailwind CSS
   ↓
Hooks & State Management
   ↓
API Calls via Inertia.js
```

### Sections Principales

#### 1️⃣ **Dashboard**
- Vue d'ensemble des CV créés
- Statistiques et activité récente
- Accès rapide aux actions principales
- Liste des CV avec statuts visuels

#### 2️⃣ **Gestion des CV**
Interface complète incluant :
- **AddResume** - Création de nouveaux CV
- **EditResume** - Modification des CV existants
- **ResumeList** - Liste avec filtres et recherche
- **TrashListBox** - Gestion des CV archivés
- **PreviewModal** - Visualisation en plein écran

#### 3️⃣ **Formulaires de Sections**
- **PersonalInfoForm** - Informations personnelles avec photo
- **SummaryForm** - Résumé professionnel avec assistance IA
- **ExperienceForm** - Expériences professionnelles
- **EducationForm** - Parcours académique
- **SkillsForm** - Compétences techniques et soft skills
- **LanguageForm** - Langues parlées
- **SocialMedia** - Liens réseaux sociaux

#### 4️⃣ **Preview & Export**
- **ResumePreview** - Rendu final du CV
- **Download** - Export en PDF
- **Share** - Partage public avec lien unique
- **TopSection** - Actions rapides (Preview, Share, Download, More)

#### 5️⃣ **Profil Utilisateur**
- **UpdateProfileInformation** - Modification des infos
- **UpdatePassword** - Changement de mot de passe
- **DeleteUserForm** - Suppression du compte

---

## 🛠️ Technologies utilisées

### **Backend Framework**
- **Laravel** `11.x` - Framework PHP moderne et élégant
- **MySQL** `8.0` - Base de données relationnelle
- **Laravel Socialite** - Authentification OAuth
- **Inertia.js** `1.0` - Monolithe moderne SPA

### **Frontend Framework**
- **React** `18.2.0` - Bibliothèque UI
- **Inertia.js React Adapter** - Intégration Laravel-React
- **Vite** `6.x` - Build tool ultra-rapide

### **Styling & UI**
- **Tailwind CSS** `3.4` - Framework CSS utility-first
- **Tailwind Animate** - Animations CSS
- **Tailwind Forms** - Styles de formulaires
- **Radix UI** - Composants accessibles
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-popover`
  - `@radix-ui/react-select`
  - `@radix-ui/react-avatar`
- **shadcn/ui** - Composants UI modernes

### **Icons & Assets**
- **Lucide React** - Bibliothèque d'icônes moderne
- **React Icons** - Collection d'icônes variées

### **AI & External Services**
- **Google Generative AI (Gemini)** - Génération de contenu
- **Google OAuth** - Authentification sociale
- **GitHub OAuth** - Authentification développeurs

### **Utilities**
- **clsx** - Gestion des classes CSS
- **tailwind-merge** - Fusion de classes Tailwind
- **class-variance-authority** - Variantes de composants
- **react-hook-form** - Gestion de formulaires
- **i18next** - Internationalisation (EN/FR)

### **Development Tools**
- **Composer** - Gestionnaire de dépendances PHP
- **npm** - Gestionnaire de paquets JavaScript
- **XAMPP** - Environnement de développement local

---

## ⚙️ Installation

### Prérequis
- PHP >= 8.2
- Composer
- Node.js >= 18.0.0
- MySQL >= 8.0
- XAMPP ou équivalent (Apache + MySQL)
- Compte Google Cloud (pour Gemini AI)

### Étapes d'installation

#### 1. **Cloner le dépôt**
```bash
git clone https://github.com/khalid-tourhzaoui/AI-RESUME-BUILDER-APP.git
cd AI-RESUME-BUILDER-APP
```

#### 2. **Configuration Backend (Laravel)**

```bash
# Installer les dépendances PHP
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate
```

#### 3. **Configuration Base de Données**

Éditez le fichier `.env` :
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ai_resume_builder
DB_USERNAME=root
DB_PASSWORD=
```

Créer la base de données :
```bash
# Via MySQL CLI ou phpMyAdmin
CREATE DATABASE ai_resume_builder;
```

Exécuter les migrations :
```bash
php artisan migrate
```

#### 4. **Configuration OAuth & AI**

Dans le fichier `.env`, ajoutez :
```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=http://localhost:8000/auth/github/callback

# Google Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key
```

#### 5. **Configuration Frontend (React)**

```bash
# Installer les dépendances JavaScript
npm install

# Construire les assets
npm run build

# Ou en mode développement
npm run dev
```

#### 6. **Créer le lien de stockage**

```bash
php artisan storage:link
```

#### 7. **Lancer l'application**

```bash
# Terminal 1 - Laravel Server
php artisan serve

# Terminal 2 - Vite Dev Server (si en développement)
npm run dev
```

L'application sera accessible sur `http://localhost:8000`

### Configuration optionnelle

#### Seeder (données de test)
```bash
php artisan db:seed
```

#### Cache et optimisation
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 📁 Structure du projet

```
AI-RESUME-BUILDER/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/                    # Authentification
│   │   │   ├── DocumentController.php   # Gestion des CV
│   │   │   ├── EducationController.php  # Éducation
│   │   │   ├── ExperienceController.php # Expérience
│   │   │   ├── PersonalInfoController.php
│   │   │   └── ProfileController.php
│   │   ├── Middleware/
│   │   │   ├── HandleInertiaRequests.php
│   │   │   └── LogAccessMiddleware.php
│   │   └── Requests/                    # Form Requests
│   └── Models/
│       ├── Document.php
│       ├── Education.php
│       ├── Experience.php
│       ├── PersonalInfo.php
│       ├── Skill.php
│       ├── SocialMedia.php
│       ├── Language.php
│       ├── Hobbie.php
│       └── User.php
├── database/
│   ├── migrations/                       # Schémas de base de données
│   ├── factories/                        # Factories pour tests
│   └── seeders/                          # Données de test
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   │   ├── ui/                      # Composants UI réutilisables
│   │   │   ├── ApplicationLogo.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── Pages/
│   │   │   ├── Auth/                    # Pages d'authentification
│   │   │   ├── Profile/                 # Pages de profil
│   │   │   ├── components/
│   │   │   │   ├── Preview/            # Composants de preview
│   │   │   │   ├── common/             # Composants communs
│   │   │   │   ├── forms/              # Formulaires
│   │   │   │   ├── editor/             # Éditeur de CV
│   │   │   │   ├── errors/             # Pages d'erreur
│   │   │   │   └── skeleton-loader/    # Chargements
│   │   │   ├── Dashboard.jsx           # Tableau de bord
│   │   │   └── Welcome.jsx             # Page d'accueil
│   │   ├── Layouts/
│   │   │   ├── AuthenticatedLayout.jsx
│   │   │   └── GuestLayout.jsx
│   │   ├── lib/
│   │   │   ├── google-ai-model.js      # Configuration Gemini
│   │   │   ├── helper.js
│   │   │   └── utils.js
│   │   ├── locales/                     # Fichiers i18n
│   │   │   ├── en.json
│   │   │   └── fr.json
│   │   ├── app.jsx                      # Point d'entrée React
│   │   └── i18n.js                      # Configuration i18n
│   ├── css/
│   │   └── app.css                      # Styles globaux
│   └── views/
│       └── app.blade.php                # Template principal
├── routes/
│   ├── web.php                          # Routes web
│   ├── auth.php                         # Routes auth
│   └── console.php                      # Routes console
├── public/
│   ├── assets/                          # Assets publics
│   └── storage/                         # Fichiers uploadés
├── storage/
│   └── app/
│       └── public/
│           └── profile-images/          # Photos de profil
├── .env.example                         # Variables d'environnement
├── composer.json                        # Dépendances PHP
├── package.json                         # Dépendances JS
├── tailwind.config.js                   # Config Tailwind
├── vite.config.js                       # Config Vite
└── README.md                            # Ce fichier
```

---

## 🌐 Internationalisation

L'application supporte plusieurs langues :

```javascript
// Langues disponibles
- Français (FR)
- English (EN)

// Utilisation
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();
i18n.changeLanguage('fr');
```

---

<div align="center">

### 🚀 Construit avec passion et innovation

**Fait avec ❤️ et ☕**

[![Made with Laravel](https://img.shields.io/badge/Made%20with-Laravel-FF2D20?style=flat&logo=laravel)](https://laravel.com/)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Powered by AI](https://img.shields.io/badge/Powered%20by-AI-4285F4?style=flat&logo=google)](https://ai.google.dev/)

---

**⭐ N'oubliez pas de donner une étoile si ce projet vous a aidé !**

</div>
