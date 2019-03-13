# Project Structure

```
        ├── App.js
        ├── assessment 📁 ⭐️
        ├── author 📁 ⭐️
        ├── configureStore.js
        ├── index.css
        ├── index.js
        ├── public 📁
        ├── reducers.js
        ├── sagas.js
        ├── student 📁 ⭐️
        └── __test__ 📁

```

📁 - folders
⭐️ - application folders

At the root level (at `src/client`), project will have 3 applications:

- **student**: contains the student part of the app
- **author**: cotains the teacher/author part of the app
- **assessment**: contains assessment player, questions and other components related to rendering the forementioned.

### Rules:

- **assessment** is required by both **author** and **student**
- **student** and **author** should be treated as separate applications. They must be isolated completely from each other
- There mustn't be any dependency between **student** and **author**. Although there could be a common external dependencies for them.

[See the guidelines on File structure inside each application](ApplicationFileStructure.md)
