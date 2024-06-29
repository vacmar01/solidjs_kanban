import { For, createEffect } from 'solid-js';

import { state } from './store/kanbanStore';

import { List } from './List';

import { Filters } from './Filters';

function App() {

  //save to local storage
  createEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(state));
  });

  return (
    <div class="max-w-[1400px] mx-auto">
      <Filters />
      <div class="flex flex-row space-x-4 p-2">
        <For each={state.lists}>
          {(list) => <List list={list} />}
        </For>
      </div >
    </div>
  );
}

export default App;
