# File structure
    ├── components
        ├── Container
           ├── Container.js
           └── styled.js
        ├── Item
            ├── Item.js
            └── styled.js
        ├── ItemFilter
            ├──ItemFilter.js
            └── styled.js
        ├── Search
            ├── Search.js
            └── styled.js
    ├── index.js
    └── README
    
### Components relationship
In the root components folder (`ItemList/components`) we have:
- Container the main entry point to the component
- Item component which render single item in Container (`ItemList/components/container`) 
- ItemFilter component which render filter wrapper of Search component
- Search component which renders filter value  

### Routes

- `/author/items`

