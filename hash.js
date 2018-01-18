const LinkedList = require("./node.js");

class HashTable {
  constructor() {
    this.buckets = [];
  }

  hash(input) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let index = alphabet.indexOf(input[0].toLowerCase());
    return index;
  }

  insert(word, definition) {
    let newWordIndex = this.hash(word);

    if (!this.buckets[newWordIndex]) {
      this.buckets[newWordIndex] = new LinkedList();
      this.buckets[newWordIndex].addFirstNode(word, definition);
    } else {
      this.buckets[newWordIndex].appendNode(word, definition);
    }
  }

  renderList() {
    this.buckets.forEach(bucket => {
      console.log(
        `bucket ${this.hash(
          bucket.headNode.word
        )}: ${bucket.countListItems()} words.`
      );
    });
  }
}

let jams = new HashTable();
jams.insert("Baby", "Justin Bieber");
jams.renderList();
