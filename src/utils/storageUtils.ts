class StorageUtils {
  get(key: string) {
    if (typeof window !== "undefined") {
      return JSON.parse(window.localStorage.getItem(key) || "null");
    }
    return null;
  }

  set({ key, data }: { key: string; data: any }) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(data));
    }
  }

  remove(key: string) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  }
}

const storageUtils = new StorageUtils();

export default storageUtils;
