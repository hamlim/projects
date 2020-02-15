# `@matthamlin/zaps`

A monorepo toolchain.

## Architecture

### Definitions:

- Project - A collection of workspaces
- Workspace - A node package, identified by a `package.json` file

### Configuration

Workspaces are defined by a `workspaces` key in the project root package.json file (similar to yarn workspaces).

```json
{
  "workspaces": ["packages/*"]
}
```

## TODO:

- `zaps release`
  - Asks for a workspace
  - Runs build
  - Runs tests
  - Publishes
