---
date: March 2023
title: Safenet -> Part One
---

::title[Safenet: Part One]

::link-at-top[GitHub]{#https://github.com/mateocabanal/safenet}

### Introduction

Don't trust the NSA and their "secure" protocols, like TLS? Create your own!
I'll be documenting my steps through the journey of the creation of safenet, an alternative to TLS.
However, I am not creating safenet because of some distrust of the NSA, I'm just bored.

### Flow

```json flow-chart
{
  "nodes": [
    {
      "id": "aStart",
      "position": { "x": 0, "y": 0 },
      "data": { "label": "Alice" },
      "type": "input"
    },
    {
      "id": "aGenECDSA",
      "position": { "x": 0, "y": 75 },
      "data": { "label": "Gen ECDSA keys" }
    },
    {
      "id": "aGenECDH",
      "position": { "x": 0, "y": 150 },
      "data": { "label": "Gen ECDH keys" }
    },
    {
      "id": "aGenSecret",
      "position": { "x": 0, "y": 300 },
      "data": { "label": "Gen shared secret" }
    },
    {
      "id": "aGenAES",
      "position": { "x": 0, "y": 375 },
      "data": { "label": "Use ECDH scret as AES key" }
    },
    {
      "id": "aStartConvo",
      "position": { "x": 0, "y": 450 },
      "data": { "label": "Start AES communication" }
    },

    {
      "id": "bStart",
      "position": { "x": 400, "y": 0 },
      "data": { "label": "Bob" },
      "type": "input"
    },
    {
      "id": "bGenECDSA",
      "position": { "x": 400, "y": 75 },
      "data": { "label": "Gen ECDSA keys" }
    },
    {
      "id": "bGenECDH",
      "position": { "x": 400, "y": 150 },
      "data": { "label": "Gen ECDH keys" }
    },
    {
      "id": "bGenSecret",
      "position": { "x": 400, "y": 300 },
      "data": { "label": "Gen shared secret" }
    },
    {
      "id": "bGenAES",
      "position": { "x": 400, "y": 375 },
      "data": { "label": "Use ECDH scret as AES key" }
    },
    {
      "id": "bStartConvo",
      "position": { "x": 400, "y": 450 },
      "data": { "label": "Start AES communication" }
    }
 
  ],

  "edges": [
    {
      "id": "1",
      "source": "aStart",
      "target": "aGenECDSA",
      "type": "smoothstep",
      "animated": "true"
    },

    {
      "id": "2",
      "source": "bStart",
      "target": "bGenECDSA",
      "type": "smoothstep",
      "animated": "true"
    },

    {
      "id": "3",
      "source": "aGenECDSA",
      "target": "aGenECDH",
      "type": "smoothstep",
      "animated": "true"
    },


    {
      "id": "5",
      "source": "bGenECDSA",
      "target": "bGenECDH",
      "type": "step",
      "animated": "true"
    },
    
    {
      "id": "6",
      "source": "aGenECDH",
      "target": "bGenSecret",
      "type": "straight",
      "label": "Exchange ECDSA-signed ECDH pub keys",
      "animated": "true"
    },

    {
      "id": "7",
      "source": "bGenECDH",
      "target": "aGenSecret",
      "type": "straight",
      "animated": "true"
    }
  ]
}
```

#### Body Format

To initialize connections, I will be using HTTP to set things up.
I'll be utilizing my own HTTP server library, [tinyhttp](https://github.com/mateocabanal/tinyhttp) to make the API routes.
These routes are not HTTP compliant, meaning if you use cURL or your average web browser and point them towards any of these endpoints, it will result in an error.

### HTTP/1.1 API:

For client-side requests, I use [minreq](https://github.com/neonmoe/minreq). As of right now, I have three API routes.

##### GET /keys/pub

**This is the only endpoint that is HTTP compliant!**

Returns server public ECDSA key.

##### POST /conn/init

Takes in a body of bytes formatted like:
```rust
struct Body {
  id: [u8; 3], // a string that consists of 3 bytes, e.g "aaa"
  uuid: [u8; 16], // a uuid
  ecdsa_public_key: [u8; 49], // client's public key to check against client's ECDH key
  ecdh_pub_key: [u8; 49], // client's ECDH public key, which is used to generate shared secret
  ecdh_pub_key_signature: &[u8] // takes the rest of the body, since this is the only variabile with a non-constant size/length
}
```

And returns the same.

##### POST /conn/test

Takes a unique body formatted as so:
```rust
struct Body {
  id: [u8; 3],
  uuid: [u8; 16],
  msg: &[u8] // Encrypted string, represented as bytes
}
```

Returns result of decryption, e.g "200 OK".

### "Safenet API"

I'm still debating whether I should use my existing HTTP library, [tinyhttp](https://github.com/mateocabanal/tinyhttp), or write my own protocol. As of now, I'm leaning towards the former, since I do not have to write a protocol from scrath and I know exactly how my HTTP server will behave. My only concern would be security, however, I only need the status line of the HTTP request to be HTTP compliant. I can have my headers + body encrypted.

##### Data Frame

```rust
struct DataFrame {
  id: u32, // use `from_be_bytes()` to get into array of 4 u8's
  uuid: [u8; 16],
  body: &[u8] // rest of the frame will be the body
}
```
The `id` field will be a serialized string, which we can deserialize by getting an array of `[u8: 3]`, which is an array of 3 u8's. Then, we can convert the array into a `String` using `String::from_utf8()`.

I will use a uuid that is generated at startup, in order to avoid duplicate id's. Due to my current implementation of sorting through peer keys, we cannot use ip's like: `127.0.0.1`/`localhost` or `0.0.0.0`. 

### Usage

Safenet is framework-agnostic, as long as you stay strict to the spec. Specifically, the `/conn/init` must be defined to maintain compatibility.
