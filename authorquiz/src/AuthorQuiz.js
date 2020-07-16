import React from 'react';
import './AuthorQuiz.css';
import './bootstrap.min.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>
          Select the book written by the author shown
        </p>

      </div>
      
    </div>
  );
}

function Book({title, highlight, onClick}) {
  
  return (
    <div className="answer" onClick={() => {onClick(title);}} style={{backgroundColor: '#cce7ff'}}>
      <h4>{title}</h4>
    </div>
  );
}

function Turn({author, books, highlight, onAnswerSelected}) {
  function highlightBgColor(highlight) {
    const mapping = {
      'none' : '',
      'correct': 'green',
      'incorrect': 'red'
    }
    return mapping[highlight];
  }
  return (
    <div className="row turn" style={{backgroundColor: highlightBgColor(highlight)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="author-image" alt="Author"></img>
      </div>
      <div className="col-6">
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}/>)}
      </div>
    </div>

  );
}

function Continue({ show, onContinue }) {
  return (
    <div>
      {show ? <div>
        <button type="button" onClick={onContinue}>Continue</button>
      </div>      
      : null } 
    </div>
  );
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p>All Images are from </p>
      </div>
    </div>
  );
}

function mapStateToprops(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: (answer) => {
      dispatch({ type: 'ANSWER_SELECTED', answer});
    },
    onContinue: () => {
      dispatch ({ type: 'CONTINUE'});
    }
  };
}
const AuthorQuiz = connect(mapStateToprops, mapDispatchToProps)(
   function ({turnData, highlight, onAnswerSelected, onContinue}) {
      return (
        <div className="container-fluid">
          <Hero />
          <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
          <Continue show={highlight === 'correct'} onContinue={onContinue}/>
          <p><Link to="/addAuthor">Add Author</Link></p>
          <Footer />
        </div>
      );
    }
)

// function AuthorQuiz({turnData, highlight, onAnswerSelected, onContinue}) {
//   return (
//     <div className="container-fluid">
//       <Hero />
//       <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
//       <Continue show={highlight === 'correct'} onContinue={onContinue}/>
//       <p><Link to="/addAuthor">Add Author</Link></p>
//       <Footer />
//     </div>
//   );
// }

export default AuthorQuiz;
