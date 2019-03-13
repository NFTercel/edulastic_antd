# External Modules

> "Perfection is Achieved Not When There Is Nothing More to Add, But When There Is Nothing Left to Take Away"

Bundle size can effect the performance of app. Hence, precaution should be taken to keep the bundle size to minimum. Go frugal on external modules. Also:

- Take advantage of bundler's super power's 💪- like treek shaking 🌴. Instead of importing the entire library, import only what is required. ✂️

  eg:- `import { omit } from 'lodash'`

- Dynamically import big libraries, so that they dont end up in main vendor chunk. :face_with_head_bandage:

Embrace [Bundlephobia](https://bundlephobia.com) 😹, and lets make web fast again! ❤️
