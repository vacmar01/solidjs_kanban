import { createStore, produce } from "solid-js/store";

import { createEffect } from "solid-js";

if (!localStorage.getItem("kanban")) {
    localStorage.setItem("kanban", JSON.stringify({
        filter: [],
        lists: [
            { id: 0, title: "Backlog", cards: [] },
            { id: 1, title: "In Progress", cards: [] },
            { id: 2, title: "Waiting", cards: [] },
            { id: 3, title: "Done", cards: [] }]
    }));
}

const initialState = JSON.parse(localStorage.getItem("kanban"));

export const [state, setState] = createStore(initialState);

export function addNewTag(tag, cardId) {

    // if tag has comma in it split it up
    if (tag.includes(',')) {
        const tags = tag.split(',');
        tags.forEach((tag) => {
            addNewTag(tag, cardId);
        });
        return;
    }

    setState("lists", (currentLists) => {
        return currentLists.map((list) => {
            return {
                ...list,
                cards: list.cards.map((card) => {
                    if (card.id === cardId) {
                        return { ...card, tags: [...card.tags, tag] }
                    }
                    return card;
                })
            }
        });
    });
}

export function addNewCard(title, description, tags, listId) {

    const tagsArray = tags.split(',').map((tag) => tag.trim());

    const newCard = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        tags: tagsArray,
    }

    setState("lists", (currentLists) => {
        return currentLists.map((list) => {
            if (list.id === listId) {
                return { ...list, cards: [...list.cards, newCard] }
            }
            return list;
        });
    });
}

export function toggleTagToFilter(tag) {
    setState("filter", (currentFilter) => {
        if (currentFilter.includes(tag)) {
            return currentFilter.filter((currentTag) => currentTag !== tag);
        }
        return [...currentFilter, tag];
    });
}

export const filteredLists = () => {
    if (state.filter.length === 0) return state.lists;

    return state.lists.map((list) => {
        return {
            ...list,
            cards: list.cards.filter((card) => {
                return card.tags.some((tag) => state.filter.includes(tag));
            })
        }
    })
}

export function handleCardDndEvent(e, listId) {
    const { items } = e.detail;

    setState('lists', (list) => list.id == listId, "cards", items);
}



