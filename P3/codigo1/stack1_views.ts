import { FileManager, UserInput } from "./stack1";

async function main() {
    const inputFilename = 'input.txt';
    const stack = await FileManager.loadWordsFromFile(inputFilename);

    console.log("Original Stack:");
    stack.print();

    const reversedStack = stack.getReversedStack();
    console.log("Reversed Stack:");
    reversedStack.print();

    console.log("Print Original Stack in Reverse Order:");
    stack.printReverse();

    console.log("Print Reversed Stack in Order:");
    reversedStack.printReverse();

    const userChoice = await UserInput.getUserChoice();

    const outputFilename = inputFilename.replace('.txt', '_out.txt');
    if (userChoice === 'reverse') {
        FileManager.saveStackToFile(stack, outputFilename);
    } else {
        FileManager.saveStackToFile(reversedStack, outputFilename);
    }
}

main().catch(err => console.error(err));
