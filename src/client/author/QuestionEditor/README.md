# File structure

    ├── components
        ├── Container
            └── Container.js
        ├── ItemHeader
            ├──ItemHeader.js
            └── styled.js
        ├── common
            └── ...other
        ├── SourceModal
            └──  SourceModal.js
    ├── ducks.js
    ├── index.js
    └──README

### Components relationship

In the root components folder (`QuestionEditor/components`) we have:

- Container the main entry point to the component,
- ItemHeader component render Top Menu
- SourceModal component render Modal Source
- Has it's own ducks.js file which include new reducer `question`

### Routes

- `author/questions/create`
