//Variables
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
        types: ['fire'], 
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
 
let sizeStatus = '';
let gridStructureStart = 
    `<div class="main-grid">
    `;

//let pokemonType = pokemonList.types;
//let typeColor = document.getElementsByClassName(type);

//if(pokemonType === 'grass') {
   // typeColor = "grass";
//}

//printing
document.write(gridStructureStart);


for(i = 0; i < pokemonList.length; i++){

    if (pokemonList[i].height > 1) {
        sizeStatus = 'Wow, big boy!';
    }
    else {
        sizeStatus = '';
    }
    document.write('<div class="main-grid__item"><span class="pokemon">',pokemonList[i].name,'</span>');
    document.write('<span id="type" class="attribute">' + pokemonList[i].types + '</span>');
    document.write('<span class="attribute"> Height: ' + pokemonList[i].height + '</span>');
    document.write('<div class="size-status">' + sizeStatus,'</div></div>');
  };
    document.write('</div>');