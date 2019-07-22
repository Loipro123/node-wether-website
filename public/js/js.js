
const content = document.querySelector('input');
const locations = document.querySelector('#location');
const forcasts =document.querySelector('#forcast');

document.querySelector('#form1').addEventListener('submit',(e)=>{
    e.preventDefault();
    address = content.value;
    locations.textContent = 'Loading....';
    forcasts.textContent = '';
    fetch('http://localhost:3000/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            locations.textContent=data.error ;
        }
        else{
            locations.textContent = data.location ;
            forcasts.textContent = data.forcast;
        }
    })
})
})