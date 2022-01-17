let url =
  "https://fake-api-ecommerce.herokuapp.com/users";

const user = document.querySelector("#user");
const password = document.querySelector("#password")
const checkpasword = document.querySelector("#checkpasword");
const email = document.querySelector("#mail")

const submitForm = async (e) => {
    e.preventDefault();
    console.log(password);
    
    if (password.value.trim().length >= 4 && password.value === checkpasword.value) {
        console.log("Passwords Match");
        try {
            const response = await axios.post(url,{
                username: user.value,
                password: password.value,
                email: email.value
            }, {
                headers: {
                    "X-Action":"register"
            }});
            console.log(response.data);
            userData = response.data.username
            document.getElementById("success").setAttribute("class","visible bg-blue-600 text-blue-300 p-1 rounded text-sm mb-[1%]")

        } catch (error) {
            console.log(error);
        }
    }
}

document.querySelector("#login").addEventListener("submit",submitForm)
