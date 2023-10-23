//inputs
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');

//results
const dayResult = document.querySelector('#day-result');
const monthResult = document.querySelector('#month-result');
const yearResult = document.querySelector('#year-result');

const labels = document.querySelectorAll('.label');

const errors = document.querySelectorAll('.error');

//button
let btn = document.querySelector('.submit-btn');
btn.addEventListener('click', handleSubmit)

const errorColor = 'hsl(0, 100%, 67%)'

function isValid(d, m, y) {
    return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
}
function daysInMonth(m, y) { // m is 0 indexed: 0-11
    switch (m) {
        case 1 :
            return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
        case 8 : case 3 : case 5 : case 10 :
            return 30;
        default :
            return 31
    }
}

const typeOfError = [
    "",
    "This field is required",
    "Must be a vaild month",
    "Must be a valid year",
    "Must be a valid day",
    "Must be a valid date",
];
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

const errorState = (numberOfInput, typeOfDate, numberOfError, color) => {
    errors[numberOfInput]. innerHTML = typeOfError[numberOfError];
    labels[numberOfInput].style.color = color;
    typeOfDate.style.borderColor = color;
}

const isDayCorrect = () => {
    if(dayInput.value == ''){
        errorState(0, day, 1, errorColor);
        return false;
    }
    else if(dayInput.value <= 0 || dayInput.value > 31){
        errorState(0, day, 4, errorColor);
        return false;
    }
    else if(!isValid(dayInput.value, monthInput.value - 1, yearInput.value)){
        errorState(0, day, 5, errorColor)
        return false;
    }
    else{
        errorState(0, day, 0);
        return true;
    }
}

const isMonthCorrect = () => {
    if(monthInput.value == ''){
        errorState(1, month, 1, errorColor);
        return false;
    }
    else if(monthInput.value <= 0 || monthInput.value > 12){
        errorState(1, month, 2, errorColor);
        return false;
    }
    else if(!isValid(dayInput.value, monthInput.value - 1, yearInput.value)){
        errorState(1, month, 5, errorColor)
        return false;
    }
    else{
        errorState(1, month, 0, "");
        return true;
    }
}

const isYearCorrect = () => {
    if(yearInput.value == ''){
        errorState(2, year, 1, errorColor);
        return false;
    }
    else if(yearInput.value > currentYear || yearInput.value < 100){
        errorState(2, year, 3, errorColor);
        return false;
    }
    else if(!isValid(dayInput.value, monthInput.value - 1, yearInput.value)){
        errorState(2, year, 5, errorColor)
        return false;
    }
    else if(yearInput.value == currentYear && monthInput.value > currentMonth){
        errorState(1, month, 3, errorColor)
        return false;
    }
    else if(yearInput.value == currentYear && monthInput.value > currentMonth && dayInput.value > currentDay){
        errorState(0, day, 2, errorColor)
        return false;
    }
    else{
        errorState(2, year, 0);
        return true;
    }
}


function handleSubmit(e){
    e.preventDefault();
    isDayCorrect();
    isMonthCorrect();
    isYearCorrect();
    if(isDayCorrect() && isMonthCorrect() && isYearCorrect()){
    
    let birthday = `${monthInput.value}/${dayInput.value}/${yearInput.value}`;

    let birthdayObj = new Date(birthday);
    let ageDiffMill = Date.now() - birthdayObj;
    let ageDate = new Date(ageDiffMill);
    let ageYears = ageDate.getUTCFullYear() - 1970;
    let ageMonth = ageDate.getUTCMonth();
    let ageDay = ageDate.getUTCDate();

    dayResult.innerHTML = ageDay;
    monthResult.innerHTML = ageMonth;
    yearResult.innerHTML = ageYears;
    }
    else console.log('error')
    
}








    
