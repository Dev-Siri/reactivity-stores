import Store from "../store";

export default function mergeStores<
  T extends object,
  U extends Store<any>[] = any
>(name: string, stores: U) {
  const storeValues: Record<string, any> = {};

  for (let i = 0; i < stores.length; i++) {
    const { name, state } = stores[i];
    storeValues[name] = state;
  }

  const store = new Store<T>(name, storeValues as T);

  return store;
}
