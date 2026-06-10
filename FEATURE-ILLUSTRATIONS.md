# Feature illustrations — Nano Banana prompts

These 8 illustrations replace the flat icon chips in the **Features** bento
section (`src/components/sections/features.tsx`).

- **Where they go:** `public/features/` (create the folder).
- **Filenames must match exactly** — the component already references these paths.
- **Format:** transparent **PNG**, **1024 × 1024** (square is fine for every tile;
  the cards use `object-contain`, so the wide tiles just center the art).
- Until you drop the PNGs in, each illustrated tile shows a faint lucide icon
  placeholder — the PNG overlays it automatically once present.

To mirror the reference bento, only **5 tiles currently show an illustration**
(the other 3 are text-only). `placement` tells you how the art is framed in the
card, which is what to keep in mind when composing:

- **below** — big art centered under the text (≈ 4:3 frame). Compose airy, the
  subject sitting in the lower-middle reads best.
- **side** — square art beside the bullets (1:1 frame). Compose tightly centered.

| # | File | Card title | placement |
|---|------|------------|-----------|
| 1 | `public/features/whatsapp-numbers.png` | أرقام واتساب متعددة | below |
| 2 | `public/features/crm.png` | إدارة العملاء (CRM) | side |
| 3 | `public/features/reports.png` | تقارير ولوحات | side |
| 4 | `public/features/catalog.png` | المنتجات والكتالوج | below |
| 5 | `public/features/voice-ai.png` | فهم الرسائل الصوتية | below |

**Text-only tiles** (no image right now — `صلاحيات وأدوار`, `ردود سريعة جاهزة`,
`المهام والتذكيرات`). Prompts 6–8 below stay in case you want to illustrate them
later; just add an `img`/`imgPos` to that feature in `features.tsx`.

---

## How to generate (Nano Banana / Gemini image)

1. Generate **image #1 first**. Once you like the style, generate the rest by
   pasting that first image back in and prefixing the prompt with:
   *"In the exact same 3D illustration style, palette, lighting and proportions
   as the attached image, create …"* — this keeps all 8 visually consistent.
2. Always ask for a **transparent background** and **no text/letters/numbers**
   (generated Arabic glyphs render garbled — keep the art text-free).
3. If a background sneaks in, re-prompt: *"isolated subject on a fully
   transparent background, no backdrop, no floor."* Then verify the PNG alpha.
4. Export at 1024×1024, then optimize (e.g. `pngquant`/`squoosh`) before commit.

### Shared style block (paste into every prompt)

> **Style:** modern 3D isometric SaaS illustration, glossy soft-clay / plasticine
> render, smooth rounded edges, premium and friendly. **Palette:** cobalt blue
> `#3B82F6` and violet `#8B5CF6` as the primary tones, with white, light-lavender
> `#EDE9FE`, and a single small emerald `#10B981` accent only where WhatsApp is
> implied. Soft studio lighting, gentle ambient occlusion, a subtle long soft
> shadow under the subject, faint rim light. Centered subject, 3/4 isometric
> camera. **Fully transparent background. No text, no letters, no numbers, no
> logos.** Clean, high-resolution, 1:1 square.

---

## Prompt 1 — `whatsapp-numbers.png`  (أرقام واتساب متعددة)

> [Shared style block]
>
> **Subject:** three or four glossy 3D smartphones arranged in a gentle fan,
> each screen showing a single rounded chat bubble, connected by smooth flowing
> lines that converge into one central rounded "inbox" tray/hub in front.
> Conveys several WhatsApp numbers merging into one unified team inbox. One small
> emerald-green WhatsApp-style bubble accent. Blue and violet phones, white
> screens, soft lavender connecting lines.

## Prompt 2 — `crm.png`  (إدارة العملاء / CRM)

> [Shared style block]
>
> **Subject:** a glossy 3D customer profile card standing upright, with a round
> avatar disc at the top, and small floating chips orbiting it — a chat bubble, a
> small parcel/box (orders), a price/tag, and a tiny phone. A 360° customer
> record. Blue-and-violet card, white surfaces, soft floating chips with gentle
> shadows.

## Prompt 3 — `voice-ai.png`  (فهم الرسائل الصوتية)

> [Shared style block]
>
> **Subject:** a glossy 3D microphone emitting curved sound waves that morph into
> a rounded speech/chat bubble, with a small friendly rounded robot head peeking
> beside it. AI turning voice into understood text. Violet microphone, blue sound
> waves, white speech bubble, soft glossy robot.

## Prompt 4 — `catalog.png`  (المنتجات والكتالوج)

> [Shared style block]
>
> **Subject:** a glossy 3D shopping bag next to a small floating grid of two or
> three product cards, each with a little blank tag (no text), arranged like a
> mini storefront/catalog. Blue shopping bag, violet-and-white product cards,
> soft lavender tags.

## Prompt 5 — `reports.png`  (تقارير ولوحات)

> [Shared style block]
>
> **Subject:** a glossy 3D analytics dashboard panel floating at a slight angle,
> holding a small bar chart, a rising line graph, and a donut/pie chart, with one
> tiny KPI tile floating in front. Blue bars, violet line, white panel, lavender
> donut segment.

## Prompt 6 — `roles.png`  (صلاحيات وأدوار)

> [Shared style block]
>
> **Subject:** a glossy 3D rounded shield with a soft keyhole at its center,
> surrounded by two or three small user avatar discs and a couple of tiny toggle
> switches / a small key, representing roles and access control. Blue-and-violet
> shield, white avatars, soft glossy toggles.

## Prompt 7 — `quick-replies.png`  (ردود سريعة جاهزة)

> [Shared style block]
>
> **Subject:** a glossy 3D lightning bolt with several small rounded chat-bubble
> "template" cards streaking out of it at an angle, conveying instant one-tap
> canned replies and speed. Violet lightning bolt, blue-and-white chat bubbles,
> soft motion feel.

## Prompt 8 — `tasks.png`  (المهام والتذكيرات)

> [Shared style block]
>
> **Subject:** a glossy 3D clipboard / checklist standing upright with three
> rounded list rows and soft green check marks, plus a small ringing bell
> (reminder) floating beside the top corner. Blue clipboard, violet bell, white
> rows, small emerald check marks.
