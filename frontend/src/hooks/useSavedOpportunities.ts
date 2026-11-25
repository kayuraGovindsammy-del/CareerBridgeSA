import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'careerbridge-saved-opportunities';

const listeners = new Set<() => void>();

let cachedRaw: string | null | undefined;
let cachedIds: string[] = [];

function getSnapshot(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw !== cachedRaw) {
    cachedRaw = raw;

    try {
      const parsed: unknown = JSON.parse(raw ?? '[]');

      cachedIds = Array.isArray(parsed)
        ? parsed.filter(
            (item): item is string => typeof item === 'string',
          )
        : [];
    } catch {
      cachedIds = [];
    }
  }

  return cachedIds;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  window.addEventListener('storage', listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

export function useSavedOpportunities() {
  const savedIds = useSyncExternalStore(subscribe, getSnapshot);

  function toggleSaved(id: string) {
    const current = getSnapshot();

    const updated = current.includes(id)
      ? current.filter((savedId) => savedId !== id)
      : [...current, id];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    listeners.forEach((listener) => listener());
  }

  function isSaved(id: string) {
    return savedIds.includes(id);
  }

  return {
    savedIds,
    toggleSaved,
    isSaved,
  };
}