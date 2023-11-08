async function getDetails(){


    let url = window.location.href;
    var urlParams = new URLSearchParams(url.split("?")[1]);
    var id = urlParams.get("id");

  fetch(`http://localhost:3002/BookMyShow/movieDetails/${id}`,{method:"POST"})
  .then((res)=>res.json())
  .then((data)=>{

      s = "";
      s += `
      
      <div class="banner"><img src="${data.Movie_Banner}"  alt="..."></div>
            <div class="poster">
              <div class="poster-sub">
                  <div class="right"><img src="${data.Movie_Poster}" class="img-fluid" alt="...">
                      <div class="left">
                          <div class="movie-name"> <span>${data.Movie_Title}</span></div>
                          <div class="movie-rating">
                              <div><img src="../../images/others/star.png" alt=""></div>
                              <div>${data.Rating}/</div>
                              <div>10</div>
                          </div>
                          <div class="add-rating">
                            <div>
                                <div>Add your rating & review</div>
                                <div> Your ratings matter </div>
                            </div>
                            <div><a href="../editMovie.html?id=${data._id}"><button>Edit</button></a></div>
                          </div>
                          <div class="languages">
                             <div><button>2D,IMAX</button></div>
                             <div><button>English</button></div>
                          </div>
                          <div class="genere">
                            <div>2h 44m </div>
                            <div>.</div>
                            <div>${data.Genre}</div>
                            <div>.</div>
                            <div>UA</div>
                            <div>.</div>
                            <div> ${data.Release_Date} </div>
                          </div>
                          <div class="delete">
                            <button onclick="deleteMovie()">Delete</button>
                          </div>
                      </div>
                  </div>
                  
              </div>
              
            </div>
            <div class="description-content">
           
            ${data.Description}
        </div>
           
      
      
      `;
    document.getElementById("show").innerHTML = s;
  })
  .catch((error)=>{console.log(error);})
}
getDetails(); 




function deleteMovie(){

let text = "Are you sure!";
if (confirm(text) == true) {
  
  let url = window.location.href;
  var urlParams = new URLSearchParams(url.split("?")[1]);
  var id = urlParams.get("id");

fetch(`http://localhost:3002/BookMyShow/deleteMovie/${id}`,{
  method:"DELETE",
}).then((data)=>{
  if(data.status==200){
    alert("Movie deleted")
  }else{
    alert("error")
  }

}).catch((error)=>{
  console.log(error);
})
} else {
  alert("Movie was not deleted")
}
getDetails(); 
}