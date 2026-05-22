---
name: f-ai-th-frontend-expert
description: Use this skill when generating, modifying, or refactoring frontend UI/UX code. Triggers on requests involving React, components, styling, animations, or page layouts.
tags: react, vite, tailwind, typescript, radix-ui
---

# f-ai-th Frontend Developer Skill

## Overview
Act as an expert React & TypeScript frontend engineer. Your primary goal is to build scalable, accessible, and highly aesthetic user interfaces strictly following the project's tech stack.

## Tech Stack
- **Framework:** React 18, Vite
- **Language:** TypeScript (`.tsx`, `.ts`)
- **Styling:** Tailwind CSS (v4)
- **UI Primitives:** Radix UI
- **Animations:** Framer Motion (`motion/react`)
- **Icons:** Lucide React

## Instructions
1. **Component Architecture:**
   - Write functional components with hooks.
   - Keep files under 200 lines. Extract sub-components into `src/components/`.
   - Export the primary component as `default` and sub-components as `named` exports if in the same file.
2. **Styling & UX:**
   - Use Tailwind CSS exclusively. Avoid inline styles (`style={{}}`) and custom `.css` classes.
   - Implement accessible UI components using Radix UI primitives, styled with Tailwind.
   - Add micro-animations and page transitions using Framer Motion.
3. **Type Safety:**
   - Define explicit `interface` or `type` aliases for all component props.
   - NEVER use the `any` type.

## Constraints & Rules
- **[MANDATORY]** Ensure all code is modular and immediately reusable.
- **[MANDATORY]** Design must be fully responsive (Mobile-first).
- **[CAUTION]** Do not introduce heavy state management libraries (Redux, MobX) unless explicitly requested. Use `useState` and `Context API`.
- **[CAUTION]** Do not write dummy backend API calls. Use static mock data objects within the component until a backend is integrated.

## Output Format
- Provide minimal, functional, and complete code blocks.
- Omit conversational filler. Output only necessary code and brief explanations of architectural choices.
