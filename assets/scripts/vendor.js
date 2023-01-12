// targeting the bars.

const monsterHealthBar = document.querySelector('#monster-health');
const playerHealthBar = document.querySelector('#player-health');
const bonusLifeEl = document.querySelector('#bonus-life');

// targeting the buttons to be used in the app.js

const attackBtn = document.querySelector('#attack-btn')
const strongAttackBtn = document.querySelector('#strong-attack-btn')
const healBtn = document.querySelector('#heal-btn')
const logBtn = document.querySelector('#log-btn')

// function to adjust the healthbars.
const adjustHealthBars = (maxLife) =>{
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife
  playerHealthBar.value = maxLife;
}

// function to deal monster damage

const dealmonsterDamage = (damage) =>{
  const dealDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealDamage;
  return dealDamage;
}
