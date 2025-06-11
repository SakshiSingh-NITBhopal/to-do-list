document.addEventListener("DOMContentLoaded",()=>{
    
    //storing the tasks into array
    // {
    // name:"drink water",
    // isCompleted = true
    // }
    const to_do_tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(to_do_tasks);
    
    
    const plusIcon = document.getElementById("plus-icon");
    const inputBox = document.getElementById("input-box");
    const newTask = document.getElementById("new-task");
    const taskButton = document.getElementById("add-button");
    const taskWindow = document.getElementById("tasks-window");
    const taskArea = document.getElementById("task-area");
    const toDo = document.getElementsByClassName("to-do");
    
    
    //iterating over to_do_tasks and displaying it
    // for(const key )
    let number =  0;
    to_do_tasks.forEach(task => {
        const li  = document.createElement("li");
        li.textContent = `${task.name}`;
        li.setAttribute("data-number", `${number}`);
        taskWindow.appendChild(li);
        
        if(task.isCompleted === true) 
            { 
                const target = document.querySelector(`[data-number="${number}"]`);
                target.classList.add("strikethrough");
            }
        number++;
    });
    
    
    plusIcon.addEventListener("click", ()=>{
        //displaying input box
        inputBox.classList.toggle("hidden");  
    })

    taskButton.addEventListener("click",()=>{
        const li  = document.createElement("li");
        li.textContent = `${newTask.value}`;
        li.classList.add("to-do");
        taskWindow.appendChild(li);

        //push new item to array and update localstorage
        const newList =
        {
            name : newTask.value,
            isCompleted : false
        };
        to_do_tasks.push(newList);
        localStorage.setItem("tasks",JSON.stringify(to_do_tasks));
        
        newTask.value = "";
        //hide the input box
        inputBox.classList.toggle("hidden");
    })
    
    taskArea.addEventListener("click",(e)=>{ 
        if(e.target.tagName === "LI")
        {
            e.target.classList.toggle("strikethrough");
            
            console.log(e.target);    

            //find the element in the array and toggle isCompleted value
            const selectedTask = to_do_tasks.find(task => task.name === e.target.textContent);

            selectedTask.isCompleted = !(selectedTask.isCompleted);
            localStorage.setItem("tasks",JSON.stringify(to_do_tasks));
            console.log(to_do_tasks);
            
        }
    })
});