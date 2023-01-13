const ATTACK_VALUE = 10;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let monsterPercentage = 100;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  const damage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damage;
  monsterPercentage -= ATTACK_VALUE;
  monsterPercentReduce(monsterPercentage); 
}

attackBtn.addEventListener('click', attackHandler);