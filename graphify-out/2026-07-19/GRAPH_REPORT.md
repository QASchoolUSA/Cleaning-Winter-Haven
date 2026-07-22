# Graph Report - Cleaning-Winter-Haven  (2026-07-19)

## Corpus Check
- 56 files · ~119,460 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 311 nodes · 457 edges · 26 communities (20 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a44930ec`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- BookingWidget.tsx
- compilerOptions
- site.ts
- scripts
- Search Dominance Blueprint: Cleaning Winter Haven
- ServicePageParts.tsx
- page.tsx
- page.tsx
- page.tsx
- manifest.json
- page.tsx
- page.tsx
- page.tsx
- page.tsx
- page.tsx
- Cleaning Winter Haven
- generate-icons.mjs
- SectionImage.tsx
- middleware.ts
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `site` - 21 edges
2. `compilerOptions` - 16 edges
3. `scripts` - 14 edges
4. `ServiceCTA()` - 11 edges
5. `BreadcrumbJsonLd()` - 11 edges
6. `FAQSection()` - 10 edges
7. `Icon()` - 8 edges
8. `ServiceJsonLd()` - 7 edges
9. `validateBookingPayload()` - 7 edges
10. `include` - 7 edges

## Surprising Connections (you probably didn't know these)
- `BookingWidget()` --calls--> `formatPhoneInput()`  [EXTRACTED]
  src/components/BookingWidget.tsx → src/lib/phone.ts
- `validateBookingPayload()` --calls--> `phoneDigits()`  [EXTRACTED]
  src/lib/booking.ts → src/lib/phone.ts
- `POST()` --calls--> `normalizeBookingPayload()`  [EXTRACTED]
  src/app/api/book/route.ts → src/lib/booking.ts
- `POST()` --calls--> `validateBookingPayload()`  [EXTRACTED]
  src/app/api/book/route.ts → src/lib/booking.ts
- `validateContact()` --calls--> `validateBookingPayload()`  [EXTRACTED]
  src/components/BookingWidget.tsx → src/lib/booking.ts

## Import Cycles
- None detected.

## Communities (26 total, 6 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.06
Nodes (35): babel-plugin-react-compiler, eslint, eslint-config-next, jsdom, devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next (+27 more)

### Community 1 - "BookingWidget.tsx"
Cohesion: 0.10
Nodes (23): POST(), ADDON_LABELS, BookingWidget(), ContactErrors, LevelType, SERVICE_OPTIONS, SIZE_OPTIONS, SizeOption (+15 more)

### Community 2 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 3 - "site.ts"
Cohesion: 0.12
Nodes (14): body, heading, metadata, Footer(), JsonLd(), descriptions, serviceImages, formatPhoneDisplay() (+6 more)

### Community 4 - "scripts"
Cohesion: 0.07
Nodes (26): next, @opennextjs/cloudflare, dependencies, next, @opennextjs/cloudflare, react, react-dom, name (+18 more)

### Community 5 - "Search Dominance Blueprint: Cleaning Winter Haven"
Cohesion: 0.08
Nodes (24): 1.1 Core Entity & Sub-Entities, 1.2 Four Topical Clusters (by semantic distance), 1.3 Cluster Priority for Content Engine, 2.1 Three Proprietary Data Injections, 2.2 How This Contradicts Generic Web Consensus, 3.1 H1 (entity discovery), 3.2 H2 (question heading — AI Overview extraction target), 3.3 AI Overview Target Block (40–60 words) (+16 more)

### Community 6 - "ServicePageParts.tsx"
Cohesion: 0.16
Nodes (11): differentiators, metadata, metadata, pricingFaqs, pricingJsonLd, areaFaqs, areaLinks, metadata (+3 more)

### Community 7 - "page.tsx"
Cohesion: 0.16
Nodes (6): Benefits, Hero(), TRUST_ITEMS, faqs, HomeFAQ(), testimonials

### Community 8 - "page.tsx"
Cohesion: 0.19
Nodes (9): deepPrice(), faqs, HouseCleaningCostGuidePage(), metadata, movePrice(), sizeRows, PricingTableProps, ADDON_PRICES (+1 more)

### Community 9 - "page.tsx"
Cohesion: 0.24
Nodes (7): checklist, faqs, metadata, MoveOutCleaningContent(), Icon(), IconName, ICONS

### Community 10 - "manifest.json"
Cohesion: 0.22
Nodes (8): background_color, description, display, icons, name, short_name, start_url, theme_color

### Community 11 - "page.tsx"
Cohesion: 0.28
Nodes (5): faqs, metadata, timeline, MoveInCleaningContent(), ServiceJsonLd()

### Community 12 - "page.tsx"
Cohesion: 0.29
Nodes (5): faqs, industries, metadata, CommercialCleaningContent(), COMMERCIAL_PRICES

### Community 13 - "page.tsx"
Cohesion: 0.29
Nodes (5): benefits, comparison, faqs, metadata, HouseCleaningContent()

### Community 14 - "page.tsx"
Cohesion: 0.29
Nodes (5): faqs, metadata, phases, PostConstructionCleaningContent(), POST_PRICES

### Community 15 - "page.tsx"
Cohesion: 0.29
Nodes (5): faqs, metadata, steps, whatsIncluded, ResidentialCleaningContent()

### Community 16 - "Cleaning Winter Haven"
Cohesion: 0.29
Nodes (6): Cleaning Winter Haven, Deploy to Cloudflare Workers, Environment variables, Setup, Stack, Tests

## Knowledge Gaps
- **155 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+150 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `site` connect `site.ts` to `BookingWidget.tsx`, `ServicePageParts.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `scripts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _155 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `BookingWidget.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10483870967741936 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `site.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11576354679802955 - nodes in this community are weakly interconnected._