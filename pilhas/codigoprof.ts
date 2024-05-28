import { MyNode, Stack } from "./stack";

let my_array:string[]=["X","Y","Z","T"];
let my_array_2:string[]=[];
let my_stack = new Stack<String>();
for(let i=0;i < my_array.length;++i){
    let node: MyNode<string> = new MyNode(my_array[i]);
    my_stack.push(node);
}
while(! my_stack.is_empty()){
    my_array_2.push(my_stack.pop().value.toString());
}
console.log(my_array_2);