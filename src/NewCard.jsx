import { createSignal } from 'solid-js';

import { addNewCard } from './store/kanbanStore';

export function NewCard({ listId }) {

    const [title, setTitle] = createSignal('');
    const [description, setDescription] = createSignal('');
    const [tags, setTags] = createSignal('');

    return (
        <div class="rounded p-4 bg-white mt-4">
            <form onSubmit={(e) => {
                e.preventDefault()

                if (!title() || !description() || !tags()) return
                addNewCard(title(), description(), tags(), listId)
                setTitle('')
                setDescription('')
                setTags('')
            }} class="flex flex-col space-y-2">
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
                <input type="text" class="text-gray-500 text-xs" placeholder="tags (separated by comma)" value={tags()} onInput={(e) => setTags(e.currentTarget.value)} />
                <input type="submit" hidden />
            </form>
        </div>
    )

}