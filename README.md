# react-native-avatar-api

![npm](https://img.shields.io/npm/v/react-native-avatar-api?logo=nodedotjs) 
![npm downloads](https://img.shields.io/npm/dw/react-native-avatar-api)
![size](https://img.shields.io/badge/lightweight-22KB-green)
![typescript](https://img.shields.io/badge/typescript-support-blue?logo=typescript)

A lightweight, offline avatar component for React Native that generates consistent colors from usernames.

---

## ✨ Features

* Deterministic color generation
* Fully customizable
* No dependencies
* Works offline
* Tiny and fast
* Supports TypeScript

---

## 📦 Install

```bash
pnpm add react-native-avatar-api
# or
npm install react-native-avatar-api
```

---

## 🚀 Usage

### Basic

```tsx
import Avatar from "react-native-avatar-api";

<Avatar username="JohnDoe" />
```

---

### With config

```tsx
import Avatar from "react-native-avatar-api";

<Avatar
  username="JohnDoe"
  config={{
    size: 64,
    fontSize: 28,
    borderRadius: 12,
    fontColor: { r: 0, g: 0, b: 0 },
  }}
/>
```

---

## ⚙️ Props

### Avatar Props

| key      | description                     | type     | default |
| -------- | ------------------------------- | -------- | ------- |
| username | String used for color + initial | `string` | —       |
| config   | Customize appearance & behavior | `Config` | `{}`    |

---

### Config

| key          | description            | type                                                                            | default            |
| ------------ | ---------------------- | ------------------------------------------------------------------------------- | ------------------ |
| generator    | Custom color generator | `(name: string) => RGB`                                                         | `defaultGenerator` |
| size         | Avatar size            | `number`                                                                        | `48`               |
| fontSize     | Initial font size      | `number`                                                                        | `24`               |
| fontWeight   | Font weight            | `"100" \| "200" \| "300" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900"` | `"600"`            |
| fontColor    | Text color             | `RGB`                                           | `{ r: 255, g: 255, b: 255 }`    |
| borderRadius | Border radius or fully rounded | `number \| "rounded"`                                                           | `"rounded"`        |

---

### RGB

| key | description   | type             | default |
| --- | ------------- | ---------------- | ------- |
| r   | Red channel   | `number (0–255)` | —       |
| g   | Green channel | `number (0–255)` | —       |
| b   | Blue channel  | `number (0–255)` | —       |

---

## 🧠 Utilities

You can also access utilities:
```ts
import { defaultGenerator, clearCache } from "react-native-avatar-api";
```

* `defaultGenerator(name)` → generate a color using the default color generator
* `clearCache()` → reset internal cache (used by `defaultGenerator`)

---

## 💾 Changelogs

* **0.1.0**: Initial release

---

## 📄 License

MIT 2026
