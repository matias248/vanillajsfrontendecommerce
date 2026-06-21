type Listener<K, V> = (map: Map<K, V>) => void;

export function createObservableMap<K, V>(initial?: [K, V][]) {
    const map = new Map<K, V>(initial);
    const listeners: Listener<K, V>[] = [];

    function subscribe(fn: Listener<K, V>): () => void {
        listeners.push(fn);

        return () => {
            const index = listeners.indexOf(fn);
            if (index > -1) listeners.splice(index, 1);
        };
    }

    function notify() {
        listeners.forEach(fn => fn(map));
    }

    function set(key: K, value: V) {
        map.set(key, value);
        notify();
    }

    function remove(key: K) {
        map.delete(key);
        notify();
    }

    function get(key: K): V | undefined {
        return map.get(key);
    }

    function getAll(): Map<K, V> {
        return map;
    }

    function clear() {
        map.clear();
        notify();
    }

    return {
        subscribe,
        set,
        remove,
        get,
        getAll,
        clear
    };
}