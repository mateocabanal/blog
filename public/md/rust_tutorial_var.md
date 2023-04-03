---
title: Variables
date: December 2022
---

::title[Introduction To Variables]

Welcome to our beginner's guide on variables in Rust! In this tutorial, we will be covering the basics of how to declare and assign values to variables in Rust.

### What are variables?
In programming, a variable is a container that stores a value. The value stored in a variable can be changed or modified as needed. Variables are used in programming to store data and make it easier to reference and manipulate.

### Declaring Variables in Rust
In Rust, variables are declared using the let keyword. For example, to declare a variable named x with a value of 5, you would use the following code:

```rust
let x = 5;
```
You can also declare a variable without assigning a value to it. In this case, the variable will be initialized with a default value. For example:

```rust
let y;
```
### Assigning Values to Variables
Once a variable has been declared, you can assign a new value to it using the assignment operator (=). For example:

```rust
let x = 5;
x = 10;
```

In this example, the variable x is first declared with a value of 5 and then reassigned a new value of 10.

### Variable Types
In Rust, variables have a specific data type that determines the type of value that can be stored in them. For example, an integer variable can only store integer values.

Some common data types in Rust include:

- `i32`: 32-bit signed integer
- `f32`: 32-bit floating-point number
- `bool`: boolean value (true or false)
- `String`: a string of characters
You can specify the data type of a variable by using a colon : followed by the data type. For example:

```rust
let x: i32 = 5;
```
### Conclusion
In this tutorial, we covered the basics of variables in Rust, including how to declare and assign values to variables, and the different data types available in Rust. Remember to practice declaring and working with variables in your own code to become more familiar with them. Happy coding!