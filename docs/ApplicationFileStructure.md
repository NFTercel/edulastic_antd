# Application File structure

## Feature First Folder structure
In Application other than the shared resources  , Folders should represent 

- Folder structure should be primarily based of feature rather than type

##### ✔️ Right way
```
├── app.js
├── Assignments
│   ├── components 📁
│   ├── Tests 📁
│   ├── ducks.js 
│   └── index.js
├── index.js
├── Login 📁
├── reducers.js
├── Reports 📁
├── sharedComponents 📁
├── sharedDucks 📁
├── styled 📁
├── themes.js
└── utils
    └── index.js
```
##### ❎ Wrong way
```
├── app.js
├── components 
│   ├── Assignments 📁
│   ├── Login 📁
│   └── Reports 📁
├── index.js
├── tests 
│   ├── Assignments 📁
│   ├── Login 📁
│   └── Reports 📁
└── ...
```

## Shared folders
Folders [**sharedComponents**](#sharedComponents),[**sharedDucks**](#sharedDucks),[**styled**](#styled) are the predefined folders of the application.

Typically resources which are being shared by more than one feature/module, then they are supposed to go into **shared** folders.

### styled
All the styled components with no (other than style related) logic should go here.

## sharedComponents
All the components which is being used in **more than one** feature should go here

## sharedDucks
All the [ducks files](redux.md) which is being shared by more than one feature should go here

## about index.js
index.js should be available only in folders containing more than one files (excluding the index.js file) or a folder
