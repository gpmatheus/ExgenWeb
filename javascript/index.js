
let expressionsContainer = document.getElementById('expressions-container');
let header = document.getElementById('header');
let button = document.getElementById('generate-button');
let expressions = new Map();

button.addEventListener('click', () => {
    generate();
    header.style.height = '150px';
    button.disabled = true;
});

function checkAnswer(answerEl) {
    let answer = answerEl['answer'];
    let answerValue = answer.value;
    if (answerValue === '') {
        return;
    }
    let question = answer.labels[0].innerText;
    let actualAnswer = expressions.get(question);

    //debbugin porposes
    console.log('question: ' + question + ', answer: ' + answerValue + ', actual answer: ' + actualAnswer);

    /**         ^
    tudo isso ( | ) poderia ser substituido por:
        let question = answerEl['answer'].id;
        let answer = answerEl['answer'].value;
        let actualAnswer = expressions.get(question);
     */

    if (answerValue == actualAnswer) {
        answer.classList.add('correct-answer-field');
    } else {
        answer.classList.add('wrong-answer-field');
    }

    answerEl['check'].disabled = true;
    answerEl['check'].style.visibility = 'hidden';
    answerEl['answer'].disabled = true;
    generate();
}

function generate() {
    let answer = Math.floor(Math.random() * 400) + 100;
    let num = new NumberElement(parseInt(answer));
    num.split(.99, .7);
    let numberString = num.getString();
    expressions.set(numberString, answer);
    generateElement(numberString);
}

function generateElement(numberString) {
    let form = document.createElement('form');
    form.setAttribute('onsubmit', 'event.preventDefault();');

    let expressionText = document.createTextNode(numberString);
    let expression = document.createElement('label');
    expression.setAttribute('for', numberString);
    expression.setAttribute('name', 'expression');
    expression.appendChild(expressionText);

    let equalsText = document.createTextNode(' = ');
    let equalsEl = document.createElement('p');
    equalsEl.appendChild(equalsText);

    let answer = document.createElement('input');
    answer.setAttribute('type', 'number');
    answer.setAttribute('name', 'answer');
    answer.setAttribute('id', numberString);

    let check = document.createElement('input');
    check.setAttribute('type', 'button');
    check.setAttribute('onclick', 'checkAnswer(this.form)');
    check.setAttribute('name', 'check');
    check.setAttribute('value', 'check');

    form.appendChild(expression);
    form.appendChild(equalsEl);
    form.appendChild(answer);
    form.appendChild(check);

    expressionsContainer.appendChild(form);
}