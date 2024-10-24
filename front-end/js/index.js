
async function getUser() {
    const res=await fetch("http://localhost:3000/api/get")
    console.log(res);
    const users=await res.json()

    str=``
    users.map((user)=>{
        console.log(user.photo);
        str+=`<div class="product-card">
            <div class="image-container">
                <img src="http://localhost:3000/api/image/${user.photo.filename}" alt="Morning Set">
            </div>
            <div class="product-info">
                <h2>${user.username}</h2>
                <p>${user.email}</p>

                <div class="price-order">
                <a href="./pages/edit.html?id=${user._id}"><button class="edit" >Edit</button></a>
                    <button class="delete" onclick="deleteUser('${user._id}')">Delete</button>
                </div>
            </div>
        </div>`
    })
    document.getElementById("cards").innerHTML=str
    
    
}
getUser()

async function deleteUser(id){
    if(confirm("do you want to delete this user?")){
        console.log(id);
        await fetch(`http://localhost:3000/api/delete/${id}`,{
            method:"DELETE"
        }).then(async(res)=>{
        const data=await res.json()
        if(res.status==200){
            alert(data.msg)
            getUser()
        }
        else{
            alert("failed")
        }
            
        }).catch((error)=>{
            console.log(error);
            
        })
    }
    
}