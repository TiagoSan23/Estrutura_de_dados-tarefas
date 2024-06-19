// list_view.ts
import * as fs from 'fs';
import * as readline from 'readline';
import { MyNode, List } from './list';

// Função para ler o arquivo de texto e retornar um array de palavras
function readFile(filename: string): string[] {
    const data = fs.readFileSync(filename, 'utf8');
    return data.match(/\b\w+\b/g) || [];
}

// Função para inverter a lista usando outra lista
function reverseList(originalList: List<string>): List<string> {
    const reversedList = new List<string>();
    let currentNode = originalList.start;

    while (currentNode !== null) {
        const newNode = new MyNode<string>(currentNode.value);
        newNode.next = reversedList.start;
        reversedList.start = newNode;
        currentNode = currentNode.next;
    }

    return reversedList;
}

// Função para escrever a lista encadeada em um arquivo
function writeFile(filename: string, list: List<string>) {
    let currentNode = list.start;
    let output = '';

    while (currentNode !== null) {
        output += currentNode.value + ' ';
        currentNode = currentNode.next;
    }

    fs.writeFileSync(filename, output.trim());
}

// Programa principal
const inputFilename = 'input.txt';
const outputFilename = 'output_out.txt';

// Leia o arquivo e armazene as palavras em uma lista encadeada
const words = readFile(inputFilename);
const wordList = new List<string>();

words.forEach(word => {
    const node = new MyNode<string>(word);
    wordList.add(node);
});

// Inverte a lista
const reversedWordList = reverseList(wordList);

// Imprime a lista em ordem direta
console.log('Lista em ordem direta:');
wordList.print();

// Imprime a lista em ordem reversa
console.log('Lista em ordem reversa:');
reversedWordList.print();

// Função para perguntar ao usuário e gerar o arquivo de saída
function askUserAndWriteFile() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Deseja gerar o arquivo na ordem original ou invertida? (o/i): ', (answer) => {
        if (answer === 'i') {
            writeFile(outputFilename, reversedWordList);
        } else {
            writeFile(outputFilename, wordList);
        }
        console.log(`Arquivo ${outputFilename} gerado com sucesso!`);
        rl.close();
    });
}

// Chama a função para perguntar ao usuário e gerar o arquivo de saída
askUserAndWriteFile();
