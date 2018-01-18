class Node {
  constructor(word, definition, next) {
    this.next = next;
    this.word = word;
    this.definition = definition;
  }
}

class LinkedList {
  constructor() {
    // We'll want to keep track of the head node and
    // the last node to make adding and subtracting easy
    this.headNode = null;
    this.lastNode = null;
  }

  // Allow initializing the list with a first node
  initialize(firstNode) {
    this.headNode = firstNode;
    this.lastNode = firstNode;
  }

  // To add the first node
  addFirstNode(word, definition) {
    this.headNode = new Node(word, definition, null);
    this.lastNode = this.headNode;
  }

  // Add a node to the end of the list
  appendNode(word, definition) {
    // If we don't have a headNode yet, that means the list is empty
    // We can treat this case as a `addFirstNode` method
    if (!this.headNode) {
      this.addFirstNode(word, definition);
    } else {
      const node = new Node(word, definition, null);

      // First, point the last node to our new one
      this.lastNode.next = node;

      // Set our new node as the official last node
      this.lastNode = node;
    }
  }

  // Insert node to specified index. FINDING NODE IS LINEAR, BUT INSERTING AND CHANGING REFERENCES IS CONSTANT TIME
  insertNode(word, definition, index) {
    // If we don't have a headNode yet, that means the list is empty
    // We can treat this case as a `addFirstNode` method
    if (!this.headNode) {
      this.addFirstNode(word, definition);
    } else {
      //Find Node
      // Start at the head
      let counter = 0;
      let currentNode = this.headNode;
      let afterNode = null;

      // Crawl until we hit index
      while (counter < index) {
        currentNode = currentNode.next;
        ++counter;
      }

      //Preserve linkage to neighbor
      afterNode = currentNode.next;

      //Create new node and refer it to the currentNode
      currentNode.next = new Node(word, definition, null);

      //Reassign newly created Node to be the currentNode
      currentNode = currentNode.next;

      //Reestablish linkage
      currentNode.next = afterNode;
    }
  }

  // Remove the node at this position (assume there is one there)
  // We'll crawl the list and save the prev
  removeNode(index) {
    // Start at the head
    let counter = 0;
    let currentNode = this.headNode;
    let prevNode = null;

    // Crawl until we hit index
    while (counter < index) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      ++counter;
    }

    // Now remove the node
    let nextNode = currentNode.next;

    // Clear the `next` reference
    currentNode.next = null;

    // Make the previous one point correctly
    prevNode.next = nextNode;
  }

  // Return the node at that position, like in an array
  // It has no error handling
  findNode(index) {
    // Start at the head
    let counter = 0;
    let currentNode = this.headNode;

    // Crawl until we hit index
    while (counter < index) {
      console.log(counter);
      currentNode = currentNode.next;
      ++counter;
    }

    return currentNode;
  }

  // big o => linear time
  // jb -> jt -> xtina

  //a, b, c
  //headnode is a

  //prevNode = null
  //currentNode is a
  //nextNode is null

  //nextNode is b
  //currentNode is still a.
  //a.next points to null. Made it a tail. tail has next null
  //prevNode is a.
  //currentNode is b.

  //in next iteration, b is points to

  //c is where we end the loop
  reverse() {
    let prevNode = null;
    let currentNode = this.headNode;
    let nextNode = null;
    while (currentNode !== null) {
      nextNode = currentNode.next;
      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
    }
    this.headNode = prevNode;
  }

  countListItems() {
    // Start at the head
    let currentNode = this.headNode;
    let counter = 1;
    while (currentNode.next !== null) {
      counter++;
    }
    return counter;
  }

  reverse() {
    let prevNode = null;
    let currentNode = this.headNode;
    let nextNode = null;
    while (currentNode !== null) {
      nextNode = currentNode.next;
      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
    }
    this.headNode = prevNode;
  }

  // Crawls and prints the list
  printList() {
    // Start at the head
    let currentNode = this.headNode;

    while (currentNode.next !== null) {
      console.log("print list => ", currentNode);
      currentNode = currentNode.next;
    }
  }
}

// const linkedListInitialized.initialize() = new LinkedList();
const linkedListTest = new LinkedList();

console.log("testing");
console.log(linkedListTest);
linkedListTest.addFirstNode("Baby", "Justin Bieber");
linkedListTest.appendNode("Bringing Sexy Back", "Justin Timberlake");
linkedListTest.appendNode("Genie in a Bottle", "Christina Aguilera");

linkedListTest.insertNode("The Artist", "James Franco", 1);
linkedListTest.removeNode(2);
linkedListTest.reverse();
linkedListTest.printList();

// console.log(linkedListTest);

module.exports = LinkedList;
