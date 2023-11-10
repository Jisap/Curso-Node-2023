const heroes = [
  {
    id: 1,
    name: 'Ironman',
    owner: 'Marvel'
  },
  {
    id: 2,
    name: 'Spiderman',
    owner: 'Marvel'
  },
  {
    id: 3,
    name: 'Batman',
    owner: 'DC'
  }
];

const findHeroById = (id) => {
  return heroes.find((hero) => hero.id === id);
};

const hero = findHeroById(2);

console.log(hero?.name ?? 'Hero not found');