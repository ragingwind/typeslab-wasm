# typeslab-wasm

## Setup

### Install emscripten via brew

```
brew install emscripten binaryen llvm nodejs
echo "BINARYEN_ROOT = '/usr/local'" >> ~/.emscripten
echo "LLVM_ROOT = '/opt/homebrew/opt/llvm/bin'" >> ~/.emscripten
echo "NODE_JS = '/opt/homebrew/bin/node'" >> ~/.emscripten
```