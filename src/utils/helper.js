export function displayResult(data){
    Object.entries(data).forEach(entry => {
        const [key, value] = entry;
        console.log(`${key}: ${value}`);
    });
}

export function displayReleve(releve){
    console.log('\n <--- --->');
    displayResult(releve);
    console.log('<--- --->');
};

export const URL = 'http://localhost:3001';