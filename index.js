let toDoTasks=[]

const addButton=document.getElementById('todo-add')
const inputElement=document.getElementById('todo-input')
const wrapperElement=document.getElementById('task-list')

function createHeadingElement(value)
{
    const headingElement=document.createElement('h1')
    headingElement.innerHTML=value
    return headingElement
}

function createDeleteElement()
{
    const deleteElement=document.createElement('div')
    deleteElement.id='delete'
    deleteElement.innerHTML='X'
    return deleteElement
}

function createTaskElement(headingElement,deleteElement)
{
    const taskElement=document.createElement('div')
    taskElement.id='item'
    taskElement.appendChild(headingElement)
    taskElement.appendChild(deleteElement)
    return taskElement
}

function deleteToDoElement(taskElement,headingElement,deleteElement)
{   
    const removeValue=headingElement.innerHTML
    toDoTasks=toDoTasks.filter((value)=>removeValue!=value)
    deleteElement.addEventListener('click',()=>{
        wrapperElement.removeChild(taskElement)
    })
}


addButton.addEventListener('click',()=>{
    if(inputElement.value!='')
    {
        toDoTasks.push(inputElement.value)
        inputElement.value=''
        const headingElement=createHeadingElement(toDoTasks[toDoTasks.length-1])
        const newDeleteElement=createDeleteElement()
        const taskElement=createTaskElement(headingElement,newDeleteElement)
        wrapperElement.appendChild(taskElement)
        deleteToDoElement(taskElement,headingElement,newDeleteElement)
    }
})