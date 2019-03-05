# File/Folder Structure 

```
     cypress
        ├── e2e
        │   ├── framework
        │   │   ├── author
        │   │   │   └── itemList
        │   │   │       ├── itemDetail
        │   │   │       │   ├── editPage.js
        │   │   │       │   ├── header.js
        │   │   │       │   ├── metadataPage.js
        │   │   │       │   └── previewPage.js
        │   │   │       ├── itemListPage.js
        │   │   │       └── questionType
        │   │   │           ├── common
        │   │   │           │   └── editToolBar.js
        │   │   │           └── mcq
        │   │   │               └── mcqStandardPage.js
        │   │   └── student
        │   │
        │   └── suites
        │       ├── author
        │       │   └── questionAuthoring
        │       │       └── mcq
        │       │            └── mcqStandard.spec.js
        │       └── student
        │
        ├── fixtures
        │   └── assignments.json
        ├── plugins
        │   └── index.js
        └── support
                ├── commands.js
                └── index.js

```

At root level we have following folders - 

- **e2e**: contains the page objects and spec files.
    - **framework**: constains all page objects, organized seperately at author/student level in respective folders.
    - **suites**: constains all test spec files, organized seperately at author/student level in respective folders.
        
- **fixtures**: contains the static test data.

- **support**: contains all support files.Cypress includes the support file cypress/support/index.js by default and it runs before every single spec file,so here we can put all reusable Custom Commands (commands.js) or global overrides that we want use across the spec files.Just put the new support files(if any) into support folder and import into index.js.

- **plugins**: contains plugins(if any).

## Rules:

- Cypress tests should follow [page object design pattern](https://medium.com/reactbrasil/deep-diving-pageobject-pattern-and-using-it-with-cypress-e60b9d7d0d91).
- There shouldn't be any dependencies between **spec files** however there could be an external dependencies.
- Try to avoid dependecies between the tests inside a spec.
- Spec files should follow *.spec.js as naming convention and similarly pageObject files should follow *Page.js as naming convention.
- Use [Cypress best practices](https://docs.cypress.io/guides/references/best-practices.html) and avoid anti- patterns.
- Description of automated tests should be mapped with the test case id to identify the tests easily.For eg:
        describe('Author - "Multiple choice - block layout" type question', () => { ...
          context('User creates question.', () => { ...
            it('[Tc_301]:test => Enter question text', () => { ...
            
            ...})
          })
        })

        Report logs will look like below:

        Author - "Multiple choice - block layout" type question
            User creates question.
                ✓ [Tc_301]:test => Enter question text
