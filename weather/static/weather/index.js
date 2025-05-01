document.addEventListener('DOMContentLoaded', function(){
    const form = document.querySelector('form');
    const submitbtn = document.querySelector('.btn');
    const locationfield = document.querySelector('.location');
    submitbtn.disabled = true;

    locationfield.addEventListener('keyup', ()=>{

        if(locationfield.value === ""){
            submitbtn.disabled = true;
        }
        else{
            submitbtn.disabled = false;
        }
        
    })

    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        console.log(locationfield.value);
        loaddata(locationfield.value);
    })
})

function loaddata(locate){
    fetch(`location/${locate}/`)
    .then(response => response.json())
    .then(data=>{
        
        const output = document.querySelector(".result");
        output.innerHTML = '';

        // Add location name
        let place = document.createElement("h3");
        place.textContent = "Location: " + data.location.name;
        output.appendChild(place);
        
        // Add local time
        let time = document.createElement("h4");
        time.textContent = "Time: " + data.location.localtime;
        output.appendChild(time);
        
        // Add current temperature
        let temp = document.createElement("div");
        temp.className = "temperature";
        temp.textContent = "Temperature: " + data.current.temp_c + "°C";
        output.appendChild(temp);
        
        // Add condition
        let condition = document.createElement("div");
        condition.className = "condition";
        condition.textContent = "Condition: " + data.current.condition.text;
        output.appendChild(condition);
        
        // Add condition icon
        let icon = document.createElement("img");
        icon.src = data.current.condition.icon;
        icon.alt = data.current.condition.text;
        output.appendChild(icon);

    })
    .catch(error => {
        const output = document.querySelector(".result");
        output.innerHTML = `<p class="error">Could not find the location</p>`;
    });
}