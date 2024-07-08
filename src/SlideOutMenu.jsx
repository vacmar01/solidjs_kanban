import { For } from 'solid-js';

import { Icon } from 'solid-heroicons';
import { xMark } from 'solid-heroicons/outline';

export function SlideOutMenu({ closeMenu }) {
    const boards = [
        { id: 1, name: 'Board #1' },
        { id: 2, name: 'Board #2' },
        { id: 3, name: 'Board #3' },
        { id: 4, name: 'Board #4' },
        { id: 5, name: 'Board #5' },
    ];

    return (
        <div class="w-64 lg:w-80 absolute top-0 left-0 bg-gray-100 h-full z-50 shadow-lg">
            <button class="w-8 h-8 text-gray-900 absolute top-2 right-2" onclick={closeMenu}>
                <Icon path={xMark} />
            </button>
            <div class="pt-16 pb-12 px-2">
                <h2 class="text-2xl font-semibold">Boards</h2>
            </div>
            <ul class="">
                <For each={boards}>
                    {(board) => (
                        <li class="text-lg py-2 text-gray-500 px-2 hover:bg-gray-200" classList={{ 'text-gray-900 bg-gray-200': board.id == 1 }}>
                            <a href="#" class="inline-block w-full h-full leading-loose">
                                {board.name}
                            </a>
                        </li>
                    )}
                </For>
            </ul>
        </div >
    );
}