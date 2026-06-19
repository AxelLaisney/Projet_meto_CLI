import { validateString } from "./utils/validator.js";
import { displayResult, URL } from "./utils/helper.js";



async function displayStats(){
    const response = await fetch(URL + '/stats');
    const data = await response.json();
    console.log('/n <--- Result --->');
    displayResult(data);
}

/**
 * 
 * @param {string} ville 
 */
async function displayOneStat(ville){
    const error = validateString(ville);
    if(typeof error !== 'undefined'){
        console.log(error);
    }else{
        console.log('\n <--- Result --->');
        const response = await fetch(URL + `/stats/${ville}`);
        const data = await response.json();
        displayResult(data);
    }
}

function statsHeader(){
    console.log('\n<--- Stats menu --->');
    console.log('1 - Statistique globales');
    console.log("2 - Statistiques d'une ville");
    console.log('99 - Go back');
}

export async function statsMenu(rl) {
    let active = true
    while(active){
        statsHeader();
        const choice = (await rl.question('>')).trim();
        switch (choice){
            case '1':
                await displayStats();
                break;
            case '2':
                const ville = (await rl.question("Vueillez donner le nom d'une ville: ")).trim();
                await displayOneStat(ville);
                break;
            case '99':
                active = false;
                break;
            default:
                console.log('Invalid choice. Select a valid one');
        }
    }
}