import { For, Show, createSignal } from "solid-js";

import { Icon } from "solid-heroicons";
import { trash, plusCircle, pencil } from "solid-heroicons/outline";
import { pencil as pencilSolid } from "solid-heroicons/solid";

import { addNewTag, deleteCard, editCard } from "./store/kanbanStore";

export function Card({ item }) {
  const [addTag, setAddTag] = createSignal(false);
  const [edit, setEdit] = createSignal(false);

  const [newTag, setNewTag] = createSignal('');

  let newTitle, newDescription;

  const handleSubmit = (e) => {
    e.preventDefault();
    editCard(item.id, newTitle.value, newDescription.value);
    setEdit(false);
  }

  return (
    <div class="p-4 bg-white rounded relative">
      <div class="flex gap-2 justify-end">
        <button class="font-semibold text-gray-600" onClick={() => setEdit(!edit())}>
          <Icon path={edit() ? pencilSolid : pencil} class="w-4 h-4" />
        </button>
        <button class="font-semibold text-gray-600" onClick={() => deleteCard(item.id)}>
          <Icon path={trash} class="w-4 h-4" />
        </button>
      </div>
      <div class="mt-2">
        <Show when={!edit()}>
          <h3 class="text-xl font-semibold text-gray-900">{item.title}</h3>
          <p class="text-gray-500">{item.description}</p>
        </Show>
        <Show when={edit()}>
          <form onSubmit={handleSubmit}>
            <input type="text" class="text-xl font-semibold text-gray-500 w-full" value={item.title} ref={newTitle} />
            <input type="text" class="text-gray-300 w-full" value={item.description} ref={newDescription} />
            <input type="submit" hidden />
          </form>
        </Show>
      </div>

      <div class="flex flex-row gap-2 mt-4 items-center flex-wrap">
        <For each={item.tags}>
          {(tag) => (
            <div class="rounded-full px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-900">{tag}</div>
          )}
        </For>
        <div className="cursor-pointer" onClick={() => setAddTag(true)}>
          <Icon path={plusCircle} class="w-6 h-6 text-gray-900" />
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
