// js/main.js 

document.addEventListener('DOMContentLoaded', init);

function init() {
    //this function will run after the html has loaded
    // when the DOMContentLoaded event happens to the webpage
    //run this function
    document.getElementById('btnSend').addEventListener('click', getNumbers);
    document.getElementById('btnBack').addEventListener('click', nav);
}

function nav(ev) {
    ev.preventDefault();
    //this function runs when either button is clicked
    let btn = ev.target;
    console.log(btn.id);

    if (btn.id === 'btnBack') {
        //hide the numbers, show the form
        document.getElementById('home').classList.add('active');
        document.getElementById('list').classList.remove('active');

    } else if (btn.id === 'btnSend') {
        //hide the form, show the numbers(and get the numbers)
        document.getElementById('home').classList.remove('active');
        document.getElementById('list').classList.add('active');
        //getNumbers();
    } else {
        //noone else should be calling this function...

    }
}



function getNumbers(ev){
    let url = 'http://localhost/mad9014-lotto/nums.php';
    //removed ?digits=5&max=10
    let fd = new FormData();
    let digits = document.getElementById('digits'); //the input tag
    let max = document.getElementById('max'); //the input tag
    let d = digits.value;
    let m = max.value;
    
   // if( parseInt(d) != NaN )  //means it was not an empty string
   // if( !!d === true )        //means it was not an empty string 
   // if( typeof d == 'string' && d.length > 0 ) 
    
    
    if( parseInt(d)  && parseInt(m)){
        
    
    
    fd.append("digits", d);
    fd.append("max", m);
    
    let info = {
        method: 'POST',
        body: fd
    };
    
    
    nav(ev);
    fetch(url, info)
    .then(response => response.json() )
    .then(data => {
        if( data.code == 0){
            //code 0 means there were no errors on the server
            let ul = document.querySelector('ul.num_list');
            ul.innerHTML = "";
            data.numbers.forEach(num => {
                let li = document.createElement('li');
                li.className = 'num';
                li.textContent = num;
                ul.appendChild(li);
            });
            
        }else{
            //the code was bad.... do something....
            
        } 
    });
    
}
    
}
    /******
    fetch(url)
        .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });
    ********/