#!/usr/bin/env zx

// Inspired from https://github.com/JetBrains/skia-pack

import { join, relative } from 'path';
import { existsSync } from 'fs';

const { chrome } = argv;
const C = chalk;

if (!/\d./.test(chrome)) {
  console.log(C`{bold.redBright Error:} Chrome version not found`);
  process.exit(1);
}

const branch = `chrome/m${chrome}`;

console.log(C`{bold.whiteBright Preparing with}: ${branch}`);

await $`mkdir -p third_party`;

if (!existsSync('./third_party/depot_tools')) {
  await nothrow(
    $`git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git ./third_party/depot_tools`
  );
}

cd('./third_party');

if (!existsSync('./third_party/skia')) {
  console.log(C`{bold.whiteBright Cloning}`);
  $`git clone https://skia.googlesource.com/skia --quiet --branch ${branch} skia`;
} else {
  cd('./third_party/skia');

  const { stdout } = await $`git branch --list ${branch}`;
  if (stdout) {
    console.log(C`{bold.whiteBright Advancing ${branch}}`);
    await $`git checkout -B ${branch}`;
    await $`git fetch`;
    await $`git reset --hard origin/${branch}`;
  } else {
    console.log(C`{bold.whiteBright Fetching ${branch}}`);
    await $`git reset --hard`;
    await $`git fetch origin ${branch}:remotes/origin ${branch}`;
    await $`git checkout ${branch}`;
  }
}

cd('./third_party/skia');
await $`python2 tools/git-sync-deps`;

console.log(C`{bold.whiteBright Done}`);
