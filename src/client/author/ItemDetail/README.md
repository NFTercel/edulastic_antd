# File structure

    ├── components
        ├── ItemDetailRow
            ├── index.js
            ├──components
               └── ...other
        ├── ItemHeader
            ├──ItemHeader.js
            └── styled.js
        ├── Container
            ├──Container
               ├──Container.js
               └── styled.js
        ├── SettingsBar
            ├── index.js
            ├──components
               └── ...other
    ├── ducks.js
    ├── index.js
    └──README

### Components relationship

In the root components folder (`ItemDetail/components`) we have:

- Container the main entry point to the component,
- ItemHeader component top menu header
- SettingsBar component render view settings
- Has it's own ducks.js file which include new reducer `itemDetail`

### Routes

- `/author/items/{id}/item-detail`
