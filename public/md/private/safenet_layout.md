---
title: Safenet Layout
date: July 2023
---

::title[Safenet Layout]

### Initializing peer connection

#### Client Code

- Grab own ECDSA public key 
- Generate new ECDH keypair
- Sign ECDH public key
- Send ECDSA + ECDH public keys

### Frame Layout V2

```rust
struct InitFrame {
    id: [u8; 3],
    uuid: [u8; 16],
    options_len: [u8; 4], // Option lentgh is a u32 value
    // NOTE: Anything underneath will be part of the body
    options: &[u8],
    ecdsa_pub_key: [u8; 48],
}

struct DataFrame {
    id: [u8; 3], // Should be moved in options, to allow dynamic sized id's
    uuid: [u8; 16],
    options_len: [u8; 4],
    body: Vec<u8> // Options will be inserted in the body, before the actual body bytes
```

### Options

```rust
struct Options {
    frame_type: FrameType,
    ip_addr: SocketAddr,
}
```
