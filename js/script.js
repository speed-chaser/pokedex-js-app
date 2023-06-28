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
<<<<<<< Updated upstream
    document.write('<div class="main-grid__item"><span class="pokemon">',pokemonList[i].name,'</span>');
    document.write('<span id="type" class="attribute">' + pokemonList[i].types + '</span>');
    document.write('<span class="attribute"> Height: ' + pokemonList[i].height + '</span>');
    document.write('<div class="size-status">' + sizeStatus,'</div></div>');
  };
    document.write('</div>');
=======

    const loadList = () => {
        showLoadingMessage();
        return fetch(apiUrl).then((response) => {
        return response.json();
        }).then((json) => {
            json.results.forEach((item) => {
            let pokemon = {
            name: item.name,
            detailsUrl: item.url
            };
            add(pokemon);
            hideLoadingMessage();
        });
        }).catch((error) => {
            console.error(error);
            hideLoadingMessage();
        })
    }

    const loadDetails = (item) => {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then((response) => {
            return response.json();
        }).then((details) => {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            hideLoadingMessage();
        }).catch((error) => {
            console.error(error);
            hideLoadingMessage();
        });
    }

    const showDetails = (pokemon) => {
        loadDetails(pokemon).then(() => {
            console.log(pokemon);
        });
    }

    const addGridItem = (pokemon) => {
        const sizeStatus = pokemon.height > 1 ? 'Large Pokemon' : '';

        const gridItem = document.createElement('button');
        gridItem.classList.add('main-grid__item');
        gridItem.addEventListener('click', () => {showDetails(pokemon)});
    
        const nameSpan = document.createElement('span');
        nameSpan.classList.add('pokemon');
        nameSpan.innerText = pokemon.name;
        
        gridItem.append(nameSpan);
        mainGrid.append(gridItem);
    }

    const showLoadingMessage = () => {

        const loadingMessage = document.createElement('span');
        loadingMessage.classList.add('loadingMessage');
        loadingMessage.innerText = "Loading...";
        header.append(loadingMessage);
    }

    const hideLoadingMessage = () => {
        const loadingMessage = document.querySelector('.loadingMessage');
        header.remove(loadingMessage);
    }
return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    addGridItem: addGridItem
};
})();

pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach((pokemon) => {
        pokemonRepository.addGridItem(pokemon);
    });
});

console.log(pokemonRepository.getAll());
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addGridItem(pokemon);
});

>>>>>>> Stashed changes
