async function getMovies() {
    const Movie = await fetch("http://localhost:3002/BookMyShow/movies");
    const data = await Movie.json();
    s = "";
    data.map((dt) => {
      s += `<div class="cardd">
      <a href="./pages/movies/details1.html?id=${dt._id}"><img class="card-imgg" src="${dt.Movie_Poster}" alt=""></a>
      <div class="discription">
          <div class="film"><span class="film-name">${dt.Movie_Title}</span></div>
          <div><span class="genre">${dt.Genre}</span></div>
      </div>
  </div>`;
    });
    document.getElementById("show").innerHTML = s;



    function check_localstorage() {
      const value = JSON.parse(localStorage.getItem("token"));
      v = "";
      if (!value) {
        v += `<a href="./login.html"><button class="sign-in">Login</button></a>`;
        document.getElementById("name").innerHTML = v;
      } else {
        fetch("http://localhost:3002/BookMyShow/home", {
          headers: { Authorization: `Bearer ${value}` },
        })
          .then((res) => res.json())
          .then((data) => {
            const { msg } = data;
  
            document.getElementById("name").innerHTML = msg
              ? `${msg}<div><button class="sign-in" onclick="del()">Logout</button> </div><div>
              <a href="./pages/registration.html"><button class="sign-in">Register</button></div></a>`
              : `<div><h6>Session Expired <a href="./pages/login.html"><button class="sign-in">Login</button></a></h6></div>`;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    check_localstorage();
}

function del(){
  localStorage.clear();
  location.reload()
}

getMovies();




async function SearchFunction(){
  let inp=document.getElementById("Search-data");
  try {
    res=await fetch("http://localhost:3002/BookMyShow/movies")
    data=await res.json();
    s="";
    let text=inp.value
    data.filter((dt)=>{
      if(dt.Movie_Title.startsWith(text)){
        s+=`<div class="cardd">
        <a href="./pages/movies/details1.html?id=${dt._id}"><img class="card-imgg" src="${dt.Movie_Poster}" alt=""></a>
        <div class="discription">
            <div class="film"><span class="film-name">${dt.Movie_Title}</span></div>
            <div><span class="genre">${dt.Genre}</span></div>
        </div>
    </div>`;

      }
    })
        document.getElementById("show").innerHTML = s;


    
  } catch (error) {
    console.log("error");
    
  }
}


async function SearchFunction2(){
  let inp=document.getElementById("Search-data2");
  try {
    res=await fetch("http://localhost:3002/BookMyShow/movies")
    data=await res.json();
    s="";
    let text=inp.value
    data.filter((dt)=>{
      if(dt.Movie_Title.startsWith(text)){
        s+=`<div class="cardd">
        <a href="./pages/movies/details1.html?id=${dt._id}"><img class="card-imgg" src="${dt.Movie_Poster}" alt=""></a>
        <div class="discription">
            <div class="film"><span class="film-name">${dt.Movie_Title}</span></div>
            <div><span class="genre">${dt.Genre}</span></div>
        </div>
    </div>`;

      }
    })
        document.getElementById("show").innerHTML = s;


    
  } catch (error) {
    console.log("error");
    
  }
}

