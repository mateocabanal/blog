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

### Body Format

To initialize connections, I will be using HTTP to set things up.
I'll be utilizing my own HTTP server library, [tinyhttp](https://github.com/mateocabanal/tinyhttp) to make the API routes.
However, after we have initialized the connection, we will stop using HTTP and create my own format. It will be loosely based off HTTP/2 frames.


##### Data Frame

```rust
struct DataFrame {
  id: u32, // use `from_be_bytes()` to get into array of 4 u8's
  len: u32,
  frame_type: u8,
  body: Vec<u8> 
}
```
The `id` field will be a serialized string, which we can deserialize by getting an array of `[u8: 4]`, which is an array of 4 u8's. Then, we can convert the array into a `String` using `String::from_utf8()`.
