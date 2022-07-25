---
title: Tiny Binaries
date: September 2020
---

::title[Making tiny binaries with TCC]

Tiny C Compiler, also known as TCC, is a small C compiler (hence, the name) that also outputs teeny, tiny binaries.

_To install on linux, use:
`sudo apt install tcc`_

TCC uses a lot of size optimization flags by default. However, we can shrink the binary even more.

`tcc -Os -m32 -ffunction-sections -fdata-sections`

**-Os tells TCC to optimize for file size, rather then performance.**

**-m32 tells TCC to compile for 32-bit, which frees up more space.**

To see how much space we are saving, we will compare TCC to GCC.

Sample code:

```cpp
#include <stdlib.h>
int main() {
  printf("HI!\n");
  return 0;
}
```

Flags:
-m32 -Wall -Os -ffunction-sections -fdata-sections

Results:
GCC: 15540 bytes
TCC: 2404 bytes

TCC binaries are small enough to fit into QR codes.
