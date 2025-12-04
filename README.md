# Pfadfinder

Charactersheet for Pathfinder 1st edition.

Under development, no guarantees of stability and data-safety.

## Macros

You can use macros in many fields to automatically calculate values.

Example: You have an ability that allows you to add your wisdom modifier to your initiative.
You can enter the following into the misc-field: `@wis.mod`

Macros also work in most text-fields (descriptions etc.).
Wrap a macro in double curly braces (i.e. `{{ macro }}`). Optionally add formatting options.

Take the spell 'Cure Light Wounds' as an example.

```
When laying your hand upon a living creature, you channel positive energy that cures 1d8{{:+ min(@classes.levels, 5) }} points of damage.
```

### Functionality

Macros currently support the following things:

| Function         | Usage                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| Arithmetic       | `<a> + <b>`, `<a> - <b>`, `<a> * <b>`, `<a> / <b>`                                                       |
| Integer Division | `<a> // <b>` Floors the result of division                                                               |
| Parentheses      | Parentheses will be evaluated in the correct order. `4 / ( 2 + 2 )` = 1                                  |
| Modulo           | `<a> % <b>` ([Wikipedia](https://en.wikipedia.org/wiki/Modulo))                                          |
| Absolute         | `abs(<value>)`                                                                                           |
| Rounding         | `round(<value>)`, `ceil(<value>)`, `floor(<value>)`                                                      |
| Min/Max          | `max(<a>, <b>, ...)`, `min(<a>, <b>, ...)` Takes any number of arguments, calculates the minimum/maximum |
| Clamp            | `clamp(<value>, <min>, <max>)` Clamps `value` between `min` and `max`                                    |
| Step             | `step(<value>, <threshold>)` Is `0` if `value < threshold` and `1` otherwise                             |

### Character Data

Using the `@`-symbol you can reference values of your character. Everything after it will directly index the internal character-structure (see [src/lib/data/character/character.ts](src/lib/data/character/character.ts)).

Examples:

| Target               | Path                    |
| -------------------- | ----------------------- |
| Strength modifier    | `@str.mod`              |
| Maximum HP           | `@hp.max`               |
| Character level      | `@classes.levels`       |
| Level of first class | `@classes.list.0.level` |

### Formatting options

Macros inside text fields can be optionally formatted. The syntax needs to follow `{{:<flags> <macro>}}`

| Flag | Result                                                       |
| ---- | ------------------------------------------------------------ |
| `+`  | Will always display the sign, even if the number is positive |
| `z`  | Don't display anything, if the result is zero                |
