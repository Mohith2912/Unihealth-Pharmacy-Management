# UniHealth Pharmacy Management Portal

A modern clinical pharmacy management system featuring real-time drug inventory tracking, patient reservation handling, stock alerts, and analytics dashboards — powered by Firebase Realtime Database.

## 🚀 Quick Start

### Local Development
```bash
# Open index.html directly in your browser, or:
python -m http.server 5001
# Then visit http://localhost:5001
```

### Demo Access (No Setup Required)
- **Direct Link**: `http://localhost:5001/?demo=true`
- **Demo Pharmacy ID**: `UH_12345`
- **Demo Password**: `Pharmacy@2026`

Click the **"⚡ Direct Demo Login"** button on the sign-in page for instant 1-click access.

## 🏗️ Architecture

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML5, CSS3, JavaScript |
| Database | Firebase Realtime Database |
| Authentication | Client-side with localStorage session |
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
