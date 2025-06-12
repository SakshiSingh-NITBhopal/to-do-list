document.addEventListener("DOMContentLoaded",()=>{
  
    let to_do_tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(to_do_tasks);
    
    const plusIcon = document.getElementById("plus-icon");
    const inputBox = document.getElementById("input-box");
    const newTask = document.getElementById("new-task");
    const taskButton = document.getElementById("add-button");
    const taskWindow = document.getElementById("tasks-window");
    const taskArea = document.getElementById("task-area");
    const settings = document.getElementById("settings");
    const dropDown = document.getElementById("drop-down")
    const clearAll = document.getElementById("clear-all");
    const edit = document.getElementById("edit");

    //iterating over to_do_tasks and displaying it
    to_do_tasks.forEach(task => {
        const li  = document.createElement("li");
        li.innerHTML = `
        ${task.name}
        <button class="delete-button">Delete</button>`;
        li.setAttribute("data-number", `${task.id}`);
        li.classList.add("to-do");
        taskWindow.appendChild(li);
        
        if(task.isCompleted === true) 
            { 
                const target = document.querySelector(`[data-number="${task.id}"]`);
                target.classList.add("strikethrough");
            }
    });
    
    
    plusIcon.addEventListener("click", ()=>{
        //displaying input box
        inputBox.classList.toggle("hidden");  
    })

    taskButton.addEventListener("click",()=>{
        //generating random number
        let N = 100;
        let randomNumber = Math.floor(Math.random() * N);

        //grabbing input and adding into the dom as a alist
        const li  = document.createElement("li");
        li.innerHTML = `${newTask.value}
        <button class="delete-button">Delete</button>`;
        li.classList.add("to-do");
        li.setAttribute("data-number", `${randomNumber}`);
        taskWindow.appendChild(li);

        //push new item to array and update localstorage
        const newList =
        {
            id : randomNumber,
            name : newTask.value,
            isCompleted : false
        };
        to_do_tasks.push(newList);
        localStorage.setItem("tasks",JSON.stringify(to_do_tasks));
        
        //erase the input box text and hide
        newTask.value = "";
        inputBox.classList.toggle("hidden");
    })
    
    taskArea.addEventListener("click",(e)=>{ 
        if(e.target.tagName === "LI")
        {
            //when the user clicks on the list, it will get strike through
            e.target.classList.toggle("strikethrough"); 

            //find the element in the array and toggle isCompleted value
            const taskId = e.target.getAttribute("data-number");
            const selectedTask = to_do_tasks.find(task => task.id === Number(taskId));
            
            //updating to_do_tasks and local storage
            selectedTask.isCompleted = !(selectedTask.isCompleted);
            localStorage.setItem("tasks",JSON.stringify(to_do_tasks));
            
        }
        //adding delete feature
        else if(e.target.tagName === "BUTTON" && e.target.getAttribute("class") === "delete-button")
        {
            const deleteElement = e.target.closest(".to-do"); 
            const deleteId = Number(deleteElement.getAttribute("data-number"));
            
            //deleting the particular element from the array
            to_do_tasks = to_do_tasks.filter(task => task.id !== deleteId);

            //finding the particular element and updating into to_do_tasks and local storage
            let deleteObject = to_do_tasks.find(task => task.id === deleteId);
            localStorage.setItem("tasks",JSON.stringify(to_do_tasks));
            
            //removing the particular element from the dom
            deleteElement.remove();
        }
        
    })
    

    settings.addEventListener("click", ()=>{
        dropDown.classList.toggle("hidden");
    })
    
    
    clearAll.addEventListener("click",()=>{
        taskWindow.innerHTML = "";
        to_do_tasks = [];
        localStorage.setItem("tasks",JSON.stringify(to_do_tasks));
        dropDown.classList.toggle("hidden");
        
    })
});