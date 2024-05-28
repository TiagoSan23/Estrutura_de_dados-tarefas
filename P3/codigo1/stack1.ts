import * as fs from 'fs';
import * as readline from 'readline';

class MyNode<T> {
    value: T;
    next: MyNode<T> | null;

    constructor(v: T) {
        this.value = v;
        this.next = null;
    }
}

class Stack<T> {
    length: number;
    top: MyNode<T> | null;

    constructor() {
        this.top = null;
        this.length = 0;
    }

    is_empty() {
        return this.length === 0;
    }

    push(node: MyNode<T>) {
        node.next = this.top;
        this.top = node;
        this.length++;
    }

    pop(): MyNode<T> | null {
        if (this.is_empty()) {
            return null;
        }
        const node = this.top;
        this.top = this.top?.next || null;
        this.length--;
        return node;
    }

    print() {
        let current_node = this.top;
        console.log("vvvv Top ");
        while (current_node !== null) {
            console.log(current_node.value);
            current_node = current_node.next;
        }
        console.log("^^^^ Base ");
    }

    printReverse() {
        const values: T[] = [];
        let current_node = this.top;
        while (current_node !== null) {
            values.push(current_node.value);
            current_node = current_node.next;
        }
        console.log("vvvv Top (Reversed) ");
        for (let i = values.length - 1; i >= 0; i--) {
            console.log(values[i]);
        }
        console.log("^^^^ Base ");
    }

    getReversedStack(): Stack<T> {
        const reversed = new Stack<T>();
        let current_node = this.top;
        while (current_node !== null) {
            reversed.push(new MyNode(current_node.value));
            current_node = current_node.next;
        }
        return reversed;
    }

    toArray(): T[] {
        const values: T[] = [];
        let current_node = this.top;
        while (current_node !== null) {
            values.push(current_node.value);
            current_node = current_node.next;
        }
        return values;
    }
}

class FileManager {
    static async loadWordsFromFile(filename: string): Promise<Stack<string>> {
        const stack = new Stack<string>();
        const fileStream = fs.createReadStream(filename);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            const words = line.split(/\s+/);
            for (const word of words) {
                if (word) { // Check if word is not empty
                    stack.push(new MyNode(word));
                }
            }
        }

        return stack;
    }

    static saveStackToFile(stack: Stack<string>, filename: string) {
        const values = stack.toArray();
        fs.writeFileSync(filename, values.join(' '));
    }
}

class UserInput {
    static async getUserChoice(): Promise<'original' | 'reverse'> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question("Do you want to save the text in 'original' or 'reverse' order? ", (answer) => {
                rl.close();
                if (answer === 'original' || answer === 'reverse') {
                    resolve(answer as 'original' | 'reverse');
                } else {
                    console.log("Invalid choice, defaulting to 'original'");
                    resolve('original');
                }
            });
        });
    }
}


export { MyNode, Stack, FileManager, UserInput };
