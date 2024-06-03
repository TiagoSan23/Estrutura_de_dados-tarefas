import * as readline from 'readline';
import { LinkedList, readFileToList, writeToFile } from './list_model';

function printList(list: LinkedList): void {
    process.stdout.write(list.toArray().join(''));
}

function printReversedList(list: LinkedList): void {
    process.stdout.write(list.reverse().toArray().join(''));
}

async function main() {
    const inputFilePath = 'input.txt';
    const list = await readFileToList(inputFilePath);

    // Imprimir a lista em ordem direta
    console.log("Ordem direta:");
    printList(list);
    console.log();

    // Imprimir a lista em ordem reversa
    console.log("Ordem reversa:");
    printReversedList(list);
    console.log();

    // Pedir ao usuário a escolha de ordem
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Deseja salvar em ordem direta (D) ou reversa (R)? ', (answer) => {
        const outputFilePath = inputFilePath.replace('.txt', '_out.txt');
        if (answer.toUpperCase() === 'R') {
            writeToFile(outputFilePath, list.reverse().toArray().join(''));
        } else {
            writeToFile(outputFilePath, list.toArray().join(''));
        }
        console.log(`Arquivo salvo em: ${outputFilePath}`);
        rl.close();
    });
}

main();
