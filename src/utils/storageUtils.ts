class StorageUtils {
  getStorage(key: string) {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(key);
    }
    return null;
  }

  setStorage({ key, data }: { key: string; data: any }) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(data));
    }
  }

  removeStorage(key: string) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  }
}

const storageUtils = new StorageUtils();

export default storageUtils;
