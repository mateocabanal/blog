---
title: Intro To Rust: Classes
date: December 2022
---

::title[Introduction to Classes in Rust]
Welcome to our beginner's guide on classes in Rust! In this tutorial, we will be covering the basics of how to create and use classes in Rust.

### What are classes?
In object-oriented programming, a class is a blueprint for creating objects (also known as instances) with specific properties and methods. Classes are used to organize and reuse code, making it easier to read and understand.

### Creating Classes in Rust
In Rust, classes are declared using the struct keyword. For example, to create a simple class named Person with properties for a name and age, you would use the following code:

```rust
struct Person {
    name: String,
    age: i32,
}
```
You can also create methods for a class, which are functions that are specific to instances of the class. For example:

```rust
struct Person {
    name: String,
    age: i32,
    fn greet(&self) {
        println!("Hello, my name is {}", self.name);
    }
}
```
This class, named Person, has a method named greet that prints a greeting with the person's name.

### Creating Instances of Classes
Once a class has been created, you can create instances of the class (also known as objects) by using the new keyword. For example:

```rust
let person = Person {
    name: "John Smith".to_string(),
    age: 30,
};
```
In this example, an instance of the Person class is created with the name "John Smith" and age 30.

### Using Methods
Once an instance of a class has been created, you can use the methods of the class by calling the method on the instance. For example:

```rust
person.greet();
```
In this example, the greet method of the person instance is called, printing the greeting "Hello, my name is John Smith".

### Conclusion
In this tutorial, we covered the basics of classes in Rust, including how to create and use classes, create instances of classes, and use methods. Remember to practice creating and using classes in your own code to become more familiar with them. Happy coding!