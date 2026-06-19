import { URL } from "./utils/helper.js";

export async function displayVilles(){
    const response = await fetch(URL + '/villes');
    const data = await response.json();
    console.log('Liste des villes dont les relevés proviennent:');
    data.villes.forEach(v => {
        console.log(v);
    });
}