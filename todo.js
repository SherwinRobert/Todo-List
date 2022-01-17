const TODO_LIST_KEY = "todoList";

let listDiv = document.getElementById("lists")
let para = document.getElementById("warner")
let tickIcon =`<i class="fas fa-check"></i>`
let delIcon = `<i class="far fa-trash-alt"></i>`
var userId;

/**
 * @input   title - string
 * @returns A todo element
 */

const getTodo = (title) => {
    const container = document.createElement("div");
    const textContainer = document.createElement('div');
    const buttonsContainer = document.createElement("div");
    const completeButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    textContainer.innerText = title;
    completeButton.innerHTML = tickIcon;
    deleteButton.innerHTML = delIcon;
    
    buttonsContainer.append(completeButton);
    buttonsContainer.append(deleteButton);
    container.append(textContainer);
    container.append(buttonsContainer);
    
    completeButton.setAttribute("class", "mr-1");
    deleteButton.setAttribute("class", "");
    textContainer.setAttribute("class", "bg-blue-900 min-h-0 break-words text-white rounded-xl shadow-2xl whitespace-normal p-2 lg:w-[92%] md:w-[90%] w-[85%] mr-1");
    container.setAttribute("class", "flex items-center mb-2");
    
    const onCompleteButtonClick = (e) => {
        e.preventDefault();
        textContainer.classList.toggle("line-through")
    };

    const onDeleteButtonClick = (e) => {
        e.preventDefault();
        container.remove();
    };

    deleteButton.addEventListener("click", onDeleteButtonClick);
    completeButton.addEventListener("click", onCompleteButtonClick);

    return container;
}

const storeTodo = (title) => {
    let todos = JSON.parse(localStorage.getItem(TODO_LIST_KEY)) || [];
    const id = todos.length;
    console.log(todos)
    const newTodo = { id, title };
    todos = [newTodo,...todos];
    console.log(todos);

    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todos));
}

window.onload = () => {
    let todos = JSON.parse(localStorage.getItem(TODO_LIST_KEY)) || [];
    const todoElements = todos.map((e) => getTodo(e.title));
    todoElements.forEach((e) => listDiv.append(e));
    }
 
    document.querySelectorAll("#form")[0].addEventListener("submit",buttonAdd)
    document.querySelectorAll("button")[1].addEventListener("click",ContentDelete)

    function buttonAdd(e){
        e.preventDefault();
        let text = document.querySelector("#input").value

        if(text.trim() === ""){
            para.innerText = "*No content in the text field"
        }else{
            para.innerText=""
            listDiv.appendChild(getTodo(text));
            storeTodo(text);
        }
    }

    function ContentDelete(){
        document.querySelector("input").value=""
    }


