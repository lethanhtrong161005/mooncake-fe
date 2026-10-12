---
name: component-generator
description: >-
  Use this skill whenever generating a new React component, popup modal, card, or page view in the mooncake-fe project.
  Ensures code adheres strictly to 2-space indentation, modern ES2024 JavaScript, Tailwind CSS luxury aesthetics, and accessibility.
---

# React Component Generator Skill

This skill guides the Agent in scaffolding new UI components following the project's Enterprise standards.

## Generation Checklist

1. **Indentation:** Exactly 2 spaces indentation (`tabsize = 2`).
2. **File Placement:** 
   - Reusable components: `src/components/ComponentName.jsx`
   - Specific page screens: `src/Pages/Submodule/ScreenName.jsx`
3. **Naming Convention:** PascalCase for filename and function component name.
4. **Imports:** Standard order (React/Hooks -> Icons/Assets -> Custom Hooks -> Services/Utils).
5. **Aesthetics:** Luxury color palette (Gold/Amber/Stone-900), subtle transitions, and hover states.
6. **Accessibility:** Icon buttons must have `aria-label`, images must have `alt`.

## Standard Template

```jsx
import { useState } from 'react';

/**
 * ExampleComponent
 * @param {Object} props
 * @param {string} props.title - Tiêu đề component
 * @param {Function} props.onAction - Callback khi bấm nút hành động
 */
export default function ExampleComponent({ title = 'Tiêu đề mặc định', onAction }) {
  const [isActive, setIsActive] = useState(false);

  const handleAction = () => {
    setIsActive(!isActive);
    if (onAction) {
      onAction();
    }
  };

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-stone-900">{title}</h2>
        <span className="material-symbols-outlined text-amber-600">verified</span>
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleAction}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:brightness-105 active:scale-95"
        >
          <span>Thực Hiện</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </section>
  );
}
```
