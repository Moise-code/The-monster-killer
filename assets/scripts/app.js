const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 20;
const HEAL_VALUE = 22;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

// promt show a dialog allow user to enter the value

const enteredValuee = prompt('Maximum life for you and the monster', '100')
let chosenMaxLife = parseInt(enteredValuee);

if(isNaN(chosenMaxLife || chosenMaxLife <=0)){
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let monsterPercentage = 100;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset(){
 currentMonsterHealth = chosenMaxLife;
 currentPlayerHealth = chosenMaxLife;
 resetGame(chosenMaxLife);
}
// attack ,omster function that we are going to call everywhere.

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {

    hasBonusLife = false;
    removeBonusLife();
    currentMonsterHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('you would be dead but your bonus life recovered you.');
     
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {

    alert('you won the Game cop');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('the monster killed you. sorry you lost the game')
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You both have a draw.')
  }

  if(currentMonsterHealth <= 0 || currentPlayerHealth <= 0)
  {
      reset()
  }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  // monsterPercentage -= ATTACK_VALUE; 
  endRound();

}
function attackHandler() {
  attackMonster(MODE_ATTACK)
  // monsterPercentReduce(monsterPercentage - ATTACK_VALUE); 

}
function strongAttackHandler() {

  attackMonster(MODE_STRONG_ATTACK)
}

function healPlayerHandler() {
  let healValuwing;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("you can't heal to more than your max initial health.")
    healValuwing = chosenMaxLife - currentPlayerHealth;
  } else {
    healValuwing = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound();
}

strongAttackBtn.addEventListener('click', strongAttackHandler)
attackBtn.addEventListener('click', attackHandler);
healBtn.addEventListener('click', healPlayerHandler);