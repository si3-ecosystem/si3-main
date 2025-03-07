# Si<3>

## 📂 Folder Structure

The project follows a well-organized structure to ensure clarity and scalability:

```
app/
 ├── (main)/                      # Public-facing pages
 │    ├── home/
 │    │    ├── page.tsx
 │    │    ├── layout.tsx
 │    ├── about/
 │    │    ├── page.tsx
 │    ├── community/
 │    │    ├── page.tsx
 │
 │
 ├── (auth)/                      # Authentication pages
 │    ├── login/
 │    │    ├── page.tsx
 │    ├── onboard/
 │    │    ├── page.tsx
 │
 ├── /explorer                    # Explorer module
 │    ├── page.tsx
 │    ├── layout.tsx
 │
 ├── api/                         # API routes
 │    ├── auth/
 │    │    ├── route.ts

components/                       # Centralized components
 │    ├── layout/                 # Shared layouts
 │    ├── home/                   # Home page components
 │    ├── about/                  # About page components
 │    ├── community/              # Community components
 │    ├── cms/                    # CMS components
 │    ├── explorer/               # Explorer components
 │    ├── ui/                     # Common UI components (Buttons, Cards, Modals, Loaders)
 │

lib/                              # Utility functions and API handlers
 │    ├── auth.ts
 │    ├── api.ts
 │    ├── utils.ts

config/                           # Configuration files
 │    ├── wagmiConfig.ts

public/                           # Static assets
 │    ├── logo.png
 │    ├── background.jpg
 │

middleware.ts                     # Middleware configurations
```

## 🛠️ Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (Latest LTS recommended)
- **Yarn or npm** (Package manager)
- **MongoDB Atlas or Convex Database** (Database backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/si3-ecosystem/si3_main
```

```bash
# Navigate to the project directory
cd project-name
```

```bash
# Install dependencies
npm install  # or yarn install
```

#### Set up environment variables (create a .env file)

- NEXT_PUBLIC_API_URL=[YOUR_API_URL]
- DATABASE_URL=[YOUR_DATABASE_URL]

```bash
# Run the development server
npm run dev  # or yarn dev
```

```bash
# Open the app in your browser
http://localhost:3000
```

✨ Code of Conduct

All developers must adhere to the project's Code of Conduct to ensure a respectful and productive work environment. Always follow best practices, maintain clean and readable code, and document your changes when necessary.

💻 Need Help?

If you have any issues, reach out to the project lead or team members on Slack/Discord. We’re here to help!

🔒 License & Copyright

This project is proprietary and not open-source. Unauthorized distribution or sharing of the code is strictly prohibited.
