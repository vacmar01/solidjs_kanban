import { For, Show, createSignal } from "solid-js";

import { Icon } from "solid-heroicons";
import { trash, plusCircle } from "solid-heroicons/outline";

import { addNewTag, deleteCard } from "./store/kanbanStore";

export function Card({ item }) {
  const [addTag, setAddTag] = createSignal(false);

  const [newTag, setNewTag] = createSignal('');

  return (
    <div class="p-4 bg-white rounded relative">
      <button class="absolute top-2 right-2 font-semibold text-gray-600" onClick={() => deleteCard(item.id)}>
        <Icon path={trash} class="w-4 h-4" />
      </button>
      <h3 class="text-xl font-semibold">{item.title}</h3>
      <p class="text-gray-500 text">{item.description}</p>
      <div class="flex flex-row space-x-1 space-y-1 mt-4 items-center flex-wrap">
        <For each={item.tags}>
          {(tag) => (
            <div class="rounded-full px-2 py-1 text-xs font-semibold bg-gray-200">{tag}</div>
          )}
        </For>
        <div className="cursor-pointer" onClick={() => setAddTag(true)}>
          <Icon path={plusCircle} class="w-6 h-6" />
        </div>
        <Show when={addTag()}>
          <div class="flex flex-row space-x-1">
            <form onSubmit={(e) => {
              e.preventDefault()
              addNewTag(newTag().trim(), item.id)
              setAddTag(false)
              setNewTag('')
            }}>
              <input type="text" class="text-xs" placeholder="tag" value={newTag()} onInput={(e) => setNewTag(e.currentTarget.value)} />
              <input type="submit" hidden />
            </form>
          </div>
        </Show>
      </div >
    </div >
  );
}
