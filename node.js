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
  initialize(firstNode = null) {
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

  //The key is that we are not moving any of the blocks. WE ARE JUST REVERSING THEIR REFERENCES
  //Assume we have a three block linked list
  //A -> B -> C -> null. C points to null, but null is not a block
  //After reversal
  //null <- A <- B <- C
  //C is the new head node

  reverse() {
    let previousNode = null; //Since a singly linked list can't point to its prior, we need this variable
    let currentNode = this.headNode; //Start at head node
    while (currentNode !== null) {
      let nextNode = currentNode.next; //We need a temp variable NextNode to store our next reference
      currentNode.next = previousNode; //We make the current node point to the previous node
      //Now, we begin to traverse the current node to the next one
      previousNode = currentNode; //We update the previous node with our current node
      currentNode = nextNode; //We update the current node with the next node to prepare for the next iteration
    }
    //We stop the while loop when the currentNode is null (after Block C). The previousNode is Block C, so we have to remember to reassign this.headNode with Block C as it is now the originator of the entire list
    this.headNode = previousNode;
  }

  // OUTPUT:
  // currentNode =>  Node {
  //   next:
  //    Node {
  //      next: Node { next: null, word: 'Baby', definition: 'Justin Bieber' },
  //      word: 'Bringing Sexy Back',
  //      definition: 'Justin Timberlake' },
  //   word: 'Genie in a Bottle',
  //   definition: 'Christina Aguilera' }
  // currentNode =>  Node {
  //   next: Node { next: null, word: 'Baby', definition: 'Justin Bieber' },
  //   word: 'Bringing Sexy Back',
  //   definition: 'Justin Timberlake' }

  //We pass in the head node first
  reverseRecursion(currentNode) {
    let nextNode = currentNode.next; //For code legibility
    //Base Case: Once we are at the last node's turn, we set the last node's next reference to be null as we expect since it is now the new head node. We then return the last node (the last recursive call returns currentNode)
    if (currentNode == null || nextNode == null) {
      return currentNode;
    }
    let restOfList = this.reverseRecursion(nextNode); //We store the next node in a temp variable to call it at the return at the end. We will need to store it before invoking the recursion because of the next line where we null the reference. We need to be careful of the next lines not overwriting the memory of this temp variable
    nextNode.next = currentNode; //Make the next block refer back to the current block
    currentNode.next = null; //Cancel out this block's next reference
    return restOfList; //Traverse to the next block. We end at the base case at the end of the linked list when the block points to null
  }

  //Remember, in recursion, we start popping out the stack at the very end. So the current Node is block B, and we null out its reference. We set C to refer to B.
  //Then, we set A to refer to null, and B to refer to A.
  //The order is now this: A <- B <- C, just as we want!
  //OUTPUT:
  // ===============================
  // WE HIT THE BASE CASE HERE
  // ===============================
  // CURRENT NODE => Node {
  //   next: null,
  //   word: 'Bringing Sexy Back',
  //   definition: 'Justin Timberlake' }
  // NEXT NODE =>  Node {
  //   next:
  //    Node {
  //      next: null,
  //      word: 'Bringing Sexy Back',
  //      definition: 'Justin Timberlake' },
  //   word: 'Genie in a Bottle',
  //   definition: 'Christina Aguilera' }
  // REST OF LIST => Node {
  //   next:
  //    Node {
  //      next: null,
  //      word: 'Bringing Sexy Back',
  //      definition: 'Justin Timberlake' },
  //   word: 'Genie in a Bottle',
  //   definition: 'Christina Aguilera' }

  // ===============================
  // NEXT RECURSIVE CALL
  // ===============================
  // CURRENT NODE => Node { next: null, word: 'Baby', definition: 'Justin Bieber' }
  // NEXT NODE => Node {
  //   next: Node { next: null, word: 'Baby', definition: 'Justin Bieber' },
  //   word: 'Bringing Sexy Back',
  //   definition: 'Justin Timberlake' }
  // REST OF LIST => Node {
  //   next:
  //    Node {
  //      next: Node { next: null, word: 'Baby', definition: 'Justin Bieber' },
  //      word: 'Bringing Sexy Back',
  //      definition: 'Justin Timberlake' },
  //   word: 'Genie in a Bottle',
  //   definition: 'Christina Aguilera' }

  countListItems() {
    // Start at the head
    let currentNode = this.headNode;
    let counter = 1;
    while (currentNode.next !== null) {
      counter++;
      currentNode = currentNode.next;
    }
    return counter;
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

const linkedListTest = new LinkedList();

linkedListTest.addFirstNode("Baby", "Justin Bieber");
linkedListTest.appendNode("Bringing Sexy Back", "Justin Timberlake");
linkedListTest.appendNode("Genie in a Bottle", "Christina Aguilera");
linkedListTest.insertNode("The Artist", "James Franco", 1);
linkedListTest.removeNode(2);
linkedListTest.reverse();
// linkedListTest.reverseRecursion(linkedListTest.findNode(0));
linkedListTest.printList();

module.exports = LinkedList;
