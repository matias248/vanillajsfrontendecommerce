
type Listener<T> = (state: T) => void;

export function createStore<T extends object>(initialState: T) {
  let state = initialState;
  const listeners: Listener<T>[] = [];

  function subscribe(fn: Listener<T>): () => void {
    listeners.push(fn);

    // unsubscribe
    return () => {
      const index = listeners.indexOf(fn);
      if (index > -1) listeners.splice(index, 1);
    };
  }

  function setState(newState: Partial<T>): void {
    state = { ...state, ...newState };
    notify();
  }

  function getState(): T {
    return state;
  }

  function notify(): void {
    listeners.forEach(fn => fn(state));
  }

  return {
    subscribe,
    setState,
    getState
  };
}