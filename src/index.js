document.addEventListener("DOMContentLoaded",()=>{
    
    //storing the tasks into array
    const to_do_tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    const plusIcon = document.getElementById("plus-icon");
    const inputBox = document.getElementById("input-box");
    const newTask = document.getElementById("new-task");
    const taskButton = document.getElementById("add-button");
    const taskWindow = document.getElementById("tasks-window");
    
    //iterating over to_do_tasks and displaying it
    to_do_tasks.forEach(task => {
        const li  = document.createElement("li");
        li.innerHTML = 
        `<input type="checkbox"> ${task}`;
        taskWindow.appendChild(li);
    });
   

    plusIcon.addEventListener("click", ()=>{
        inputBox.classList.toggle("hidden");  
    })

    taskButton.addEventListener("click",()=>{
        const li  = document.createElement("li");
        li.innerHTML = 
        `<input type="checkbox"> ${newTask.value}`;
        taskWindow.appendChild(li);

        //push new item to array and update localstorage
        to_do_tasks.push(newTask.value);
        localStorage.setItem("tasks",JSON.stringify(to_do_tasks));
        
        //hide the input box
        inputBox.classList.toggle("hidden");
        console.log(to_do_tasks);

    })
    

    
});