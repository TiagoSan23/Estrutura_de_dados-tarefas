import * as fs from 'fs';

class MyNode<T> {
    value: T;
    next: MyNode<T>;
    constructor(v: T) {
        this.value = v;
        this.next = {} as MyNode<T>;
    }
}

class Stack<T> {
    length: number;
    top: MyNode<T>;
    constructor() {
        this.top = {} as MyNode<T>;
        this.length = 0;
    }

    is_empty() {
        return this.length === 0;
    }

    push(node: MyNode<T>) {
        node.next = this.top;
        this.top = node;
        ++this.length;
    }

    pop(): MyNode<T> {
        let node = {} as MyNode<T>;
        if (!this.is_empty()) {
            node = this.top;
            this.top = this.top.next;
            --this.length;
        }
        return node;
    }

    print() {
        let current_node = this.top;
        console.log("vvvv Top ");
        while (Object.keys(current_node).length !== 0) {
            console.log(current_node.value);
            current_node = current_node.next;
        }
        console.log("^^^^ Base ");
    }
}

function readWordsFromFile(filename: string): string[] {
    const data = fs.readFileSync(filename, 'utf8');
    // Split the data into words (assuming space as delimiter)
    return data.split(/\s+/);
}

function main() {
    const filename = 'input.txt'; // Replace with your input file name
    const words = readWordsFromFile(filename);

    const stack = new Stack<string>();
    for (const word of words) {
        stack.push(new MyNode(word));
    }

    // Print in order
    stack.print();

    // Print in reverse order
    while (!stack.is_empty()) {
        const node = stack.pop();
        console.log(node.value);
    }
}

main();
