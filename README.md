# ThinkLedger 📝

A modern, full-stack blogging platform built with React and Appwrite, designed for writers and content creators to share their thoughts and stories with the world.

![ThinkLedger](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Appwrite](https://img.shields.io/badge/Appwrite-18.2.0-orange?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔐 Authentication & User Management
- **Secure User Registration & Login** - Built with Appwrite authentication
- **Session Management** - Persistent user sessions with automatic token handling
- **Protected Routes** - Role-based access control for authenticated users

### 📝 Content Management
- **Rich Text Editor** - Powered by TinyMCE for advanced content creation
- **Post Creation & Editing** - Create, edit, and manage your blog posts
- **Image Upload** - Support for featured images with cloud storage
- **Slug Generation** - Automatic URL-friendly slug creation from titles
- **Content Validation** - Built-in content length and format validation

### 🎨 User Experience
- **Modern UI/UX** - Beautiful gradient design with Tailwind CSS
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Loading States** - Smooth loading animations and user feedback
- **Error Handling** - Comprehensive error handling with user-friendly messages

### 📱 Technical Features
- **Redux State Management** - Centralized state management with Redux Toolkit
- **React Router** - Client-side routing with protected routes
- **Form Handling** - Advanced form management with React Hook Form
- **Real-time Updates** - Dynamic content updates without page refresh

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **React Router DOM 7.7.1** - Client-side routing
- **React Hook Form 7.61.1** - Performant forms with easy validation

### State Management
- **Redux Toolkit 2.8.2** - Modern Redux with simplified setup
- **React Redux 9.2.0** - React bindings for Redux

### Backend & Services
- **Appwrite 18.2.0** - Backend-as-a-Service platform
  - Authentication & Authorization
  - Database management
  - File storage
  - Real-time features

### Rich Text Editing
- **TinyMCE React 6.3.0** - Professional rich text editor
- **HTML React Parser 5.2.6** - Safe HTML rendering

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript Support** - Type definitions for better development experience

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Appwrite account and project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/thinkledger.git
   cd thinkledger
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_APPWRITE_URL=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   ```

4. **Appwrite Configuration**
   
   Set up your Appwrite project with:
   - Database with a collection for posts
   - Storage bucket for images
   - Proper permissions and security rules

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application.

## 📁 Project Structure

```
ThinkLedger/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── AuthLayout.jsx # Authentication layout wrapper
│   │   ├── Button.jsx     # Custom button component
│   │   ├── Input.jsx      # Form input component
│   │   ├── RTE.jsx        # Rich text editor wrapper
│   │   └── post/          # Post-related components
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── Login.jsx      # Login page
│   │   ├── Signup.jsx     # Registration page
│   │   ├── AddPost.jsx    # Create post page
│   │   ├── EditPost.jsx   # Edit post page
│   │   ├── AllPosts.jsx   # Posts listing page
│   │   └── Post.jsx       # Individual post view
│   ├── services/          # API and service layer
│   │   ├── auth.js        # Authentication service
│   │   └── settings.js    # Database and storage service
│   ├── store/             # Redux store configuration
│   │   ├── authSlice.js   # Authentication state slice
│   │   └── store.js       # Redux store setup
│   ├── config/            # Configuration files
│   │   └── config.js      # App configuration
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Application entry point
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
```

## 🎯 Usage

### For Users

1. **Registration/Login**
   - Visit the homepage and click "Sign In" or "Create Account"
   - Complete the registration process with your email and password
   - Log in to access your dashboard

2. **Creating Posts**
   - Navigate to "Add Post" from the header menu
   - Fill in the title, content, and upload a featured image
   - Use the rich text editor for formatting
   - Set the post status and publish

3. **Managing Posts**
   - View all your posts in the "All Posts" section
   - Edit existing posts by clicking the edit button
   - Delete posts as needed

### For Developers

1. **Adding New Features**
   - Follow the existing component structure
   - Use Redux for state management
   - Implement proper error handling
   - Add loading states for better UX

2. **Styling**
   - Use Tailwind CSS classes for styling
   - Follow the existing design patterns
   - Maintain responsive design principles

3. **API Integration**
   - Extend the services in the `services/` directory
   - Use the existing Appwrite client configuration
   - Implement proper error handling

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Netlify

1. **Connect your repository to Netlify**
2. **Set build command**: `npm run build`
3. **Set publish directory**: `dist`
4. **Configure environment variables**
5. **Deploy**

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your web server

3. **Configure your web server** to serve the static files

## 🔒 Security Features

- **Input Validation** - All user inputs are validated
- **XSS Protection** - Safe HTML rendering with html-react-parser
- **Authentication** - Secure session management with Appwrite
- **Protected Routes** - Role-based access control
- **Error Handling** - Comprehensive error handling without exposing sensitive information

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and structure
- Add proper error handling
- Include loading states for better UX
- Write meaningful commit messages
- Test your changes thoroughly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Appwrite** - For providing an excellent backend-as-a-service platform
- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **TinyMCE** - For the rich text editor component

## 📞 Support

If you have any questions or need help:

- **Create an issue** on GitHub
- **Check the documentation** for common questions
- **Review the code** for implementation details

---

**Built with ❤️ using React and Appwrite**

*ThinkLedger - Where thoughts become stories*
