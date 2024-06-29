
import { resetFilters, toggleTagToFilter, state } from './store/kanbanStore';

export function Filters() {

    const allTags = () => {
        const tags = state.lists.map((list) => {
            return list.cards.map((card) => card.tags).flat();
        }).flat();

        return [...new Set(tags)];
    }

    return (
        <div class="p-4 text-center">
            <h2 class="text-xl font-semibold">Filter by Tags</h2>
            <div class="mt-4 space-x-2 ">
                <span onClick={resetFilters}
                    class="rounded-full px-2 py-1 bg-gray-600 text-white cursor-pointer"
                >
                    Reset</span>
                <For each={allTags()}>
                    {(tag) => <span onClick={() => toggleTagToFilter(tag)}
                        class="rounded-full px-2 py-1 bg-gray-200 cursor-pointer"
                        classList={{ 'bg-gray-600 text-white': state.filter.includes(tag) }}
                    >
                        {tag}</span>}
                </For>
            </div>
        </div>
    )
}