import { PathId } from '@/router'
import type { Cookie } from '@scalar/oas-utils/entities/cookie'
import type { Environment } from '@scalar/oas-utils/entities/environment'
import type { Collection, Request, RequestExample, Server } from '@scalar/oas-utils/entities/spec'
import type { Workspace } from '@scalar/oas-utils/entities/workspace'
import type { Router } from 'vue-router'

/** Getter function for router parameters */
export function getRouterParams(router?: Router) {
  return () => {
    const pathParams = {
      [PathId.Collection]: 'default' as Collection['uid'],
      [PathId.Environment]: 'default' as Environment['uid'],
      [PathId.Request]: 'default' as Request['uid'],
      [PathId.Examples]: 'default' as RequestExample['uid'],
      [PathId.Schema]: 'default',
      [PathId.Cookies]: 'default' as Cookie['uid'],
      [PathId.Servers]: 'default' as Server['uid'],
      [PathId.Workspace]: 'default' as Workspace['uid'],
      [PathId.Settings]: 'default',
    }

    const currentRoute = router?.currentRoute.value

    if (currentRoute) {
      Object.values(PathId).forEach((k: keyof typeof pathParams) => {
        if (currentRoute.params[k]) {
          // @ts-expect-error yolo, can hold us over until we have typed routes
          pathParams[k] = currentRoute.params[k]
        }
      })
    }

    return pathParams
  }
}
