type Listener<T> = (state: T[]) => void;

export function createArrayStore<T>(initialArray: T[] = []) {
  const listeners: Listener<T>[] = [];

  const notify = () => {
    listeners.forEach(fn => fn(proxy));
  };

  const proxy = new Proxy(initialArray, {
    set(target, prop, value) {
      const result = Reflect.set(target, prop, value);
      if (prop !== "length") {
        notify();
      }

      return result;
    }
  });

  function subscribe(fn: Listener<T>): () => void {
    listeners.push(fn);

    return () => {
      const index = listeners.indexOf(fn);
      if (index > -1) listeners.splice(index, 1);
    };
  }

  function getState(): T[] {
    return proxy;
  }

  return {
    subscribe,
    getState
  };
}