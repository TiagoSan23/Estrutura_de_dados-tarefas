import * as fs from 'fs';

class Node {
    public value: string;
    public next: Node | null = null;

    constructor(value: string) {
        this.value = value;
    }
}

class LinkedList {
    private head: Node | null = null;

    public append(value: string): void {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    public toArray(): string[] {
        const result: string[] = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }

    public reverse(): LinkedList {
        const reversedList = new LinkedList();
        let current = this.head;
        while (current) {
            const newNode = new Node(current.value);
            newNode.next = reversedList.head;
            reversedList.head = newNode;
            current = current.next;
        }
        return reversedList;
    }
}

async function readFileToList(filePath: string): Promise<LinkedList> {
    const list = new LinkedList();
    try {
        const fileExists = fs.existsSync(filePath);
        if (!fileExists) {
            throw new Error(`File ${filePath} not found.`);
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split(/\r?\n/);
        for (const line of lines) {
            const tokens = line.match(/[^\s\w]|[a-zA-ZÀ-ÿ0-9_']+|\s/g);
            if (tokens) {
                tokens.forEach(token => list.append(token));
            }
        }
    } catch (error) {
        console.error(`Error reading file: ${error}`);
    }

    return list;
}

function writeToFile(filePath: string, content: string): void {
    try {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`File saved at: ${filePath}`);
    } catch (error) {
        console.error(`Error writing to file: ${error}`);
    }
}

export { LinkedList, readFileToList, writeToFile };
