document.addEventListener("DOMContentLoaded",()=>{
    //reading local storage

    //list of tasks
    const to_do_tasks = [];

    const plusIcon = document.getElementById("plus-icon");
    const inputBox = document.getElementById("input-box");
    const newTask = document.getElementById("new-task");
    const taskButton = document.getElementById("add-button");
    const taskWindow = document.getElementById("tasks-window");


    plusIcon.addEventListener("click", ()=>{
        inputBox.classList.toggle("hidden");  
    })

    taskButton.addEventListener("click",()=>{
        //grab input box value and append to "to_do_tasks"
        inputBox.classList.toggle("hidden");
        
        const li  = document.createElement("li");
        li.innerHTML = 
        `<input type="checkbox"> ${newTask.value}`;
        taskWindow.appendChild(li);
        to_do_tasks.push(newTask.value);
        console.log(to_do_tasks);

        newTask.value = "";

    })
    
    
});