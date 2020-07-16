
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AuthorFormComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageurl: '',
            books: [],
            bookTemp: ''
        };
        this.onFieldChange = this.onFieldChange.bind(this); //value of this in method is same as that of value of this in constructor
        this.handleSumbit = this.handleSumbit.bind(this); 
        this.handleAddBook = this.handleAddBook.bind(this); 
    }
    onFieldChange(event){
        this.setState({
            [event.target.name]: event.target.value,

        });
    }
    handleSumbit(event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }
    handleAddBook(){
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        });
    }
    render() {
        return <form onSubmit={this.handleSumbit}>
            <div>
                <label htmlFor="name">Name</label>
                <input className="AuthorForm" type="text" name="name" value={this.state.name} onChange={this.onFieldChange}></input>
            </div>
            <div>
                <label htmlFor="imageurl">Image Url</label>
                <input className="AuthorForm" type="text" name="imageurl" value={this.state.imageurl} onChange={this.onFieldChange}></input>
            </div>
            <div>
                <label htmlFor="books">Books</label>
                {this.state.books.map((book)=><p key={book}>{book}</p>)}
                <input className="AuthorForm" type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}></input>
                <input type="button" value="+" onClick={this.handleAddBook}></input>
            </div>
            <button type="submit" value="add">Add</button>
        </form>
    }
}

function AuthorForm({ match, onAddAuthor }) {
    return (
        <div>
            <h1>Add Author Component</h1>
            <AuthorFormComp onAddAuthor={onAddAuthor}></AuthorFormComp>
        </div>
    );
}
function mapDispatchToProps(dispatch, props) {
    return {
        onAddAuthor: (author) => {
            dispatch({ type: 'ADD_AUTHOR', author });
            props.history.push('/');
        }
    };
}
export default withRouter(connect(()=>{}, mapDispatchToProps)(AuthorForm));