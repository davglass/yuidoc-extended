Extending YUIDoc
================

A simple use case you make a custom YUIDoc install for yourself and your docs.

Running this example
--------------------

```
npm install
cd test
../bin/cli.js ./lib/ --themedir ./theme
```

You can even hard code the themedir option into the `cli.js` to make sure your theme
is always used.

Usage
-----

This example creates a simple CLI tool that is an override for the default YUIDoc CLI.
Instead of processing the code inline, it adds a `Digester` to handle a custom tag.

See `./bin/cli.js` for the override.

Parser
------

The parser will automatically parse and store any `@tag` that you place in your docs.
It defaults to providing the content of the tag passed:

```
@foo This is a test
```

You can access this from the template with `{{foo}}` and it will render it.

See `./test/theme/partials/classes.handlebars` for usage.

Digesters
---------

These are more complicated, they take a tag and create a different data structure around it.
You have to add them to the `DocParser` class in order for them to be used.

Theme
-----

The docs for this is on the main (http://yui.github.io/yuidoc/themes/index.html#overriding-a-partiallayout)[YUIDoc page].

