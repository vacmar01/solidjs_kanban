export function Card({ item }) {
  return (
    <div className="p-4 bg-white rounded">
      <h3 class="text-xl font-semibold">{item.title}</h3>
      <p class="text-gray-500 text-sm">{item.description}</p>
    </div>
  );
}
