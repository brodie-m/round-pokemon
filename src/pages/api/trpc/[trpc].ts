import { appRouter } from "@/backend/router"
import * as trcpNext from "@trpc/server/adapters/next"

export default trcpNext.createNextApiHandler({
    router:appRouter,
    createContext: () => null,
})