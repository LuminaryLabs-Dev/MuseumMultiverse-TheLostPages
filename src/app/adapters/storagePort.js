function failure(error) {
  return {
    ok: false,
    error: error instanceof Error ? error.message : String(error)
  };
}

export function createLocalStoragePort(storage) {
  function target() {
    return storage ?? globalThis.localStorage;
  }

  return Object.freeze({
    read(key) {
      try {
        const provider = target();
        if (!provider) return failure('storage_unavailable');
        return { ok: true, value: provider.getItem(key) };
      } catch (error) {
        return failure(error);
      }
    },
    write(key, value) {
      try {
        const provider = target();
        if (!provider) return failure('storage_unavailable');
        provider.setItem(key, String(value));
        return { ok: true };
      } catch (error) {
        return failure(error);
      }
    },
    remove(key) {
      try {
        const provider = target();
        if (!provider) return failure('storage_unavailable');
        provider.removeItem(key);
        return { ok: true };
      } catch (error) {
        return failure(error);
      }
    }
  });
}

export function createMemoryStoragePort(initial = {}) {
  const values = new Map(Object.entries(initial).map(([key, value]) => [key, String(value)]));
  return Object.freeze({
    read(key) {
      return { ok: true, value: values.has(key) ? values.get(key) : null };
    },
    write(key, value) {
      values.set(key, String(value));
      return { ok: true };
    },
    remove(key) {
      values.delete(key);
      return { ok: true };
    },
    snapshot() {
      return Object.fromEntries(values.entries());
    }
  });
}
