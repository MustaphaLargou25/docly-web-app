# Docly Web App — Build Plan

A fully responsive React + Tailwind + shadcn/ui implementation of the Docly student platform, mirroring the mobile app's design system and feature set. Frontend-only with mock data (no backend yet).

## Scope

All 12 pages from the spec, with shared layout shell that adapts across mobile / tablet / desktop. Light + dark mode, EN/FR/AR (with RTL) language switcher, full design tokens.

## Design System Setup

- **`src/styles.css`**: define all tokens as CSS variables in oklch — `--primary` (#2563EB), `--accent` (#4F46E5), `--amber`, `--success`, `--destructive`, card/input/bg/text/divider for light + dark. Map into `@theme inline`.
- **Inter font**: load via Google Fonts link in `__root.tsx` head.
- **Tailwind utilities**: pill radius via `rounded-full`, card radius `rounded-xl` (12px), textarea `rounded-2xl` (16px).
- **Global rule**: remove focus rings on inputs (`focus-visible:ring-0 focus-visible:outline-none`), update shadcn `Input`, `Textarea`, `Select` defaults.
- **Theme provider**: `next-themes`-style custom hook that toggles `.dark` on `<html>` and respects `prefers-color-scheme`.
- **i18n**: lightweight context (`LanguageProvider`) with EN/FR/AR dictionaries and `dir="rtl"` on `<html>` when Arabic is active.

## Routing (TanStack Start, file-based)

```
src/routes/
  __root.tsx               // shell: theme + language providers, font, head
  index.tsx                // Home (inside AppLayout)
  _app.tsx                 // pathless layout with sidebar/bottom-nav (Outlet)
  _app/index.tsx           // redirects → /home (or just use root index)
  onboarding.tsx           // full-screen, no shell
  signin.tsx               // full-screen card
  register.tsx             // full-screen card
  home.tsx
  search.tsx
  upload.tsx
  library.tsx
  community.tsx
  profile.tsx
  profile.$userId.tsx      // public profile
  messages.tsx             // contacts list (mobile) / split view (desktop)
  messages.$chatId.tsx     // conversation
  notifications.tsx
  settings.tsx
```

Onboarding shows on first visit (localStorage flag) then redirects to `/home`. Auth pages are standalone (no sidebar).

## Shared Layout (`AppLayout`)

Responsive shell that renders based on viewport:

- **Mobile (<768px)**: content + fixed bottom nav (Home / Library / Community / Profile). FAB on Community.
- **Tablet (768–1024px)**: collapsible 220px sidebar (icons + labels) + content. 2-col card grids.
- **Desktop (>1024px)**: fixed left sidebar (220px, logo top, nav middle, user card bottom) + centered main (max 860px) + right panel (280px) for trending modules / top contributors / leaderboard. Fixed top header with logo, centered search, bell dropdown, avatar dropdown.

Active nav state: `#2563EB` text + 3px left border + light blue bg (sidebar); plain color change on mobile bottom nav.

## Pages

1. **Onboarding** — 4 slides (graduation-cap, trending-up, search, users icons), pagination dots, Next/Skip, sign-in link.
2. **Sign In / Register** — centered card (max 420px), email/password, Google button, terms checkbox on register.
3. **Home** — greeting header with avatar, blue-gradient university banner, "Browse Modules" responsive grid (colored icon + name + doc count).
4. **Search** — prominent search bar, filter chips (All/Documents/Users/Subjects), result count, document cards (thumbnail, title, author, date, size, tags, bookmark, "Open PDF"), locked card variant with amber unlock prompt, user result cards.
5. **Upload** — 3-step flow (modal on desktop, full page on mobile): drag-drop PDF → metadata form (Type/Module/Field/Semester/Year/Professor) → title/description/notify toggle. Success state with green check + amber "+15 Points" card.
6. **Library** — tabs (Downloads/Uploads/Saved), header with amber "120 pts" badge, responsive grid.
7. **Community** — tabs (Feed/Questions), post + question cards, New Post FAB (mobile) / button (desktop), composer modal.
8. **Profile** — avatar, name, university, program, blue-gradient points card, stats grid (Uploads/Downloads/Points/Ranking), menu list.
9. **Public Profile** (`/profile/$userId`) — cover + avatar + stats row, Follow/Message buttons, tabs (Shared/Feed/About) with bio + info + social links.
10. **Messages** — desktop split (300px contacts + conversation); mobile list → conversation route. Sent bubbles right blue, received left grey. Composer with emoji/attach/send.
11. **Notifications** — dropdown on desktop (from bell), full page route on mobile. Rows: avatar + action + timestamp + unread blue dot.
12. **Settings** — language selector (🇲🇦 Arabic / 🇫🇷 Français / 🇺🇸 English radios), light/dark toggle, account section.

## Components

Reusable in `src/components/`:
- `Logo` (document + arrow "D", blue gradient — SVG)
- `AppLayout`, `Sidebar`, `BottomNav`, `TopHeader`, `RightPanel`
- `DocumentCard`, `LockedDocumentCard`, `UserResultCard`, `ModuleCard`
- `PostCard`, `QuestionCard`, `PostComposer`
- `PointsBadge`, `UniversityBanner`, `StatsGrid`
- `NotificationItem`, `NotificationsDropdown`
- `ChatBubble`, `ChatComposer`, `ContactRow`
- `LanguageSwitcher`, `ThemeToggle`
- `OnboardingSlide`

shadcn primitives used: `button`, `input`, `textarea`, `card`, `tabs`, `dialog`, `dropdown-menu`, `avatar`, `badge`, `checkbox`, `switch`, `radio-group`, `select`, `sheet`, `tooltip`, `sonner`.

## Mock Data

`src/lib/mock-data.ts` with sample user (Youssef Amrani), modules (SMPC), documents, posts, questions, notifications, chats, leaderboard, contributors — used across pages so the UI feels populated.

## Technical Notes

- All colors via design tokens — no hex in components.
- Lucide icons exclusively.
- RTL: set `dir` on `<html>` from language context; Tailwind logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`) where direction matters.
- Smooth route transitions via a light fade wrapper on `<Outlet />`.
- Accessibility: ARIA labels on icon-only buttons, keyboard nav on dropdowns/tabs/menus (shadcn handles most).
- No backend wiring — all forms are local state with toast feedback. Lovable Cloud can be added later for auth, uploads, and persistence.

## Out of Scope (this pass)

- Real auth, real file uploads, real DB persistence (would need Lovable Cloud).
- Real-time chat / notifications.
- PDF rendering inside the app — "Open PDF" buttons are stubs.

Once approved I'll generate all routes, layout, components, tokens, and mock data in build mode.
