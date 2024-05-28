import * as fs from 'fs';
import * as readline from 'readline';

class MyNode<T> {
    value: T;
    next: MyNode<T>;
 
    constructor(v: T) {
        this.value = v;
        this.next = {} as MyNode<T>;
    }
}

class List<T> {
    length: number;
    start: MyNode<T>;

    constructor() {
        this.start = {} as MyNode<T>;
        this.length = 0;
    }

    add(node: MyNode<T>) {
        node.next = this.start;
        this.start = node;
        ++this.length;
    }

    remove(v: T): boolean {
        let current_node = this.start;
        let previous_node = {} as MyNode<T>;
        let found = false;
        while (Object.keys(current_node).length != 0 && !found) {
            if (current_node.value === v) {
                found = true;
                if (Object.keys(previous_node).length != 0) {
                    previous_node.next = current_node.next;
                } else {
                    this.start = current_node.next;
                }
                --this.length;
            } else {
                previous_node = current_node;
                current_node = current_node.next;
            }
        }
        return found;
    }

    print() {
        let current_node = this.start;
        process.stdout.write("[");
        while (Object.keys(current_node).length != 0) {
            process.stdout.write(String(current_node.value) + ", ");
            current_node = current_node.next;
        }
        process.stdout.write("]");
        process.stdout.write("\n")
    }

    printReverse() {
        const values: T[] = [];
        let current_node = this.start;
        while (Object.keys(current_node).length != 0) {
            values.push(current_node.value);
            current_node = current_node.next;
        }
        process.stdout.write("[");
        for (let i = values.length - 1; i >= 0; i--) {
            process.stdout.write(String(values[i]) + ", ");
        }
        process.stdout.write("]");
        process.stdout.write("\n");
    }
}

async function loadWordsFromFile(filename: string): Promise<List<string>> {
    const list = new List<string>();
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const words = line.split(/\s+/);
        for (const word of words) {
            if (word) { // Check if word is not empty
                list.add(new MyNode<string>(word));
            }
        }
    }

    return list;
}

function reverseList(original: List<string>): List<string> {
    const reversed = new List<string>();
    let current_node = original.start;
    while (Object.keys(current_node).length != 0) {
        reversed.add(new MyNode<string>(current_node.value));
        current_node = current_node.next;
    }
    return reversed;
}

function saveListToFile(list: List<string>, filename: string) {
    const values: string[] = [];
    let current_node = list.start;
    while (Object.keys(current_node).length != 0) {
        values.push(current_node.value);
        current_node = current_node.next;
    }
    fs.writeFileSync(filename, values.join(' '));
}

type UserChoice = 'original' | 'reverse';

async function getUserChoice(): Promise<UserChoice> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise<UserChoice>((resolve) => {
        rl.question("Do you want to save the text in 'original' or 'reverse' order? ", (answer) => {
            rl.close();
            if (answer === 'original' || answer === 'reverse') {
                resolve(answer as UserChoice);
            } else {
                console.log("Invalid choice, defaulting to 'original'");
                resolve('original');
            }
        });
    });
}

async function main() {
    const inputFilename = 'input.txt';
    const list = await loadWordsFromFile(inputFilename);
    
    console.log("Reverse List:");
    list.print();
    
    console.log("Original List:");
    const reversedList = reverseList(list);
    reversedList.print();

    console.log("Print Original List in Reverse Order:");
    list.printReverse();

    console.log("Print Reversed List in Order:");
    reversedList.printReverse();

    const userChoice = await getUserChoice();

    if (userChoice === 'reverse') {
        saveListToFile(list, inputFilename.replace('.txt', '_out.txt'));
    } else if (userChoice === 'original') {
        saveListToFile(reversedList, inputFilename.replace('.txt', '_out.txt'));
    }
}

main().catch(err => console.error(err));

export {
    MyNode, List, loadWordsFromFile, reverseList, saveListToFile
};
