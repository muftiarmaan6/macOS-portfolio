import {Navbar, Welcome, Dock} from "#components/imports";
import { Draggable } from "gsap/Draggable";

import gsap from "gsap";
import {Safari, Terminal} from "#windows/imports";
gsap.registerPlugin(Draggable);

const  app = () => {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal/>
      <Safari/>
    </main>
  )
}

export default app;