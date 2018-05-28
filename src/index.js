import './index.css'

const PRICE = 32
const EAT_EACH_DAY = 3

function init () {
  placeholderAtLoad()
  bindEvents()
}

function placeholderAtLoad () {
  let collection = document.querySelectorAll('.js-salary, .js-number, .js-days');

  collection.forEach(item => {
    item.innerHTML = item.dataset.placeholder
  })

  setTimeout(() => {
    reCalcFieldWidth()
  }, 0)
}

function bindEvents () {
  let $salary = document.querySelector('.js-salary')

  $salary.addEventListener('focus', onFocusSalary)
  $salary.addEventListener('blur', onBlurSalary)
  $salary.addEventListener('keyup', onChangeSalary)
}

function onChangeSalary (event) {
  let parsed = parseInt(event.target.innerText)

  if (Number.isNaN(parsed) || parsed < PRICE) {
    return false
  } else {
    output(parsed)
  }
}

function output (salary) {
  let result = calc(salary)
  let $number = document.querySelector('.js-number')
  let $days = document.querySelector('.js-days')

  $number.innerText = declint($number, result)
  $days.innerText = declint($days, calcDays(result))
}

function onFocusSalary (event) {
  let parsed = parseInt(event.target.innerText)

  if (Number.isNaN(parsed)) {
    event.target.innerText = ''
    setTimeout(() => {
      event.target.focus(true)
    }, 0)
    
    return true
  } else {
    return false
  }
}

function onBlurSalary (event) {
  let parsed = parseInt(event.target.innerText)

  if (Number.isNaN(parsed) || parsed < PRICE) {
    placeholderAtLoad()
  }
}

function declint (el, number) {
  let stringSet = el.dataset.chars.split('|')

  return `${number} ${declOfNum(number, stringSet)}`
}

function declOfNum (n, titles) {
  return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}

function reCalcFieldWidth () {
  let $salary = document.querySelector('.js-salary')
  let width = $salary.offsetWidth

  $salary.style.minWidth = width + 'px'
}

function calc (salary) {
  return Math.ceil(salary / PRICE)
}

function calcDays (doshiracs) {
  return Math.ceil(doshiracs / EAT_EACH_DAY)
}

document.addEventListener('DOMContentLoaded', init)
