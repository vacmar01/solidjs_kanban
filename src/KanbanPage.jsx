import { List } from './List';
import { Filters } from './Filters';
import { Layout } from './Layout';

import { pb } from './store/pocketbaseStore'
import { useParams } from '@solidjs/router';

import { state, writeState, setState } from './store/kanbanStore'

import { createEffect,For, createResource, createSignal } from 'solid-js';

import { Icon } from 'solid-heroicons';
import { noSymbol } from 'solid-heroicons/outline';

function PleaseLogIn() {
    return (
      <div class="flex flex-col justify-center items-center text-2xl font-semibold py-24">
        <Icon path={noSymbol} class="w-24 h-24 text-red-500" />
        <span class="mt-4">Please Log in...</span>
      </div>
    )
}

async function loadState(id) {
    return await pb.collection('lists').getOne(id);
}

export function KanbanPage() {

    if (!pb.authStore.isValid) {
        return (
            <Layout>
                <PleaseLogIn />
            </Layout>
        );
    }

    const id = useParams().id;

    const [listId, setListId] = createSignal(id);

    const [record] = createResource(listId, loadState)

    console.log(record());

    const initialState = record.state;

    setState(initialState);

    createEffect(async () => {
        await writeState(id);
        console.log('state updated');
    });

    return (
        <Layout> 
            <Filters />
            <div class="flex flex-row space-x-4 p-2 overflow-auto xl:justify-center">
                <For each={state.lists}>
                {(list) => <List list={list} />}
                </For>
            </div>
        </Layout>
    )
}