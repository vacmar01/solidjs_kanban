import { For, createEffect } from 'solid-js';

import { state, writeState } from './store/kanbanStore';

import { List } from './List';

import { Filters } from './Filters';

function App() {

  //save to local storage
  createEffect(async () => {
    await writeState();
    console.log('state updated');
  });

  return (
    <div class="max-w-[1400px] mx-auto">
      <Filters />
      <div class="flex flex-row space-x-4 p-2  overflow-auto">
        <For each={state.lists}>
          {(list) => <List list={list} />}
        </For>
      </div >
    </div>
  );
}

export default App;
