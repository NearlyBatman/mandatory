import React, {Component} from 'react';
import {Router} from '@reach/router';
import Questions from './Questions';
import Question from './Question';

require('dotenv').config();

class App extends Component{
    API_URL = process.env.REACT_APP_TEST;
  constructor(props){
    super(props);
    this.state= {
        questions: []

    };
  }
  componentDidMount() {
      this.getData();
  }
  async getData(){
      const url =`${this.API_URL}/questions`;
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
          questions: data
      })
  }

    async submitQuestion(question){
      console.log(question);
        const url =`${this.API_URL}/addquestion`;
        const response = await fetch(url, {
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
              question: question
          })
      });
      const data = await response.json();
      console.log(data);
    }
  getQuestion(id)
  {
    const question = this.state.questions.find(q=>q._id === id);
    return question;
  }

  async postAnswer(id, text){
      console.log(id, text);
    const url = `${this.API_URL}/questions/${id}/answers`;
      const response = await fetch(url, {
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
                  text: text
          })
      });
      const data = await response.json();
      console.log("Printing the response:", data);
  }
  async useVotes(id, index, input){
    console.log(id, index, input);
    const url = `${this.API_URL}/questions/${id}/votes`;
      const response = await fetch(url, {
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
              index: index,
              input: input
          })
      });
  }
  render(){
    return(
        <>
            <h2>Discout overflow</h2>
          <Router>
              <Questions path="/"
                         data={this.state.questions}
                         submitQuestion={question => this.submitQuestion(question)}
              ></Questions>
              <Question path="/question/:id"
                        getQuestion={id => this.getQuestion(id)}
                        postAnswer={(id,text) => this.postAnswer(id, text)}
                        useVotes={(id, index, input) => this.useVotes(id, index, input)}
              ></Question>
          </Router>
          </>
    )
  }
}

export default App;
