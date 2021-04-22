import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import {useState,useEffect} from 'react'
import './index.css'


function App() {

  useEffect (() => {

   const getTask = async() => {
   const tasks = await fetchTasks ()
   setTasks(tasks)
   }
getTask()
  })


  //fetch task
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:8000/tasks')
    const data = await res.json()
    return data
  }

  //fetch task
  const fetchTask = async(id) => {
    const res = await fetch(`http://localhost:8000/tasks/${id}`)
    const data = await res.json()
    return data
  }

// delete Task
  const deleteTask = async(id) =>{
    await fetch(`http://localhost:8000/tasks/${id}`, {method:'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id))
  } 

  const toggleReminder = async(id) => {
    const taskToggle = await fetchTask(id)
    const updateTask = {...taskToggle, reminder:!taskToggle.reminder}
    const res = await fetch(`http://localhost:8000/tasks/${id}`,{
      method:'PUT',
      headers: {
        'Content-Type':'application/json',
      },
      body:JSON.stringify(updateTask)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  //   setTasks(tasks.map((task) => task.id === id ? 
  //   { ...task, reminder : data.reminder} : task))
  }
  

  const addTask = async(task) => {
const res = await fetch(`http://localhost:8000/tasks`,{
  method: 'POST',
  headers: {
    'Content-type':'application/json',
  },
  body:JSON.stringify(task)
})
    const data = await res.json()
    setTasks([...tasks, data])
  }

  const[showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  return (
    <div className="container">
      <Header title='Task Tracker' onAdd={()=> setShowAddTask(!showAddTask)} showAdd = {showAddTask} />
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/> :
      'No Tasks to Show!!!'}
      </div>
  );
}

export default App;
