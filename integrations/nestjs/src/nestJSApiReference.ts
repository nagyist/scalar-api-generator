import type { ServerResponse } from 'node:http'
import { getHtmlDocument } from '@scalar/core/libs/html-rendering'
import type { Request, Response } from 'express'
import type { FastifyRequest } from 'fastify'
import type { ApiReferenceConfiguration } from './types.ts'

/**
 * The default configuration for the API Reference
 */
const DEFAULT_CONFIGURATION: Partial<ApiReferenceConfiguration> = {
  _integration: 'nestjs',
}

/**
 * The custom theme for NestJS
 */
export const customTheme = `
/* basic theme */
.light-mode {
  --scalar-color-1: #2a2f45;
  --scalar-color-2: #757575;
  --scalar-color-3: #8e8e8e;
  --scalar-color-accent: #e0234d;
  --scalar-background-1: #fff;
  --scalar-background-2: #f6f6f6;
  --scalar-background-3: #e7e7e7;
  --scalar-background-accent: #8ab4f81f;
  --scalar-border-color: rgba(0, 0, 0, 0.1);
}
.dark-mode {
  --scalar-color-1: rgba(255, 255, 255, 1);
  --scalar-color-2: #b2bac2;
  --scalar-color-3: #6e748b;
  --scalar-color-accent: #e0234d;
  --scalar-background-1: #11131e;
  --scalar-background-2: #1c2132;
  --scalar-background-3: #2f354a;
  --scalar-background-accent: #8ab4f81f;
  --scalar-border-color: rgba(255, 255, 255, 0.1);
}
/* Document Sidebar */
.light-mode .t-doc__sidebar,
.dark-mode .t-doc__sidebar {
  --scalar-sidebar-background-1: var(--scalar-background-1);
  --scalar-sidebar-item-hover-color: currentColor;
  --scalar-sidebar-item-hover-background: var(--scalar-background-2);
  --scalar-sidebar-item-active-background: var(--scalar-background-3);
  --scalar-sidebar-border-color: var(--scalar-border-color);
  --scalar-sidebar-color-1: var(--scalar-color-1);
  --scalar-sidebar-color-2: var(--scalar-color-2);
  --scalar-sidebar-color-active: var(--scalar-color-1);
  --scalar-sidebar-search-background: var(--scalar-background-2);
  --scalar-sidebar-search-border-color: var(--scalar-background-2);
  --scalar-sidebar-search-color: var(--scalar-color-3);
}

/* advanced */
.light-mode {
  --scalar-button-1: rgb(49 53 56);
  --scalar-button-1-color: #fff;
  --scalar-button-1-hover: rgb(28 31 33);
  --scalar-color-green: #069061;
  --scalar-color-red: #ef0006;
  --scalar-color-yellow: #edbe20;
  --scalar-color-blue: #0082d0;
  --scalar-color-orange: #fb892c;
  --scalar-color-purple: #5203d1;
  --scalar-scrollbar-color: rgba(0, 0, 0, 0.18);
  --scalar-scrollbar-color-active: rgba(0, 0, 0, 0.36);
}
.dark-mode {
  --scalar-button-1: #f6f6f6;
  --scalar-button-1-color: #000;
  --scalar-button-1-hover: #e7e7e7;
  --scalar-color-green: #30beb0;
  --scalar-color-red: #e91e63;
  --scalar-color-yellow: #ffc90d;
  --scalar-color-blue: #2cb6f6;
  --scalar-color-orange: #ff5656;
  --scalar-color-purple: #6223e0;
  --scalar-scrollbar-color: rgba(255, 255, 255, 0.24);
  --scalar-scrollbar-color-active: rgba(255, 255, 255, 0.48);
}
`

/**
 * The NestJS plugin for the Scalar API Reference
 */
export function apiReference(givenConfiguration: Partial<ApiReferenceConfiguration>) {
  // Merge the defaults
  const configuration = {
    ...DEFAULT_CONFIGURATION,
    ...givenConfiguration,
  }

  const html = getHtmlDocument(configuration, customTheme)

  // Use Fastify to respond with the HTML document
  if (configuration.withFastify) {
    return (_: FastifyRequest, res: ServerResponse) => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(html)
      res.end()
    }
  }

  // Use Express to respond with the HTML document
  return (_: Request, res: Response) => {
    res.type('text/html').send(html)
  }
}
