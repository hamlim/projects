### Setting up deployment:

- Builds fail because of the `build-workers` script that expects to be run in a
  monorepo

Need to change the script depending on where its being run from - can probably
configure now to point to a different build command
