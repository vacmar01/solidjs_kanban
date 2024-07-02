import { Show } from "solid-js";
import { LoginModal } from "./LoginModal";

import { pb } from "./store/pocketbaseStore";

export function Navbar() {

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
                    <ul class="flex justify-end">
                        <Show when={!pb.authStore.isValid}>
                            <li>
                                <button class="text-lg font-semibold hover:opacity-80" onclick={handleShowLogin}>Login</button>
                            </li>
                        </Show>
                        <Show when={pb.authStore.isValid}>
                            <li>
                                <button class="text-lg font-semibold hover:opacity-80" onclick={logOut}>Logout</button>
                            </li>
                        </Show>
                    </ul>
                </div>
            </nav >
            <LoginModal />
        </>
    );
}