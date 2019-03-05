# File structure
    ├── components
        ├── AddItems
            ├── index.js
            └── ducks.js
        ├── Assign
            ├──components
               ├──Container
                  ├──Container.js
                  └── styled.js
               ├──...ComponentName
                  ├──ComponentName.js
                  └── styled.js
            ├── index.js
            └── ducks.js
        ├── common
            └── ...other
        ├── Container
            ├──components
               ├──Container
                  ├──Container.js
                  └── styled.js
               ├──...ComponentName
                  ├──ComponentName.js
                  └── styled.js
            ├── index.js
            └──  ducks.js
        ├── Review
            ├──components
               ├──Container
                  ├──Container.js
                  └── styled.js
               ├──...ComponentName
                  ├──ComponentName.js
                  └── styled.js
            ├── index.js
            └──  ducks.js
        ├── Setting
              ├──components
                 ├──Container
                    ├──Container.js
                    └── styled.js
                 ├──...ComponentName
                    ├──ComponentName.js
                    └── styled.js
              ├── index.js
              └──  ducks.js
        ├── Summary
             ├──components
                 ├──Container
                    ├──Container.js
                    └── styled.js
                 ├──...ComponentName
                    ├──ComponentName.js
                    └── styled.js
                ├── index.js
                └──  ducks.js
        └── ...other
    ├── ducks.js
    ├── index.js
    └──README
    
### Components relationship
In the root components folder (`TestPage/components`) we have:
- Container the main entry point to the component,
- AddItems component (`default render`) 
    - has it's own ducks.js file which include new reducer `testsAddItems` 
- Assign component (`render when user click on Assign tab`)
    - has it's own ducks.js file which include new reducer `testsAssign` 
- Review component (`render when user click on Review tab`)
    - has it's own ducks.js file which connect to `test` reducer (`TestPage/ducks.js`) 
- Setting component (`render when user click on Setting tab`)
    - has it's own ducks.js file which connect to `test` reducer (`TestPage/ducks.js`) 
- Summary component (`render when user click on Summary tab`)
    - has it's own ducks.js file which connect to `test` reducer (`TestPage/ducks.js`) 

### Routes

- `/author/tests/create`

