# StackOverflow-EDU

**StackOverflow-EDU** ​​is a platform where people can ask questions and provide responses.

## Required Features
1. Users can create an account and log in.
2. Users can post questions.
3. Users can delete the questions they post.
4. Users can post answers 
5. Users can view the answers to questions.
6. User can accept a response out of all the responses to his/her question asthe preferred answer.

## Optional Features
1. Users can upvote or downvote an answer.
2. Users can comment on an answer.
3. User can fetch all questions he/she has ever asked on the platform
4. Users can search for questions on the platform
5. Users can view questions with the most responses.

## Challenge Summary:
You are expected to build a RESTful API with all the endpoints defined below. YourAPI should meet all the requirements listed under the ​​required features​​section and your data should be persisted with a database​​.​​You are to write NoSQL or SQL queriesthat will help you write to and read from your database. The endpoints are to besecured with JWT.

| EndPoint | Functionality | Note |
| ---- | ---- | --- |
| POST /auth/signup | Register a user |  |
| POST /auth/login | Login a user |  |
| GET /questions | Fetch all questions |  |
| GET /questions/\<questionId\> | Fetch a specific question | This should come with all the answers  provided so far for the question. |
| POST /questions | Post a question |  | 
| DELETE /questions/\<questionId\> | Delete a question | This endpoint should be available to the author of the question. | 
| POST /questions/\<questionId\>/answers | Post an answer to a question |  | 
| PUT/questions/\<questionId\>/answers/\<answerId\> | Mark an answer as accepted or update an answer. | This endpoint should be available to only the answer author and question author. The answer author calls the route to update answer while the question author calls the route to accept answer |

## Documentation
* [Requirements Brief](https://docs.google.com/spreadsheets/d/1xiOrxaJkDq69ajgk-xcnYN0-Sq50Bc2hQxxgUJwaNG8/edit#gid=0)