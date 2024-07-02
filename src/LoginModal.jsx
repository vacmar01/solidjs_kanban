import { Icon } from "solid-heroicons";
import { xMark } from "solid-heroicons/outline";

import { Show, createSignal } from "solid-js";

import { pb } from "./store/pocketbaseStore";

export function LoginModal() {
    const closeModal = () => {
        const modal = document.getElementById('loginModal');
        modal.close();
    }

    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');

    const [error, setError] = createSignal('');

    const logIn = async (e) => {
        e.preventDefault();

        try {
            const authData = await pb.collection('users').authWithPassword(
                email(),
                password(),
            );

            setError('');

            location.reload();

            closeModal();

        } catch (error) {
            setError('Invalid email or password');
        }
    }

    return (
        <dialog id="loginModal" class="relative rounded">
            <button class="absolute top-2 right-2" onclick={closeModal}><Icon path={xMark} class="w-6 h-6"></Icon></button>
            <div class="flex items-center justify-center">
                <div class="bg-white p-4 rounded-lg w-96">
                    <h2 class="text-2xl font-semibold">Login</h2>
                    <form class="flex flex-col space-y-2 mt-4" onsubmit={logIn}>
                        <input type="email" class="p-2 border border-gray-300 rounded" placeholder="Email" value={email()} oninput={(e) => setEmail(e.target.value)} />
                        <input type="password" class="p-2 border border-gray-300 rounded" placeholder="Password" value={password()} oninput={(e) => setPassword(e.target.value)} />
                        <button class="bg-gray-900 text-white p-2 rounded" type="submit">Login</button>
                        <Show when={error()}>
                            <p class="text-red-500 text-sm">{error()}</p>
                        </Show>
                    </form>
                </div>
            </div>
        </dialog>
    )
}