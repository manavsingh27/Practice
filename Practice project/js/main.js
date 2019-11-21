
function sports(){
   
    $.ajax({
        type:'GET',
        url:'https://newsapi.org/v2/top-headlines?country=in&apiKey=fabb056ff8594a2c9cd1ea680aa83aa7',
        success: function(data){
            console.log(data)
            let text = 'Read More';
           
            let component = data.articles.map(news=>{
                return(
                   `
                   <div class="card my-3">
            
                        <div class="card-body">
                            <h5 class="card-title">
                                ${news.title}
                            </h5>
                            
                            <p class="card-text mt-3">
                                ${news.description}
                            </p>
                            <small class="card-subtitle mb-2 text-muted">
                                Source:&nbsp;&nbsp;  ${news.source.name}
                            </small>
                            <br>
                            <small class="card-subtitle mb-2 text-muted">
                                Published at:&nbsp;&nbsp;  ${news.publishedAt.substr(0,10)}
                             </small>
                            <br>
                            
                           <button class="mt-2 btn btn-mat text-white">
                                ${text.link(`${news.url}`)}
                           </button>
                        </div>
                    </div>

                   `
                )
            })

            document.getElementById('news').innerHTML=component
        }
    })
}



function api(lat,long){
    $.ajax({
        type:'GET',
        url:`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/b9ec8785be758ca20484c4940d52e161/${lat},${long}`,
        success:function(data){
            let currently = data.currently;
            let temp = Math.round((currently.temperature -32)*5/9)
            let summary = currently.summary;
            let windSpeed = currently.windSpeed;
            let humidity = (currently.humidity)*100;
            // console.log(data)
            function component (){
                return(
                    `<div class="cards">
                    <div class="card-body">
                      <h5 class="card-title text-white">Temperature&nbsp;${temp}<sup>0</sup>C</h5>
                      <h6 class="card-title mb-2 text-white">Summary:&nbsp; ${summary} </h6>
                      <h6 class="card-title mb-2 text-white">WindSpeed:&nbsp; ${windSpeed}&nbsp;miles/hour </h6>
                      <h6 class="card-title mb-2 text-white">Humidity:&nbsp; ${humidity}%</h6>
                     
                     
                    </div>
                  </div>
                    `
                )
            }
            document.getElementById('root').innerHTML = component();
        }
    })

}


function weather(){
    
    let lat,long;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((pos)=>{
            lat = pos.coords.latitude;
            long = pos.coords.longitude;
            api(lat,long)
        })
        
    }
    else{
        api(30.5145926,76.6528112);
    }
}




function fetch(){
    let user = document.querySelector('input').value;
    // console.log(data);
    let text = 'Visit Profile'
    $.ajax({
        type:'GET',
        url:`https:api.github.com/users/${user}?client_id=Iv1.27d23b109a50754c&client_secret=82015423e2a368c16cb2fbf9f6290d9fe8c77f70`,
        success:function(response){
            let name = response.name || `Name is not available`
            let bio = response.bio || 'Bio is not available'
            console.log(response)
            function component(){
                return(
                    `

                    <div class="card my-3" style="width:18rem">
            
                        <div class="card-body">

                        <img src=${response.avatar_url} width="100%" alt="User's Images"/>

                            <h5 class="card-title mt-2">
                               Username:&nbsp; ${response.login}
                            </h5>

                            <p class="card-text mt-3">
                                Name:&nbsp;${name}
                            </p>

                            <p class="card-text mt-3">
                                Bio:&nbsp;${bio}
                            </p>
                            
                            
                            <p class="card-text mt-3">
                               Repos:&nbsp; ${response.public_repos}
                            </p>
                            <p class="card-text mt-3">
                               Followers:&nbsp; ${response.followers}
                             </p>
                             
                             <p class="card-text mt-3">
                               Following:&nbsp; ${response.following}
                            </p>
                          
                            <br>
                            
                        <button class="mt-2 btn btn-mat text-white">
                                ${text.link(`${response.html_url}`)}
                        </button>
                        </div>
                    </div>
                    `
                )
            }

            document.getElementById('data').innerHTML = component();
            document.querySelector('img').innerHTML = ''
        }
    })
}