---
title: Intro To Rust: Functions
date: December 2022
---

::title[Introduction to Functions in Rust]
Welcome to our beginner's guide on functions in Rust! In this tutorial, we will be covering the basics of how to create and use functions in Rust.

### What are functions?
In programming, a function is a block of code that performs a specific task and can be called multiple times. Functions are used to organize and reuse code, making it easier to read and understand.

### Creating Functions in Rust
In Rust, functions are declared using the fn keyword. For example, to create a simple function that prints "Hello, world!" to the console, you would use the following code:

```rust
fn hello_world() {
    println!("Hello, world!");
}
```

You can also create functions that take in parameters and return a value. For example:

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y
}
```

This function, named add, takes in two parameters of type i32 and returns the sum of the two values.

### Calling Functions
Once a function has been created, it can be called by using its name followed by parentheses. For example:

```rust
hello_world();
```

If a function takes in parameters, you will need to provide the necessary values within the parentheses when calling the function. For example:

```rust
let result = add(5, 10);
```
In this example, the add function is called with the values 5 and 10 as parameters and the result is stored in the result variable.

### Conclusion
In this tutorial, we covered the basics of functions in Rust, including how to create and call functions. Remember to practice creating and using functions in your own code to become more familiar with them. Happy coding!