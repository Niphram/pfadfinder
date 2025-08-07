# The Big Refactoring

I've finally gotten around to completely rebuilding the entire data-layer of this app.
This will allow me to develop new features way easier.

To show you the size of this change:

- The entire project is not finally migrated to Svelte5
- 138 changed files (I've basically touched most of the files of the entire project)
- +3143/-2774 changes lines of code

I've also fixed an annoying bug with the sortable lists in the app (no more weird duplications!)

In the best case, nobody should even notice any changes. The savedata-format is exactly the same as before.
