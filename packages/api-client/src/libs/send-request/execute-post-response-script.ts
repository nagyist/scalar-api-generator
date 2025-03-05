// Create a safe context object with controlled APIs
const createScriptContext = ({ response }: { response: Response }) => {
  // Create a proxy to control access to globals
  const globalProxy = new Proxy(
    {},
    {
      get(_, prop: string) {
        // Only allow access to specific globals
        const allowedGlobals = ['console', 'JSON', 'Math', 'Date', 'RegExp', 'String', 'Number', 'Boolean']
        if (allowedGlobals.includes(prop)) {
          return (globalThis as any)[prop]
        }
        return undefined
      },
      set() {
        return false // Prevent modifications to globals
      },
    },
  )

  // Create the context object with safe APIs
  const context: ScriptContext = {
    // Response data
    response: {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    },
    // Console methods for debugging
    console: {
      log: (...args: any[]) => console.log('[Script]', ...args),
      error: (...args: any[]) => console.error('[Script Error]', ...args),
      warn: (...args: any[]) => console.warn('[Script Warning]', ...args),
    },
    // Utility functions
    pm: {
      // Response utilities
      response: {
        json: async () => {
          const text = await response.text()
          try {
            return JSON.parse(text)
          } catch {
            throw new Error('Response is not valid JSON')
          }
        },
        text: async () => response.text(),
        code: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        // Add Postman-like assertion methods
        to: {
          have: {
            status: (expectedStatus: number) => {
              if (response.status !== expectedStatus) {
                throw new Error(`Expected status ${expectedStatus} but got ${response.status}`)
              }
              return true
            },
            header: (headerName: string) => {
              if (!response.headers.has(headerName)) {
                throw new Error(`Expected header "${headerName}" to be present`)
              }
              return {
                that: {
                  equals: (expectedValue: string) => {
                    const actualValue = response.headers.get(headerName)
                    if (actualValue !== expectedValue) {
                      throw new Error(
                        `Expected header "${headerName}" to be "${expectedValue}" but got "${actualValue}"`,
                      )
                    }
                    return true
                  },
                  includes: (expectedValue: string) => {
                    const actualValue = response.headers.get(headerName)
                    if (!actualValue?.includes(expectedValue)) {
                      throw new Error(
                        `Expected header "${headerName}" to include "${expectedValue}" but got "${actualValue}"`,
                      )
                    }
                    return true
                  },
                },
              }
            },
          },
          be: {
            json: async () => {
              try {
                await response.json()
                return true
              } catch {
                throw new Error('Expected response to be valid JSON')
              }
            },
          },
        },
      },
      // Environment utilities
      environment: {
        get: (key: string) => {
          // Only allow access to specific environment variables
          const allowedVars = ['NODE_ENV', 'API_URL']
          if (allowedVars.includes(key)) {
            return import.meta.env[key]
          }
          return undefined
        },
        set: () => {
          // Prevent setting environment variables
          return false
        },
      },
      // Test utilities
      test: (name: string, fn: () => void) => {
        try {
          fn()
          console.log(`✓ ${name}`)
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : String(error)
          console.error(`✗ ${name}: ${errorMessage}`)
        }
      },
    },
    // Test results array
    testResults: [],
  }

  return { globalProxy, context }
}

interface TestResult {
  title: string
  success: boolean
  duration: number
  error?: string
}

interface ScriptContext {
  response: {
    status: number
    statusText: string
    headers: Record<string, string>
  }
  console: {
    log: (...args: any[]) => void
    error: (...args: any[]) => void
    warn: (...args: any[]) => void
  }
  pm: {
    response: {
      json: () => Promise<any>
      text: () => Promise<string>
      code: number
      headers: Record<string, string>
      to: {
        have: {
          status: (expectedStatus: number) => boolean
          header: (headerName: string) => {
            that: {
              equals: (expectedValue: string) => boolean
              includes: (expectedValue: string) => boolean
            }
          }
        }
        be: {
          json: () => Promise<boolean>
        }
      }
    }
    environment: {
      get: (key: string) => string | undefined
      set: () => boolean
    }
    test: (name: string, fn: () => void) => void
  }
  testResults: TestResult[]
}

export const executePostResponseScript = async (
  script: string | undefined,
  data: { response: Response },
): Promise<TestResult[]> => {
  // No script to execute
  if (!script) {
    return []
  }

  // Create script context
  const { globalProxy, context } = createScriptContext(data)
  const startTime = performance.now()
  const testResults: TestResult[] = []

  try {
    console.log('[Post-Response Script] Executing script')

    // Create a function that sets up the global context and runs the script
    const scriptFn = new Function(
      'global',
      'context',
      `
      "use strict";

      // Expose context in global scope
      const pm = context.pm;
      const response = context.response;
      const console = context.console;

      // Override pm.test to track results
      const originalTest = pm.test;
      pm.test = (name, fn) => {
        const testStartTime = performance.now();
        try {
          fn();
          const testEndTime = performance.now();
          const duration = testEndTime - testStartTime;
          context.testResults.push({
            title: name,
            success: true,
            duration,
          });
          console.log(\`✓ \${name}\`);
        } catch (error) {
          const testEndTime = performance.now();
          const duration = testEndTime - testStartTime;
          const errorMessage = error instanceof Error ? error.message : String(error);
          context.testResults.push({
            title: name,
            success: false,
            duration,
            error: errorMessage,
          });
          console.error(\`✗ \${name}: \${errorMessage}\`);
        }
      };

      // Run the user's script
      ${script}
      `,
    )

    // Add testResults array to context
    context.testResults = testResults

    // Execute the script with controlled context
    await scriptFn.call(globalProxy, globalProxy, context)

    const endTime = performance.now()
    const duration = (endTime - startTime).toFixed(2)
    console.log(`[Post-Response Script] Completed (${duration}ms)`)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const endTime = performance.now()
    const duration = (endTime - startTime).toFixed(2)
    console.error(`[Post-Response Script] Error (${duration}ms):`, errorMessage)
  }

  return testResults
}
