/* eslint-disable react/prop-types */
import { useState } from "react"

export default function AddTask({ onSave, onUpdateTask, onCloseModal }){
    const [task, setTask] = useState( onUpdateTask || {
        id: crypto.randomUUID(),
        title: '',
        description: '',
        tags: '',
        priority: '',
        isFavorite: false
    });

    const [isAdd] = useState(Object.is(onUpdateTask, null));

    function handleChange(evt){
        const name = evt.target.name;
        let value = evt.target.value;
        if( name == 'tags' && value ){
            value = value.split(',')
        }
        setTask({
            ...task,
            [name] : value
        })
    }

    
    return(
        <>
            <div className="absolute w-full h-full left-0 top-0 bg-black bg-opacity-55"></div>
            
            <div className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h2
                className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]"
                >
                { isAdd ? 'Add New Task' : 'Update task' }
                </h2>
        
                <div className="space-y-9 text-white lg:space-y-10">
                <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="title">Title</label>
                    <input
                    className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    id="title"
                    required
                    />
                </div>
                <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                    className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                    type="text"
                    name="description"
                    id="description"
                    value={task.description}
                    onChange={handleChange}
                    required
                    ></textarea>
                </div>
                <div
                    className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20"
                >
                    <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="tags">Tags</label>
                    <input
                        className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                        type="text"
                        name="tags"
                        id="tags"
                        value={task.tags}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="priority">Priority</label>
                    <select
                        className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                        name="priority"
                        id="priority"
                        value={task.priority}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    </div>
                </div>
                </div>
                <div className="mt-16 flex justify-around lg:mt-20">
                <button
                    type="button"
                    className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
                    onClick={onCloseModal}
                >
                    Close
                </button>
                <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
                    onClick={() => onSave(task, isAdd)}
                >
                    
                    { isAdd ? 'Create new Task' : 'Update task' }
                </button>
                </div>
            </div>
        </>
        

    )
}