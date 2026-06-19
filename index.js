import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { displayVilles } from './src/villes.js';
import { statsMenu  } from './src/stats.js';
import { relevesMenu } from './src/releves.js';

const rl = readline.createInterface({ input, output });

function displayMenu(){
    console.log('\n<--- Meteo CLI API --->');
    console.log('1 - Relevés');
    console.log('2 - Statistiques');
    console.log('3 - Liste des villes');
    console.log('99 - Exit');
}

async function main() {
    while(true){
        displayMenu();

        const choice = (await rl.question('>')).trim();
        switch (choice){
            case '1':
                await relevesMenu(rl);
                break;
            case '2':
                await statsMenu(rl);
                break;
            case '3':
                await displayVilles();
                break;
            case '99':
                console.log('Session terminated');
                rl.close();
                process.exit(0);
            default:
                console.log('Invalid choice. Select a valid one');
        }
    }
}

main().catch(err =>{
    console.error(err.message);
    process.exit(1);
})