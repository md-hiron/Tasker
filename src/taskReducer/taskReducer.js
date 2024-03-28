function taskReducer(tasks, action){
    if(action.type == 'save') {
        if( action.task.title && action.task.description && action.task.tags && action.task.priority ){
            if( action.isAdd ){
                return[...tasks, action.task]
            }else{
                return tasks.map(task => {
                        if( task.id ===  action.task.id){
                            return action.task;
                        }
        
                        return task;
                    })
                
            }
            
        }else{
            alert('No empty filed allowed');
            return tasks;
        }
    }else if(action.type == 'delete') {
        return tasks.filter( task => task.id !== action.taskID );
    }else if( action.type == 'deleteAll' ) {
        tasks.length = 0;
        return [...tasks];
    }else if( action.type == 'isFav' ) {
        const taskIndex = tasks.findIndex( task => task.id === action.taskId );
        tasks[taskIndex].isFavorite = ! tasks[taskIndex].isFavorite;
        
        console.log(tasks[taskIndex].isFavorite)
        return [...tasks];
    }else{
        throw Error('Unknown action: ' + action.type);
    }
}

export default taskReducer;