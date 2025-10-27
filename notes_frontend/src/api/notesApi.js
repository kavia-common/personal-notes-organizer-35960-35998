import { nanoid } from '../state/uid';

/**
 * PUBLIC_INTERFACE
 * notesApi provides an in-memory/local abstraction that can be replaced with backend integration.
 */
export const notesApi = {
  create(data) {
    const now = Date.now();
    return { id: nanoid(), createdAt: now, updatedAt: now, ...data };
  },
};
