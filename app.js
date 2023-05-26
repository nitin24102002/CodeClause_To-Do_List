const express = require('express');
const app = express();
const port = 80;
const path = require('path')
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://0.0.0.0:27017/toDo',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const taskListSchema = new mongoose.Schema({
    taskDescription : String,
    dateTime : String,
    timeselect : String,
    priority : String
});

var taskList = new mongoose.model('taskList', taskListSchema);

app.use('/static', express.static('views'));
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));

app.get('/',(req, res)=>{
    taskList.find({}).then(function(taskobj){
        res.render('index.pug', {taskObjs: taskobj});
    });
})

app.post('/task-add', (req, res)=>{
    let inputTask = req.body;
    const task = new taskList({taskDescription:inputTask.taskDescription ,
                            dateTime:inputTask.dateTime, 
                            timeselect:inputTask.timeselect, 
                            priority:inputTask.priority});
    task.save().then(()=>{
        res.redirect('/');
    }).catch((err)=>{
        console.log(err);
    });
});

app.get('/deleteTask', (req, res)=>{
    checkVal = req.query.checkVal;
    let taskId = [];
    taskList.find({}).then(function(taskObj){
        for(let i = 0; i<checkVal.length; i=i+2){
          if((i%2)==0){
            taskId.push(taskObj[checkVal[i]]);
          }
        };
        return Promise.all(taskId);
    }).then(function(taskId){
        taskList.deleteMany({'_id':{$in : taskId}}).then(function(a){
        res.redirect('/');
        });
    });
    
});

app.get('/sortBy-priority', (req, res)=>{
    taskList.find({}).sort({priority:'asc', dateTime:'asc', timeselect:'asc', taskDescription:'asc'}).then(function(taskobj){
        res.render('index.pug', {taskObjs: taskobj});
        });
});

app.get('/sortBy-dueDate', (req, res)=>{
    taskList.find({}).sort({dateTime:'asc', priority:'asc', timeselect:'asc', taskDescription:'asc'}).then(function(taskobj){
        res.render('index.pug', {taskObjs: taskobj});
        });
});

app.listen(port, ()=>{
    console.log(`Running successfully on port ${port}`);
}); 