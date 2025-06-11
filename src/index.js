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
    
    
    //iterating over to_do_tasks and displaying it
    // for(const key )
    let number =  0;
    to_do_tasks.forEach(task => {
        const li  = document.createElement("li");
        li.innerHTML = `
        ${task.name}
        <button class="delete-button">Delete</button>`;
        li.setAttribute("data-number", `${number}`);
        li.classList.add("to-do");
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
        li.innerHTML = `${newTask.value}
        <button class="delete-button">Delete</button>`;
        li.classList.add("to-do");
        li.setAttribute("data-number", `${number}`);
        taskWindow.appendChild(li);

        //push new item to array and update localstorage
        const newList =
        {
            id : number,
            name : newTask.value,
            isCompleted : false
        };
        number++;
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
            const taskId = e.target.getAttribute("data-number");
            const selectedTask = to_do_tasks.find(task => task.id === Number(taskId));
            
            selectedTask.isCompleted = !(selectedTask.isCompleted);
            localStorage.setItem("tasks",JSON.stringify(to_do_tasks));
            console.log(to_do_tasks);
            
        }
        //adding delete feature
        else if(e.target.tagName === "BUTTON")
        {
            console.log("hi from delete");
            const deleteElement = e.target.closest(".to-do"); 
            const deleteId = Number(e.target.closest(".to-do").getAttribute("data-number"));
            
            const updated_tasks = to_do_tasks.filter(task => task.id !== deleteId);
            console.log(updated_tasks);
            localStorage.setItem("tasks",JSON.stringify(updated_tasks));
            
            deleteElement.remove();
        }
        
    })


});