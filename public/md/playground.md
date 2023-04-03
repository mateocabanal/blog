---
title: Rust Jupyter Export Test
date: Mar 2023
---


### Playground

First example is just a variable...


```Rust
let x = 5;
println!("{}", x);
```

    5


Using `evcxr_input` crate to handle input 😯


```Rust
:dep evcxr_input
let name = evcxr_input::get_string("Name? ");
println!("Hello, {}", name);
```

    Name?  mateo


    Hello, mateo


### No way this works... right?

Well it does. Try it out


```Rust
:dep evcxr_input
:dep rand

use rand::Rng;

struct RPS {
    points: u16,
    user_choice: String,
    computer_choice: String,
}

impl RPS {
    pub fn new() -> RPS {
        RPS { points: 0, user_choice: String::new(), computer_choice: String::new() }
    }
    
    fn get_user_choice(&mut self) {
        self.user_choice = evcxr_input::get_string("Enter your choice (rock, paper, or scissors): ");
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

let mut game = RPS::new();
loop {
        game.get_user_choice();
        game.get_computer_choice();
        game.determine_winner();

        let play_again = evcxr_input::get_string("Play again?");
        if play_again.trim() != "y" {
            break;
        }
}
```

    Enter your choice (rock, paper, or scissors) rock


    Computer chose: paper
    Computer wins!


    Play again? y
    Enter your choice (rock, paper, or scissors) scissors


    Computer chose: rock
    Computer wins!


    Play again? nah





    ()


