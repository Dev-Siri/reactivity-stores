export type Stores<T> = (T extends Store<infer U> ? Store<U> : never)[];
export type Listener<T> = (state: T) => Promise<void> | void;
export type State<T> = T extends Store<infer U> ? U : never;

export default class Store<T> {
  listeners: Listener<T>[] = [];
  state: T;

  constructor(public name: string, initialState: T) {
    this.state = initialState;
  }

  public set<K extends keyof T>(
    update: Partial<{ [P in K]: T[P] | ((prev: T[P]) => T[P]) }>
  ) {
    const newState = structuredClone(this.state);

    for (const key in update) {
      if (!update.hasOwnProperty(key)) return;

      const value = update[key as K];

      if (typeof value === "function")
        newState[key as K] = (value as (prev: T[K]) => T[K])(
          newState[key as K]
        );
      else newState[key as K] = value as T[K];
    }

    this.state = newState;

    this.notifyListeners();
    return update;
  }

  private notifyListeners() {
    if (!this.listeners.length) return;

    if (this.listeners.length === 1) return this.listeners[0](this.state);

    for (let i = 0; i < this.listeners.length; i++)
      this.listeners[i](this.state);
  }

  public subscribe(listener: Listener<T>) {
    this.listeners.push(listener);
  }
}
