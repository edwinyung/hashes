const LinkedList = require("./node.js");

class HashTable {
  constructor() {
    this.buckets = [];
  }

  hash(input) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let index = alphabet.findIndex(input.shift().toLowerCase());
    return index;
  }

  insert(word, definition) {
    let newWordIndex = hash(word);

    if (this.buckets.newWordIndex === null) {
      this.buckets.newWordIndex = new LinkedList();
      this.buckets.newWordIndex.addFirstNode(word, definition);
    } else {
      this.buckets.newWordIndex.appendNode(word, definition);
    }
  }

  renderList() {
    this.buckets.forEach(bucket => {
      console.log(
        `bucket ${hash(bucket.headNode)}: ${bucket.countListItems()} words.`
      );
    });
  }
}

let jams = new HashTable();
jams.insert("Baby", "Justin Bieber");
jams.renderList();
