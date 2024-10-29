export default function validateCPF(cpf: any) {
    
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    //first check digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let checkDigit1 = 11 - (sum % 11);
    if (checkDigit1 >= 10) checkDigit1 = 0;
    if (checkDigit1 !== parseInt(cpf.charAt(9))) return false;

    //second check digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let checkDigit2 = 11 - (sum % 11);
    if (checkDigit2 >= 10) checkDigit2 = 0;
    if (checkDigit2 !== parseInt(cpf.charAt(10))) return false;

    return true;
}