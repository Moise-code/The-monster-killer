const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const bonusLifeEl = document.getElementById('bonus-life');
const MonsterPercent = document.getElementById('monsterP')

const attackBtn = document.querySelector('#attack-btn')
const strongAttackBtn = document.querySelector('#strong-attack-btn')
const healBtn = document.querySelector('#heal-btn')
const logBtn = document.querySelector('#log-btn')

function adjustHealthBars(maxLife){
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife
  playerHealthBar.value = maxLife;

}

function dealMonsterDamage(damage){
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function monsterPercentReduce(percent){
  MonsterPercent.textContent = percent;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}
