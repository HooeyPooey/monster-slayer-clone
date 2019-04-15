new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            //player damage
            var playerDamage = this.damageCal(2,5);
            this.monsterHealth -= playerDamage;
            this.turns.unshift({
                isPlayer: true,
                text: 'You attack monster for ' + playerDamage
            });
            if(this.checkWin()) {
                return;
            };
            //monster damage
            this.monsterDamage();
        },
        specialAttack: function() {
            //player special attack
            var specialAttack = this.damageCal(10,15);
            this.monsterHealth -= specialAttack;
            this.turns.unshift({
                isPlayer: true,
                text: 'You attack monster for ' + specialAttack + ' in special attack'
            });
            if(this.checkWin()) {
                return;
            }
            //monster damage
            this.monsterDamage();
        },
        heal: function() {
            //player heal
            var playerHeal = this.damageCal(10,15);
            this.playerHealth += playerHeal;
            this.turns.unshift({
                isPlayer: true,
                text: 'You heal yourself for ' + playerHeal
            });
            if (this.playerHealth>100) {
                this.playerHealth = 100;
            }
            //monster damage
            this.monsterDamage();
        },
        giveUp: function() {
            alert('YOU LOST!');
            this.gameIsRunning = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        damageCal: function(min, max) {
            return Math.max(Math.floor(Math.random()*max)+1, min);
        },
        checkWin: function() {
            if(this.monsterHealth<=0) {
                alert("YOU WIN!");
                this.startGame();
                return true;
            }else if (this.playerHealth<=0) {
                alert('YOU LOST!');
                this.startGame();
                return true;
            }
            return false;
        },
        monsterDamage: function(){
            //monster damage
            var monsterDamage = this.damageCal(5,10);
            this.playerHealth -= monsterDamage;
            this.turns.unshift({
                isPlayer: false,
                text: 'monster attack you for ' + monsterDamage
            });
            this.checkWin();
        }
    }
})