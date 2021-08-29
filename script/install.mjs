#!/usr/bin/env zx

await $`brew updatge && brew install emscripten binaryen llvm nodejs`
await $`echo "BINARYEN_ROOT = '/usr/local'" >> ~/.emscripten`
await $`echo "LLVM_ROOT = '/opt/homebrew/opt/llvm/bin'" >> ~/.emscripten`
await $`echo "NODE_JS = '/opt/homebrew/bin/node'" >> ~/.emscripten`