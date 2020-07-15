window.onload = function(){
    document.querySelector('body').style.opacity = 1
    var creatAccountBtn = document.getElementById('createAccount')
    creatAccountBtn.addEventListener('click', goToRegistrationPage)

    var signInBtn = document.querySelector('form')
    signInBtn.addEventListener('submit', getUserData )
}

function goToRegistrationPage(){
    //this function creates a fade in transition effect
    document.querySelector('body').style.opacity = 0
    setTimeout(function(){
        window.location.href = 'index.html'
    },500)
}

function getUserData(){
    event.preventDefault()
    var allUserData = event.target.querySelectorAll('input')

    var data = {
        username: allUserData[0].value,
        password: allUserData[1].value
    }

    var validate = validateData(data)
    if(validate){
        // go to Dashboard
    }
    else{
        // show error
    }
}

function validateData(data){
    var localData = JSON.parse(localStorage.getItem('userRegistrationDetails'))
    for(var i = 0; i < localData.length; i++){
        if(localData[i]['username'] == data.username && localData[i]['password'] == data.password){
            return true
        }
    }
    return false
}