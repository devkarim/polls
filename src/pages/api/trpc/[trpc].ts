import * as trpcNext from '@trpc/server/adapters/next';
import { createContext, appRouter } from '@/backend/routes';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
