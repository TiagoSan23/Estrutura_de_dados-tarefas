export class MyNode<T> {
    value: T;
    next: MyNode<T> | null;

    constructor(v: T) {
        this.value = v;
        this.next = null;
    }
}

export class List<T> {
    length: number;
    start: MyNode<T> | null;

    constructor() {
        this.start = null;
        this.length = 0;
    }

    add(node: MyNode<T>) {
        if (this.start === null) {
            this.start = node;
        } else {
            let current = this.start;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }
        ++this.length;
    }

    remove(v: T): boolean {
        let current_node = this.start;
        let previous_node: MyNode<T> | null = null;
        let found = false;
        while (current_node !== null && !found) {
            if (current_node.value === v) {
                found = true;
                if (previous_node !== null) {
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
        while (current_node !== null) {
            process.stdout.write(String(current_node.value) + (current_node.next ? ", " : ""));
            current_node = current_node.next;
        }
        process.stdout.write("]");
        process.stdout.write("\n");
    }
}
