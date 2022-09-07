const form = {
    email: document.querySelector("#signin-email"),
    password: document.querySelector("#signin-password"),
    submit: document.querySelector("#signin-btn-submit"),
    messages:document.getElementById("form-messages")
};
let button = form.submit.addEventListener("click", (e)=> {
    e.preventDefault();
    const login = 'https://ffcc-app.herokuapp.com/user/login';

    fetch(login, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email.value,
            password: form.password.value,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((err) => {
            console.log(err);
           });
    
    
});