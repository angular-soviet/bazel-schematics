# http_archive(
#     name = "build_bazel_rules_typescript",
#     url = "https://github.com/bazelbuild/rules_typescript/archive/0.20.3.zip",
#     strip_prefix = "rules_typescript-0.20.3",
# )
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
http_archive(
    name = "io_bazel_rules_go",
    urls = ["https://github.com/bazelbuild/rules_go/releases/download/0.16.3/rules_go-0.16.3.tar.gz"],
    sha256 = "b7a62250a3a73277ade0ce306d22f122365b513f5402222403e507f2f997d421",
)
http_archive(
    name = "bazel_gazelle",
    urls = ["https://github.com/bazelbuild/bazel-gazelle/releases/download/0.15.0/bazel-gazelle-0.15.0.tar.gz"],
    sha256 = "6e875ab4b6bf64a38c352887760f21203ab054676d9c1b274963907e0768740d",
)
load("@io_bazel_rules_go//go:def.bzl", "go_rules_dependencies", "go_register_toolchains")
go_rules_dependencies()
go_register_toolchains()
load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies")
gazelle_dependencies()

# http_archive(
#     name = "build_bazel_rules_typescript",
#     url = "https://github.com/bazelbuild/rules_typescript/archive/0.20.3.zip",
#     strip_prefix = "rules_typescript-0.20.3",
# )
# git_repository(
#     name = "build_bazel_rules_nodejs",
#     remote = "https://github.com/bazelbuild/rules_nodejs.git",
#     tag = "0.11.3", # check for the latest tag when you install
# )

# load("@bazel_gazelle//:def.bzl", "gazelle")
# gazelle(
#   name = "gazelle",
#   prefix = "github.com/bazelbuild/rules_typescript",
# )
# gazelle(
#   name = "gazelle",
#   prefix = "github.com/bazelbuild/rules_nodejs"
# )

http_archive(
    name = "build_bazel_rules_typescript",
    url = "https://github.com/bazelbuild/rules_typescript/archive/0.20.3.zip",
    strip_prefix = "rules_typescript-0.20.3",
)
git_repository(
    name = "build_bazel_rules_nodejs",
    remote = "https://github.com/bazelbuild/rules_nodejs.git",
    tag = "0.16.3"
)

BAZEL_BUILDTOOLS_VERSION = "49a6c199e3fbf5d94534b2771868677d3f9c6de9"

http_archive(
    name = "com_github_bazelbuild_buildtools",
    url = "https://github.com/bazelbuild/buildtools/archive/%s.zip" % BAZEL_BUILDTOOLS_VERSION,
    strip_prefix = "buildtools-%s" % BAZEL_BUILDTOOLS_VERSION,
    sha256 = "edf39af5fc257521e4af4c40829fffe8fba6d0ebff9f4dd69a6f8f1223ae047b",
)

# The @angular repo contains rule for building Angular applications
http_archive(
    name = "angular",
    url = "https://github.com/angular/angular/archive/2546c663769cdb8ba0b3979bb157fe58770f4325.zip",
    strip_prefix = "angular-2546c663769cdb8ba0b3979bb157fe58770f4325",
    #sha256 = "5ac6694f7c694afe34767aff4a0dd0408e25b0493cea675c2bb075c123adc46a",
)

# The @rxjs repo contains targets for building rxjs with bazel
local_repository(
    name = "rxjs",
    path = "node_modules/rxjs/src",
)

# Fetch transitive Bazel dependencies of build_bazel_rules_typescript
# gazelle:prefix github.com/bazelbuild/rules_typescript
load("@build_bazel_rules_typescript//:package.bzl", "rules_typescript_dependencies")
rules_typescript_dependencies()

# Fetch transitive Bazel dependencies of angular
load("@angular//packages/bazel:package.bzl", "rules_angular_dependencies")
rules_angular_dependencies()

# Fetch transitive Bazel dependencies of build_bazel_rules_nodejs
# gazelle:prefix github.com/bazelbuild/rules_nodejs
load("@build_bazel_rules_nodejs//:package.bzl", "rules_nodejs_dependencies")
rules_nodejs_dependencies()

# Setup TypeScript toolchain
load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")
ts_setup_workspace()

# Setup Angular toolchain
load("@angular//:index.bzl", "ng_setup_workspace")
ng_setup_workspace()

# In Bazel 0.18, we can use .bazelignore to stop seeing things in node_modules
# for now this lets us ignore things in @angular-devkit
local_repository(
    name = "ignore_rxjs1",
    path = "node_modules/@angular-devkit/core/node_modules/rxjs/src",
)
local_repository(
    name = "ignore_rxjs2",
    path = "node_modules/@angular-devkit/architect/node_modules/rxjs/src",
)

# Setup the NodeJS toolchain

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories", "yarn_install")
 

node_repositories(package_json = ["//:package.json"])


# Setup Bazel managed npm dependencies with the `yarn_install` rule.
# The name of this rule should be set to `npm` so that `ts_library` and `ts_web_test_suite`
# can find your npm dependencies by default in the `@npm` workspace. You may
# also use the `npm_install` rule with a `package-lock.json` file if you prefer.
# See https://github.com/bazelbuild/rules_nodejs#dependencies for more info.

yarn_install(
  name = "npm",
  package_json = "//:package.json",
  yarn_lock = "//:yarn.lock",
)
 

# Setup Go toolchain
load("@io_bazel_rules_go//go:def.bzl", "go_rules_dependencies", "go_register_toolchains")
go_rules_dependencies()
go_register_toolchains()

# Setup web testing, choose browsers we can test on
load("@io_bazel_rules_webtesting//web:repositories.bzl", "browser_repositories", "web_test_repositories")

web_test_repositories()
browser_repositories(
    chromium = True,
)
