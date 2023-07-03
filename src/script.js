const mainGrid = document.getElementById('main-grid');
const header = document.getElementById('loading');
const modalContainer = document.getElementById('modal-container');

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
        modalContainer.innerHTML = '';
        loadDetails(pokemon).then(() => {
            showModal(pokemon);
            console.log(pokemon);
        });
    }

    const addGridItem = (pokemon) => {

        const gridItem = document.createElement('button');
        gridItem.classList.add('grid-item');
        gridItem.classList.add('col');
        gridItem.classList.add('btn');
        gridItem.classList.add('btn-primary');
        gridItem.classList.add('btn-bg');
        gridItem.setAttribute('data-toggle', 'modal');
        gridItem.setAttribute('data-target', '#modal-container');
        gridItem.addEventListener('click', () => {showDetails(pokemon)});
        
        const nameSpan = document.createElement('div');
        nameSpan.classList.add('pokemon');
        nameSpan.innerText = pokemon.name;

        const smallPokemonImage = document.createElement('img');
        smallPokemonImage.classList.add('small-icon');
        smallPokemonImage.setAttribute('willReadFrequently', 'true');
        smallPokemonImage.src = pokemon.imageUrl; //How do I get the image? I am using the pokemon.name from loadList, need to get imageUrl from loadDetails

        
        gridItem.append(smallPokemonImage, nameSpan);
        mainGrid.append(gridItem);
    }

    const showModal = (pokemon) => {



        modalContainer.classList.add('modal');
        modalContainer.setAttribute('tabindex', '-1');
        modalContainer.setAttribute('role', 'dialog');
        modalContainer.setAttribute('aria-labelledby', 'pokemonDetails');
        modalContainer.setAttribute('aria-hidden', 'true');

        const modal = document.createElement('div');
        modal.classList.add('modal-dialog');
        modal.classList.add('modal-dialog-centered');
        modal.classList.add('modal-dialog-sm');
        modal.setAttribute('role', 'document');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.classList.add('bg-dark');
        modalContent.classList.add('no-select');

        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        modalHeader.classList.add('borderb-adjust');
        modalHeader.classList.add('header-bg');
        
        const modalTitle = document.createElement('h1');
        modalTitle.classList.add('modal-title');
        modalTitle.classList.add('pokemon-header');
        modalTitle.classList.add('text-white');

        modalTitle.innerText = pokemon.name + ' #' + pokemon.id;
    
        const closeButtonElement = document.createElement('button');
        closeButtonElement.setAttribute('id', 'close-button');
        closeButtonElement.classList.add('close');
        closeButtonElement.setAttribute('type', 'button');
        closeButtonElement.setAttribute('data-dismiss', 'modal');
        closeButtonElement.setAttribute('aria-label', 'close');
        const closeButtonSpan = document.createElement('span');
        closeButtonSpan.setAttribute('aria-hidden', 'true');
        closeButtonSpan.innerHTML="&times;";

        closeButtonElement.append(closeButtonSpan);
        modalHeader.append(modalTitle, closeButtonElement);
    

        const modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');
        modalBody.classList.add('row');
        modalBody.classList.add('text-white');


        const attributeContainer = document.createElement('div');
        attributeContainer.classList.add('col-6');
    
        let pokemonType = document.createElement('p');
        if(pokemon.types.length > 1) {            
            pokemonType.innerText = 'Types: ' + pokemon.types[0].type.name + ', ' + pokemon.types[1].type.name;
        }
        else {
            pokemonType.innerText = 'Type: ' + pokemon.types[0].type.name;
        }

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = 'Height: ' + pokemon.height + 'm'; //height shows in meters. Maybe will set up a converter?

        let pokemonImage = document.createElement('img');
        pokemonImage.setAttribute('loading', 'lazy');
        pokemonImage.classList.add('col-6');
        pokemonImage.src = pokemon.imageUrlLg;

        attributeContainer.append(pokemonType, pokemonHeight);
        modalBody.append(attributeContainer);
        modalBody.append(pokemonImage);

        modalContent.append(modalHeader, modalBody);
        modal.append(modalContent);
        modalContainer.append(modal);


    }

    const showLoadingMessage = () => {
        console.log("Loading...");
    }

    const hideLoadingMessage = () => {
        console.log("Finished loading.")
    }  




return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    addGridItem: addGridItem,
    showModal: showModal,
};
})();



pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach((pokemon) => {
        pokemonRepository.addGridItem(pokemon);
    });
});




