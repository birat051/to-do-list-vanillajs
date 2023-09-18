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
    taskElement.classList.add('draggable')
    taskElement.draggable=true
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

function addDraggableEvents(taskElement)
{
    taskElement.addEventListener('dragstart',()=>{
        taskElement.classList.add('dragging')
    })
    taskElement.addEventListener('dragend',()=>{
        taskElement.classList.remove('dragging')
    })
}



function getAfterElement(y)
{
    const draggableElements=[...document.querySelectorAll('.draggable:not(.dragging)')]
    return draggableElements.reduce((closest,child)=>{
        const box=child.getBoundingClientRect()
        const offset=y-box.top-box.height/2
        if(offset<0 && offset>closest.offset)
        {
            return {offset: offset,element: child}
        }
        else
        return closest
    },{offset: Number.NEGATIVE_INFINITY}).element
}


wrapperElement.addEventListener('dragover',e =>{
    e.preventDefault()
    const afterElement=getAfterElement(e.clientY)
    const draggable=document.querySelector('.dragging')
    console.log(afterElement)
    if(afterElement==null)
    wrapperElement.appendChild(draggable)
    else
    wrapperElement.insertBefore(draggable,afterElement)
})


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
        addDraggableEvents(taskElement)
    }
})