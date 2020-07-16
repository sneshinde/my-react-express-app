import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthorForm from './AuthorForm';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

const authors = [
    {
        name: 'Mark Tawin',
        imageUrl: 'images/Mark.jpeg',
        imageSource: 'Wikimedia',
        books: ['The Adventures of Huckleberry Finn']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/Joseph.jpeg',
        imageSource: 'Wikimedia',
        books: ['Heart of Darkness']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/William.jpeg',
        imageSource: 'Wikimedia',
        books: ['Hamlet',
                'Romeo and Juliet',
                'Macbeth']
    },
    {
        name: 'Charles Dicken',
        imageUrl: 'images/charles.jpg',
        imageSource: 'Wikimedia',
        books: ['David Copperfield',
                'A tale of two cities']
    }
];

function getTurnData(authors) {
    const allBooks = authors.reduce((p, c, i) => {
        return p.concat(c.books);
    }, []);

    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author)=>
            author.books.some((title)=>
                title === answer))
            
        
    }
}
// function reset(){
//     return {
//         turnData: getTurnData(authors),
//         highlight: ''
//     };
// }
// let state = reset();
function reducer(state={ authors, turnData: getTurnData(authors), highlight: ''}, action) {
    switch(action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({}, state, {
                highlight: isCorrect ? 'correct' : 'incorrect'
            });

        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight: '',
                turnData: getTurnData(state.authors)
            });
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {
                authors: state.authors.concat([action.author])
            });
        default: return state;
    }
}
let store = Redux.createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
// function onAnswerSelected (answer) {
//     let isCorrect = state.turnData.author.books.some((book) => { 
//         return book === answer;
//     });
//     state.highlight = isCorrect ? 'correct' : 'incorrect';
//     render();
// }
// function App() {
//     return <ReactRedux.Provider store={store}>
//         <AuthorQuiz></AuthorQuiz>
//         {/* <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} onContinue={()=>{
//         state = reset();
//         render();
//     }}/>; */}
//     </ReactRedux.Provider>
// }
// function AuthorWrapper() {
//     return <AuthorForm onAddAuthor={console.log}></AuthorForm>
// }
// const AuthorWrapper = withRouter(( {history} ) => 
//     <AuthorForm onAddAuthor={(author) => {
//         authors.push(author);
//         history.push('/');
//     }} />

// );

// function render() {
    // ReactDOM.render(<BrowserRouter>
    //     <Route exact path="/" component={App} ></Route>
    //     <Route path="/addAuthor" component={AuthorWrapper} ></Route>
    // </BrowserRouter>, document.getElementById('root'));
// }

ReactDOM.render(<BrowserRouter>
<ReactRedux.Provider store={store}>
    <Route exact path="/" component={AuthorQuiz} ></Route>
    <Route path="/addAuthor" component={AuthorForm} ></Route>
    </ReactRedux.Provider>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// render();
serviceWorker.unregister();
