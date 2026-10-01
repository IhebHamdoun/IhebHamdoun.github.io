console.log("site.js is linked correctly.");

// send a secret message, Zelda-style
localStorage.setItem(
  "It's a secret to everybody.",
  'A wise man once bombed a cave wall for less. Hope your grading goes well!'
)

// grab the welcome div
const welcomeDiv = document.querySelector('#welcome')

// figure out the time of day
const hours = new Date().getHours() // get the current hour

const isMorning = hours >= 4 && hours < 12 // is it morning?
const isAfternoon = hours >= 12 && hours < 17 // is it afternoon?
const isEvening = hours >= 17 || hours < 4 // is it evening?

// build the appropriate message
let message = ''

if (isMorning) {
  message = 'Good morning! Hope your day is off to a great start.'
} else if (isAfternoon) {
  message = 'Good afternoon! Thanks for stopping by.'
} else if (isEvening) {
  message = 'Good evening! Glad you could visit.'
}

// display the message on the page
welcomeDiv.textContent = message