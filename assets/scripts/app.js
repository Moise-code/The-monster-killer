const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let monsterPercentage = 100;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  const damage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damage;
  monsterPercentage -= ATTACK_VALUE;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage; 
  if(currentMonsterHealth <= 0 && currentPlayerHealth ){
    alert('you won the Game cop')
  } else if(currentPlayerHealth <= 0){
    alert('the monster killed you. sorry you lost the game')
  }
  monsterPercentReduce(monsterPercentage); 
  monsterPosition = monsterPerntReduce('damage * monsterAttack * 4')
}

attackBtn.addEventListener('click', attackHandler);