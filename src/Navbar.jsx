import { Show } from "solid-js";
import { LoginModal } from "./LoginModal";

import { Icon } from "solid-heroicons";
import { bars_3 } from "solid-heroicons/outline";

import { pb } from "./store/pocketbaseStore";

export function Navbar({ showMenu }) {

    const handleShowLogin = () => {
        const modal = document.getElementById('loginModal');
        modal.showModal();
    }

    const logOut = () => {
        pb.authStore.clear();
        location.reload();
    }

    return (
        <>
            <nav class="bg-gray-100 p-4">
                <div class="max-w-[1328px] mx-auto">
                    <ul class="flex justify-between">
                        <Show when={pb.authStore.isValid}>
                            <li>
                                <button class="text-lg font-semibold hover:opacity-80" onclick={showMenu}>
                                    <Icon path={bars_3} class="w-8 h-8" />
                                </button>
                            </li>
                            <li>
                                <h2 class="text-xl font-bold">Board #1</h2>
                            </li>
                            <li>
                                <button class="text-lg font-semibold hover:opacity-50" onclick={logOut}>
                                    Logout
                                </button>
                            </li>
                        </Show>
                        <Show when={!pb.authStore.isValid}>
                            <li></li>
                            <li>
                                <button class="text-lg font-semibold hover:opacity-80" onclick={handleShowLogin}>Login</button>
                            </li>
                        </Show>
                    </ul>
                </div>
            </nav >
            <LoginModal />
        </>
    );
}