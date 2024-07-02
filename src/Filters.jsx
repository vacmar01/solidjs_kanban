
import { resetFilters, toggleTagToFilter, state } from './store/kanbanStore';

export function Filters() {

    const allTags = () => {
        const tags = state.lists.map((list) => {
            return list.cards.map((card) => card.tags).flat();
        }).flat();

        return [...new Set(tags.sort())];
    }

    return (
        <div class="p-4 text-center max-w-[1328px] mx-auto">
            <h2 class="text-xl font-semibold">Filter by Tags</h2>
            <div class="mt-4 gap-2 flex flex-row items-center flex-wrap justify-center">
                <span onClick={resetFilters}
                    class="rounded-full px-2 py-1 bg-gray-900 text-white cursor-pointer"
                >
                    Reset</span>
                <For each={allTags()}>
                    {(tag) => <span onClick={() => toggleTagToFilter(tag)}
                        class="rounded-full px-2 py-1 bg-gray-200 cursor-pointer"
                        classList={{ 'bg-gray-900 text-white font-semibold': state.filter.includes(tag) }}
                    >
                        {tag}</span>}
                </For>
            </div>
        </div>
    )
}