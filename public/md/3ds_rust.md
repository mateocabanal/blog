---
title: Rust on a 3DS
date: May 2023
---

::title[Rust on the Nintendo 3DS]

Programming custom apps on the 3DS platform can be hard, since it's mostly being written in C/C++. However, we can write apps with Rust, [thanks to the amazing tools provided by the Rust community](https://github.com/Rust3DS). 

#### Dependencies

You must install devkitPro, to get the 3DS's toolchain. Follow the instructions [here](https://devkitpro.org/wiki/Getting_Started)

### Setting up a project

First, we'll initialize the project as usual, by running `cargo new rust_3ds`.
Enter the new directory, and run `cargo add --git https://github.com/Rust3DS/ctru-rs ctru-rs`. This will add a partial std implementation among other things. We must also install `cargo-3ds`, a tool to help build our project for the 3DS. Just run `cargo install --git https://github.com/Rust3DS/cargo-3ds`.

Now that we have our project, we will have to make our first modification. Open up `src/main.rs` and replace the code with: 
```rust
use ctru::prelude::*;

fn main() {
    ctru::use_panic_handler();
    
    //Initialize the controllers
    let gfx = Gfx::new().unwrap();
    let mut hid = Hid::new().unwrap();
    let apt = Apt::new().unwrap()
    
    //Optional => Initializes networking
    let soc = Soc::new().unwrap();

    let _console = Console::new(gfx.top_screen.borrow_mut());

    while apt.main_loop() {
        hid.scan_input();

        if hid.keys_down().contains(KeyPad::A) {
            break;
        }

        gfx.wait_for_vblank();
    }
}
```

To build it, run `cargo 3ds build`. You can move the new `.3dsx` file on to your 3DS and run it via the Homebrew Launcher.

From my experience, I have had errors building bigger projects. To solve this, you must add the following to your `Cargo.toml`
```toml
[profile.dev]
opt-level = 1

[profile.release]
opt-level = 3
lto = true
overflow-checks = false

```
