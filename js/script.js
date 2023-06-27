const pokemonRepository = (() => {
let pokemonList = [
    { 
        dexNumber: 1, 
        name: 'Bulbasaur', 
        types: ['grass', 'poison'], 
        height: 0.7
    },
    { 
        dexNumber: 2, 
        name: 'Ivysaur', 
        types: ['grass', 'poison'], 
        height: 1
    },
    { 
        dexNumber: 3, 
        name: 'Venusaur', 
        types: ['grass', 'poison'], 
        height: 2
    },
    { 
        dexNumber: 4, 
        name: 'Charmander', 
        types: ['fire'], 
        height: 0.6
    },
    { 
        dexNumber: 5, 
        name: 'Charmeleon', 
        types: ['fire'], 
        height: 1.1
    },
    { 
        dexNumber: 6, 
        name: 'Charizard', 
        types: ['fire', 'flying'], 
        height: 1.7
    },
    { 
        dexNumber: 7, 
        name: 'Squirtle', 
        types: ['water'], 
        height: 0.5
    },
    { 
        dexNumber: 8, 
        name: 'Wartortle', 
        types: ['water'], 
        height: 1
    },
    { 
        dexNumber: 9, 
        name: 'Blastoise', 
        types: ['water'], 
        height: 1.6
    },
];

    const add = (pokemon) => {
        pokemonList.push(pokemon);
    }

    const getAll = () => {
        return pokemonList;
    }
return {
    add: add,
    getAll: getAll
};
})();
console.log(pokemonRepository.getAll());
pokemonRepository.add({ dexNumber: 10, name: 'Caterpie', types: ['bug'], height: .3});
console.log(pokemonRepository.getAll());

const mainGrid = document.getElementById('main-grid');

pokemonRepository.getAll().forEach((pokemon) => {

    const sizeStatus = pokemon.height > 1 ? 'Large Pokemon' : '';

    const gridItem = document.createElement('div');

    gridItem.classList.add('main-grid__item');

    const dexNumberSpan = document.createElement('span');
    dexNumberSpan.classList.add('dex-number');
    dexNumberSpan.innerText = "#" + pokemon.dexNumber;

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('pokemon');
    nameSpan.innerText = pokemon.name;

    const typeSpan = document.createElement('span');
    typeSpan.classList.add('attribute');
    typeSpan.innerText = pokemon.types.join(', ');

    const heightSpan = document.createElement('span');
    heightSpan.classList.add('attribute');
    heightSpan.innerText = "Height: " + pokemon.height + "m";

    const sizeSpan = document.createElement('span');
    sizeSpan.classList.add('size-status');
    sizeSpan.innerText = sizeStatus;

    gridItem.append(dexNumberSpan, nameSpan, typeSpan, heightSpan, sizeSpan);
    mainGrid.append(gridItem);

});