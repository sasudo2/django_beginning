document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('.btn-primary').forEach((btn)=>{
        btn.onclick = ()=>{
            fetch(`read/${btn.dataset.id}`)
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);

                }
                return response.json()
            })
            .then(data => {
                console.log(data);
                display_blog(data);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
        }
    })

    document.querySelectorAll('.btn-danger').forEach((btn) => {
        btn.onclick = ()=>{
            let csrf = getCookie("csrftoken");
            fetch(`delete/${btn.dataset.id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRFToken": csrf,
                }
            })
            .then(response=>{
                if(!response.ok){
                    throw new Error(`HTTP error ! status: ${response.status}`)
                }
                return response.json()
            })
            .then(data=>{
                if(data.success){
                    window.location.reload();
                }
                else{
                    alert("Could not delete blog");
                }
               
            })
            .catch(error=>{
                console.error("Error:", error);
                alert("An error occurred while deleting the blog");
            });
        }
    });
});

function display_blog(data){
    const open_blog = document.querySelector(".open_blog");
    let formattedDate;
    try {
        // Parse the datetime value (assuming format like "2025-04-22T06:00")
        const dateObj = new Date(data.date);
        
        // Format as "April 22, 2025"
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
        };
        
        formattedDate = dateObj.toLocaleDateString('en-US', options);
    } catch (e) {
        console.error("Error formatting date:", e);
        formattedDate = newdate; // Use original if formatting fails
    }
    open_blog.innerHTML = `  <div class = "blog_title"><h1>${data.title}</h1></div>
                <div class = "blog_image"><img src = "${data.image}" class="blog_image"></div> 
                <div class = "blog_author"><h6>${data.author}</h6></div>
                <div class = "blog_date"><h5>${formattedDate}</h5></div>
                <div class = "blog_content"><p>${data.content}</p></div>`;
}

function getCookie(name){
        let cookievalue = null;
        if(document.cookie && document.cookie != ''){
            const cookies = document.cookie.split(';');
            for(let i = 0; i < cookies.length; i++){
                const cookie = cookies[i].trim();
                if(cookie.substring(0, name.length + 1) === (name + '=')){
                    cookievalue = decodeURIComponent(cookie.substring(name.length+1));
                    break;
                }
            }
        }
        return cookievalue;
}