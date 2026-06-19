import { displayReleve, displayResult, URL } from "./utils/helper.js";
import { validateId, validateDate, validateNumber, validateString } from "./utils/validator.js";


async function fields(label, validator, rl){
    console.log('Pour sortir de cetter section, écrivez: EXIT');
    let choice = '';
    let error = '';
    do {
        choice = (await rl.question(label));
        if(choice === 'EXIT') return choice;
        error = validator(choice);
        if(error) console.log(error);
    }while (typeof error !== 'undefined');
    return choice;
}

async function displayReleves(){
    const response = await fetch(URL + '/releves');
    const data = await response.json();
    const trimmedData = data.slice(0, 100);
    trimmedData.forEach(r => {
        displayReleve(r);
    });
}

async function displayOneReleve(id){
    const error = validateId(id)
    if(typeof error !== 'undefined'){
        console.log(error);
    }else{
        const response = await fetch(URL + `/releves/${parseInt(id)}`);
        const releve = await response.json();
        displayReleve(releve);
    }
}

async function createReleve(rl){
    console.log("\n <--- Création d'un relevé --->");
    
    const ville = await fields('Nom de la ville: ', validateString, rl);
    if(ville === 'EXIT') return;

    const date = await fields('Date au format YYYY-MM-DD: ', validateDate, rl);
    if(date === 'EXIT') return;

    const tempMin = await fields('Température minimale: ', validateNumber, rl);
    if(tempMin === 'EXIT') return;

    const tempMax = await fields('Température maximale: ', validateNumber, rl);
    if(tempMax === 'EXIT') return;

    const description = await fields('Description du relevé: ', validateString, rl);
    if(description === 'EXIT') return;

    const humidite = await fields('Humidité (nombre à virgule accepté): ', validateNumber, rl);
    if(humidite === 'EXIT') return;

    const response = await fetch(URL + '/releves', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ville: ville,
            date: date,
            tempMin: parseInt(tempMin),
            tempMax: parseInt(tempMax),
            description: description,
            humidite: parseFloat(humidite)
        })
    });
    const data = await response.json();
    console.log('\n<--- --->');
    console.log(data.message);
    displayResult(data.content);
}

async function updateReleve(rl){
    const inputId = await fields("Veuillez entrez l'ID du relevé a modifier: ", validateId, rl);
    if(inputId === 'EXIT') return;

    let response = await fetch(URL + `/releves/${parseInt(inputId)}`);
    let {ville, date, tempMin, tempMax, description, humidite} = await response.json();
    

    let userInput = '';
    console.log(`\n Valeur initiale pour ville [${ville}]. Tapez en une nouvelle ou laisse vide pour ne rien modifier`);
    userInput = (await rl.question('>'));
    if (userInput !== ''){
        ville = userInput;
    }

    console.log(`\n Valeur initiale pour date [${date}]. Tapez en une nouvelle ou laisse vide pour ne rien modifier`)
    userInput = (await rl.question('>'));
    if (userInput !== ''){
        date = userInput;
    }

    console.log(`\n Valeur initiale pour température minimum [${tempMin}]. Tapez en une nouvelle ou laisse vide pour ne rien modifier`)
    userInput = (await rl.question('>'));
    if (userInput !== ''){
        tempMin = userInput;
    }
    
    console.log(`\n Valeur initiale pour température maximale [${tempMax}]. Tapez en une nouvelle ou laisse vide pour ne rien modifier`)
    userInput = (await rl.question('>'));
    if (userInput !== ''){
        tempMax = userInput;
    }

    console.log(`\n Valeur initiale pour description [${description}]. Tapez en une nouvelle ou laisse vide pour ne rien modifier`)
    userInput = (await rl.question('>'));
    if (userInput !== ''){
        description = userInput;
    }

    console.log(`\n Valeur initiale pour humidité [${humidite}]. Tapez en une nouvelle ou laisse vide pour ne rien modifier`)
    userInput = (await rl.question('>'));
    if (userInput !== ''){
        humidite = userInput;
    }


    // if(validateString(ville) !== 'undefined') return validateString(ville);
    // if(validateDate(date) !== 'undefined') return validateDate(date);
    // if(validateNumber(tempMin) !== 'undefined') return validateNumber(tempMin);
    // if(validateNumber(tempMax) !== 'undefined') return validateNumber(tempMax);
    // if(validateString(description) !== 'undefined') return validateString(description);
    // if(validateNumber(humidite) !== 'undefined') return validateNumber(humidite);

    response = await fetch(`${URL}/releves/${parseInt(inputId)}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ville: ville,
            date: date,
            tempMin: parseInt(tempMin),
            tempMax: parseInt(tempMax),
            description: description,
            humidite: parseFloat(humidite)
        })
    });

    const data = await response.json();
    console.log('\n<--- --->');
    console.log(data.message);
    displayResult(data.content);

}

async function deleteReleve(rl){
    const id = await fields("Entrez l'ID du relevé à supprimer ou tapez EXIT pour annuler: ", validateId, rl);
    if(id === '') return;

    const response = await fetch(`${URL}/releves/${parseInt(id)}`);
    const releve = await response.json();
    console.log("Vous allez supprimer le relever suivant. Tapez YES pour confirmer. Tout autre entrée annulera l'acttion");
    displayResult(releve);
    const confirm = (await rl.question(">"));
    if(confirm === 'YES'){
        const responseD = await fetch(`${URL}/releves/${id}`,{
            method: 'DELETE'
        });
        if(responseD) console.log('Le relevé a été supprimé');
    }

}




function releveHeader(){
    console.log('\n<--- Releves menu --->');
    console.log('1 - Les 100 premiers relevés');
    console.log("2 - Rechere d'un relevé par ID");
    console.log("3- Création d'un relevé");
    console.log("4- Modification d'un relevé");
    console.log("5- Suppression d'un relevé")
    console.log('99 - Go back');
}

export async function relevesMenu(rl) {
    let active = true;
    while(active){
        releveHeader();
        const choice = (await rl.question('>')).trim();
        switch (choice){
            case '1':
                await displayReleves();
                break;
            case '2':
                const id = (await rl.question("Veuillez donner l'ID du relevé ")).trim();
                await displayOneReleve(id);
                break;
            case '3':
                await createReleve(rl);
                break;
            case '4':
                await updateReleve(rl);
                break;
            case '5':
                await deleteReleve(rl);
                break;
            case '99':
                active = false;
                break;
            default:
                console.log('Invalid choice. Select a valid one');
        }
    }
}