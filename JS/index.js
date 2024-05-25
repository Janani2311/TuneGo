
const url = "https://saavn.dev/api/search/";
var browse_items = ["New Release", "Artist","Collections","Album"];


//function to list category
(function(){
    
    let browse_List = document.getElementById("browseList");
    let list = document.createElement("ul");
    list.setAttribute("class","browse-list");

    browse_items.forEach((e) => {
        list.innerHTML +=  `
        <li><button onclick="searchLink('${e}')"> ${e}</button></li> `    
    }); 
    
    browse_List.append(list);

})();

//function for carousel
function carouselSetup(id){
  let album_List = document.getElementById(id);
  album_List.innerHTML = '';
  
     
      album_List.innerHTML += `<div id="${(id == "album-scroller")?'carouselExampleControls':(id == "artist-scroller")?'carouselExampleControls1':'carouselExampleControls2'}" class="carousel carousel-dark slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
            <div class="card-wrapper card1">
            
            </div>
        </div>
        <div class="carousel-item">
            <div class="card-wrapper card2">
            
            </div>
          
        </div>
        <div class="carousel-item">
            <div class="card-wrapper card3">
                
            </div>
          
        </div>
      </div> 
      <button class="carousel-control-prev" type="button" data-bs-target="#${(id == "album-scroller")?'carouselExampleControls' :(id == "artist-scroller")?'carouselExampleControls1':'carouselExampleControls2'}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#${(id == "album-scroller")?'carouselExampleControls' :(id == "artist-scroller")?'carouselExampleControls1':'carouselExampleControls2'}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>`
}

//function to display music cards inside the carousel
function cardsDisplay(songs,element){
  let parent = '';
  if(element == "album"){
    parent = document.getElementById("carouselExampleControls");
  }else if(element == "artist"){
    parent = document.getElementById("carouselExampleControls1");
  }else{
    parent = document.getElementById("carouselExampleControls2");
  }
  let card1 = parent.querySelector(".card1");
      let card2 = parent.querySelector('.card2');
      let card3 = parent.querySelector('.card3');
      
      card1.innerHTML ='';
      card2.innerHTML ='';
      card3.innerHTML ='';
      
      let items_displayed1 = songs.splice(0,5);
      let items_displayed2 = songs.splice(0,5);
      let items_displayed3 = songs.splice(0,5);
      
        items_displayed1.forEach((e) =>{
          card1.innerHTML += `<a target="_blank" href="${e.url}"><div class="card">
          <div class="image-wrapper">
            <img src="${e.image[2].url}" class="card-img-top" alt="${e.name}">
          </div>
          
            <div class="card-body">
              <p class="card-title">${e.name}</p>
            </div>
            </div></a>`
        })
        
        items_displayed2.forEach((e) =>{
          card2.innerHTML += `<a target="_blank" href="${e.url}"><div class="card">
          <div class="image-wrapper">
            <img src="${e.image[2].url}" class="card-img-top" alt="${e.name}">
          </div>
            <div class="card-body">
              <p class="card-title">${e.name}</p>
            </div>
            </div></a>`
        })

        items_displayed3.forEach((e) =>{
          card3.innerHTML += `<a target="_blank" href="${e.url}"><div class="card">
            <div class="image-wrapper">
            <img src="${e.image[2].url}" class="card-img-top" alt="${e.name}">
            </div>
            <div class="card-body">
              <p class="card-title">${e.name}</p>
            </div>
            </div></a>`
        })

}

//function to set url for album and to pass data to display function
async function album(){
  
  const album_url =  url+'albums?query=believer';
  const album_url2 =  url+'albums?query=Enjoy+Enjaami';
  let id = "album-scroller";
  let album_items = await fetchData_Music(album_url);
  let album_items2 = await fetchData_Music(album_url2);
  let songs = album_items.data.results.concat(album_items2.data.results);
  
  carouselSetup(id);
  cardsDisplay(songs,"album");
}

//function to set url for artist songs and to pass data to display function
async function artist(){
  
  const artist_url = url+'albums?query=animal';
  const album_url2 =  url+'albums?query=thoda+thoda+pyaar';
  let id = "artist-scroller";
  let artist_items = await fetchData_Music(artist_url);
  let album_items2 = await fetchData_Music(album_url2);
  let songs = artist_items.data.results.concat(album_items2.data.results);
  
  carouselSetup(id);
  cardsDisplay(songs,"artist");
     
}

//function to set url for playlist and to pass data to display function
async function playlist(){
  
  const playlist_url1 = url+'albums?query=Heeramandi';
  const playlist_url2 = url+'albums?query=leo';
  let id = "playlist-scroller";
  let artist_items = await fetchData_Music(playlist_url1);
  let playlist2_items = await fetchData_Music(playlist_url2)
  let songs = artist_items.data.results.concat(playlist2_items.data.results);
  carouselSetup(id);
  cardsDisplay(songs,"playlist");
     
}

//function to get value from search form and navigate to search.html
function search(){
  
  let value = document.getElementById('mySearch').value;
  let val_arr = value.split(' ').join('+');
  
  window.location.href=`./../HTML/search.html?id=${val_arr}`;
  
}

//Navigate to search.html when user clicked on category
function searchLink(value) {
  window.location.href=`./../HTML/search.html?id=${value}`;

}

//fetch method to fetch data using API URL
async function fetchData_Music(url){
  try {
      const res = await fetch(url)
      let data = await res.json()
      if(res.status===200){
          return data;    
      }
      else
          alert(`${res.status} - ${res.statusText}`)
  } catch (error) {
      console.error(error)
  }
}


album();
artist();
playlist();
