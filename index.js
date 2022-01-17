let url = "https://fake-api-ecommerce.herokuapp.com/users";

const email = document.querySelector("#mail");
const password = document.querySelector("#password");
const paraAlert = document.getElementById("warn")

const LOGIN_KEY = "login";
const USER_DATA = "user_data"
var userId;

const submitForm = async (e) => {
  e.preventDefault();
  console.log(password);
  
  try {
    const response = await axios.post(
      url,
      {
        email: email.value,
        password: password.value
      },
      {
        headers: {
          "X-Action": "login",
        },
      }
    );
    console.log(response.data);
    localStorage.setItem(USER_DATA,JSON.stringify(response.data))
    userId = response.data.id
    console.log(userId)
    if(response.data.email===email.value){
        localStorage.setItem(LOGIN_KEY,true)
        location.replace("new_to.html")
    }
  } catch (error) {
    console.log(error);
    paraAlert.innerText = "*Incorrect UserName or Password"

    setTimeout(()=>paraAlert.innerText = "",2000)
  }
};

localStorage.setItem(LOGIN_KEY,false)
localStorage.setItem(USER_DATA,[])

document.querySelector("#signin").addEventListener("click", submitForm);
