import { For, Show, createEffect } from 'solid-js';
import { dndzone } from 'solid-dnd-directive';

import { handleCardDndEvent, state } from './store/kanbanStore';

import { NewCard } from './NewCard';

import { Card } from './Card';

export function List({ list }) {

  const filterCards = (item) => (!(state.filter.length > 0) || item.tags.some((tag) => (state.filter.includes(tag))))

  return (
    <div class="bg-gray-100 w-80 py-4 px-2 rounded shrink-0">
      <h2 class="text-2xl font-semibold text-center">{list.title}</h2>
      <Show when={list.title === 'Backlog'}>
        <NewCard listId={list.id} />
      </Show>
      <div
        className="flex flex-col space-y-4 mt-4"
        use:dndzone={{
          items: () => list.cards,
          dropTargetClasses: ['min-h-32', 'bg-gray-200', 'outline-none', 'rounded'],
          dropTargetStyle: {},
        }}
        on:consider={(e) => handleCardDndEvent(e, list.id)}
        on:finalize={(e) => handleCardDndEvent(e, list.id)}
      >
        <For each={list.cards.filter(filterCards)}>{(item, _) => <Card item={item} />}</For>
      </div>
    </div >
  );
}
