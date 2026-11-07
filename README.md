# UniHealth Pharmacy Management Portal

A clinical pharmacy workspace interface for inventory, reservations, alerts, and analytics. This repository currently ships a static prototype; it is not approved to process real prescription, inventory, or patient data until it is connected to the authenticated UniHealth API.

## 🚀 Quick Start

### Local Development
```bash
# Open index.html directly in your browser, or:
python -m http.server 5001
# Then visit http://localhost:5001
```

### Prototype access

The browser UI may be used for design review only. Client-side login, locally generated OTPs, and browser storage do not provide authentication and must not be used with real users or data.

## 🏗️ Architecture

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML5, CSS3, JavaScript |
| Database | Pending shared UniHealth API migration |
| Authentication | Pending server-side identity and role controls |
| Design System | Clinical Teal `#0891B2`, Figtree + Noto Sans |
| Accessibility | WCAG AAA, keyboard shortcuts, ARIA live regions |

## 📋 Features

- **Dashboard** — Real-time inventory overview with sync timestamps
- **Inventory Management** — Drug catalog with stock levels, expiry tracking, batch codes
- **Patient Reservations** — Prescription hold queue with pickup status
- **Stock Alerts** — Low-stock threshold warnings and expiry notifications
- **Analytics** — Sales trends, top medications, revenue breakdowns
- **Dark Mode** — Full light/dark theme toggle with system preference detection
- **PWA Support** — Standalone tablet mode via `manifest.json`
- **Keyboard Navigation** — `Alt+D` Dashboard, `Alt+I` Inventory, `Alt+R` Reservations, `Alt+A` Alerts, `Alt+N` Analytics, `Alt+L` Logout

## 🎨 Design System

Built on the **UniHealth Clinical Teal Design System**:
- Primary: `#0891B2` (Clinical Teal)
- Typography: Figtree 400–800 + Noto Sans 400–700
- Touch targets: 44dp minimum
- Print stylesheet for clinical invoices

See [`design-system/MASTER.md`](design-system/MASTER.md) for full documentation.

## 📄 License

Private — UniHealth Healthcare Platform

