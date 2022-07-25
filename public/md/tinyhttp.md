---
title: Tinyhttp
date: June 2022
---

::title[tinyhttp, a small http library made by me]

::link-at-top[Crates.io]{#https://crates.io/crates/tinyhttp}

::link-at-top[Github.com]{#https://github.com/mateocabanal/tinyhttp}


I wrote a HTTP library as a project to help learn Rust. It uses a procedural macro crate under the hood. Procedural macros in Rust are extremely powerful.

They allow for clean, good looking code like:

```rust
use std::net::TcpListener;
use tinyhttp::prelude::*;

#[get("/")]
fn get(_req: Request) -> &'static str {
 "Hello, World!"
}

fn main() {
  let socket = TcpListener::bind(":::80").unwrap();
  let routes = Routes::new(vec![get(), post()]);
  let config = Config::new().routes(routes);
  let http = HttpListener::new(socket, config);

  http.start();
}
```

The `#[get("/")]` allows you to minipulate the tokenization process at compile-time, proving to be a powerful tool.

It goes from:

```rust
#[get("/")]
fn get(_req: Request) -> &'static str {
 "Hello, World!"
}
```

Into:

```rust+close
fn get() -> Box<Route> {
#[allow(non_camel_case_types)]
    struct route {
        path: &'static str,
        method: Method,
        wildcard: Option<String>,
    }
    #[automatically_derived]
    #[allow(unused_qualifications)]
    #[allow(non_camel_case_types)]
    impl ::core::clone::Clone for route {
        #[inline]
        fn clone(&self) -> route {
            match *self {
                route {
                    path: ref __self_0_0,
                    method: ref __self_0_1,
                    wildcard: ref __self_0_2,
                } => route {
                    path: ::core::clone::Clone::clone(&(*__self_0_0)),
                    method: ::core::clone::Clone::clone(&(*__self_0_1)),
                    wildcard: ::core::clone::Clone::clone(&(*__self_0_2)),
                },
            }
        }
    }
    impl route {
        fn new() -> Self {
            route {
                path: "/".into(),
                method: Method::GET,
                wildcard: None,
            }
        }
    }
    impl Default for route {
        fn default() -> route {
            route {
                path: "/".into(),
                method: Method::GET,
                wildcard: None,
            }
        }
    }
    impl Route for route {
        fn get_path(&self) -> &str {
            self.path
        }
        fn get_method(&self) -> Method {
            self.method
        }
        fn get_body(&self) -> fn(Request) -> Vec<u8> {
            fn body(_req: Request) -> Vec<u8> {
                { "root path" }.into()
            };
            body
        }
        fn post_body(&self) -> fn(Request) -> Vec<u8> {
            fn panic(body: Request) -> Vec<u8> {
                {
                    ::std::rt::begin_panic("NOT A POST ROUTE")
                };
            };
            panic
        }
        fn wildcard(&self) -> Option<String> {
            self.wildcard.clone()
        }
    }
    Box::new(route::new())
}
```
### Performance

I haven't been able to test with two proper desktops, however with my i7-4770k as a client and my Raspberry Pi 4 as the server, the Raspberry Pi 4 was able to handle around 15000 req/s.