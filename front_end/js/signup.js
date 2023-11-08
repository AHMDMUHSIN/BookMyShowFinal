document.getElementById("btn-submit").addEventListener("click",()=>{
    
    let user=document.getElementById("username").value
    let password=document.getElementById("password").value
    let name=document.getElementById("name").value


    fetch("http://localhost:3002/BookMyShow/adduser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
       name,user,password
    })
  })
    .then((res) => {
      if(res.status==201)
      {
        alert("Registration Succesfull")
        window.location.href="./login.html"
      }
      else
      {
        alert("Registration Failed")
      }
    })
    .catch((error)=>{alert("server not connected")})


})

