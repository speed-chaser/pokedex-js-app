const mainGrid = document.getElementById('main-grid');
const header = document.getElementById('loading');
const pokemonRepository = (() => {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    const add = (pokemon) => {
        pokemonList.push(pokemon);
    }

    const getAll = () => {
        return pokemonList;
    }

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
        }).catch((e) => {
            console.error(e);
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
        }).catch((e) => {
            console.error(e);
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
    addGridItem: addGridItem,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
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

