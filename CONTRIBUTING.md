# Contributing to DevUtils

Thanks for your interest in contributing! Every contribution matters — whether it's reporting a bug, suggesting a feature, improving docs, or writing code.

## Getting Started

1. **Fork** the repo and clone your fork:
```bash
   git clone https://github.com/sg172003/devutils-pwa.git
   cd devutils-pwa
   npm install
```

2. **Create a branch** from `main`:
```bash
   git checkout -b feat/my-feature
```

3. **Start the dev server:**
```bash
   npm run dev
```

4. **Run tests** before submitting:
```bash
   npx vitest run
```

## Pull Request Guidelines

- One feature or fix per PR — keep PRs focused
- Write clear commit messages ([Conventional Commits](https://www.conventionalcommits.org/) preferred)
- Add tests for new utilities
- Ensure `npm run build` and `npx vitest run` pass
- All tools **must** work client-side only — no server calls
- Write a clear PR description explaining *what* and *why*

## Project Structure
```
src/
├── components/    # Shared UI components
├── context/       # React context providers
├── pages/         # Page components (tools + legal)
├── utils/         # Pure utility functions
└── __tests__/     # Unit tests
```

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md). Be respectful, constructive, and inclusive.