
//get the value entered in search form as string through params
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = "https://saavn.dev/api/search/";


//function to display the search results 
async function display(){
    let search_url = url+'albums?query='+ id;
   
    let search_results = await fetchData_Music(search_url);
    console.log(search_results.data.results)
    let root = document.getElementById("search-card-wrapper");
    root.innerHTML = '';
    search_results.data.results.forEach((e) => {
        root.innerHTML += `<a target="_blank" href="${e.url}"><div class="card bg-dark search-card">
        <img class="card-img" src="${e.image[2].url}" alt="${e.name}">
        <div class="card-body">
          <h3 class="card-title">${e.name}</h3>
          <p class="card-text">${e.year}</p>
        </div>
      </div>
     </a>`
    });   
}

//function to fetch data depends on user search or user clicked category
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

display();