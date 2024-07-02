import { For, createEffect } from 'solid-js';

import { state, writeState } from './store/kanbanStore';

import { pb } from './store/pocketbaseStore';

import { Icon } from 'solid-heroicons';
import { noSymbol } from 'solid-heroicons/outline';

import { List } from './List';

import { Filters } from './Filters';

import { Navbar } from './Navbar';

function PleaseLogIn() {
  return (
    <div class="flex flex-col justify-center items-center text-2xl font-semibold py-24">
      <Icon path={noSymbol} class="w-24 h-24 text-red-500" />
      <span class="mt-4">Please Log in...</span>
    </div>
  )
}

function App() {

  //save to local storage
  createEffect(async () => {
    await writeState();
    console.log('state updated');
  });

  return (
    <>
      <Navbar />
      <div class="max-w-[1400px] mx-auto">
        <Show when={pb.authStore.isValid} fallback={<PleaseLogIn />}>
          <Filters />
          <div class="flex flex-row space-x-4 p-2 overflow-auto xl:justify-center">
            <For each={state.lists}>
              {(list) => <List list={list} />}
            </For>
          </div>
        </Show>
      </div>
    </>
  );
}

export default App;
