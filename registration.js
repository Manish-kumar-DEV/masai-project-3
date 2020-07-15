window.onload = function(){
    document.querySelector('body').style.opacity = 1

    var formSubmit = document.querySelector('form')
    formSubmit.addEventListener('submit',getUserData)
}

function getUserData(){
    event.preventDefault()
    var allUserData = event.target.querySelectorAll('input')
    
    var userData = {
        name: allUserData[0].value,
        username: allUserData[1].value,
        email: allUserData[2].value,
        password: allUserData[3].value
    }

    storeInLocalStorage(userData)
}

function storeInLocalStorage(objData){
    
    if(localStorage.getItem('userRegistrationDetails')){
        var data = JSON.parse(localStorage.getItem('userRegistrationDetails'))
        data.push(objData)
        localStorage.setItem('userRegistrationDetails',JSON.stringify(data))
    }
    else{
        var arr = []
        localStorage.setItem('userRegistrationDetails',JSON.stringify(arr))
        var data = JSON.parse(localStorage.getItem('userRegistrationDetails'))
        data.push(objData)
        localStorage.setItem('userRegistrationDetails',JSON.stringify(data))
    }

    // after registration go to the login page
    location.href = 'login.html'
}