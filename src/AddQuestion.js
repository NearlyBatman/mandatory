import React, {Component} from 'react';

class AddQuestion extends Component{
    constructor(props){
        super(props);
        this.state = {
            question:""
        }
    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit(){
        this.props.submitQuestion(this.state.question)
    }
    render(){
        return(
            <>
                <input name="question" onChange={event=>this.onChange(event)} type="text"/><br/>
                <button onClick={_=>this.onSubmit()}>Submit</button>
                </>
        )
    }
}
export default AddQuestion;