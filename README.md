# Reactive Stores

Reactive is a powerful tool for managing application state in a reactive and efficient manner. It provides a clean and organized way to handle global state, reactivity, and state updates.

## Installation

You can install the library using your preferred package manager:

```bash
pnpm add reactive-stores
```

## Usage

Import the library and start using it to manage your application's state. Here's a simple example of how you might use the library:

```ts
// Type modules for end-to-end type safety
import Store, { type State } from "reactive-stores";
import mergeStores from "reactive-stores/utils";

// Create stores
const counterStore = new Store("counter-store", { count: 0 });
const inputStore = new Store("input-store", {
  email: "hello@example.com",
  password: "********",
});

// Merge stores
const mergedStore = mergeStores<{
  "counter-store": State<typeof counterStore>;
  "input-store": State<typeof inputStore>;
}>("merged-store", [counterStore, inputStore]);

// Subscribe to stores
const currentCount = counterStore.subscribe((count) =>
  console.log("Current count:", count)
);

// and update it
counterStore.set({ count: (prevCount) => ++prevCount });
```

## Features

- **Global State Management:** Manage global application state that can be accessed and updated from different components.

- **Reactivity:** Automatically update components when the state changes, reducing manual handling and improving consistency.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
