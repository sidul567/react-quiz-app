document.querySelector(".floatingBtn").addEventListener("click",function(){
    this.classList.remove("floatingBtn")
},true)

document.querySelector(".miniPlayer .close").addEventListener("click",function(){
    document.querySelector(".miniPlayer").classList.add("floatingBtn")
})

// tooltip
document.querySelector(".progress").addEventListener('mouseover',()=>{
    document.querySelector(".tooltip").style.display = "block"
},true)

document.querySelector(".progress").addEventListener('mouseout',()=>{
    document.querySelector('.tooltip').style.display = "none"
},true)