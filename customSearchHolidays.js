window.onload = function(){
    getActualName()

    var formBtn = document.querySelector('form')
    formBtn.addEventListener('submit',getData)
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

function getData(){
    event.preventDefault()
    var temp = event.target.querySelectorAll('input')

    var data = {
        country: temp[0].value,
        year: temp[1].value
    }
    getCountryCode(data)
}

function getCountryCode(data){
    var xhr = new XMLHttpRequest()
    xhr.open('GET','http://api.geonames.org/countryInfoJSON?username=manish_dev')
    xhr.onload = function(){
        if(this.status < 400){
            var temp = JSON.parse(this.response)
            for(var i = 0; i < temp.geonames.length;i++){
                if(temp.geonames[i].countryName == data.country){
                    //send country code
                    getDefaultHolidays(temp.geonames[i].countryCode, data.year)
                }
            }
        }
       
       
    }
    xhr.send()
}

function getDefaultHolidays(country, year){
    var resCardDiv = document.querySelector('.holidayCards')
    resCardDiv.innerHTML = ''
    var xhr = new XMLHttpRequest()
    xhr.open('GET','https://calendarific.com/api/v2/holidays?api_key=b51e1c17930ef91acaee43f710b2f599e820390a&country='+country+'&year='+year)
    xhr.onload = function(){
        if(this.status < 400){
            var tempData = JSON.parse(this.response)
            var holiday = tempData.response['holidays']
            for(var i = 0; i < holiday.length; i++){
                createCards(holiday[i])
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
    cardDiv.setAttribute('class','card my-md-2')

    var rowDiv = document.createElement('div')
    rowDiv.setAttribute('class','row no-gutters')

    var colDivImg = document.createElement('div')
    colDivImg.setAttribute('class','col-md-12 col-lg-4 my-lg-3 ml-lg-3')

    var imgDiv = document.createElement('img')
    imgDiv.setAttribute('class','img-fluid')
    imgDiv.setAttribute('src','https://via.placeholder.com/350x200')

    var colDivText = document.createElement('div')
    colDivText.setAttribute('class','col-md-8 col-lg-7')

    var cardBody = document.createElement('div')
    cardBody.setAttribute('class','card-body')

    var cardHeading = document.createElement('h4')
    cardHeading.setAttribute('class','card-title fontWeight')
    cardHeading.textContent = arrData.name

    var paraDescription = document.createElement('p')
    paraDescription.textContent = arrData.description

    var dateDiv = document.createElement('div')
    var temp = new Date(arrData.date.iso)
    temp = temp.getDay()
    var weekday = getWeekday(temp)
    dateDiv.innerHTML = `<b>${arrData.date.iso}</b> (${weekday})`

    var paraType = document.createElement('div')
    paraType.textContent = arrData.type

    cardBody.append(cardHeading, paraDescription, dateDiv, paraType)
    colDivText.append(cardBody)
    colDivImg.append(imgDiv)
    rowDiv.append(colDivImg, colDivText)
    cardDiv.append(rowDiv)
    colDiv.append(cardDiv)
    resCardDiv.append(colDiv)
}

function getWeekday(num){
    switch(num){
        case 0:
            return 'Sunday';
            break;
        case 1:
            return 'Monday';
            break;
        case 2:
            return 'Tuesday';
            break;
        case 3:
            return 'Wednesday';
            break;
        case 4:
            return 'Thrusday';
            break;
        case 5:
            return 'Friday';
            break;
        case 6:
            return 'Saturday';
            break;
    }
}
