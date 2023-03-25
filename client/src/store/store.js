import { create } from "zustand";

const useStore = create((set) => ({
  currentPage: null,
  changeCurrentPage: (page) => set((state) => ({ currentPage: page })),
  isLogin: false,
  setIsLogin: (loginState) => set((state) => ({ isLogin: loginState })),
  contentFont: "프리텐다드",
  changeContentFont: (font) => set((state) => ({ contentFont: font })),
  letterContents: {
    toName: null,
    fromName: null,
    content: null,
    password: null,
    urlName: null,
  },
  setLetterContents: (contents) =>
    set((state) => ({ letterContents: contents })),
  acessTokenExpire: false,
  setAcessTokenExpire: (token) => set((state) => ({ acessTokenExpire: token })),
}));

export default useStore;
