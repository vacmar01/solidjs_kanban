import { For, createSignal } from 'solid-js';
import { dndzone } from 'solid-dnd-directive';

import { Card } from './Card';

export function List({ listTitle }) {
  const [items, setItems] = createSignal([
    { id: 0, title: 'Item 1', description: 'foobar' },
    { id: 1, title: 'Item 2', description: 'foobar' },
    { id: 2, title: 'Item 3', description: 'foobar' },
    { id: 3, title: 'Item 4', description: 'foobar' },
  ]);

  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');

  function handleDndEvent(e) {
    const { items: newItems } = e.detail;
    setItems(newItems);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title() || !description()) {
      return;
    }

    setItems((items) => [
      ...items,
      {
        id: items.length,
        title: title().trim(),
        description: description().trim(),
      },
    ]);

    setTitle('');
    setDescription('');
  }

  return (
    <div class="bg-gray-100 w-96 py-4 px-2 rounded">
      <h2 class="text-2xl font-semibold text-center">{listTitle}</h2>
      <div
        className="flex flex-col space-y-4 mt-4"
        use:dndzone={{ items }}
        on:consider={handleDndEvent}
        on:finalize={handleDndEvent}
      >
        <For each={items()}>{(item, _) => <Card item={item} />}</For>
      </div>

      <div className="rounded p-4 bg-white mt-4">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            class="text-xl font-semibold"
            placeholder="Title"
            value={title()}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
          <input
            type="text"
            class="text-gray-500 text-sm"
            placeholder="Description"
            value={description()}
            onInput={(e) => setDescription(e.currentTarget.value)}
          />
          <input type="submit" hidden />
        </form>
      </div>
    </div>
  );
}
