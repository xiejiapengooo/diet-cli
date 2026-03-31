diet-cli
=================

daily diet record


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/diet-cli.svg)](https://npmjs.org/package/diet-cli)
[![Downloads/week](https://img.shields.io/npm/dw/diet-cli.svg)](https://npmjs.org/package/diet-cli)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g diet-cli
$ diet COMMAND
running command...
$ diet (--version)
diet-cli/0.0.0 darwin-arm64 node-v22.18.0
$ diet --help [COMMAND]
USAGE
  $ diet COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`diet hello PERSON`](#diet-hello-person)
* [`diet hello world`](#diet-hello-world)
* [`diet help [COMMAND]`](#diet-help-command)
* [`diet plugins`](#diet-plugins)
* [`diet plugins add PLUGIN`](#diet-plugins-add-plugin)
* [`diet plugins:inspect PLUGIN...`](#diet-pluginsinspect-plugin)
* [`diet plugins install PLUGIN`](#diet-plugins-install-plugin)
* [`diet plugins link PATH`](#diet-plugins-link-path)
* [`diet plugins remove [PLUGIN]`](#diet-plugins-remove-plugin)
* [`diet plugins reset`](#diet-plugins-reset)
* [`diet plugins uninstall [PLUGIN]`](#diet-plugins-uninstall-plugin)
* [`diet plugins unlink [PLUGIN]`](#diet-plugins-unlink-plugin)
* [`diet plugins update`](#diet-plugins-update)

## `diet hello PERSON`

Say hello

```
USAGE
  $ diet hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ diet hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/Code/diet-cli/blob/v0.0.0/src/commands/hello/index.ts)_

## `diet hello world`

Say hello world

```
USAGE
  $ diet hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ diet hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/Code/diet-cli/blob/v0.0.0/src/commands/hello/world.ts)_

## `diet help [COMMAND]`

Display help for diet.

```
USAGE
  $ diet help [COMMAND...] [-n]

ARGUMENTS
  [COMMAND...]  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for diet.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/6.2.41/src/commands/help.ts)_

## `diet plugins`

List installed plugins.

```
USAGE
  $ diet plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ diet plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.59/src/commands/plugins/index.ts)_

## `diet plugins add PLUGIN`

Installs a plugin into diet.

```
USAGE
  $ diet plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into diet.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the DIET_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the DIET_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ diet plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ diet plugins add myplugin

  Install a plugin from a github url.

    $ diet plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ diet plugins add someuser/someplugin
```

## `diet plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ diet plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ diet plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.59/src/commands/plugins/inspect.ts)_

## `diet plugins install PLUGIN`

Installs a plugin into diet.

```
USAGE
  $ diet plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into diet.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the DIET_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the DIET_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ diet plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ diet plugins install myplugin

  Install a plugin from a github url.

    $ diet plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ diet plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.59/src/commands/plugins/install.ts)_

## `diet plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ diet plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ diet plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.59/src/commands/plugins/link.ts)_

## `diet plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ diet plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ diet plugins unlink
  $ diet plugins remove

EXAMPLES
  $ diet plugins remove myplugin
```

## `diet plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ diet plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.59/src/commands/plugins/reset.ts)_

## `diet plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ diet plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ diet plugins unlink
  $ diet plugins remove

EXAMPLES
  $ diet plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.59/src/commands/plugins/uninstall.ts)_

## `diet plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ diet plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  [PLUGIN...]  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ diet plugins unlink
  $ diet plugins remove

EXAMPLES
  $ diet plugins unlink myplugin
```

## `diet plugins update`

Update installed plugins.

```
USAGE
  $ diet plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/5.4.59/src/commands/plugins/update.ts)_
<!-- commandsstop -->
