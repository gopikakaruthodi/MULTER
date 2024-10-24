document.getElementById("frm").addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log(e.target);
    const username=document.getElementById("username").value
    const email=document.getElementById("email").value
    const data= new FormData(e.target)
    console.log(data);
    

    await fetch("http://localhost:3000/api/upload",{
        method:"POST",
        body:data
    }).then(async(res)=>{
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