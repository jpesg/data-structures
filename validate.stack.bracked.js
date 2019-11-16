let bracketStr = '[{}]';
let stack = [];

const getReversedBracket = bracket => {
    let reversed = ''
    switch (bracket) {
        case '[':
            reversed = ']';
            break;
        case ']':
            reversed = '[';
            break;
        case '(':
            reversed = ')';
            break;
        case ')':
            reversed = '(';
            break;
        case '{':
            reversed = '}';
            break;
        case '}':
            reversed = '{';
            break;
        default:
            reversed = '';
    }

    return reversed
}
const checkReversedBracked = (stack, nextBracket) => {
    let reversed = getReversedBracket(nextBracket);
    return stack[stack.length - 1] === reversed;
}


const validateStrBrackets = str => {
    console.log("str to validate: ", str);
    console.log("stack: ", stack);

    for (i = 0; i < str.length - 1; i++) {
        const bracket = str[i];
        if (checkReversedBracked(stack, bracket)) {
            stack.pop();
        } else {
            stack.push(bracket);
        }
    }

}
validateStrBrackets(bracketStr);