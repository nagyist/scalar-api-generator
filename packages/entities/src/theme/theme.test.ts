import { defaultTheme, themeSchema } from '@/theme'
import { describe, expect, test } from 'vitest'

describe('Theme Entity', () => {
  // Basic legacy variable replacement
  test('Replaces old --theme-* variables', () => {
    const theme = defaultTheme('--theme-color-1')
    expect(themeSchema.parse(theme).theme).toEqual('--scalar-color-1')
  })
  test('Replaces old --sidebar-* variables', () => {
    const theme = defaultTheme('--sidebar-color-1')
    expect(themeSchema.parse(theme).theme).toEqual('--scalar-sidebar-color-1')
  })
  test('Replaces old --header-* variables', () => {
    const theme = defaultTheme('--header-color-1')
    expect(themeSchema.parse(theme).theme).toEqual('--scalar-header-color-1')
  })

  // Make sure it doesn't replace updated variables
  test("Doesn't replace updated --scalar-* variables", () => {
    const theme = defaultTheme('--scalar-color-1')
    expect(themeSchema.parse(theme).theme).toEqual('--scalar-color-1')
  })
  test("Doesn't replace updated --scalar-sidebar-* variables", () => {
    const theme = defaultTheme('--scalar-sidebar-color-1')
    expect(themeSchema.parse(theme).theme).toEqual('--scalar-sidebar-color-1')
  })
  test("Doesn't replace updated --scalar-header-* variables", () => {
    const theme = defaultTheme('--scalar-header-color-1')
    expect(themeSchema.parse(theme).theme).toEqual('--scalar-header-color-1')
  })

  // Complex legacy theme test
  test('Replaces variables in legacy custom theme', () => {
    const theme = defaultTheme(`
/**
  Custom Theme Starter
*/
:root {
  --theme-border-width: 1px;
  --theme-radius: 3px;
  --theme-radius-lg: 6px;
  --theme-radius-xl: 8px;

  --theme-header-height: 50px;
  --theme-sidebar-width: 280px;
  --theme-toc-width: 280px;

  /* Typography */
  --theme-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --theme-font-code: 'JetBrains Mono';

  /* Font sizes */
  --theme-heading-1: 40px; /* Page headings */
  --theme-page-description: 24px;
  --theme-heading-2: 24px; /* Section headings */
  --theme-heading-3: 20px;
  --theme-heading-4: 16px;
  --theme-heading-5: 16px;
  --theme-heading-6: 16px;

  --theme-paragraph: 16px;
  --theme-small: 14px;
  --theme-mini: 13px;
  --theme-micro: 12px;
  --theme-bold: 600;
  --theme-semibold: 500;
  --theme-regular: 400;
}

@media (max-width: 720px) {
  :root {
    --theme-heading-1: 24px;
    --theme-page-description: 20px;
  }
}

/* Color Theming */
.light-mode {
  color-scheme: light;
  --theme-color-1: #2a2f45;
  --theme-color-2: #757575;
  --theme-color-3: #8e8e8e;
  --theme-color-disabled: #b4b1b1;
  --theme-color-ghost: #a7a7a7;
  --theme-color-accent: #0099ff;
  --theme-background-1: #fff;
  --theme-background-2: #f6f6f6;
  --theme-background-3: #e7e7e7;
  --theme-background-4: rgba(0, 0, 0, 0.06);
  --theme-background-accent: #8ab4f81f;

  --theme-border-color: rgba(0, 0, 0, 0.1);
  --theme-scrollbar-color: rgba(0, 0, 0, 0.18);
  --theme-scrollbar-color-active: rgba(0, 0, 0, 0.36);
  --theme-lifted-brightness: 1;
  --theme-backdrop-brightness: 1;

  --theme-shadow-1: 0 1px 3px 0 rgba(0, 0, 0, 0.11);
  --theme-shadow-2: rgba(0, 0, 0, 0.08) 0px 13px 20px 0px,
    rgba(0, 0, 0, 0.08) 0px 3px 8px 0px, #eeeeed 0px 0 0 1px;

  --theme-button-1: rgb(49 53 56);
  --theme-button-1-color: #fff;
  --theme-button-1-hover: rgb(28 31 33);

  --theme-color-green: #059669;
  --theme-color-red: #dc2626;
  --theme-color-yellow: #ca8a04;
  --theme-color-blue: #2563eb;
  --theme-color-orange: #ea580c;
  --theme-color-purple: #7c3aed;
}

.dark-mode {
  color-scheme: dark;
  --theme-color-1: rgba(255, 255, 255, 0.9);
  --theme-color-2: rgba(255, 255, 255, 0.62);
  --theme-color-3: rgba(255, 255, 255, 0.44);
  --theme-color-disabled: rgba(255, 255, 255, 0.34);
  --theme-color-ghost: rgba(255, 255, 255, 0.26);
  --theme-color-accent: #8ab4f8;
  --theme-background-1: #1a1a1a;
  --theme-background-2: #252525;
  --theme-background-3: #323232;
  --theme-background-4: rgba(255, 255, 255, 0.06);
  --theme-background-accent: #8ab4f81f;

  --theme-border-color: rgba(255, 255, 255, 0.1);
  --theme-scrollbar-color: rgba(255, 255, 255, 0.24);
  --theme-scrollbar-color-active: rgba(255, 255, 255, 0.48);
  --theme-lifted-brightness: 1.45;
  --theme-backdrop-brightness: 0.5;

  --theme-shadow-1: 0 1px 3px 0 rgb(0, 0, 0, 0.1);
  --theme-shadow-2: rgba(15, 15, 15, 0.2) 0px 3px 6px,
    rgba(15, 15, 15, 0.4) 0px 9px 24px, 0 0 0 1px rgba(255, 255, 255, 0.1);

  --theme-button-1: #f6f6f6;
  --theme-button-1-color: #000;
  --theme-button-1-hover: #e7e7e7;

  --theme-color-green: #00b648;
  --theme-color-red: #dc1b19;
  --theme-color-yellow: #ffc90d;
  --theme-color-blue: #4eb3ec;
  --theme-color-orange: #ff8d4d;
  --theme-color-purple: #b191f9;
}

/* Aliases & Inferred Variables */
.light-mode,
.dark-mode {
  --theme-border: var(--theme-border-width) solid var(--theme-border-color);
}

/* Sidebar */
.light-mode .t-doc__sidebar {
  --sidebar-background-1: var(--theme-background-1);
  --sidebar-item-hover-color: currentColor;
  --sidebar-item-hover-background: var(--theme-background-2);
  --sidebar-item-active-background: var(--theme-background-accent);
  --sidebar-border-color: var(--theme-border-color);
  --sidebar-color-1: var(--theme-color-1);
  --sidebar-color-2: var(--theme-color-2);
  --sidebar-color-active: var(--theme-color-accent);
  --sidebar-search-background: transparent;
  --sidebar-search-border-color: var(--sidebar-border-color);
  --sidebar-search--color: var(--theme-color-3);
}

.dark-mode .t-doc__sidebar {
  --sidebar-background-1: var(--theme-background-1);
  --sidebar-item-hover-color: currentColor;
  --sidebar-item-hover-background: var(--theme-background-2);
  --sidebar-item-active-background: var(--theme-background-accent);
  --sidebar-border-color: var(--theme-border-color);
  --sidebar-color-1: var(--theme-color-1);
  --sidebar-color-2: var(--theme-color-2);
  --sidebar-color-active: var(--theme-color-accent);
  --sidebar-search-background: transparent;
  --sidebar-search-border-color: var(--sidebar-border-color);
  --sidebar-search--color: var(--theme-color-3);
}

/* Table of contents */
.light-mode .t-doc__toc {
  --table-of-contents-heading-color: var(--theme-color-1);
  --table-of-contents-section-color: var(--theme-color-2);
  --table-of-contents-section-color-active: var(--theme-color-accent);
}
.dark-mode .t-doc__toc {
  --table-of-contents-heading-color: var(--theme-color-1);
  --table-of-contents-section-color: var(--theme-color-2);
  --table-of-contents-section-color-active: var(--theme-color-accent);
}

/* Document header */
.light-mode .t-doc__header {
  --header-background-1: var(--theme-background-1);
  --header-border-color: var(--theme-border-color);
  --header-color-1: var(--theme-color-1);
  --header-color-2: var(--theme-color-2);
  --header-background-toggle: var(--theme-color-3);
  --header-call-to-action-color: var(--theme-color-accent);
}

.dark-mode .t-doc__header {
  --header-background-1: var(--theme-background-1);
  --header-border-color: var(--theme-border-color);
  --header-color-1: var(--theme-color-1);
  --header-color-2: var(--theme-color-2);
  --header-background-toggle: var(--theme-color-3);
  --header-call-to-action-color: var(--theme-color-accent);
}

/* --- Document Typography --- */

/* Page Title */
.t-editor__page-title {
  --font-size: var(--theme-heading-1);
  --font-color: var(--theme-color-1);
  --font-weight: var(--theme-bold);
}

.t-editor__page-title .subheading {
  --font-size: var(--theme-page-description);
  --font-color: var(--theme-color-1);
  --font-weight: var(--theme-semibold);
}

/* Headings */
.t-editor__heading h1 {
  --font-size: var(--theme-heading-2);
  --font-weight: var(--theme-bold);
  --font-color: var(--theme-color-1);
}

.t-editor__heading h2 {
  --font-size: var(--theme-heading-2);
  --font-weight: var(--theme-bold);
  --font-color: var(--theme-color-1);
}

.t-editor__heading h3 {
  --font-size: var(--theme-heading-3);
  --font-color: var(--theme-color-1);
  --font-weight: var(--theme-bold);
}

.t-editor__heading h4,
.t-editor__heading h5,
.t-editor__heading h6 {
  --font-size: var(--theme-heading-4);
  --font-color: var(--theme-color-1);
  --font-weight: var(--theme-bold);
}

/* Paragraph */
.t-editor__paragraph {
  --font-size: var(--theme-paragraph);
  --font-color: var(--theme-color-1);
  --font-weight: var(--theme-regular);
}

/* Lists */
.t-editor__list ul,
.t-editor__list ol {
  color: var(--theme-color-1);
  padding-left: 30px;
}

/* Checklist */
.t-editor__checklist ul {
  list-style: none;
  padding-left: 0;
  margin-left: 0;
}

/* Blockquote */
.t-editor__quote {
  --font-size: var(--theme-paragraph);
  --theme-border-left: 2px solid var(--theme-color-1);
  --font-color: var(--theme-color-1);
  --padding: 6px 0 6px 14px;
}

/* Fine print */
.t-editor__fine-print {
  --font-size: var(--theme-mini);
  --font-color: var(--theme-color-2);
  --font-weight: var(--theme-regular);
}

/* Bold */
.t-editor__bold {
  font-weight: var(--theme-bold);
}

/* Italics */
.t-editor__italic {
  font-style: italic;
}

/* Underline */
.t-editor__underline {
  text-decoration: underline;
}

/* Highlight */
.t-editor__highlight {
  background-color: var(--highlight-background);
  color: var(--highlight-color);
}

/* Links */
.t-editor__anchor {
  --font-color: var(--theme-color-accent);
  --font-visited: var(--theme-color-2);
  --font-hover: var(--theme-color-accent);
  --text-decoration: none;
  --text-decoration-hover: underline;
}

/* Strike-through */
.t-editor__strike {
  text-decoration: line-through;
}

/* Inline code */
.t-editor__inline-code {
}

/* Mark */
.t-editor__mark {
  --highlight-color: var(--theme-color-1);
  --highlight-background: #2297ff38;
}

/* --- Document Blocks --- */

/* Buttons */
.t-editor__button {
  --font-size: var(--theme-small);
  --font-weight: var(--theme-semibold);
  --button-border-radius: var(--theme-radius);
  --button-padding: 8px 12px;
  --button-text-decoration: none;
}

.light-mode .t-editor__button {
  --font-color: var(--theme-button-1-color);
  --font-color-hover: var(--theme-button-1-color);
  --button-background: var(--theme-button-1);
  --button-background-hover: var(--theme-button-1-hover);
  --button-border-color: var(--theme-button-1);
  --button-border-color-hover: var(--theme-button-1-hover);
}

.dark-mode .t-editor__button {
  --font-color: var(--theme-button-1-color);
  --font-color-hover: var(--theme-button-1-color);
  --button-background: var(--theme-button-1);
  --button-background-hover: var(--theme-button-1-hover);
  --button-border-color: var(--theme-button-1);
  --button-border-color-hover: var(--theme-button-1-hover);
}

/* Callout */
.dark-mode .t-editor__callout {
  --callout-font-size: var(--theme-paragraph);

  --callout-neutral-primary: var(--theme-border-color);
  --callout-neutral-secondary: var(--theme-background-2);
  --callout-neutral-font-color: var(--theme-color-1);

  --callout-success-primary: #5dce89;
  --callout-success-secondary: rgba(93, 206, 137, 0.08);
  --callout-success-font-color: var(--theme-color-1);

  --callout-danger-primary: #da615d;
  --callout-danger-secondary: rgba(218, 97, 93, 0.08);
  --callout-danger-font-color: var(--theme-color-1);

  --callout-warning-primary: #ffbb5c;
  --callout-warning-secondary: rgba(255, 187, 92, 0.08);
  --callout-warning-font-color: var(--theme-color-1);

  --callout-info-primary: #586ee0;
  --callout-info-secondary: rgba(88, 110, 224, 0.08);
  --callout-info-font-color: var(--theme-color-1);
}
.light-mode .t-editor__callout {
  --callout-font-size: var(--theme-paragraph);

  --callout-neutral-primary: var(--theme-border-color);
  --callout-neutral-secondary: var(--theme-background-2);
  --callout-neutral-font-color: var(--theme-color-1);

  --callout-success-primary: #5dce89;
  --callout-success-secondary: rgba(93, 206, 137, 0.08);
  --callout-success-font-color: var(--theme-color-1);

  --callout-danger-primary: #da615d;
  --callout-danger-secondary: rgba(218, 97, 93, 0.08);
  --callout-danger-font-color: var(--theme-color-1);

  --callout-warning-primary: #ffbb5c;
  --callout-warning-secondary: rgba(255, 187, 92, 0.08);
  --callout-warning-font-color: var(--theme-color-1);

  --callout-info-primary: #586ee0;
  --callout-info-secondary: rgba(88, 110, 224, 0.08);
  --callout-info-font-color: var(--theme-color-1);
}

/* Codeblock */
.t-editor__code {
}

/* Image Embed */
.t-editor__image {
}

/* Custom embed */
.t-editor__embed {
}

/* Custom file upload */
.t-editor__file {
}

/* Page link */
.t-editor__page-link {
  box-shadow: var(--theme-shadow-1);
  border-radius: var(--theme-radius);
  background: var(--theme-background-2);
  padding: 16px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Line break */
.t-editor__line-break {
}

/* Math */
.t-editor__math {
  --font-color: var(--theme-color-2);
  --font-size: var(--theme-mini);
  --font-weight: var(--theme-regular);
}

/* Tables */
.t-editor__table table {
}
    `)
    expect(themeSchema.parse(theme).theme).toEqual(`
/**
  Custom Theme Starter
*/
:root {
  --scalar-border-width: 1px;
  --scalar-radius: 3px;
  --scalar-radius-lg: 6px;
  --scalar-radius-xl: 8px;

  --scalar-header-height: 50px;
  --scalar-sidebar-width: 280px;
  --scalar-toc-width: 280px;

  /* Typography */
  --scalar-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --scalar-font-code: 'JetBrains Mono';

  /* Font sizes */
  --scalar-heading-1: 40px; /* Page headings */
  --scalar-page-description: 24px;
  --scalar-heading-2: 24px; /* Section headings */
  --scalar-heading-3: 20px;
  --scalar-heading-4: 16px;
  --scalar-heading-5: 16px;
  --scalar-heading-6: 16px;

  --scalar-paragraph: 16px;
  --scalar-small: 14px;
  --scalar-mini: 13px;
  --scalar-micro: 12px;
  --scalar-bold: 600;
  --scalar-semibold: 500;
  --scalar-regular: 400;
}

@media (max-width: 720px) {
  :root {
    --scalar-heading-1: 24px;
    --scalar-page-description: 20px;
  }
}

/* Color Theming */
.light-mode {
  color-scheme: light;
  --scalar-color-1: #2a2f45;
  --scalar-color-2: #757575;
  --scalar-color-3: #8e8e8e;
  --scalar-color-disabled: #b4b1b1;
  --scalar-color-ghost: #a7a7a7;
  --scalar-color-accent: #0099ff;
  --scalar-background-1: #fff;
  --scalar-background-2: #f6f6f6;
  --scalar-background-3: #e7e7e7;
  --scalar-background-4: rgba(0, 0, 0, 0.06);
  --scalar-background-accent: #8ab4f81f;

  --scalar-border-color: rgba(0, 0, 0, 0.1);
  --scalar-scrollbar-color: rgba(0, 0, 0, 0.18);
  --scalar-scrollbar-color-active: rgba(0, 0, 0, 0.36);
  --scalar-lifted-brightness: 1;
  --scalar-backdrop-brightness: 1;

  --scalar-shadow-1: 0 1px 3px 0 rgba(0, 0, 0, 0.11);
  --scalar-shadow-2: rgba(0, 0, 0, 0.08) 0px 13px 20px 0px,
    rgba(0, 0, 0, 0.08) 0px 3px 8px 0px, #eeeeed 0px 0 0 1px;

  --scalar-button-1: rgb(49 53 56);
  --scalar-button-1-color: #fff;
  --scalar-button-1-hover: rgb(28 31 33);

  --scalar-color-green: #059669;
  --scalar-color-red: #dc2626;
  --scalar-color-yellow: #ca8a04;
  --scalar-color-blue: #2563eb;
  --scalar-color-orange: #ea580c;
  --scalar-color-purple: #7c3aed;
}

.dark-mode {
  color-scheme: dark;
  --scalar-color-1: rgba(255, 255, 255, 0.9);
  --scalar-color-2: rgba(255, 255, 255, 0.62);
  --scalar-color-3: rgba(255, 255, 255, 0.44);
  --scalar-color-disabled: rgba(255, 255, 255, 0.34);
  --scalar-color-ghost: rgba(255, 255, 255, 0.26);
  --scalar-color-accent: #8ab4f8;
  --scalar-background-1: #1a1a1a;
  --scalar-background-2: #252525;
  --scalar-background-3: #323232;
  --scalar-background-4: rgba(255, 255, 255, 0.06);
  --scalar-background-accent: #8ab4f81f;

  --scalar-border-color: rgba(255, 255, 255, 0.1);
  --scalar-scrollbar-color: rgba(255, 255, 255, 0.24);
  --scalar-scrollbar-color-active: rgba(255, 255, 255, 0.48);
  --scalar-lifted-brightness: 1.45;
  --scalar-backdrop-brightness: 0.5;

  --scalar-shadow-1: 0 1px 3px 0 rgb(0, 0, 0, 0.1);
  --scalar-shadow-2: rgba(15, 15, 15, 0.2) 0px 3px 6px,
    rgba(15, 15, 15, 0.4) 0px 9px 24px, 0 0 0 1px rgba(255, 255, 255, 0.1);

  --scalar-button-1: #f6f6f6;
  --scalar-button-1-color: #000;
  --scalar-button-1-hover: #e7e7e7;

  --scalar-color-green: #00b648;
  --scalar-color-red: #dc1b19;
  --scalar-color-yellow: #ffc90d;
  --scalar-color-blue: #4eb3ec;
  --scalar-color-orange: #ff8d4d;
  --scalar-color-purple: #b191f9;
}

/* Aliases & Inferred Variables */
.light-mode,
.dark-mode {
  --scalar-border: var(--scalar-border-width) solid var(--scalar-border-color);
}

/* Sidebar */
.light-mode .t-doc__sidebar {
  --scalar-sidebar-background-1: var(--scalar-background-1);
  --scalar-sidebar-item-hover-color: currentColor;
  --scalar-sidebar-item-hover-background: var(--scalar-background-2);
  --scalar-sidebar-item-active-background: var(--scalar-background-accent);
  --scalar-sidebar-border-color: var(--scalar-border-color);
  --scalar-sidebar-color-1: var(--scalar-color-1);
  --scalar-sidebar-color-2: var(--scalar-color-2);
  --scalar-sidebar-color-active: var(--scalar-color-accent);
  --scalar-sidebar-search-background: transparent;
  --scalar-sidebar-search-border-color: var(--scalar-sidebar-border-color);
  --scalar-sidebar-search--color: var(--scalar-color-3);
}

.dark-mode .t-doc__sidebar {
  --scalar-sidebar-background-1: var(--scalar-background-1);
  --scalar-sidebar-item-hover-color: currentColor;
  --scalar-sidebar-item-hover-background: var(--scalar-background-2);
  --scalar-sidebar-item-active-background: var(--scalar-background-accent);
  --scalar-sidebar-border-color: var(--scalar-border-color);
  --scalar-sidebar-color-1: var(--scalar-color-1);
  --scalar-sidebar-color-2: var(--scalar-color-2);
  --scalar-sidebar-color-active: var(--scalar-color-accent);
  --scalar-sidebar-search-background: transparent;
  --scalar-sidebar-search-border-color: var(--scalar-sidebar-border-color);
  --scalar-sidebar-search--color: var(--scalar-color-3);
}

/* Table of contents */
.light-mode .t-doc__toc {
  --table-of-contents-heading-color: var(--scalar-color-1);
  --table-of-contents-section-color: var(--scalar-color-2);
  --table-of-contents-section-color-active: var(--scalar-color-accent);
}
.dark-mode .t-doc__toc {
  --table-of-contents-heading-color: var(--scalar-color-1);
  --table-of-contents-section-color: var(--scalar-color-2);
  --table-of-contents-section-color-active: var(--scalar-color-accent);
}

/* Document header */
.light-mode .t-doc__header {
  --scalar-header-background-1: var(--scalar-background-1);
  --scalar-header-border-color: var(--scalar-border-color);
  --scalar-header-color-1: var(--scalar-color-1);
  --scalar-header-color-2: var(--scalar-color-2);
  --scalar-header-background-toggle: var(--scalar-color-3);
  --scalar-header-call-to-action-color: var(--scalar-color-accent);
}

.dark-mode .t-doc__header {
  --scalar-header-background-1: var(--scalar-background-1);
  --scalar-header-border-color: var(--scalar-border-color);
  --scalar-header-color-1: var(--scalar-color-1);
  --scalar-header-color-2: var(--scalar-color-2);
  --scalar-header-background-toggle: var(--scalar-color-3);
  --scalar-header-call-to-action-color: var(--scalar-color-accent);
}

/* --- Document Typography --- */

/* Page Title */
.t-editor__page-title {
  --font-size: var(--scalar-heading-1);
  --font-color: var(--scalar-color-1);
  --font-weight: var(--scalar-bold);
}

.t-editor__page-title .subheading {
  --font-size: var(--scalar-page-description);
  --font-color: var(--scalar-color-1);
  --font-weight: var(--scalar-semibold);
}

/* Headings */
.t-editor__heading h1 {
  --font-size: var(--scalar-heading-2);
  --font-weight: var(--scalar-bold);
  --font-color: var(--scalar-color-1);
}

.t-editor__heading h2 {
  --font-size: var(--scalar-heading-2);
  --font-weight: var(--scalar-bold);
  --font-color: var(--scalar-color-1);
}

.t-editor__heading h3 {
  --font-size: var(--scalar-heading-3);
  --font-color: var(--scalar-color-1);
  --font-weight: var(--scalar-bold);
}

.t-editor__heading h4,
.t-editor__heading h5,
.t-editor__heading h6 {
  --font-size: var(--scalar-heading-4);
  --font-color: var(--scalar-color-1);
  --font-weight: var(--scalar-bold);
}

/* Paragraph */
.t-editor__paragraph {
  --font-size: var(--scalar-paragraph);
  --font-color: var(--scalar-color-1);
  --font-weight: var(--scalar-regular);
}

/* Lists */
.t-editor__list ul,
.t-editor__list ol {
  color: var(--scalar-color-1);
  padding-left: 30px;
}

/* Checklist */
.t-editor__checklist ul {
  list-style: none;
  padding-left: 0;
  margin-left: 0;
}

/* Blockquote */
.t-editor__quote {
  --font-size: var(--scalar-paragraph);
  --scalar-border-left: 2px solid var(--scalar-color-1);
  --font-color: var(--scalar-color-1);
  --padding: 6px 0 6px 14px;
}

/* Fine print */
.t-editor__fine-print {
  --font-size: var(--scalar-mini);
  --font-color: var(--scalar-color-2);
  --font-weight: var(--scalar-regular);
}

/* Bold */
.t-editor__bold {
  font-weight: var(--scalar-bold);
}

/* Italics */
.t-editor__italic {
  font-style: italic;
}

/* Underline */
.t-editor__underline {
  text-decoration: underline;
}

/* Highlight */
.t-editor__highlight {
  background-color: var(--highlight-background);
  color: var(--highlight-color);
}

/* Links */
.t-editor__anchor {
  --font-color: var(--scalar-color-accent);
  --font-visited: var(--scalar-color-2);
  --font-hover: var(--scalar-color-accent);
  --text-decoration: none;
  --text-decoration-hover: underline;
}

/* Strike-through */
.t-editor__strike {
  text-decoration: line-through;
}

/* Inline code */
.t-editor__inline-code {
}

/* Mark */
.t-editor__mark {
  --highlight-color: var(--scalar-color-1);
  --highlight-background: #2297ff38;
}

/* --- Document Blocks --- */

/* Buttons */
.t-editor__button {
  --font-size: var(--scalar-small);
  --font-weight: var(--scalar-semibold);
  --button-border-radius: var(--scalar-radius);
  --button-padding: 8px 12px;
  --button-text-decoration: none;
}

.light-mode .t-editor__button {
  --font-color: var(--scalar-button-1-color);
  --font-color-hover: var(--scalar-button-1-color);
  --button-background: var(--scalar-button-1);
  --button-background-hover: var(--scalar-button-1-hover);
  --button-border-color: var(--scalar-button-1);
  --button-border-color-hover: var(--scalar-button-1-hover);
}

.dark-mode .t-editor__button {
  --font-color: var(--scalar-button-1-color);
  --font-color-hover: var(--scalar-button-1-color);
  --button-background: var(--scalar-button-1);
  --button-background-hover: var(--scalar-button-1-hover);
  --button-border-color: var(--scalar-button-1);
  --button-border-color-hover: var(--scalar-button-1-hover);
}

/* Callout */
.dark-mode .t-editor__callout {
  --callout-font-size: var(--scalar-paragraph);

  --callout-neutral-primary: var(--scalar-border-color);
  --callout-neutral-secondary: var(--scalar-background-2);
  --callout-neutral-font-color: var(--scalar-color-1);

  --callout-success-primary: #5dce89;
  --callout-success-secondary: rgba(93, 206, 137, 0.08);
  --callout-success-font-color: var(--scalar-color-1);

  --callout-danger-primary: #da615d;
  --callout-danger-secondary: rgba(218, 97, 93, 0.08);
  --callout-danger-font-color: var(--scalar-color-1);

  --callout-warning-primary: #ffbb5c;
  --callout-warning-secondary: rgba(255, 187, 92, 0.08);
  --callout-warning-font-color: var(--scalar-color-1);

  --callout-info-primary: #586ee0;
  --callout-info-secondary: rgba(88, 110, 224, 0.08);
  --callout-info-font-color: var(--scalar-color-1);
}
.light-mode .t-editor__callout {
  --callout-font-size: var(--scalar-paragraph);

  --callout-neutral-primary: var(--scalar-border-color);
  --callout-neutral-secondary: var(--scalar-background-2);
  --callout-neutral-font-color: var(--scalar-color-1);

  --callout-success-primary: #5dce89;
  --callout-success-secondary: rgba(93, 206, 137, 0.08);
  --callout-success-font-color: var(--scalar-color-1);

  --callout-danger-primary: #da615d;
  --callout-danger-secondary: rgba(218, 97, 93, 0.08);
  --callout-danger-font-color: var(--scalar-color-1);

  --callout-warning-primary: #ffbb5c;
  --callout-warning-secondary: rgba(255, 187, 92, 0.08);
  --callout-warning-font-color: var(--scalar-color-1);

  --callout-info-primary: #586ee0;
  --callout-info-secondary: rgba(88, 110, 224, 0.08);
  --callout-info-font-color: var(--scalar-color-1);
}

/* Codeblock */
.t-editor__code {
}

/* Image Embed */
.t-editor__image {
}

/* Custom embed */
.t-editor__embed {
}

/* Custom file upload */
.t-editor__file {
}

/* Page link */
.t-editor__page-link {
  box-shadow: var(--scalar-shadow-1);
  border-radius: var(--scalar-radius);
  background: var(--scalar-background-2);
  padding: 16px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Line break */
.t-editor__line-break {
}

/* Math */
.t-editor__math {
  --font-color: var(--scalar-color-2);
  --font-size: var(--scalar-mini);
  --font-weight: var(--scalar-regular);
}

/* Tables */
.t-editor__table table {
}
    `)
  })
})
