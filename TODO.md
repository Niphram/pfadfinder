# TODO

Not final list, things will definetly change.

- [x] Migrate to Svelte5
  - [x] Update dependencies
  - [x] Migrate components
- [x] ~~Switch to hash-routing, so we can use sveltekit's routing system with parameters in a static webapp~~ Found out about 404.html
- [x] Duplicate all writes into the new database for easy migration later on
- [x] Support for multiple characters
- [ ] Additional storage backends (Maybe?)
  - [x] IndexedDB as main store
  - [ ] Google Drive
    - [ ] MVP: Write backups to GDrive
    - [ ] Full sync
  - [ ] Auto backups using FileSystem API (Maybe, looks like persistent permissions are not a thing anymore?)
- [ ] Write a useful serviceworker to enable offline mode
- [ ] Multiple RPG systems (When that happens, move the entire retro to `mummenschanz`)
