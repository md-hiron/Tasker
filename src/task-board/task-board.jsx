import { useState, useReducer } from "react"
import Search from "./search"
import TaskAction from "./task-action"
import TaskList from "./task-list"
import AddTask from "./add-task"
import taskReducer from "../taskReducer/taskReducer"

const taskData = [
    {
        id: crypto.randomUUID(),
        title: 'Integration API',
        description: 'Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.',
        tags: ['Web', 'Python', 'API'],
        priority: 'High',
        isFavorite: true
    },
    {
        id: crypto.randomUUID(),
        title: 'Web development',
        description: 'Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.',
        tags: ['web', 'IT', 'Technology'],
        priority: 'High',
        isFavorite: false
    },
    {
        id: crypto.randomUUID(),
        title: 'Learing React',
        description: 'Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.',
        tags: ['Jvascript', 'IT', 'Technology'],
        priority: 'High',
        isFavorite: false
    },
    {
        id: crypto.randomUUID(),
        title: 'React & Next js Project',
        description: 'Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.',
        tags: ['Jvascript', 'IT', 'Technology'],
        priority: 'High',
        isFavorite: false
    },
    {
        id: crypto.randomUUID(),
        title: 'Learning PHP',
        description: 'Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.',
        tags: ['Jvascript', 'IT', 'Technology'],
        priority: 'High',
        isFavorite: false
    }
]
export default function TaskBoard(){
    const [taskList, dispatch] = useReducer(taskReducer, taskData);
    const [showModal, setShowModal] = useState(false);
    const [updateTask, setUpdateTask] = useState(null);
    const [searchResult, setSearchResult] = useState(null);

    function handleSave(newTask, isAdd){
        dispatch({
            type: 'save',
            task: newTask,
            isAdd 
        });

        if( newTask.title && newTask.description && newTask.tags && newTask.priority ){
            if( ! isAdd ){
                setUpdateTask(null)
            }
            setShowModal(false);
        }
        

    }

    function onUpdateHandler(task){
        setUpdateTask(task);
        setShowModal(true);
    }

    function handleCloseModal(){
        setShowModal(false);
        setUpdateTask(null);
    }

    function handleTaskDelete(taskID){
        dispatch({
            type: 'delete',
            taskID: taskID
        })
    }

    function handleDeleteAll(){
        dispatch({type: 'deleteAll'})
    }

    function handleFav(taskId){
        dispatch({
            type: 'isFav',
            taskId: taskId
        })
    }

    function onSearchSubmit(searchTerm){
        if( searchTerm.length > 0 ){
            const filterd = taskList.filter( task => (
                task.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) );
            setSearchResult([...filterd]);
        }else{
            setSearchResult(null);
        }

    }


    return(
        <section className="mb-20" id="tasks">
            <div className="container mx-auto">
                <Search onSearchSubmit={onSearchSubmit} />
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskAction onAddClick={ () => setShowModal(true) } onDeleteAll={handleDeleteAll}/>
                    { taskList.length > 0 ? 
                        <TaskList tasks={ searchResult ? searchResult : taskList} onUpdate={onUpdateHandler} onTaskDelete={handleTaskDelete} onFav={handleFav}/>
                        : 
                        <h2>Task list is Empty</h2>
                    }
                    { showModal && <AddTask onSave={handleSave} onUpdateTask={updateTask} onCloseModal={handleCloseModal}/> }
                </div>
            </div>
        </section>
    )
}