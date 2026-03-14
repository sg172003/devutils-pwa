<p align="center">
  <img src="public/devutils-icon.svg" alt="DevUtils Logo" width="80" height="80" />
</p>

<h1 align="center">DevUtils</h1>

<p align="center">
  <strong>Developer Utilities. Fast. Private. Client-side.</strong>
</p>

<p align="center">
  Essential developer tools that run entirely in your browser.
  <br />
  No server calls. No tracking. Complete privacy for your sensitive data.
</p>

<p align="center">
  <a href="https://devutils-pwa.vercel.app">Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#available-scripts">Scripts</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## Demo

🌐 **Live:** [devutils-pwa.vercel.app](https://devutils-pwa.vercel.app)

---

## Features

### 🔧 Developer Tools

| Tool | Description |
|------|-------------|
| **JSON Formatter** | Validate, format, and minify JSON data with syntax highlighting and tree view |
| **JWT Decoder** | Decode and inspect JSON Web Tokens — verify claims, standard fields, and expiry client-side |
| **Dummy Data Generator** | Generate random users, addresses, credit cards, and more for testing |

### ✨ Why DevUtils?

- **🔒 Privacy First** — Your data never leaves your browser. All processing happens locally, so API keys, tokens, and config files stay safe.
- **⚡ Lightning Fast** — Zero network latency. Tools load instantly and handle large payloads without server round-trips.
- **📶 Works Offline** — Installable as a PWA. Use DevUtils even without an internet connection.
- **🌗 Dark / Light Theme** — Automatic theme detection with a manual toggle.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [React 19](https://react.dev/) with functional components & hooks |
| Language | [TypeScript 5.9](https://www.typescriptlang.org/) |
| Build Tool | [Vite 7](https://vite.dev/) |
| Styling | Vanilla CSS with custom properties (CSS variables) |
| Routing | [React Router 7](https://reactrouter.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| PWA | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox) |
| Testing | [Vitest](https://vitest.dev/) |
| Linting | [ESLint 9](https://eslint.org/) with TypeScript & React plugins |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v18+**
- [npm](https://www.npmjs.com/) **v9+** (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sg172003/devutils-pwa.git
cd devutils-pwa

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** by default.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check with `tsc` and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the entire project |
| `npx vitest` | Run unit tests in watch mode |
| `npx vitest run` | Run unit tests once (CI-friendly) |

---

## Project Structure

```
DevUtils/
├── public/                  # Static assets (PWA icons, favicon)
├── src/
│   ├── components/          # Shared UI components
│   │   ├── ErrorBoundary.tsx # Global error boundary
│   │   ├── Footer.tsx       # Site footer
│   │   ├── Logo.tsx         # Brand logo component
│   │   └── Navbar.tsx       # Navigation bar with theme toggle
│   ├── context/
│   │   └── ThemeContext.tsx  # Dark / light theme provider
│   ├── pages/
│   │   ├── Home.tsx         # Landing page
│   │   ├── JsonFormatter.tsx
│   │   ├── JwtDecoder.tsx
│   │   ├── DummyData.tsx
│   │   ├── Contributing.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   └── TermsOfService.tsx
│   ├── utils/               # Pure utility functions (no side effects)
│   │   ├── jsonUtils.ts
│   │   ├── jwtUtils.ts
│   │   └── dummyDataUtils.ts
│   ├── __tests__/           # Unit tests (mirroring utils/)
│   │   ├── jsonUtils.test.ts
│   │   ├── jwtUtils.test.ts
│   │   └── dummyDataUtils.test.ts
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles & design tokens
├── index.html               # HTML shell with SEO meta tags
├── vite.config.ts           # Vite + PWA configuration
├── tsconfig.json            # TypeScript project references
├── eslint.config.js         # ESLint flat config
└── package.json
```

---

## Contributing

Contributions are welcome! Whether you're fixing a bug, adding a new tool, or improving docs — every contribution matters.

### Quick Start

1. **Fork** the repository and clone your fork.
2. Create a **feature branch** from `main` (`git checkout -b feat/my-feature`).
3. Make your changes and write/update tests.
4. Ensure all tests pass (`npx vitest run`) and the build succeeds (`npm run build`).
5. Open a **Pull Request** with a clear title and description.

### Guidelines

- Keep PRs focused — one feature or fix per pull request.
- Follow existing code style and conventions.
- All tools **must** work client-side only — no server calls.
- Write tests for new utilities.
- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages (e.g., `feat:`, `fix:`, `docs:`).

See the [Contributing page](./src/pages/Contributing.tsx) in the app for more details.

---

## Security

All data processing in DevUtils happens **entirely in the browser**. No data is ever transmitted to any server.

> **Note:** The JWT Decoder inspects token structure and claims. It does **not** perform cryptographic signature verification. Never trust tokens based solely on decoded output.

If you discover a security vulnerability, please report it responsibly by opening a private issue or contacting the maintainers directly.

---

## Roadmap

Planned tools and improvements for future releases:

- [ ] Base64 Encoder / Decoder
- [ ] URL Encoder / Decoder
- [ ] Hash Generator (MD5, SHA-1, SHA-256)
- [ ] Regex Tester
- [ ] Color Converter (HEX ↔ RGB ↔ HSL)
- [ ] Markdown Previewer
- [ ] Diff Viewer

Have an idea? [Open a feature request](https://github.com/sg172003/devutils-pwa/issues/new)!

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by Sarthak for developers who value privacy.
</p>
