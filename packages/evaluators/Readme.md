# Evaluator package

As evaluation of questions is carried out both in front-end  and  back-end, this is abstracted away into a single packge @edulastic-poc/evaluators. This package will hold the evaluation of all question types - some question types even share the logic.

## Evalutor method :

```

const evaluator= ({userResponse, validation}) => {

    /**************************************
    *  e v a l u a t i o n   l o g i c    *
    * *************************************/
    return {
        score,
       maxScore,
       evaluation
    }
}
```

### params

- userResponse: The response object of the question
- validation: the validation property in questions; usually carries the data for validating the response, score for question etc.

### response

- score: calculated score for that paritcular user-response to that question
- maxScore: max-score attainable in that question
- evaluation: detailed evluation of userReponses. For eg:- mcq evaluation objection `{"0": "false", "1": true}`
