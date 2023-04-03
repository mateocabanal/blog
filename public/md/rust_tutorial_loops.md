---
title: Intro To Rust: Loops
date: December 2022
---

::title[Introduction to Loops in Rust]
Welcome to our beginner's guide on loops in Rust! In this tutorial, we will be covering the basics of how to create and use loops in Rust.

### What are loops?
In programming, a loop is a way to repeatedly execute a block of code until a certain condition is met. Loops are useful for performing repetitive tasks, such as iterating through an array of items or counting from 1 to 10.

### Types of Loops in Rust
Rust has several types of loops available, including while, for, and loop.

### `while` Loops
`while` loops repeatedly execute a block of code as long as a certain condition is true. For example:

```rust
let mut count = 0;
while count < 10 {
    println!("Count: {}", count);
    count += 1;
}
```
This code will print "Count: 0" to "Count: 9" to the console, incrementing the count variable by 1 each time.

### `for` Loops
`for` loops are used to iterate through a collection of items, such as an array or a range of numbers. For example:

```rust
let numbers = [1, 2, 3, 4, 5];
for number in numbers.iter() {
    println!("Number: {}", number);
}
```

This code will print "Number: 1" to "Number: 5" to the console, iterating through each item in the numbers array.

### `loop` Loops
`loop` loops execute a block of code indefinitely until a certain condition is met. It is important to include a way to break out of the loop, or it will continue indefinitely. For example:

```rust
let mut count = 0;
loop {
    println!("Count: {}", count);
    count += 1;
    if count == 10 {
        break;
    }
}
```

This code will print "Count: 0" to "Count: 9" to the console, incrementing the count variable by 1 each time, and