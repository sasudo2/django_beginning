
document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM fully loaded");
    const form = document.querySelector("#newtask");
    console.log("Form element found:", form);
    
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        addnewtask(form);
    })

    document.querySelectorAll(".delete").forEach(function(button){
        button.onclick = function(){deletetask(button.dataset.key)};
    })
})

function addnewtask(form){
    const csrftoken = getCookie('csrftoken');

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#discription").value;
    const datetime = document.querySelector("#datetime").value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("discription", description);
    formData.append("date", datetime); 

    fetch("/todo/add/", {
        method:"POST",
        headers:{
            "X-CSRFToken": csrftoken,
        },
        body: formData,
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            console.log("submitted correctly");
            return response.json();
            
            
        }else{
            console.error("Error submitting form");
            throw new Error("Server returned an error");
        }
    })
    .then(data=>{
        shownewtask(title, description, datetime, data.task.id);
        form.reset();
    })
    .catch(error => {
        console.error("network error: ", error);
    })
   
    return false;
}

function deletetask(id){
    fetch(`/todo/delete?id=${id}`)
    .then(response=>{
        window.location.reload();
    })
}

function getCookie(name){
    let cookieValue = null;
    if(document.cookie && document.cookie !== ''){
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++){
            const cookie = cookies[i].trim();
            if(cookie.substring(0, name.length + 1) === (name + '=')){
                cookieValue = decodeURIComponent(cookie.substring(name.length+1));
                break;
            }
        }
    }
    return cookieValue;
}

function shownewtask(newtitle, newdiscription, newdate, newid){
    let formattedDate;
    try {
        // Parse the datetime value (assuming format like "2025-04-22T06:00")
        const dateObj = new Date(newdate);
        
        // Format as "April 22, 2025, 6 a.m."
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        
        formattedDate = dateObj.toLocaleDateString('en-US', options);
    } catch (e) {
        console.error("Error formatting date:", e);
        formattedDate = newdate; // Use original if formatting fails
    }
    formattedDate = formattedDate.replace(" at", ",");
    formattedDate = formattedDate.replace("PM", "p.m.");
    formattedDate = formattedDate.replace("AM", "a.m.");

    const newtask = document.createElement('div');
    newtask.className = 'task';

    const newtaskcard = document.createElement('div');
    newtaskcard.className = 'card';

    const newtaskcardheader = document.createElement('div');
    newtaskcardheader.className = 'card-header';
    newtaskcardheader.textContent = formattedDate;

    const newtaskcardbody = document.createElement('div');
    newtaskcardbody.className = 'card-body';
    
    const newtaskcardbodytitle = document.createElement('h5');
    newtaskcardbodytitle.className = 'card-title';
    newtaskcardbodytitle.textContent = newtitle;

    const newtaskcardbodytext = document.createElement('p');
    newtaskcardbodytext.className = 'card-text';
    newtaskcardbodytext.textContent = newdiscription

    const newtaskcardbodybtn = document.createElement('div');
    newtaskcardbodybtn.className = 'btn btn-primary delete';
    newtaskcardbodybtn.setAttribute('data-key', newid);
    newtaskcardbodybtn.textContent = '🗑️ delete';

    newtaskcardbody.appendChild(newtaskcardbodytitle);
    newtaskcardbody.appendChild(newtaskcardbodytext);
    newtaskcardbody.appendChild(newtaskcardbodybtn);
    
    newtaskcard.appendChild(newtaskcardheader);
    newtaskcard.appendChild(newtaskcardbody);

    newtask.appendChild(newtaskcard);

    const container = document.querySelector('.to_do_tasks');
    if (container.firstChild) {
        container.insertBefore(newtask, container.firstChild);
    } else {
        container.appendChild(newtask);
    }

}