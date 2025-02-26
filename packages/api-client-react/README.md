# Scalar API Client React

[![Version](https://img.shields.io/npm/v/%40scalar/api-client-react)](https://www.npmjs.com/package/@scalar/api-client-react)
[![Downloads](https://img.shields.io/npm/dm/%40scalar/api-client-react)](https://www.npmjs.com/package/@scalar/api-client-react)
[![License](https://img.shields.io/npm/l/%40scalar%2Fapi-client-react)](https://www.npmjs.com/package/@scalar/api-client-react)
[![Discord](https://img.shields.io/discord/1135330207960678410?style=flat&color=5865F2)](https://discord.gg/scalar)

## Installation

```bash
npm install @scalar/api-client-react
```

## Compatibility

This package is compatible with React 19 and now also includes a dedicated build for React 18. You can use either version based on your project requirements.

### React 19 (Default)
The default import is compatible with React 19:

```ts
import { ApiClientModalProvider, useApiClientModal } from '@scalar/api-client-react'
```

### React 18
For React 18 compatibility, use the dedicated build:

```ts
import { ApiClientModalProvider, useApiClientModal } from '@scalar/api-client-react/react18'
```

## Usage

First we need to add the provider, you should add it in the highest place you have a unique spec.

### React 19 Example

```tsx
import { ApiClientModalProvider } from '@scalar/api-client-react'
import '@scalar/api-client-react/style.css'

function App() {
  return (
    <ApiClientModalProvider
      configuration={{
        spec: {
          url: 'https://cdn.jsdelivr.net/npm/@scalar/galaxy/dist/latest.json',
        },
      }}>
      {children}
    </ApiClientModalProvider>
  )
}
```

### React 18 Example

```tsx
import { ApiClientModalProvider } from '@scalar/api-client-react/react18'
import '@scalar/api-client-react/style.css'

function App() {
  return (
    <ApiClientModalProvider
      configuration={{
        spec: {
          url: 'https://cdn.jsdelivr.net/npm/@scalar/galaxy/dist/latest.json',
        },
      }}>
      {children}
    </ApiClientModalProvider>
  )
}
```

Then you can trigger it from anywhere inside of that provider by calling the `useApiClientModal()`

```tsx
import { useApiClientModal } from '@scalar/api-client-react' // or '@scalar/api-client-react/react18' for React 18

const client = useApiClientModal()

return (
  <button onClick={() => client?.open({ path: '/auth/token', method: 'get' })}>
    Click me to open the Api Client
  </button>
)
```

The API and functionality are identical between both versions - only the React dependency version differs.

Check out the playground for a working example.

## Community

We are API nerds. You too? Let's chat on Discord: <https://discord.gg/scalar>

## License

The source code in this repository is licensed under [MIT](https://github.com/scalar/scalar/blob/main/LICENSE).