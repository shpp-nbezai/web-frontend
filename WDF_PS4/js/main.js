let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        winner: {},
        battleRules: [
            { fire        : 'wood' },
            { wood        : 'electricity'},
            { electricity : 'water'},
            { water       : 'fire'}
        ],
        fighterOne: {
            name: 'Ahiles',
            elements: [ 'fire', 'wood', 'electricity', 'water'],
            element: '',
            experience: 0,
            level: 0
        },
        fighterTwo: {
            name: 'Hektor',
            elements: [ 'fire', 'wood', 'electricity', 'water'],
            element: '',
            experience: 0,
            level: 1
        }

    },
    methods: {
        clearPlayer: function( player ) {
            player.name = '';
            player.element = '';
            player.experience = 0;
            player.level = 0;
        },
        levelUp: function (player ) {
            let temp = player.experience / 500;
            if ( ( temp % 2 ) === 0 ) {
                player.level += 1;
            }
        },
        experienceUp: function ( player ) {
          player.experience += 500;
          this.levelUp( player );
        },
        checkLevelCase: function( player1, player2 ){
            return player1.level > player2.level;
        },
        upFighterOne() {
            this.winner = this.fighterOne.name;
            this.experienceUp( this.fighterOne );
        },
        upFighterTwo() {
            this.winner = this.fighterTwo.name;
            this.experienceUp( this.fighterTwo );
        },
        fight: function () {
            if ( this.checkLevelCase( this.fighterOne, this.fighterTwo ) ) {
                this.winner = this.fighterOne;
                this.experienceUp( this.fighterOne );
                this.clearPlayer( this.fighterTwo );
            } else {
                this.winner = this.fighterTwo;
                this.experienceUp( this.fighterTwo );
                this.clearPlayer( this.fighterOne );
            }
        }
    }
});
