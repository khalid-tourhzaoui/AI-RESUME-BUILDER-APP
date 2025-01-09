# 📄 AI Resume Builder

### ❤️ Support
If you find this project helpful, please consider giving this repository a ⭐️ on GitHub, and don't forget to **like**, **share**, and **subscribe** to support our journey!

## 📋 **Table of Contents**
- [📌 About the Project](#about-the-project)
- [🌟 Features](#features)
- [🧩 Components](#components)
- [💻 Technologies Used](#technologies-used)
- [⚙️ Installation](#installation)
- [📱 Usage](#usage)
  - [💡 Usage Examples](#example-use-cases)
- [📞 Contact](#contact)

## 📌 About the Project
Welcome to the **AI Resume Builder** repository! This innovative project combines Laravel and React Inertia to revolutionize the way resumes are created and managed. By leveraging AI capabilities, our platform offers intelligent suggestions and professional formatting while maintaining an intuitive user experience.

## 🌟 Features
- 🔐 **Authentication System**
  - <i class="fab fa-google"></i> Google login integration
  - <i class="fab fa-github"></i> GitHub login
  - <i class="fab fa-facebook"></i> Facebook login
  - <i class="fas fa-shield-alt"></i> Secure authentication

- ➕ **Create Multiple Resumes**
  - <i class="fas fa-file-alt"></i> Start from scratch
  - <i class="fas fa-copy"></i> Use templates
  - <i class="fas fa-save"></i> Save multiple versions

- ✏️ **Edit Resumes in Real-Time**
  - <i class="fas fa-eye"></i> Live preview
  - <i class="fas fa-cloud"></i> Auto-save
  - <i class="fas fa-users"></i> Collaborative editing

- 🎨 **Customizable Themes**
  - <i class="fas fa-palette"></i> Color schemes
  - <i class="fas fa-th"></i> Layout options
  - <i class="fas fa-paint-brush"></i> Custom formatting

- 📄 **Download Options**
  - <i class="fas fa-file-pdf"></i> PDF export
  - <i class="fas fa-ruler-combined"></i> Multiple sizes
  - <i class="fas fa-cog"></i> Custom settings

- 🗂️ **Folder Management**
  - <i class="fas fa-folders"></i> Categories
  - <i class="fas fa-folder-plus"></i> Custom folders
  - <i class="fas fa-arrows-alt"></i> Drag-and-drop

- 🔗 **Sharing Features**
  - <i class="fas fa-link"></i> Public links
  - <i class="fas fa-lock"></i> Password protection
  - <i class="fas fa-clock"></i> Expiry settings

- 🌐 **Languages**
  - <i class="fas fa-language"></i> English
  - <i class="fas fa-language"></i> French
  - <i class="fas fa-language"></i> Arabic

## 🧩 Components
- <i class="fas fa-user-shield"></i> **User Authentication Module**
  - Social login integration
  - User profile management
  - Session handling

- <i class="fas fa-tools"></i> **Resume Builder Core**
  - Template engine
  - Section manager
  - Real-time preview

- <i class="fas fa-robot"></i> **AI Integration**
  - Content suggestions
  - Writing assistance
  - Format optimization

- <i class="fas fa-file-archive"></i> **File Management**
  - PDF generation
  - File storage
  - Version control

## 💻 Technologies Used
### <i class="fas fa-server"></i> Backend
- <i class="fab fa-laravel"></i> Laravel 10
- <i class="fas fa-database"></i> MySQL
- <i class="fas fa-shield-alt"></i> Laravel Breeze
- <i class="fas fa-sync"></i> Inertia.js

### <i class="fas fa-desktop"></i> Frontend
- <i class="fab fa-react"></i> React.js
- <i class="fab fa-css3"></i> TailwindCSS
- <i class="fas fa-paint-brush"></i> Aceternity UI Pro
- <i class="fab fa-font-awesome"></i> Font Awesome Icons

### <i class="fas fa-lock"></i> Authentication
- <i class="fas fa-key"></i> Laravel Breeze
- <i class="fas fa-users"></i> Social OAuth

## ⚙️ Installation

1. <i class="fas fa-download"></i> Clone the repository:
```bash
git clone https://github.com/khalid-tourhzaoui/AI-RESUME-BUILDER-APP.git
cd AI-RESUME-BUILDER-APP
```

2. <i class="fas fa-box-open"></i> Install dependencies:
```bash
composer install
npm install
```

3. <i class="fas fa-cogs"></i> Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

4. <i class="fas fa-database"></i> Set up database:
```bash
php artisan migrate
```

5. <i class="fas fa-play"></i> Start development servers:
```bash
php artisan serve
npm run dev
```

## 📱 Usage
### 💡 Example Use Cases
1. <i class="fas fa-file-plus"></i> **Creating a New Resume**
   - Log in to your account
   - Click "Create New Resume"
   - Choose a template
   - Fill in your information
   - Save and export

2. <i class="fas fa-edit"></i> **Editing Existing Resume**
   - Access your dashboard
   - Select the resume to edit
   - Make changes in real-time
   - Save automatically

3. <i class="fas fa-share-alt"></i> **Sharing Your Resume**
   - Generate a public link
   - Set privacy options
   - Share with recruiters

## 🔑 Environment Configuration
```plaintext
APP_NAME="AI Resume Builder"
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=resume_builder
DB_USERNAME=root
DB_PASSWORD=

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

# AI Configuration
AI_API_KEY=
```

## 🌐 Localization
Support for multiple languages:

```php
// resources/lang/en/resume.php, fr/resume.php, ar/resume.php
return [
    'welcome' => 'Welcome to AI Resume Builder',
    'create' => 'Create Resume',
    // ... other translations
];
```

## 🤝 Contributing
1. <i class="fas fa-code-branch"></i> Fork the repository
2. <i class="fas fa-code"></i> Create your feature branch
3. <i class="fas fa-upload"></i> Commit your changes
4. <i class="fas fa-push"></i> Push to the branch
5. <i class="fas fa-check-circle"></i> Open a Pull Request

## 📞 Contact
- <i class="fas fa-envelope"></i> **Email:** [khalidtourhzaoui@gmail.com](mailto:khalidtourhzaoui@gmail.com)
- <i class="fab fa-linkedin"></i> **LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/khalid-tourhzaoui/)
- <i class="fas fa-globe"></i> **My website:** [Contact me](https://khalid-tourhzaoui.vercel.app/contactme)

## 📝 License
<i class="fas fa-balance-scale"></i> This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
