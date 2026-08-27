<h1 align="center">🎨 Styled Stack Card</h1>

<p align="center">
  <em>A custom Lovelace card for Home Assistant that wraps any stack of cards with stunning gradient backgrounds and unified styling — no <code>card_mod</code> needed.</em>
</p>

<p align="center">
  <a href="https://github.com/hacs/default"><img src="https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge&logo=homeassistant" alt="HACS Custom"></a>
  <a href="https://github.com/Mariocoleguilla/styled-stack-card/releases"><img src="https://img.shields.io/github/v/release/Mariocoleguilla/styled-stack-card?style=for-the-badge&color=orange" alt="Release"></a>
  <a href="https://github.com/Mariocoleguilla/styled-stack-card/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Mariocoleguilla/styled-stack-card?style=for-the-badge&color=blue" alt="License"></a>
  <img src="https://img.shields.io/badge/Type-Dashboard%20Card-purple?style=for-the-badge" alt="Type: Dashboard Card">
</p>

<p align="center">
  <strong>Companion integration:</strong> <a href="https://github.com/Mariocoleguilla/styled-stack-card-manager">Styled Stack Card Manager</a> — a sidebar panel to create & manage reusable gradient presets.
</p>

---

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/de6dfa27-ac8e-4009-b35f-9485692eda87" alt="Styled Stack Card Showcase" width="48%"/>
  <img src="https://github.com/user-attachments/assets/1cd99de6-1a1f-4745-a452-23c3f4ec9a07" alt="Visual Editor Overview" width="48%"/>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/db5f1354-2227-4a12-91e1-ef97ff50a933" alt="Presets and Color Controls" width="48%"/>
  <img src="https://github.com/user-attachments/assets/af9e57ce-244d-41a8-b204-2baf70d9679a" alt="Color Picker & Alpha Sliders" width="48%"/>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/af17a14c-3181-4256-9bf0-64d389bfbd6b" alt="Clipboard & Tab Controls" width="60%"/>
</p>

---

## ✨ Features

| | Feature |
|---|---|
| 🌈 | **Up to 3-color gradients** — start, middle (optional with position slider), and end colors |
| 🎨 | **Native color pickers** with per-color opacity/alpha sliders and live gradient preview |
| 📋 | **Clipboard integration** — copy, cut, and paste cards from/to your Lovelace dashboard |
| 🛠 | **Full visual editor** — tabbed card navigation, reorder, duplicate, and delete |
| 🔮 | **Automatic card transparency** — child cards blend into the gradient on any theme |
| 🌟 | **Built-in presets** — Spotify, Warm Lights, Water, Alert |
| ✨ | **Custom presets** — use [Styled Stack Card Manager](https://github.com/Mariocoleguilla/styled-stack-card-manager) to create and sync reusable presets |
| 📦 | **Works with any Lovelace card** — Mushroom, Tile, Bubble Card, ApexCharts, and more |
| ⚡ | **Lightweight & fast** — built with Lit & TypeScript |

---

## 🚀 Installation

### HACS (Recommended)

1. Open **HACS** → **Frontend**.
2. Click **⋮** (top right) → **Custom repositories**.
3. Add:
   | Field | Value |
   |---|---|
   | **Repository** | `https://github.com/Mariocoleguilla/styled-stack-card` |
   | **Category** | `Dashboard` |
4. Find **Styled Stack Card** in the list → **Download**.
5. **Reload** your browser or clear the dashboard cache.

### Manual

1. Download `styled-stack-card.js` from the [latest release](https://github.com/Mariocoleguilla/styled-stack-card/releases).
2. Place it in `config/www/`.
3. Add the resource in **Settings → Dashboards → Resources**:
   ```yaml
   url: /local/styled-stack-card.js
   type: module
   ```

---

## ⚙️ Configuration

### YAML

```yaml
type: custom:styled-stack-card
style_config:
  preset: custom               # custom | spotify | lights | water | alert | <custom preset name>
  color_start: "rgba(29, 185, 84, 0.30)"
  color_mid: "rgba(100, 50, 200, 0.20)"   # optional 3rd color
  color_mid_pos: 50                        # middle color position (1–99 %)
  color_end: "rgba(30, 30, 30, 0)"
  angle: 135                               # gradient angle (0–360°)
cards:
  - type: tile
    entity: light.living_room
  - type: tile
    entity: media_player.tv
```

### Options

| Key | Type | Default | Description |
|---|---|---|---|
| `cards` | array | `[]` | Lovelace cards inside the stack |
| `style_config.preset` | string | `spotify` | Built-in preset, custom preset name, or `custom` for manual colors |
| `style_config.color_start` | string | `rgba(128,128,128,0.25)` | Gradient start color (`rgb` / `rgba`) |
| `style_config.color_mid` | string | — | Optional middle color stop |
| `style_config.color_mid_pos` | number | `50` | Middle color position (1–99 %) |
| `style_config.color_end` | string | `rgba(30,30,30,0)` | Gradient end color |
| `style_config.angle` | number | `135` | Gradient angle in degrees |

> **💡 Tip:** Set `preset` to the name of any custom preset created with [Styled Stack Card Manager](https://github.com/Mariocoleguilla/styled-stack-card-manager) (e.g. `preset: "Chicle"`).

---

## 🧩 Compatibility

Works with **all standard and custom Lovelace cards**, including:

Tile · Mushroom · Bubble Card · Button Card · Entities · Glance · Gauge · History Graph · Mini Graph · ApexCharts · Markdown · and any `custom:` card.

---

## 🔗 Related

| Repository | Type | Description |
|---|---|---|
| **[styled-stack-card](https://github.com/Mariocoleguilla/styled-stack-card)** | Dashboard (Frontend) | This card — gradient stacks for Lovelace |
| **[styled-stack-card-manager](https://github.com/Mariocoleguilla/styled-stack-card-manager)** | Integration | Sidebar panel to create & manage custom gradient presets |

---

## ❓ FAQ

<details>
<summary><strong>Does it require a transparent HA theme?</strong></summary>
No. Child cards automatically inherit background transparency, so the gradient shows through on any theme while keeping card borders visible.
</details>

<details>
<summary><strong>Can I use 3 colors in the gradient?</strong></summary>
Yes! In the visual editor, click <strong>"Añadir color intermedio"</strong> to add a third color stop with a position slider (1–99 %).
</details>

<details>
<summary><strong>How does the clipboard work?</strong></summary>
Copy or cut a card in the editor (or from your dashboard), then click <strong>"Pegar tarjeta del portapapeles"</strong> to insert it.
</details>

<details>
<summary><strong>How do custom presets work?</strong></summary>
Install <a href="https://github.com/Mariocoleguilla/styled-stack-card-manager">Styled Stack Card Manager</a>. Presets created there automatically appear in this card's preset dropdown and update in real time — no refresh needed.
</details>

---

## 📄 License

MIT — see [LICENSE](LICENSE).

---

<p align="center">
  <strong>If this card improves your dashboards, give the repo a ⭐!</strong>
</p>

<p align="center">
  <a href="https://www.paypal.com/donate/?hosted_button_id=C6T54AXECTX9L">
    <img src="https://img.shields.io/badge/Donate-PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white" alt="Donate via PayPal"/>
  </a>
</p>
