const useStore = defineStore("main", () => {
  const musicKey = ref("深埋地心的瑰秘");
  const scene = ref("");

  return { musicKey, scene };
}, { persist: true });

export default useStore;
