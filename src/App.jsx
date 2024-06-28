import { For, createEffect } from 'solid-js';

import { state, toggleTagToFilter, filteredLists } from './store/kanbanStore';

import { List } from './List';

function App() {

  const allTags = () => {
    const tags = state.lists.map((list) => {
      return list.cards.map((card) => card.tags).flat();
    }).flat();

    return [...new Set(tags)];
  }

  //save to local storage
  createEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(state));
  });

  return (
    <>
      <div class="p-4 text-center">
        <h2 class="text-xl font-semibold">Filter by Tags</h2>
        <div class="mt-4 space-x-2 ">
          <For each={allTags()}>
            {(tag) => <span onClick={() => toggleTagToFilter(tag)}
              class="rounded-full px-2 py-1 bg-gray-200 cursor-pointer"
              classList={{ 'bg-gray-600 text-white': state.filter.includes(tag) }}
            >
              {tag}</span>}

          </For>
        </div>
      </div>
      <div class="flex flex-row space-x-4 p-2">
        <For each={state.lists}>
          {(list) => <List list={list} />}
        </For>
      </div >
    </>
  );
}

export default App;
