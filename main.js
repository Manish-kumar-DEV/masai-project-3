window.onload = function(){
    getActualName()
    getPresentDate()
    if(!navigator.geolocation){
        alert('Geolocation is not supported')
    }
    else{
        navigator.geolocation.getCurrentPosition(getPositionCoordinates, errorInPosition)
    }
}

function getPositionCoordinates(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getCountryDetails(latitude,longitude)
}

function errorInPosition(){
    alert('Sorry, we cannot get your location')
}

function getActualName(){
    var localData = JSON.parse(localStorage.getItem('userRegistrationDetails'))
    var activeUser = JSON.parse(localStorage.getItem('activeUser'))

    for(var i = 0; i < localData.length; i++){
        if(localData[i].username == activeUser.username){
            var usernameDiv = document.getElementById('userName')
            usernameDiv.textContent = localData[i].name
        }
    }
}

function getCountryDetails(lat, lng){
    var xhr = new XMLHttpRequest()
    xhr.open('GET','http://api.geonames.org/countrySubdivisionJSON?lat='+lat+'&lng='+lng+'&username=manish_dev')
    xhr.onload = function(){
        if(this.status < 400){
            console.log(this.response)
            var temp = JSON.parse(this.response)
            getPresentCountry(temp.countryName, temp.adminName1)
            getDefaultHolidays(temp.countryCode)
        }
    }
    xhr.send()
}

function getPresentCountry(country, state){
    var countryDiv = document.getElementById('presentCountry')
    countryDiv.textContent = `${country} , ${state}`
}

function getPresentDate(){
    var date = new Date()
    var dateDiv = document.getElementById('presentDate')
    dateDiv.textContent = date.toLocaleDateString()
}

function getDefaultHolidays(country){
    var presentDate = new Date()
    var presentYear = presentDate.getFullYear()
    var xhr = new XMLHttpRequest()
    xhr.open('GET','https://calendarific.com/api/v2/holidays?api_key=b51e1c17930ef91acaee43f710b2f599e820390a&country='+country+'&year='+presentYear)
    xhr.onload = function(){
        if(this.status < 400){
            var tempData = JSON.parse(this.response)
            var holiday = tempData.response['holidays']
            for(var i = 0; i < holiday.length; i++){
                var tempDate = new Date(holiday[i].date.iso)
                tempDate = tempDate.getTime()
                var presentDate = new Date()
                presentDate = presentDate.getTime()
                if(tempDate >= presentDate){
                    createCards(holiday[i])
                }
            }
        }
    }
    xhr.send()
}

function createCards(arrData){
    var resCardDiv = document.querySelector('.holidayCards')

    var colDiv = document.createElement('div')
    colDiv.setAttribute('class','col-12 col-md-6 card-group')

    var cardDiv = document.createElement('div')
    cardDiv.setAttribute('class','card')

    var rowDiv = document.createElement('div')
    rowDiv.setAttribute('class','row no-gutters')

    var colDivImg = document.createElement('div')
    colDivImg.setAttribute('class','col-md-4')


    var colDivText = document.createElement('div')
    colDivText.setAttribute('class','col-md-8')

    var cardBody = document.createElement('div')
    cardBody.setAttribute('class','card-body')

    var cardHeading = document.createElement('h4')
    cardHeading.setAttribute('class','card-title fontWeight')
    cardHeading.textContent = arrData.name

    var paraDescription = document.createElement('p')
    paraDescription.textContent = arrData.description

    var dateDiv = document.createElement('div')
    dateDiv.innerHTML = '<b>'+arrData.date.iso+'</b>'

    var paraType = document.createElement('div')
    paraType.textContent = arrData.type

    cardBody.append(cardHeading, paraDescription, dateDiv, paraType)
    colDivText.append(cardBody)
    rowDiv.append(colDivImg, colDivText)
    cardDiv.append(rowDiv)
    colDiv.append(cardDiv)
    resCardDiv.append(colDiv)
}
