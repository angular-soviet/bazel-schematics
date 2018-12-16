# Bazel Schematics

## Set up

### Install bazel

```bash
brew install bazel
```

### Install dependencies

> Note: currently only works with yarn.

```bash
yarn install
```

Execute this before the first run.

```bash
yarn run prerun
```

### Running the dev server

This single command starts the following components and watches for changes:

* Schematics Compiler
* Schematics Runner
* Bazel Runner

```bash
yarn start
```

## Useful links

### Angular Schematics

#### Create schematics
https://medium.com/@jorgeucano/your-fist-angular-schematics-f711d70cb37c

#### Angular devkit schematics
https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/schematics

#### Schematics utilities
https://nitayneeman.github.io/schematics-utilities

#### Configuring Schematics
https://medium.com/rocket-fuel/angular-schematics-simple-schematic-76be2aa72850

### Bazel

#### TypeScript Rules for Bazel
https://www.youtube.com/watch?v=Qb3tykleV_g
https://github.com/bazelbuild/rules_typescript
https://github.com/alexeagle/angular-bazel-example/wiki/TypeScript-rules

#### Bazel and package.json dependencies
https://github.com/bazelbuild/rules_nodejs

#### Angular with Bazel example
https://github.com/alexeagle/angular-bazel-example/tree/cli

### TypeScript

#### Using TypeScript Compiler API
https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API

#### TypeScript parser
https://babeljs.io/docs/en/babel-parser
