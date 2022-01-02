import { appRouter, AppRouter } from "@/backend/router"
import { inferProcedureOutput } from "@trpc/server";
import * as trcpNext from "@trpc/server/adapters/next"

export default trcpNext.createNextApiHandler({
    router:appRouter,
    createContext: () => null,
})

export type inferQueryResponse<
    TRouteKey extends keyof AppRouter["_def"]["queries"]
    > = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;