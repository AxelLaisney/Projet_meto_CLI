/**
 * 
 * @param {number} id 
 * @returns {string|undefined}
 */
export function validateId(id){
    const result = validateNumber(id);
    if(result){
        return result;
    } 
    if(id < 0){
        return `Id est négatif Id: ${id}`;
    }
}


/**
 * 
 * @param {string} str 
 * @param {string} label 
 * @returns {string|undefined}
 */
export function validateString(str){
    if(typeof str === 'undefined'){
        return `Le champ est non défini`;
    }
    if(str === ''){
        return `Le champ est vide`;
    }
}

/**
 * 
 * @param {number} num 
 * @param {string} label 
 * @returns {string|undefined}
 */
export function validateNumber(num){
    if(typeof num === 'undefined'){
        return 'Nombre non défini';
    }
    if(Number.isNaN(Number(num))){
        return `Le champ n'est pas un nombre valide : ${num}`;
    }
}

/**
 * 
 * @param {string} date 
 * @returns {string|undefined}
 */
export function validateDate(date){
    // const result =  validateString(date, 'date');
    // if(result){
    //     return result;
    // }else{
    //     if(new Date(date)){
    //         return `La date est invalide: ${date}`;
    //     }
    // }
    if(isNaN(new Date(date))){
            return `La date est invalide: ${date}`;
        }
}





