# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| latest  | ✅ Yes             |
| < latest| ❌ No              |

## Architecture

All data processing in DevUtils happens **entirely in the browser**. No user data is transmitted to any server. The JWT Decoder inspects token structure only — it does **not** perform cryptographic signature verification.

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT open a public issue.**
2. Go to the [Security Advisories](https://github.com/sg172003/devutils-pwa/security/advisories) tab.
3. Click **"New draft security advisory"** and provide details.

Alternatively, contact via: **https://github.com/sg172003**

### What to expect

- Acknowledgment within **48 hours**
- Status update within **7 days**
- Fix or disclosure plan within **30 days**

Thank you for helping keep DevUtils safe.