import { action, observable } from "mobx";


class MainStore {
  @observable isLoading: boolean = true;

  @action
  setLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  }
}

const mainStore = new MainStore();
export type MainStoreType = typeof mainStore;
export default mainStore;
