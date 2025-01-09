# AI Resume Builder 📄

### ❤️ Support
If you find this project helpful, please consider giving this repository a ⭐️ on GitHub, and don't forget to **like**, **share**, and **subscribe** to support our journey!

## **Table of Contents**
- [About the Project](#about-the-project)
- [Features](#features)
- [Components](#components)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
  - [Usage Examples](#example-use-cases)
- [Contact](#contact)

## About the Project
Welcome to the **AI Resume Builder** repository! This innovative project combines Laravel and React Inertia to revolutionize the way resumes are created and managed. By leveraging AI capabilities, our platform offers intelligent suggestions and professional formatting while maintaining an intuitive user experience. Built with modern web technologies, this application streamlines the resume creation process for users worldwide.

## 🌟 Features
- 🔐 **Authentication System**
  - Social login integration (Google, GitHub, Facebook)
  - Secure user authentication with Laravel Breeze
  - Protected resume management

- ➕ **Create Multiple Resumes**
  - Start from scratch or use templates
  - Import existing resumes
  - Save multiple versions

- ✏️ **Edit Resumes in Real-Time**
  - Live preview while editing
  - Auto-save functionality
  - Collaborative editing support

- 🎨 **Customizable Themes**
  - Multiple color schemes
  - Professional layout options
  - Custom formatting settings

- 📄 **Download Resumes in PDF Format**
  - High-quality PDF export
  - Multiple paper size options
  - Custom header and footer options

- 🗂️ **Manage Resumes with Folder Structure**
  - Organize by categories
  - Create custom folders
  - Easy drag-and-drop organization

- 🔗 **Share Resumes via Public Links**
  - Generate shareable links
  - Password protection option
  - Expiry date setting

- 🤖 **AI-Powered Resume Suggestions**
  - Smart content recommendations
  - Professional writing assistance
  - Keyword optimization

- 🌐 **Multi-Language Support**
  - English interface
  - French interface
  - Arabic interface
  - Easy language switching

## Components
- **User Authentication Module**
  - Social login integration
  - User profile management
  - Session handling

- **Resume Builder Core**
  - Template engine
  - Section manager
  - Real-time preview

- **AI Integration**
  - Content suggestion engine
  - Writing assistant
  - Format optimization

- **File Management**
  - PDF generation
  - File storage
  - Version control

## Technologies Used
### Backend
- Laravel 10
- MySQL Database
- Laravel Breeze
- Inertia.js

### Frontend
- React.js
- TailwindCSS
- Aceternity UI Pro
- Font Awesome Icons

### Authentication
- Laravel Breeze
- Social OAuth (Google, GitHub, Facebook)

## ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/khalid-tourhzaoui/AI-RESUME-BUILDER-APP.git
cd AI-RESUME-BUILDER-APP
```

2. Install dependencies:
```bash
composer install
npm install
```

3. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

4. Set up database:
```bash
php artisan migrate
```

5. Start development servers:
```bash
php artisan serve
npm run dev
```

## Usage
### Example Use Cases
1. **Creating a New Resume**
   - Log in to your account
   - Click "Create New Resume"
   - Fill in your information
   - Save and export

2. **Editing Existing Resume**
   - Access your dashboard
   - Select the resume to edit
   - Make changes in real-time
   - Save automatically

3. **Sharing Your Resume**
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
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
- **Email:** [khalidtourhzaoui@gmail.com](mailto:khalidtourhzaoui@gmail.com)
- **LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/khalid-tourhzaoui/)
- **My website:** [Contact me](https://khalid-tourhzaoui.vercel.app/contactme)
