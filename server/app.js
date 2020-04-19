const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../client/build'));

let Question;
(async _=> {
    try{
        let url = 'mongodb+srv://new-user__31:123321@cluster0-ou0ly.mongodb.net/meh';
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    }
    catch(e){
        console.error(e);
    }
    const questionSchema = new mongoose.Schema({
        text: String,
        answers: [{
            text: String,
            votes: Number
        }]
    });
    Question = mongoose.model('Question', questionSchema);
    console.log('DataBase Connected: ', mongoose.connection.name);
})();

app.get('/api/questions', (req, res) => {
    Question.find({}, (err, questions) => {
        res.json(questions)
    })
    }
);

app.post('/api/addquestion', (req, res) => {
    const text = req.body.question;
    let questHold = new Question({text: text, answers:[]});
    questHold.save();
});

app.post('/api/questions/:id/answers', async (req, res) => {
    let id = req.params.id;
    let text = req.body.text;
    let question = await Question.findById(id);
    question.answers.push({text: text, votes: 0});
    question.save();
});

app.post('/api/questions/:id/votes', async (req, res) => {
    let id = req.params.id;
    let id2 = req.body.index;
    let text = req.body.input;
    let question = await Question.findById(id);
    if(text === '+'){
        question.answers[id2].votes++;
    }
    else{
        question.answers[id2].votes--;
    }
    question.save();
});

app.get('*',(req, res)=>
    res.sendFile(path.resolve('..','client','build','index.html'))
);

app.listen(port, () => console.log(`API running on port ${port}!`));