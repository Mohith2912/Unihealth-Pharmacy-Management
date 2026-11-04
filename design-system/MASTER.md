# UniHealth Pharmacy Management — UI/UX Pro Max Healthcare Design System

Built using the **UI/UX Pro Max skill** recommendations for clinical pharmacy management, real-time medicine inventory, cold-chain monitoring, and prescription reservation dispatch.

---

## 1. Visual Identity & Clinical Aesthetic

- **Domain**: Healthcare, Clinical Dispensation, and Pharmacy SaaS
- **Tone**: Professional, trustworthy, ethical, WCAG AAA compliant, calm medical aesthetic
- **Primary Palette**:
  - Medical Clinical Teal: `#0891B2` / Dark: `#0E7490`
  - Trust Mint / Cyan: `#22D3EE` / Soft Tint: `#ECFEFF`
  - Success / In-Stock: `#16A34A` / Soft: `#F0FDF4`
  - Warning / Low-Stock: `#D97706` / Soft: `#FFFBEB`
  - Critical / Expired: `#DC2626` / Soft: `#FEF2F2`
  - Neutral Light: BG `#F8FAFC`, Surface `#FFFFFF`, Text `#0F172A`, Muted `#64748B`
  - Neutral Dark: BG `#0B1120`, Surface `#131D31`, Text `#F8FAFC`, Muted `#94A3B8`

---

## 2. Typography & Hierarchy

- **Headings**: `Figtree`, sans-serif (weights 600, 700, 800)
- **Body & Data**: `Noto Sans`, sans-serif (weights 400, 500, 600, 700)
- **Tabular Alignment**: Monospaced tabular numerals for prices, batch codes, and expiration timestamps.

---

## 3. Specialized Healthcare Capabilities

- **Keyboard First Shortcuts**:
  - `Alt + D`: Instant navigation to Dashboard Overview
  - `Alt + I`: Open Medicine Inventory Catalog
  - `Alt + R`: Open Reservations & Counter Pickups
  - `Alt + A`: Open Alerts & Triage Stream
  - `Alt + N`: Open Trust Score Analytics & Demand Charts
  - `Alt + L`: Sign out / Return to Authentication Portal
- **Physical Dispensation Print Stylesheet**: Dedicated `@media print` layout hiding sidebars, interactive controls, and modals for printing physical invoices and warehouse packing slips.
- **Progressive Web App (PWA)**: Standalone tablet support via `manifest.json` with clinical touch icons.
- **Accessible Landmarks**: WCAG AAA skip-to-content links (`.skip-link`) on every page and live ARIA status notifications.
- **Stock Threshold Visualizers**: Multi-tier `.stock-meter` with color-coded warning bars and `.badge-expiry` alert tags.
- **Data Integrity**: 100% preservation of Realtime Database sync, local storage keys, and business workflows.

## ⚡ Operational Mode Dynamic Theming & Animations

The pharmacy portal synchronizes with the hospital operational status:

- **Normal Flow (`#0891b2`)**: Standard dispensation, routine inventory holds.
- **Surge / Busy (`#d97706`)**: High-traffic banner, fast-mover medication caching.
- **Emergency Protocol (`#dc2626`)**: Urgent trauma & ICU drug priority dispatch marquee.
- **Throttling**: 180ms input debounce on generic/brand drug catalog searches.
