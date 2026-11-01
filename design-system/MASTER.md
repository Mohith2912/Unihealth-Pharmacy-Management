# UniHealth Pharmacy Management — Design System (Master)

Built using the UI/UX Pro Max skill recommendations for Healthcare, Clinical Pharmacy, and Inventory Operations.

## Core Visual Identity
- **Domain**: Healthcare / Pharmacy Management / Real-time Inventory
- **Tone**: Professional, trustworthy, ethical, WCAG AAA compliant, calm medical aesthetic
- **Primary Palette**:
  - Medical Teal: `#0891B2` / Dark: `#0E7490`
  - Trust Cyan: `#22D3EE`
  - Success / In-Stock: `#16A34A` / Soft: `#F0FDF4`
  - Warning / Low-Stock: `#D97706` / Soft: `#FFFBEB`
  - Critical / Expired: `#DC2626` / Soft: `#FEF2F2`
  - Light Background: `#F8FAFC` | Surface: `#FFFFFF` | Text: `#0F172A` | Muted: `#64748B`
  - Dark Background: `#0B1120` | Surface: `#131D31` | Text: `#F8FAFC` | Muted: `#94A3B8`

## Typography
- **Headings**: `Figtree`, sans-serif (weights 600, 700)
- **Body & Data**: `Noto Sans`, sans-serif (weights 400, 500, 600)
- Numeric and tabular alignments for prices, quantities, and dates.

## Component Standards
- **Icons**: Clean SVGs (Lucide / Heroicons style) with consistent viewBox (24x24) and stroke-width 1.8. No decorative emoji characters.
- **Interactive Targets**: Minimum 44x44px clickable areas. Clear hover feedback (subtle elevation, color transition 150-250ms).
- **Focus Indicators**: 3px high-contrast focus rings (`var(--primary)`) on keyboard navigation.
- **Responsive Layout**: Fluid breakpoints at 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (wide).
- **Data Integrity**: 100% preservation of Realtime Database sync, local storage keys, and business workflows.
