import Store, { type Listener, type State } from "./store";
import mergeStores from "./utils/merge-stores";

const counterStore = new Store("counter-store", { count: 0 });
const inputStore = new Store("input-store", {
  email: "hello@example",
  password: "....",
});

const mergedStore = mergeStores<{
  "counter-store": State<typeof counterStore>;
  "input-store": State<typeof inputStore>;
}>("merged-store", [counterStore, inputStore]);

console.log(mergedStore.state);

type StoreState = State<typeof counterStore>;

const listener: Listener<StoreState> = ({ count }) => console.log(count);

counterStore.subscribe(listener);

document.getElementById("store")!.onclick = () =>
  counterStore.set({ count: (prevCount) => ++prevCount });
