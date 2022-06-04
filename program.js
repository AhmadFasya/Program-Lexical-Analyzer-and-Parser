// Proses Inisialisai
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabetList = alpha.map((x) => String.fromCharCode(x).toLowerCase());
const stateList = ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20', 'q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27', 'q28', 'q29', 'q30', 'q31', 'q32', 'q33', 'q34', 'q35', 'q36', 'q37']

let transitionTable = {}

stateList.forEach(state => {
    alphabetList.forEach(alphabet => {
        transitionTable[[state, alphabet]] = 'ERROR'
    });
    transitionTable[[state, '#']] = 'ERROR'
    transitionTable[[state, ' ']] = 'ERROR'
});

// Start
transitionTable[['q0', ' ']] = 'q0'
transitionTable[['q36', ' ']] = 'q37'
transitionTable[['q36', '#']] = 'ACCEPT'
transitionTable[['q37', ' ']] = 'q37'
transitionTable[['q37', '#']] = 'ACCEPT'

//Bahasa Melayu
// kite
transitionTable[['q0', 'k']] = 'q1'
transitionTable[['q1', 'i']] = 'q2'
transitionTable[['q2', 't']] = 'q3'
transitionTable[['q3', 'e']] = 'q36'
transitionTable[['q37', 'k']] = 'q1'

// kerongsang
transitionTable[['q1', 'e']] = 'q4'
transitionTable[['q4', 'r']] = 'q5'
transitionTable[['q5', 'o']] = 'q6'
transitionTable[['q6', 'n']] = 'q7'
transitionTable[['q7', 'g']] = 'q8'
transitionTable[['q8', 's']] = 'q9'
transitionTable[['q9', 'a']] = 'q10'
transitionTable[['q10', 'n']] = 'q11'
transitionTable[['q11', 'g']] = 'q36'

// pinggang
transitionTable[['q0', 'p']] = 'q12'
transitionTable[['q12', 'i']] = 'q13'
transitionTable[['q13', 'n']] = 'q14'
transitionTable[['q14', 'g']] = 'q15'
transitionTable[['q15', 'g']] = 'q9'
transitionTable[['q37', 'p']] = 'q12'

// cari
transitionTable[['q0', 'c']] = 'q16'
transitionTable[['q16', 'a']] = 'q17'
transitionTable[['q17', 'r']] = 'q18'
transitionTable[['q18', 'i']] = 'q36'
transitionTable[['q37', 'c']] = 'q16'

// saye
transitionTable[['q0', 's']] = 'q19'
transitionTable[['q19', 'a']] = 'q20'
transitionTable[['q20', 'y']] = 'q3'
transitionTable[['q37', 's']] = 'q19'

// sudu
transitionTable[['q19', 'u']] = 'q21'
transitionTable[['q21', 'd']] = 'q22'
transitionTable[['q22', 'u']] = 'q36'

// umai
transitionTable[['q0', 'u']] = 'q23'
transitionTable[['q23', 'm']] = 'q24'
transitionTable[['q24', 'a']] = 'q18'
transitionTable[['q37', 'u']] = 'q23'

// awak
transitionTable[['q0', 'a']] = 'q25'
transitionTable[['q25', 'w']] = 'q26'
transitionTable[['q26', 'a']] = 'q27'
transitionTable[['q27', 'k']] = 'q36'
transitionTable[['q37', 'a']] = 'q25'

// basoh
transitionTable[['q0', 'b']] = 'q28'
transitionTable[['q28', 'a']] = 'q29'
transitionTable[['q29', 's']] = 'q30'
transitionTable[['q30', 'o']] = 'q31'
transitionTable[['q31', 'h']] = 'q36'
transitionTable[['q37', 'b']] = 'q28'

// makan
transitionTable[['q0', 'm']] = 'q32'
transitionTable[['q32', 'a']] = 'q33'
transitionTable[['q33', 'k']] = 'q34'
transitionTable[['q34', 'a']] = 'q35'
transitionTable[['q35', 'n']] = 'q36'
transitionTable[['q37', 'm']] = 'q32'

//////////////// LEXICAL ANALYSIS ////////////////
const checkSentence = (sentence) => {
    let resultLa = document.getElementById('resultLa')
    let laTitle = document.getElementById('laTitle')
    let parserTitle = document.getElementById('parserTitle')
    let resultParser = document.getElementById('resultParser')
    laTitle.className = 'block font-medium text-lg'
    parserTitle.className = 'hidden'
    resultLa.innerText = ''
    resultParser.innerText = ''

    let inputString = sentence.toLowerCase() + '#'
    let idxChar = 0
    let state = 'q0'
    let currentToken = ''
    let currentChar = ''
    while (state != 'ACCEPT') {
        currentChar = inputString[idxChar]
        if (currentChar != ' ' && currentChar != '#' && !alphabetList.includes(currentChar)) {
            console.log('error');
            resultLa.innerText += 'ERROR'
            resultLa.style.color = 'red'
            break
        }

        currentToken += currentChar
        state = transitionTable[[state, currentChar]]
        if (state == 'q36') {
            resultLa.innerText = resultLa.innerText + 'Current Token : ' + currentToken + ', valid'
            resultLa.innerText += '\n'
            currentToken = ''
        }
        if (state == 'ERROR') {
            resultLa.innerText += 'ERROR'
            resultLa.style.color = 'red'
            break
        }
        idxChar++
    }

    if (state == 'ACCEPT') {
        resultLa.innerText += 'Semua token pada input : ' + sentence + ', valid'
        resultLa.style.color = 'green'

//////////////// PARSER ////////////////
        parserTitle.className = 'block font-medium text-lg'
        sentence = sentence.replace(/\s+/g, ' ').trim()
        let tokens = sentence.toLowerCase().split(" ")
        tokens.push('EOS')

        // Symbol Definition
        let nonTerminals = ['S', 'NN', 'VB']
        let terminals = ['awak', 'saye', 'kite', 'pinggang', 'kerongsang', 'umai', 'sudu', 'basoh', 'makan', 'cari']

        // Parse Table Definition
        let parseTable = {}

        parseTable[['S', 'awak']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'saye']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'kite']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'pinggang']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'kerongsang']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'umai']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'sudu']] = ['NN', 'VB', 'NN']
        parseTable[['S', 'basoh']] = ['error']
        parseTable[['S', 'makan']] = ['error']
        parseTable[['S', 'cari']] = ['error']
        parseTable[['S', 'EOS']] = ['error']

        parseTable[['NN', 'awak']] = ['awak']
        parseTable[['NN', 'saye']] = ['saye']
        parseTable[['NN', 'kite']] = ['kite']
        parseTable[['NN', 'pinggang']] = ['pinggang']
        parseTable[['NN', 'kerongsang']] = ['kerongsang']
        parseTable[['NN', 'umai']] = ['umai']
        parseTable[['NN', 'sudu']] = ['sudu']
        parseTable[['NN', 'basoh']] = ['error']
        parseTable[['NN', 'makan']] = ['error']
        parseTable[['NN', 'cari']] = ['error']
        parseTable[['NN', 'EOS']] = ['error']

        parseTable[['VB', 'basoh']] = ['basoh']
        parseTable[['VB', 'makan']] = ['makan']
        parseTable[['VB', 'cari']] = ['cari']
        parseTable[['VB', 'awak']] = ['error']
        parseTable[['VB', 'saye']] = ['error']
        parseTable[['VB', 'kite']] = ['error']
        parseTable[['VB', 'pinggang']] = ['error']
        parseTable[['VB', 'kerongsang']] = ['error']
        parseTable[['VB', 'umai']] = ['error']
        parseTable[['VB', 'sudu']] = ['error']
        parseTable[['VB', 'EOS']] = ['error']

        // Stack Initialization
        let stack = []
        stack.push('#')
        stack.push('S')

        // Input reading initialization
        let idxToken = 0
        let symbol = tokens[idxToken]

        // Parsing Proses
        while (stack.length > 0) {
            let top = stack[stack.length - 1]
            resultParser.innerText = resultParser.innerText + 'Top = ' + top + '\n'
            resultParser.innerText = resultParser.innerText + 'Symbol = ' + symbol + '\n'
            if (terminals.includes(top)) {
                resultParser.innerText = resultParser.innerText + top + ' adalah simbol terminal \n'
                if (top == symbol) {
                    stack.pop()
                    idxToken++
                    symbol = tokens[idxToken]
                    if (symbol == 'EOS') {
                        resultParser.innerText = resultParser.innerText + 'Isi stack = ' + '[' + stack + ']' + '\n \n'
                        stack.pop()
                    }
                } else {
                    resultParser.innerText = resultParser.innerText + 'error \n \n'
                    break
                }
            } else if (nonTerminals.includes(top)) {
                resultParser.innerText = resultParser.innerText + top + ' adalah simbol non-terminal \n'
                if (parseTable[[top, symbol]][0] != 'error') {
                    stack.pop()
                    let symbolToBePushed = parseTable[[top, symbol]]
                    for (let i = symbolToBePushed.length - 1; i > -1; i--) {
                        stack.push(symbolToBePushed[i])
                    }
                } else {
                    resultParser.innerText = resultParser.innerText + 'error \n \n'
                    break
                }
            } else {
                resultParser.innerText = resultParser.innerText + 'error \n \n'
                break
            }
            resultParser.innerText = resultParser.innerText + 'Isi stack = ' + '[' + stack + ']' + '\n \n'
        }

        // Conclusion
        if (symbol == 'EOS' && stack.length == 0) {
            resultParser.innerText = resultParser.innerText + 'Input string "' + sentence + '" diterima, sesuai Grammar \n'
            resultParser.style.color = 'green'
        } else {
            resultParser.innerText = resultParser.innerText + 'Error, input string "' + sentence + '" tidak diterima, tidak sesuai Grammar \n'
            resultParser.style.color = 'red'
        }
    }
}

let form = document.getElementById('form')

const handleSubmit = (e) => {
    let sentence = document.getElementById('sentence').value
    checkSentence(sentence)
    e.preventDefault()
}

form.addEventListener('submit', (e) => handleSubmit(e))