import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '@/backend/routes';

export const trpc = createReactQueryHooks<AppRouter>();
