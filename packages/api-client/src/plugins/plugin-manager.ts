import type { ApiClientPlugin } from '@/plugins/post-response-scripts/post-response-scripts-plugin'
import { type InjectionKey, inject } from 'vue'

type CreatePluginManagerParams = {
  plugins?: ApiClientPlugin[]
}

/**
 * Create the plugin manager store
 *
 * This store manages all plugins registered with the API client
 */
export const createPluginManager = ({ plugins = [] }: CreatePluginManagerParams) => {
  const registeredPlugins = new Map<string, ReturnType<ApiClientPlugin>>()

  // Register initial plugins
  plugins.forEach((plugin) => {
    const pluginInstance = plugin()
    registeredPlugins.set(pluginInstance.name, pluginInstance)
  })

  return {
    /**
     * Get all components for a specific view
     */
    getViewComponents: (view: keyof ReturnType<ApiClientPlugin>['views']) => {
      return Array.from(registeredPlugins.values()).flatMap((plugin) => plugin.views[view] || [])
    },

    /**
     * Execute a hook for a specific event
     */
    executeHook: (event: keyof ReturnType<ApiClientPlugin>['hooks'], ...args: any[]) => {
      const hooks = Array.from(registeredPlugins.values()).flatMap((plugin) => plugin.hooks[event] || [])

      // Execute each hook with the provided arguments
      return Promise.all(hooks.map((hook) => hook(...args)))
    },
  }
}

export type PluginManager = ReturnType<typeof createPluginManager>
export const PLUGIN_MANAGER_SYMBOL = Symbol() as InjectionKey<PluginManager>

/**
 * Hook to access the plugin manager
 *
 * @throws Error if plugin manager is not provided
 */
export const usePluginManager = (): PluginManager => {
  const manager = inject(PLUGIN_MANAGER_SYMBOL)

  if (!manager) {
    throw new Error('Plugin manager not provided')
  }

  return manager
}
