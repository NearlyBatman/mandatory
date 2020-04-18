import React, {Component} from 'react';
import {Link} from '@reach/router';
import AddQuestion from "./AddQuestion";

class Questions extends Component{
    render()
    {
        const list = this.props.data.map(q => <li>
            <Link to={"/question/"+q._id}>{q.text}</Link>
        </li>);
        return (
            <>
                <ul>
                    {list}
                </ul>
                <h3>Post Question</h3>
                <AddQuestion submitQuestion={question => this.props.submitQuestion(question)}></AddQuestion>
            </>
        )
    }
}
export default Questions;