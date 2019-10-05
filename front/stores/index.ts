import MainStore from "./mainStore";

let store = null;

const Stores = () => {
  return {
    main: MainStore,
  };
};
export type storesType = typeof Stores;

export function initializeStore (isServer) {
  if (isServer) {
    return Stores();
  } else {
    if (store === null) {
      store = Stores();
    }
    return store;
  }
}
