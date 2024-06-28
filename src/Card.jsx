import { For, Show, createSignal } from "solid-js";

import { addNewTag, state } from "./store/kanbanStore";

export function Card({ item }) {
  const [addTag, setAddTag] = createSignal(false);

  const [newTag, setNewTag] = createSignal('');

  return (
    <div class="p-4 bg-white rounded">
      <h3 class="text-xl font-semibold">{item.title}</h3>
      <p class="text-gray-500 text">{item.description}</p>
      <div class="flex flex-row space-x-1 mt-4">
        <For each={item.tags}>
          {(tag) => (
            <span class="rounded-full px-2 py-1 text-xs bg-gray-200">{tag}</span>
          )}
        </For>
        <span className="rounded-full px-2 py-1 text-xs bg-gray-400 text-white cursor-pointer" onClick={() => setAddTag(true)}>+</span>
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
