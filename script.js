const list = document.getElementById("list");
const description = document.getElementById("description");

const api = "https://pokeapi.co/api/v2/pokemon?limit=20";

/**
 * Try to parse a response as JSON data
 */
function transformToJson (response) {
    if (response.ok) {
        return response.json();
    }

    throw Error("Content not loaded");
}

/**
 * Clear the list of all its items
 */
function emptyList () {
    // ...
}
/**
 * Create an item, fetch its data and setup event listener
 */
function createItem (pokemon) {
    // Create a li tag
    const item = document.createElement("li");
    const name = document.createElement("div");
    const poids = document.createElement("p");
    const image = document.createElement("img");
    
    fetch(pokemon.url).then(transformToJson).then((data) => {
        name.innerText = data.name;
        item.addEventListener("click", (event) => { 
            console.log(event)    
            showDescription(data,event) 
        });
        
        image.src = data.sprites.other["official-artwork"].front_default;
        item.appendChild(image);
        item.appendChild(name);
        list.appendChild(item);
        poids.innerText = data.weight;
    });
}

/**
 * fill the item list with values
 */
function fillList (json) {
    emptyList();
    json.results.forEach(createItem);
}

/**
 * Fill and display the description
 */
function showDescription (data, event) {
    description.classList.add("show");
    
    description.style.top = event.clientY + "px";
    description.style.left = event.clientX + "px";
    const fields = description.querySelectorAll("dd");
    fields.forEach((dd) => {
        if(dd.classList[0] == "types") {
            dd.innerHTML = "";
            data.types.forEach(types => {
                if(dd.innerHTML.length != 0){
                    dd.innerHTML += ", ";
                }
                dd.innerHTML += types.type.name;
            });
        }else {
            dd.innerHTML = data[dd.classList[0]];
        }
    });
}

/**
 * Hide the description
 */
function hideDescription () {
    description.classList.remove("show");

}

// Fetch the API end-point and fill the list
fetch(api).then(transformToJson).then(fillList);
