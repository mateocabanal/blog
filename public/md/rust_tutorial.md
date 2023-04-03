---
title: Intro to Rust
date: November 2022
---

::title[Intro To Rust]


### Installing the Rust compiler

First, you have to install the Rust tools to be able to compile Rust code.
In order to do that, go to [rustup.rs](https://rustup.rs)

### Cargo

Cargo is one of the tools you use in Rust. It is used to control your Rust project. It will build and compile your program

When in our projects root folder, `cargo build` will build our code into an executable program.
`cargo run` will build and run our program.

### First steps

In the file `src/main.rs`, we can add our first bits of code.

When you first open up `src/main.rs`, you should see this code already in the file.

```rust
fn main() {
  
}
```

`fn` is the word in Rust we use to define a function. `main()` is the name of our function. The curly brackets will contain the code of our function. The `main()` function is automatically executed when we run our program.

### Hello World

The first program we make will display a message to the screen. 
The function `println!()` will be used to acheive our goal. Inside the brackets, we will add our message. 

So our code should look like this:

```rust
fn main() {
    println!("MESSAGE");
}
```

After each expression, we end our line with a semi-colon.

### Conclusion

With Rust installed, we can move on to learn more about programming!