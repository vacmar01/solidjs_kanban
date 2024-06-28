import { For, createSignal } from 'solid-js';
import { dndzone } from 'solid-dnd-directive';

import { List } from './List';

import { Card } from './Card';
function App() {
  return (
    <div class="flex flex-row space-x-4 p-2">
      <List listTitle="Todo" />
    </div>
  );
}

export default App;
