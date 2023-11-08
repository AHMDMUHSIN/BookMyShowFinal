



document.getElementById("btn-login").addEventListener("click",()=>{
    
  let user=document.getElementById("username").value
  let password=document.getElementById("password").value


  fetch("http://localhost:3002/BookMyShow/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
      user,password
  })
})

.then(async (res) => {
      
  const  data=await res.json()
 console.log(data);
  let token=data.token
  if(res.status!==404)
  {
    localStorage.setItem("token",JSON.stringify(token))
    window.location.href="./index.html"
  }
  else
  {
    alert(data.msg)
  }
})
.catch((error)=>{alert("server not connected")})
      
})



