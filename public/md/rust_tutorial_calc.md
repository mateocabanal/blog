---
title: Rust Project: Calculator
date: Decemeber 2022
---

::title[Building a Simple Calculator in Rust]
Welcome to our beginner's guide on building a simple calculator in Rust! In this tutorial, we will be covering the basics of how to create a calculator that can perform basic arithmetic operations.

### Setting up the Calculator
To get started, we will create a new Rust project using the following command:

```sh
cargo new calculator
```

This will create a new directory named calculator with the basic file structure for a Rust project.

### Creating the Calculator Struct
In the main.rs file, we will create a struct named Calculator that will hold the state of the calculator. We will also add methods for each of the basic arithmetic operations: addition, subtraction, multiplication, and division.

```rust
struct Calculator {
    result: f64,
}

impl Calculator {
    fn new() -> Calculator {
        Calculator { result: 0.0 }
    }

    fn add(&mut self, value: f64) {
        self.result += value;
    }

    fn subtract(&mut self, value: f64) {
        self.result -= value;
    }

    fn multiply(&mut self, value: f64) {
        self.result *= value;
    }

    fn divide(&mut self, value: f64) {
        self.result /= value;
    }
}
```

The `new` method creates a new instance of the Calculator struct with the result set to 0.0. The other methods take in a value and perform the corresponding arithmetic operation on the result field.

### Using the Calculator
In the `main` function, we can create an instance of the Calculator struct and use the methods to perform calculations.

```rust
fn main() {
    let mut calculator = Calculator::new();

    calculator.add(5.0);
    calculator.subtract(2.0);
    calculator.multiply(3.0);
    calculator.divide(4.0);

    println!("Result: {}", calculator.result);
}
```

This code creates a new instance of the Calculator struct, performs the calculations 5 + 2 - 3 * 4, and prints the final result of -0.5.

### Conclusion
In this tutorial, we covered the basics of building a simple calculator in Rust. We created a struct to hold the state of the calculator and added methods for performing basic arithmetic operations. Remember to practice building your own calculator in Rust and experimenting with different functionality. Happy coding!

### Link to Full Code