const url=window.location.href
const urlParams=new URLSearchParams(url.split("?")[1])
const id=urlParams.get("id")
let user
// let photo=`http://localhost:3000/api/image/${user.photo.filename}`

async function getUser() {
    const res=await fetch(`http://localhost:3000/api/getuser/${id}`)
    user=await res.json()
    console.log(user);
    
    document.getElementById("username").value=`${user.username}`
    document.getElementById("email").value=`${user.email}`
    document.getElementById("img").innerHTML=`<img src="http://localhost:3000/api/image/${user.photo.filename}" alt="" id="pro">`
    
}
getUser()



document.getElementById("frm").addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log(e.target);
    const data= new FormData(e.target)
    console.log(data);

    await fetch(`http://localhost:3000/api/updateuser/${id}`,{
        method:"PUT",
        body:data
    }).then(async(res)=>{
        console.log(res);
        const data=await res.json()
        if(res.status==201){
            alert(data.msg)
            window.location.href="../index.html"
        }
        else{
            alert("error")
        }
        
    }).catch((error)=>{
        console.log(error);
        
    })
    
    

})

function changePic() {
    const fileInput = document.getElementById("profile");
    const profileImage = document.getElementById("pro");
  
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
  
      reader.onload = function(e) {
        profileImage.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
    }
  }