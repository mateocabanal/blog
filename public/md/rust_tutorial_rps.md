---
title: Rust Project: Rock-Paper-Scissors
date: December 2022
---

::title[Building a Simple Rock-Paper-Scissors Game in Rust]
Welcome to our beginner's guide on building a simple rock-paper-scissors game in Rust! In this tutorial, we will be using the concepts covered in our previous tutorials on variables, functions, and loops to create a simple game that allows a user to play against the computer.

### Setting up the Game
To get started, we will create a new Rust project using the following command:

```sh
cargo new rps_game
```
This will create a new directory named rps_game with the basic file structure for a Rust project.

### Dependenices

We will be utilizing the `rand` library, which will generate random numbers for us.

To add it to our project, add `rand = "*"`underneath `[dependencies]` in `Cargo.toml`

### Creating the Game struct
In the main.rs file, we will create a struct named Game that will hold the state of the game. We will also add methods for getting user input, generating computer input, and determining the winner of the game.

```rust
// Libraries to help us generate random numbers
use rand;
use rand::Rng;

struct Game {
    user_choice: String,
    computer_choice: String,
}

impl Game {
    fn new() -> Game {
        Game {
            user_choice: "".to_string(),
            computer_choice: "".to_string(),
        }
    }

    fn get_user_choice(&mut self) {
        let mut input = String::new();
        println!("Enter your choice (rock, paper, or scissors):");
        std::io::stdin().read_line(&mut input).unwrap();
        self.user_choice = input.trim().to_string();
    }

    fn get_computer_choice(&mut self) {
        let choices = vec!["rock", "paper", "scissors"];
        let random_choice = choices[rand::thread_rng().gen_range(0..3)];
        self.computer_choice = random_choice.to_string();
    }

    fn determine_winner(&self) {
        println!("Computer chose: {}", self.computer_choice);
        if self.user_choice == self.computer_choice {
            println!("It's a tie!");
        } else if (self.user_choice == "rock" && self.computer_choice == "scissors") ||
        (self.user_choice == "paper" && self.computer_choice == "rock") ||
        (self.user_choice == "scissors" && self.computer_choice == "paper") {
            println!("You win!");
        } else {
            println!("Computer wins!");
        }
    }
}
```

The `new` method creates a new instance of the `Game` struct with empty user_choice and computer_choice fields. The `get_user_choice` method prompts the user to enter their choice and assigns it to the user_choice field. The `get_computer_choice` method generates a random choice for the computer and assigns it to the computer_choice field. The `determine_winner` method compares the user's choice with the computer's choice and prints the result.

### Playing the Game

Now that we have our game struct set up, we can use a `loop` to play the game repeatedly until the user chooses to quit.

```rust
let mut game = Game::new();
loop {
    game.get_user_choice();
    game.get_computer_choice();
    game.determine_winner();


    let mut play_again = String::new();
    println!("Do you want to play again? (y/n)");
    std::io::stdin().read_line(&mut play_again).unwrap();
    if play_again.trim() != "y" {
        break;
    }
}
```

This code prompts the user to enter their choice, generates a computer choice, determines the winner, and asks the user if they want to play again. If the user enters "n", the loop will break and the game will end.

And that's it! With just a few lines of code, we have created a simple rock-paper-scissors game in Rust. We encourage you to play around with the code and add more functionality to make the game more interesting.



