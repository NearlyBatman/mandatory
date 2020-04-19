import React, {Component} from 'react';
import PostAnswer from "./PostAnswer";

class Question extends Component{

    onVotes(id, input){
        this.props.useVotes(this.props.id, id, input);
    }
    render()
    {
        const id = this.props.id;
        const question = this.props.getQuestion(id);
        let content = "Loading";
        let answers = [];
        //content = question.text;
        if(question){
            content = question.text;
            for(let i = 0; i < question.answers.length; i++){
                answers.push(<li>{question.answers[i].text} {question.answers[i].votes}
                <button onClick={_ => this.onVotes(i,'+')}>+</button>
                        <button onClick={_ => this.onVotes(i,'-')}>-</button></li>
                );
            }
        }

        return(
            <>
                {content}
                <br/>
                <ul>
                    {answers}
                </ul>
                <h3>Post Answer</h3>
                <PostAnswer id={id} postAnswer={(id, text) => this.props.postAnswer(id,text)}/>
            </>
        )
    }
}

export default Question;