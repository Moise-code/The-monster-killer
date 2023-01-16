const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 20;
const HEAL_VALUE = 22;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

// log events

const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

// promt show a dialog allow user to enter the value
let chosenMaxLife;
function getMaxLifeValues() {
  const enteredValuee = prompt("Maximum life for you and the monster", "100");
  const parsedValue = parseInt(enteredValuee);
  if (isNaN(chosenMaxLife || chosenMaxLife <= 0)) {
    throw { message: "invalid user input not a number." };
  }
  return parsedValue;
}

try{
  chosenMaxLife = getMaxLifeValues();

} catch(error){
  console.log(error);
  chosenMaxLife = 100;
  alert('you entered something wrong and the number you have entered is wrong.')
} finally{
  
}

let battleLog = [];

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let monsterPercentage = 100;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry;
  if (ev === LOG_EVENT_PLAYER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: "MONSTER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: "MONSTER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: ev,
      value: val,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: ev,
      value: val,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}
// attack ,omster function that we are going to call everywhere.

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  // call the write to log function

  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentMonsterHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("you would be dead but your bonus life recovered you.");
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you won the Game cop");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Player Won",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("the monster killed you. sorry you lost the game");

    alert("you won the Game cop");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Monster Won",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("You both have a draw.");
    alert("you won the Game cop");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "The draw occured.",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  // lets refactor the if statements bellow.
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  let logEvent =
    mode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;

  // if (mode === MODE_ATTACK) {
  //   maxDamage = ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATTACK;
  // } else if (mode === MODE_STRONG_ATTACK) {
  //   maxDamage = STRONG_ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  // }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  // monsterPercentage -= ATTACK_VALUE;
  alert("you won the Game cop");
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}
function attackHandler() {
  attackMonster(MODE_ATTACK);
  // monsterPercentReduce(monsterPercentage - ATTACK_VALUE);
}
function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValuwing;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("you can't heal to more than your max initial health.");
    healValuwing = chosenMaxLife - currentPlayerHealth;
  } else {
    healValuwing = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;

  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValuwing,
    currentMonsterHealth,
    currentPlayerHealth
  );

  endRound();
}

function printLogHandler() {
  // lets use for loop
  for (let i = 0; i < 3; i++) {
    console.log("----------------");
  }
  for (const logEntry of battleLog) {
    console.log(logEntry);
    for (const key in logEntry) {
      console.log(key);
      console.log(logEntry["event"]);
    }
  }
  console.log(battleLog);
}

strongAttackBtn.addEventListener("click", strongAttackHandler);
attackBtn.addEventListener("click", attackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);

// How to use the ternary operators to reset the if statement//

// const userName = isLogin?'MAX':null;

// in the above example, isLogin is the condition
// Max is the value if the condition is true
// null is the value if the condition is false.
// that means that if the user is loged in the solution become Max, while if the user is not loged in
// the solution brcome null.

// foa switch case;
// switch (event) {

// case 1 :
// solution;
// break;
// }
// and thats it you can know from it.

// sample on the loops//

// for-of loop //
/* for-of loop execute for every element in an array*/
/* eg for(const el of array){
  console.log(el)
} */
// for-in loop
/* for-in loop just executes every key in the object.*/
/* eg for (const key in obj){
  console.log(key);
  console.log(obj[key]);
} */
//
