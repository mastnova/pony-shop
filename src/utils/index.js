const names = ['Твайлайт', 'Эпплджек', 'Рэйнбоу', 'Рарити', 'Флаттершай', 'Пинкипай'];

export const colors = ['Фиолетовый', 'Розовый', 'Желтый', 'Белый', 'Голубой', 'Оранжевый'];

export const kinds = ['Земная пони', 'Единорог', 'Пегас', 'Аликорн', 'Кирин', 'Чейнджлинг'];

export function generatePonies(count = 0) {
  const selectRandomItem = items => items[Math.floor(Math.random() * items.length)];

  return Array(count).fill().map((el, index) => ({
    id: index + 1,
    name: selectRandomItem(names),
    color: selectRandomItem(colors),
    kind: selectRandomItem(kinds),
    price: Math.floor(Math.random() * 800 + 100),
    is_new: selectRandomItem([true, false]),
  }));
}

export function applyFilters(filters, products) {
  return products.filter(product =>
    (!filters.color || product.color === filters.color) &&
    (!filters.kind || product.kind === filters.kind) &&
    (filters.minPrice <= product.price && product.price <= filters.maxPrice) &&
    (!filters.onlyNew || product.is_new));
}

export const API = {
  createOrder: () => Promise.resolve()
}