let timeframe = 'weekly';
const container = document.querySelector('.report-card');
let reportCards;

let data = {};

const timeframeMsg = {
    'daily'     : 'Yesterday',
    'weekly'    : 'Last Week',
    'monthly'   : 'Last Month'
};

fetch('./data.json')
 .then(res => res.json())
 .then(jsonData => {
     jsonData.forEach(element => {
         container.insertAdjacentHTML('beforeend',
         createReportCards(element, timeframe));
     })
     jsonData.forEach(element => {
         data[element.title] = element.timeframes;
     })

     reportCards = document.querySelectorAll('.card');
 })

const option = document.querySelectorAll('.option');

const handleClick = event => {
    option.forEach(opt => {
        opt.classList.remove('active');
    })
    event.target.classList.add('active');
    timeframe = event.target.innerText.toLowerCase();

    updateCards(timeframe);
}

option.forEach(opt => opt.addEventListener('click', handleClick));

const updateCards = timeframe => {
    reportCards.forEach(card => {
        updateCard(card, timeframe);
    })
}

const updateCard = ((card, timeframe) => {
    const title = card.querySelector('.title').innerText;
    const current = data[title][timeframe]['current'];
    const previous = data[title][timeframe]['previous'];

    const hoursElement = card.querySelector('.current-hours');
    hoursElement.innerText = `${current}hrs`;
    const messageElement = card.querySelector('.previous-hours');
    messageElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
})

const createReportCards = ((element, timeframe) => {
    let title = element['title'];
    let current = element['timeframes'][timeframe]['current'];
    let previous = element['timeframes'][timeframe]['previous'];
    
    return `
    <div class="card ${title.toLowerCase().replace(/\s/g,'-')}">
        <div class="card-content">

        <div class="row">
            <h4 class="title">${title}</h4>
            <img src="./images/icon-ellipsis.svg" alt="" class="btn-option">
        </div>

        <div class="row-2">
            <h2 class="current-hours">${current}hrs</h2>
            <h6 class="previous-hours">${timeframeMsg[timeframe]} - ${previous}hrs</h6>
        </div>

        </div>
    </div>`
})

