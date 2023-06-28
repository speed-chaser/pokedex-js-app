const mainGrid = document.getElementById('main-grid');
const header = document.getElementById('loading');
let modalContainer = document.getElementById('modal-container');
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

            const url = pokemon.detailsUrl;
            const pattern = /\/(\d+)\/?$/;
            const match = url.match(pattern);

            if (match) {
                pokemon.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${match[1]}.png`;
            }
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
            item.imageUrlLg = details.sprites.other["official-artwork"].front_default;
            item.id = details.id;
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
            showModal(pokemon);
            console.log(pokemon);
        });
    }

    const addGridItem = (pokemon) => {

        
        const gridItem = document.createElement('button');
        gridItem.classList.add('main-grid__item');
        gridItem.addEventListener('click', () => {showDetails(pokemon)});
    
        const nameSpan = document.createElement('div');
        nameSpan.classList.add('pokemon');
        nameSpan.innerText = pokemon.name;

        const smallPokemonImage = document.createElement('img');
        smallPokemonImage.classList.add('small-icon');
        smallPokemonImage.src = pokemon.imageUrl; //How do I get the image? I am using the pokemon.name from loadList, need to get imageUrl from loadDetails

        
        gridItem.append(smallPokemonImage, nameSpan);
        mainGrid.append(gridItem);
    }

    const showModal = (pokemon) => {

    
        modalContainer.innerHTML = '';
    
        let modal = document.createElement('div');
        modal.classList.add('modal');
    
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', closeModal);
    
        let pokemonName = document.createElement('h1');
        pokemonName.classList.add('pokemon-header');
        pokemonName.innerText = pokemon.name + ' #' + pokemon.id;

        let detailContainer = document.createElement('div');
        detailContainer.classList.add('detail-container');

        let attributeContainer = document.createElement('div');
        attributeContainer.classList.add('attribute-container');
    
        let pokemonType = document.createElement('p');
        pokemonType.classList.add('pokemon-type')
        if(pokemon.types.length > 1) {            
            pokemonType.innerText = 'Types: ' + pokemon.types[0].type.name + ', ' + pokemon.types[1].type.name;
        }
        else {
            pokemonType.innerText = 'Type: ' + pokemon.types[0].type.name;
        }

        let pokemonHeight = document.createElement('p');
        pokemonHeight.classList.add('attribute');
        pokemonHeight.innerText = 'Height: ' + pokemon.height + 'm'; //height shows in meters. Maybe will set up a converter?

        let pokemonImage = document.createElement('img');
        pokemonImage.classList.add('pokemon-image');
        pokemonImage.src = pokemon.imageUrlLg;
    
        //modal.append(closeButtonElement, pokemonName, pokemonType, pokemonHeight, pokemonImage);
        attributeContainer.append(pokemonType, pokemonHeight);
        detailContainer.append(attributeContainer, pokemonImage);
        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.append(detailContainer);
        modalContainer.appendChild(modal);
    

        modalContainer.classList.add('is-visible');
        mainGrid.classList.add('is-blurred');
    }

    const closeModal = () => {
        let modalContainer = document.getElementById('modal-container');
        modalContainer.classList.remove('is-visible');
        mainGrid.classList.remove('is-blurred');
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

    //Event listeners for Modal
    document.querySelector('.modal-close').addEventListener('click', () => {
        closeModal();
    });

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.getElementById('modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            closeModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            pokemonRepository.closeModal();
        }
    });
    //End of Event Listeners
        


return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    addGridItem: addGridItem,
    showModal: showModal,
    closeModal: closeModal,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
};
})();

pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach((pokemon) => {
        pokemonRepository.addGridItem(pokemon);
    });
});




