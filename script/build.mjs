#!/usr/bin/env zx

import { join } from 'path';

const C = chalk;
const { release } = argv;

const args = [
  release ? 'is_official_build=true' : 'is_debug=true',
  // 'target_cpu="' + machine + '"',
  // 'skia_use_system_expat=false',
  // 'skia_use_system_libjpeg_turbo=false',
  // 'skia_use_system_libpng=false',
  // 'skia_use_system_libwebp=false',
  // 'skia_use_system_zlib=false',
  // 'skia_use_sfntly=false',
  // 'skia_use_freetype=true',
  // 'skia_use_system_freetype2=false',
  // 'skia_use_harfbuzz=true',
  // 'skia_use_system_harfbuzz=false',
  // 'skia_pdf_subset_harfbuzz=true',
  // 'skia_use_icu=true',
  // 'skia_use_system_icu=false',
  // 'skia_enable_skshaper=true',
  // 'skia_enable_svg=true',
  // 'skia_enable_skottie=true',
  'cc="emcc"',
  'cxx="emcc"',
  'ar="emar"',
  // 'skia_use_dng_sdk=false',
  // 'skia_use_libjpeg_turbo_decode=true',
  // 'skia_use_libjpeg_turbo_encode=false',
  // 'skia_use_libpng_decode=true',
  // 'skia_use_libpng_encode=false',
  // 'skia_use_libwebp_decode=true',
  // 'skia_use_libwebp_encode=false',
  // 'skia_use_wuffs=true',
  // 'skia_use_lua=false',
  // 'skia_use_piex=false',
  // 'skia_use_system_libpng=false',
  // 'skia_use_system_freetype2=false',
  // 'skia_use_system_libjpeg_turbo=false',
  // 'skia_use_system_libwebp=false',
  // 'skia_enable_tools=false',
  // 'skia_enable_fontmgr_custom_directory=false',
  // 'skia_enable_fontmgr_custom_embedded=true',
  // 'skia_enable_fontmgr_custom_empty=false',
].join(' ');

console.log(C`{bold.yellowBright Building}`);

cd('./third_party/skia');

const out = `out/${release ? 'release' : 'debug'}-wasm`;
await $`bin/gn gen ${out} --args=${args}`;
await $`ninja -C ${out} skia modules`

console.log(C`{bold.whiteBright Done}`);
