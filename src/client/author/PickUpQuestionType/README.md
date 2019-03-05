# File structure

    ├── components
        ├── Container
            ├── Container.js
            └── styled.js
        ├── Header
            ├──Header.js
            └── styled.js
        ├── SourceModal
            ├── QuestionTypes.js
            └── constants.js
        ├── Card
            └── Card.js
    ├── index.js
    └──README

### Components relationship

In the root components folder (`PickUpQuestionType/components`) we have:

- Container the main entry point to the component,
- Card render Map of Questions
- QuestionType has its own file constants.js witch have all settings for questions

### Routes

- `author/items/{id}/pickup-questiontype`
