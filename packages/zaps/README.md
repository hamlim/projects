# `@matthamlin/zaps`

> 🚨 This package is a work in progress, it may not work yet

A monorepo toolchain.

## Architecture

### Definitions:

- Project - A collection of workspaces
- Workspace - A node package, identified by a `package.json` file

### Configuration

Workspaces are defined by a `workspaces` key in the project root package.json
file (similar to yarn workspaces).

```json
{
  "workspaces": ["packages/*"]
}
```

## Commands:

- `zaps init`
  - Generates the zaps graph and zaps config file for the repo
- `zaps run`
  - Runs commands within a specified workspace
- `zaps exec`
  - Runs a command across all workspaces
- `zaps add`
  - Adds dependencies to a particular workspace

## TODO:

- `zaps release`
  - Asks for a workspace
  - Runs build
  - Runs tests
  - Publishes
