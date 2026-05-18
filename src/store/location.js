import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

const useLocationStore = create(immer((set)=>({
  activeLocation
})))