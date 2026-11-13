# Малчны хөтөч – Mongolian Herder's Livestock Guide (SPA)

Таван хошуу малын лавлах, сүргийн тооцоолуур, мал үүлдрийн хайлтын сан. Vanilla JavaScript (ES modules) SPA.

## Боломжууд
- Hash router, Pages, Layout, Navbar, i18n (MN/EN)
- Data layer: `config.js` + `services/` (local JSON ↔ API)
- Sidebar хайлт: нэрээр, малын бүлгээр, хүснэгтийн хэсгийг тохируулах
- Зургийн modal: slideshow, zoom, drag, fullscreen, ESC
- Хоёр хэлтэй өгөгдөл (EN/MN) – `src/tools/` дахь хөрвүүлэгч

## Ажиллуулах
```
npm run build:data     # breeds.json, жишиг зураг, images.json үүсгэнэ
cd src && python -m http.server 8000
```
(ES module тул file:// биш, local server-ээр нээнэ.)

## GitHub Pages
`rm -rf docs && cp -r src docs` → Settings → Pages → master /docs
