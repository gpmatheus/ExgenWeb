
let expressionsContainer = document.getElementById('expressions-container');
let elements = []
function generate() {
    let answer = Math.floor(Math.random() * 400) + 100;
    let num = new NumberElement(parseInt(answer));
    num.split(.99, .7);
    let numberString = num.getString();
    let mainDiv = generateElement(numberString);
    expressionsContainer.appendChild(mainDiv)
    elements.push(mainDiv);
}

function generateElement(numberString) {
    let mainDiv = document.createElement('div');
    mainDiv.className = 'expression';
    let expression = document.createElement('p');
    let expressionText = document.createTextNode(numberString);
    expression.appendChild(expressionText);
    let equals = document.createElement('p');
    equals.className = 'equals';
    let equalsText = document.createTextNode(' = ');
    equals.appendChild(equalsText);
    let answerField = document.createElement('input');
    answerField.setAttribute('type', 'number');
    let nextButton = document.createElement('button');
    nextButton.className = 'next';
    nextButton.addEventListener('click', generate, false);
    let buttonText = document.createTextNode("next");
    nextButton.appendChild(buttonText);
    mainDiv.appendChild(expression);
    mainDiv.appendChild(equalsText);
    mainDiv.appendChild(answerField);
    mainDiv.appendChild(nextButton);
    return mainDiv;
}