const LinkedList = require("./node.js");
const fs = require("fs");
var dictionary = JSON.parse(fs.readFileSync("./dictionary.json", "utf8"));

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
      // console.log("else bucket => ", this.buckets[newWordIndex]);
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

  define(word) {
    let bucketIndex = this.hash(word);
    if (!this.buckets[bucketIndex]) {
      this.buckets[bucketIndex] = new LinkedList();
    }
    let linkedList = this.buckets[bucketIndex];
    let currentNode = linkedList.headNode;
    let result;
    let counter = 0;
    while (currentNode !== null) {
      if (currentNode.word === word) {
        result = currentNode.definition;
      }
      currentNode = currentNode.next;
      counter++;
    }
    result ? console.log(result) : console.log("No word found.");
    console.log(`${counter} step(s) were taken to find your word.`);
  }
}

let jams = new HashTable();
jams.insert("apple", "fruit");
jams.insert("bat", "air dog");
jams.insert("bar", "drink dispenser");
// jams.renderList();
jams.define("frog");

Object.keys(dictionary).forEach(key => {
  jams.insert(key, dictionary[key]);
});

jams.define("zygosis");
