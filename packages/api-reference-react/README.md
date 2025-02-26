# Scalar API Reference React Component

[![Version](https://img.shields.io/npm/v/%40scalar/api-reference-react)](https://www.npmjs.com/package/@scalar/api-reference-react)
[![Downloads](https://img.shields.io/npm/dm/%40scalar/api-reference-react)](https://www.npmjs.com/package/@scalar/api-reference-react)
[![License](https://img.shields.io/npm/l/%40scalar%2Fapi-reference-react)](https://www.npmjs.com/package/@scalar/api-reference-react)
[![Discord](https://img.shields.io/discord/1135330207960678410?style=flat&color=5865F2)](https://discord.gg/scalar)

## Installation

```bash
npm install @scalar/api-reference-react
```

## Compatibility

This package is compatible with React 19 and now also includes a dedicated build for React 18. You can use either version based on your project requirements.

### React 19 (Default)
The default import is compatible with React 19:

```ts
import { ApiReferenceReact } from '@scalar/api-reference-react'
```

### React 18
For React 18 compatibility, use the dedicated build:

```ts
import { ApiReferenceReact } from '@scalar/api-reference-react/react18'
```

## Usage

The API Reference package is written in Vue. That shouldn't stop you from using it in React, though. We have created a client side wrapper in React:

> [!WARNING]\
> This is untested on SSR/SSG!

### React 19 Example

```tsx
import { ApiReferenceReact } from '@scalar/api-reference-react'
import '@scalar/api-reference-react/style.css'

function App() {
  return (
    <ApiReferenceReact
      configuration={{
        spec: {
          url: 'https://cdn.jsdelivr.net/npm/@scalar/galaxy/dist/latest.yaml',
        },
      }}
    />
  )
}

export default App
```

### React 18 Example

```tsx
import { ApiReferenceReact } from '@scalar/api-reference-react/react18'
import '@scalar/api-reference-react/style.css'

function App() {
  return (
    <ApiReferenceReact
      configuration={{
        spec: {
          url: 'https://cdn.jsdelivr.net/npm/@scalar/galaxy/dist/latest.yaml',
        },
      }}
    />
  )
}

export default App
```

The API and functionality are identical between both versions - only the React dependency version differs.

We wrote a [detailed integration guide for React](https://github.com/scalar/scalar/tree/main/documentation/integrations/react.md), too.

### Example

You can find an example in this repo under [examples/react](https://github.com/scalar/scalar/tree/main/examples/react)

## Props

ApiReference only takes one prop which is the configuration object.

### configuration: ReferenceProps

You can find the full configuration options under
[packages/api-reference](https://github.com/scalar/scalar/tree/main/packages/api-reference).

## Community

We are API nerds. You too? Let's chat on Discord: <https://discord.gg/scalar>

## License

The source code in this repository is licensed under [MIT](https://github.com/scalar/scalar/blob/main/LICENSE).