const TODO_LIST_WORK = "Work";
const TODO_LIST_HOME ="Home"
const TODO_LIST_STUDY ="Study"
const WORK_DONE = "work_done"
var TODO_LIST_KEY ="Work"
let login ="login"


var listDiv = document.getElementById("lists")
let para = document.getElementById("warner")
let task = document.getElementById("task")
let todoDiv = document.getElementById("todoDiv")
let prompt = document.getElementById("prompt")
let tickIcon =`<i class="fas fa-check"></i>`
let delIcon = `<i class="far fa-trash-alt"></i>`
const USER_DATA = "user_data"
const val = 0;

//hiiii
/**
 * @input   title - string
 * @returns A todo element
 */

const getTodo = (title,id,val=0,LIST_KEY) => {

    console.log("id in get todo top"+id)
    console.log("the key in TODO" + LIST_KEY )
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
    
    completeButton.setAttribute("class", "rounded-full bg-green-300 w-6 h-6 flex items-center justify-center m-1");
    deleteButton.setAttribute("class", "rounded-full bg-red-200 w-6 h-6 flex items-center justify-center m-1 mr-4");
    textContainer.setAttribute("class", "bg-gray-400 xl:max-w-xl min-h-0 break-word text-white decoration-pink-500 rounded-xl shadow-2xl whitespace-normal w-full p-2 mr-1");
    if(val==1){
        textContainer.classList.add("line-through")
    }

    buttonsContainer.setAttribute("class","flex")
    container.setAttribute("class", "flex items-center mb-2");
    container.setAttribute("id","listcontainer")

    let todos = JSON.parse(localStorage.getItem(LIST_KEY));
    // const index = todos.length;
    // console.log("the index is",index)
    // // const contIndex = index-id-1;
    // // console.log("id in gettodo "+ contIndex)

    deleteButton.setAttribute("id",id)
    deleteButton.setAttribute("onClick","deleteOrganiser(this)")
 
    const onCompleteButtonClick = (e) => {
        e.preventDefault();
        textContainer.classList.toggle("line-through")
        let id = deleteButton.getAttribute("id")
        console.log(id)
        let todos = JSON.parse(localStorage.getItem(TODO_LIST_KEY))
        if(todos[id].val==0){
            todos[id].val =1
        }else{
            todos[id].val =0
        }
        localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todos));
    };

    const onDeleteButtonClick = (e) => {
        e.preventDefault();
        container.remove();
    };

    deleteButton.addEventListener("click", onDeleteButtonClick);
    completeButton.addEventListener("click", onCompleteButtonClick);

    return container;
}

function arrayRemove(arr, value) { 

    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

function completer(){
    
}

function deleteOrganiser(e){
    console.log(e)
    dataId = e.getAttribute("id")
    console.log("data id is"+dataId)

    let todos = JSON.parse(localStorage.getItem(TODO_LIST_KEY));
    console.log(todos[dataId])

    todos = arrayRemove(todos,todos[dataId])
    
    let updated_todo = todos.map((e)=>{
        let index = todos.indexOf(e)
        console.log(e.id)
        e.id = index;
        return e
    })
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(updated_todo));
    listDiv = divCreater()
    
    divUpdater()
}

const storeTodo = (title,val,listKey) => {
    let todos = JSON.parse(localStorage.getItem(listKey)) || [];
    const id = todos.length;
    console.log("store todo"+id)
    console.log(todos)

    const newTodo = { id, title, val };
    todos = [...todos,newTodo];
    console.log(todos);

    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todos));
    return id
}

window.onload = () => {
    let loginkey = JSON.parse(localStorage.getItem(login))

    if(loginkey==false){
        location.href ="index.html"
    }

   divUpdater()
}

    function divCreater(){
        document.getElementById("lists").remove()
        let listDiv = document.createElement("div")
        
        listDiv.setAttribute("id","lists")
        listDiv.setAttribute("class","listDiv xl:w-3/4 h-2/3 overflow-y-auto overflow-x-hidden scroll-smooth")
        todoDiv.append(listDiv)

        return listDiv
    }

    function keyChanger(key){
        TODO_LIST_KEY = key;
        task.innerText = `Today's Tasks for ${TODO_LIST_KEY}`
        listDiv = divCreater()
        divUpdater()
    }

    function divUpdater(){
        let todos = JSON.parse(localStorage.getItem(TODO_LIST_KEY)) || [];
        console.log("list of todos",todos)
        const todoElements = todos.map((e) => getTodo(e.title,e.id,e.val,TODO_LIST_KEY));
        todoElements.forEach((e) => listDiv.append(e));
    }

    function buttonAdd(e){
        e.preventDefault();
        let text = document.querySelector("#input").value

        if(text.trim() === ""){
            para.innerText = "*No content in the text field"
        }else{
            para.innerText=""
            var id = storeTodo(text,0,TODO_LIST_KEY);
            console.log("id in button add"+id)
            listDiv.appendChild(getTodo(text,id,val,TODO_LIST_KEY));
        }
    }

    function ContentDelete(){
        document.querySelector("input").value=""
    }

    function nameChanger(){
        let headText = document.getElementById("userText")
        let profile = document.getElementById("profile")
        console.log(headText)
        let User = JSON.parse(localStorage.getItem(USER_DATA))
        console.log(User)
        let NameOfUser = User.username
        console.log(NameOfUser)
        headText.innerText = `Hi there, ${NameOfUser}`
        profile.innerText = NameOfUser
    }

    function logOff(){
        prompt.classList.toggle("translate-y-80")
    }

    function confirmPrompt(){
        location.href ="index.html"
    }

    document.querySelectorAll("#form")[0].addEventListener("submit",buttonAdd)
    document.querySelectorAll("button")[1].addEventListener("click",ContentDelete)
    
    document.querySelector("#work0").addEventListener("click", ()=> keyChanger(TODO_LIST_WORK))
    document.querySelector("#home0").addEventListener("click", ()=> keyChanger(TODO_LIST_HOME))
    document.querySelector("#study0").addEventListener("click", ()=> keyChanger(TODO_LIST_STUDY))

    document.querySelector("#work1").addEventListener("click", ()=> keyChanger(TODO_LIST_WORK))
    document.querySelector("#home1").addEventListener("click", ()=> keyChanger(TODO_LIST_HOME))
    document.querySelector("#study1").addEventListener("click", ()=> keyChanger(TODO_LIST_STUDY))

    document.getElementById("logout0").addEventListener("click",logOff)
    document.getElementById("logout1").addEventListener("click",logOff)
    document.getElementById("yes").addEventListener("click",confirmPrompt)
    document.getElementById("no").addEventListener("click",logOff)

    nameChanger();