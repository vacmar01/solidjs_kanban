import { Show, createSignal } from "solid-js";

import { SlideOutMenu } from "./SlideOutMenu"
import { Navbar } from "./Navbar"



export function Layout({children }) {
    const [showMenu, setShowMenu] = createSignal(false);

    function closeMenu() {
    setShowMenu(false);
    }

    function showSlideMenu() {
    setShowMenu(true);
    }

    return (
        <div class="relative">
        <Show when={showMenu()}>
          <SlideOutMenu closeMenu={closeMenu} />
        </Show>
        <Navbar showMenu={showSlideMenu} />
        <div class="max-w-[1400px] mx-auto">
            {children}
        </div>
      </div>
    )
}