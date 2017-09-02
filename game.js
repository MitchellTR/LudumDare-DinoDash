
        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
            preload: preload
            , create: create
            , update: update
        });

        var platformValues = [true, true, true, true, true];
        var platforms = [];
        var scoreValues = [0, 0, 0, 0, 0, 0];
        var scoreDigits = [];
        var score = 0;
        var rex, rexHead, rexBurn, rexJump, health, alien1, alien2, alien3, legBang, ufo1, ufo2, ufo3, ufo3Ray, ufo4Ray, ufo4, ufoBang;
        var start, jump, eat, hurt;
        var airborn = false;
        var jumplock = 0;
        var downlock = 0;
        var healthLevel = 5;
        var chaosCounter = 4;
        var chaosCounterInterval = 4;
        var loopTimer;
        var prevScore = 0;
        var timerMult = .8;
        var play = false;

        function preload() {
            this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.scale.setScreenSize();
            this.game.scale.refresh();
            game.load.image('bg', 'assets/bg.png');
            game.load.image('platform', 'assets/platform.png');
            game.load.image('platformEmpty', 'assets/platformEmpty.png');
            game.load.image('rexEmpty', 'assets/rexEmpty.png');
            game.load.image('rex1', 'assets/rex1.png');
            game.load.image('rex2', 'assets/rex2.png');
            game.load.image('headEmpty', 'assets/headEmpty.png');
            game.load.image('headUp', 'assets/headUp.png');
            game.load.image('headDown', 'assets/headDown.png');
            game.load.image('burn', 'assets/rexBurn.png');
            game.load.image('burnEmpty', 'assets/rexBurnEmpty.png');
            game.load.image('jump', 'assets/rexJump.png');
            game.load.image('jumpEmpty', 'assets/rexJumpEmpty.png');
            game.load.image('health0', 'assets/health0.png');
            game.load.image('health1', 'assets/health1.png');
            game.load.image('health2', 'assets/health2.png');
            game.load.image('health3', 'assets/health3.png');

            game.load.image('health4', 'assets/health4.png');

            game.load.image('health5', 'assets/health5.png');

            game.load.image('score', 'assets/score.png');

            game.load.image('zero', 'assets/0.png');

            game.load.image('one', 'assets/1.png');

            game.load.image('two', 'assets/2.png');

            game.load.image('three', 'assets/3.png');

            game.load.image('four', 'assets/4.png');

            game.load.image('five', 'assets/5.png');

            game.load.image('six', 'assets/6.png');

            game.load.image('seven', 'assets/7.png');

            game.load.image('eight', 'assets/8.png');

            game.load.image('nine', 'assets/9.png');

            game.load.image('alienCrunchEmpty', 'assets/alienCrunchEmpty.png');

            game.load.image('alienCrunch', 'assets/alienCrunch.png');

            game.load.image('alien1', 'assets/alien1.png');

            game.load.image('alien1Empty', 'assets/alien1Empty.png');

            game.load.image('alien2', 'assets/alien2.png');

            game.load.image('alien2Empty', 'assets/alien2Empty.png');

            game.load.image('alien3', 'assets/alien3.png');

            game.load.image('alien3Empty', 'assets/alien3Empty.png');

            game.load.image('legBang', 'assets/legBang.png');

            game.load.image('legBangEmpty', 'assets/legBangEmpty.png');

            game.load.image('ufo4Ray', 'assets/ufo4Ray.png');

            game.load.image('ufo4RayEmpty', 'assets/ufo4RayEmpty.png');

            game.load.image('ufo4', 'assets/ufo4.png');

            game.load.image('ufo4Empty', 'assets/ufo4Empty.png');

            game.load.image('ufo1', 'assets/ufo1.png');

            game.load.image('ufo1Empty', 'assets/ufo1Empty.png');

            game.load.image('ufo2', 'assets/ufo2.png');

            game.load.image('ufo2Empty', 'assets/ufo2Empty.png');

            game.load.image('ufo3', 'assets/ufo3.png');

            game.load.image('ufo3Empty', 'assets/ufo3Empty.png');

            game.load.image('ufo3Ray', 'assets/ufo3Ray.png');

            game.load.image('ufo3RayEmpty', 'assets/ufo3RayEmpty.png');

            game.load.image('ufoBang', 'assets/ufoBang.png');

            game.load.image('ufoBangEmpty', 'assets/ufoBangEmpty.png');



            game.load.audio('start', 'assets/start.wav');

            game.load.audio('jump', 'assets/jump.wav');

            game.load.audio('eat', 'assets/eat.wav');

            game.load.audio('hurt', 'assets/hurt.wav');

        }





        function create() {

            start = game.add.audio('start');

            jump = game.add.audio('jump');

            eat = game.add.audio('eat');

            hurt = game.add.audio('hurt');

            start.play();

            var healthWidth = game.cache.getImage('health5').width;

            var rightPadding = 20;

            game.add.image(0, 0, 'bg');

            rex = game.add.sprite(-1, 309, 'rex1');

            rexHead = game.add.sprite(345, 288, 'headUp');

            rexBurn = game.add.sprite(195, 475, 'burnEmpty');

            rexJump = game.add.sprite(5, 40, 'jumpEmpty');

            alienCrunch = game.add.sprite(340, 375, 'alienCrunchEmpty');

            alien1 = game.add.sprite(660, 375, 'alien1Empty');

            alien2 = game.add.sprite(520, 390, 'alien2Empty');

            alien3 = game.add.sprite(385, 410, 'alien3Empty');

            legBang = game.add.sprite(277, 413, 'legBangEmpty');

            ufo1 = game.add.sprite(610, 60, 'ufo1Empty');

            ufo2 = game.add.sprite(420, 50, 'ufo2Empty');

            ufo3 = game.add.sprite(266, 34, 'ufo3Empty');

            ufo3Ray = game.add.sprite(220, 76, 'ufo3RayEmpty');

            ufo4 = game.add.sprite(18, 18, 'ufo4Empty');

            ufoBang = game.add.sprite(247, 22, 'ufoBangEmpty');

            ufo4Ray = game.add.sprite(50, 50, 'ufo4RayEmpty');

            health = game.add.sprite(game.world.width - healthWidth - rightPadding, 175, 'health' + healthLevel);

            createScoreDisplay();

            createPlatforms();

            loopTimer = game.time.events.loop(Phaser.Timer.SECOND * timerMult, step, this);

        }



        function addGap() {

            platformValues[5] = false;

        }



        function addUfo() {

            if (getTextureName(ufo1) == 'ufo1Empty') {

                ufo1.loadTexture('ufo1');

            }

        }



        function advanceUfo() {

            if (getTextureName(ufo1) == 'ufo1') {

                ufo1.loadTexture('ufo1Empty');

                ufo2.loadTexture('ufo2');

            } else if (getTextureName(ufo2) == 'ufo2') {

                ufo2.loadTexture('ufo2Empty');

                ufo3.loadTexture('ufo3');

            } else if (getTextureName(ufo3Ray) == 'ufo3Ray') {

                if (getTextureName(ufoBang) == 'ufoBang') {

                    // Caught UFO in teeth, stop the ray, kill the ship

                    ufo3Ray.loadTexture('ufo3RayEmpty');

                    ufoBang.loadTexture('ufoBangEmpty');

                    ufo3.loadTexture('ufo3Empty');

                    prevScore = score;

                    eat.play();

                    score += 300;

                    updateScoreDisplay();

                } else {

                    // still haven't killed the ship, continue the ray

                    hurt.play();

                    healthLevel--;

                    updateHealthDisplay();

                }

            } else if (getTextureName(ufo3) == 'ufo3') {

                if (getTextureName(ufoBang) == 'ufoBang') {

                    // Caught UFO in teeth

                    ufo3.loadTexture('ufo3Empty');

                    ufoBang.loadTexture('ufoBangEmpty');

                    prevScore = score;

                    eat.play();

                    score += 300;

                    updateScoreDisplay();

                } else {

                    // Missed UFO, start the ray

                    ufo3Ray.loadTexture('ufo3Ray');

                    hurt.play();

                    healthLevel--;

                    updateHealthDisplay();

                }

            }

        }



        function addAlien() {

            if (getTextureName(alien1) == 'alien1Empty') {

                alien1.loadTexture('alien1');

            }

        }



        function advanceAlien() {

            if (getTextureName(alien1) == 'alien1') {

                alien1.loadTexture('alien1Empty');

                alien2.loadTexture('alien2');

            } else if (getTextureName(alien2) == 'alien2') {

                alien2.loadTexture('alien2Empty');

                alien3.loadTexture('alien3');

            } else if (getTextureName(alien3) == 'alien3') {

                alien3.loadTexture('alien3Empty');

                if (getTextureName(alienCrunch) != 'alienCrunch') {

                    legBang.loadTexture('legBang');

                    hurt.play();

                    healthLevel--;

                    updateHealthDisplay();

                } else {

                    alienCrunch.loadTexture('alienCrunchEmpty');

                }

            } else if (getTextureName(legBang) == 'legBang') {

                legBang.loadTexture('legBangEmpty');

            }

        }



        function update() {

            //Up - Jump

            if (play && (game.input.keyboard.isDown(Phaser.Keyboard.W) && jumplock == 0) ||

                (play && game.input.activePointer.x < game.world.centerX

                    && game.input.activePointer.isDown && jumplock == 0)) {

                if (getTextureName(rex) != 'rexEmpty') {

                    jump.play();

                    rex.loadTexture('rexEmpty');

                    rexHead.loadTexture('headEmpty');

                    rexJump.loadTexture('jump');

                    jumplock += 3;

                    if (getTextureName(ufo3) == 'ufo3') {

                        ufoBang.loadTexture('ufoBang');

                    }

                }

            }



            //Down - Crunch

            if (play && (game.input.keyboard.isDown(Phaser.Keyboard.D) && downlock == 0) ||

                play && game.input.activePointer.x > game.world.centerX &&

                game.input.activePointer.isDown && downlock == 0) {

                if (getTextureName(rex) != 'rexEmpty') {

                    headDown();

                }

            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER) && !play) {
                start.play();
                play = true;
            }

        }





        function headDown() {

            rexHead.loadTexture('headDown');

            if (getTextureName(alien3) == 'alien3') {

                alienCrunch.loadTexture('alienCrunch');

                prevScore = score;

                eat.play();

                score += 200;

                updateScoreDisplay();

            }

            downlock += 2;

        }



        function rexLand() {

            rexJump.loadTexture('jumpEmpty');

            rex.loadTexture('rex1');

            rexHead.loadTexture('headUp');

        }



        function rexFall() {

            rex.loadTexture('rexEmpty');

            rexHead.loadTexture('headEmpty');

            rexBurn.loadTexture('burn');

            if (healthLevel > 0) {

                hurt.play();

                healthLevel--;

                updateHealthDisplay();

            }

        }



        function updateHealthDisplay() {

            health.loadTexture('health' + healthLevel);

        }



        function getTextureName(sprite) {

            return sprite.texture.baseTexture.source.name;

        }



        function step() {

            if (healthLevel > 0 && play) {

                //Set airborn var if mid-air

                if (!airborn && getTextureName(rexJump) != 'jumpEmpty') {

                    airborn = true;

                    if (!platformValues[2]) {

                        prevScore = score;

                        score += 50;

                        updateScoreDisplay();

                    }

                } else if (airborn) {

                    rexLand();

                    airborn = false;

                } //} else if (!platformValues[1] && getTextureName(rexJump) == 'jumpEmpty') {



                //    rexFall();

                //}



                //Reset if in the pit

                if (getTextureName(rexBurn) == 'burn') {

                    rexBurn.loadTexture('burnEmpty');

                    rexLand();

                }



                //If on the ground make rex take a step

                if (getTextureName(rexJump) != 'jump') {

                    advanceRexWalk();

                }



                //Move platforms no matter what

                advancePlatforms();



                //If head down, head back up

                if (getTextureName(rexHead) == 'headDown') {

                    rexHead.loadTexture('headUp');

                }



                //Drop Rex if he didn't jump over a hole

                if (!platformValues[1] && getTextureName(rex) != 'rexEmpty') {

                    rexFall();

                }



                //Decrement any jumplock

                if (jumplock > 0) {

                    jumplock--;

                }



                //Decrement any downlock

                if (downlock > 0) {

                    downlock--;

                }





                advanceAlien();

                advanceUfo();



                chaosCounter--;

                if (chaosCounter == 0) {

                    addChaos();

                    chaosCounter = chaosCounterInterval;

                }

            } else if (getTextureName(ufo3Ray) == 'ufo3Ray') {

                // Killed by ray, take him away

                hurt.play();

                ufo3.loadTexture('ufo3Empty');

                ufo3Ray.loadTexture('ufo3RayEmpty');

                ufo4.loadTexture('ufo4');

                ufo4Ray.loadTexture('ufo4Ray');

                rexJump.loadTexture('jump');

                rex.loadTexture('rexEmpty');

                rexHead.loadTexture('headEmpty');

            }

        }



        function addChaos() {

            var choice = Math.floor((Math.random() * 3) + 1);

            if (choice == 1) {

                addGap();

            } else if (choice == 2) {

                addAlien();

            } else if (choice == 3) {

                addUfo();

            }

        }



        function advancePlatforms() {

            platformValues.shift();

            //if (platformValues[0]) {

            //    platformValues[4] = true;

            //} else {

            //    platformValues[4] = false;

            //}

            platformValues[platformValues.length] = true;

            destroyPlatforms();

            createPlatforms();

        }



        function destroyPlatforms() {

            for (i = 0; i < 5; i++) {

                platforms[i].destroy();

            }

        }



        function advanceRexWalk() {

            var rexImage = getTextureName(rex);

            if (rexImage == 'rex1') {

                rex.loadTexture('rex2');

            } else if (rexImage == 'rex2') {

                rex.loadTexture('rex1');

            }

        }



        function createPlatforms() {

            var platformYPos = 465;

            var platformWidth = game.cache.getImage('platform').width;

            var platformSpacing = 32;

            for (i = 0; i < 5; i++) {

                platforms[i] = game.add.sprite(game.world.centerX - (platformWidth * 5 + platformSpacing * 4) / 2 + i * platformWidth + i * platformSpacing, platformYPos, getPlatformImage(platformValues[i]));

            }

        }



        function createScoreDisplay() {

            game.add.sprite(550, 20, 'score');

            var digitYPos = 20;

            var digitWidth = game.cache.getImage('zero').width;

            var digitSpacing = 5;

            for (i = 0; i < 6; i++) {

                scoreDigits[i] = game.add.sprite(645 + i * digitWidth + i * digitSpacing, digitYPos, 'zero');

            }

            updateScoreDisplay();

        }



        function updateScoreDisplay() {

            if (Math.floor(prevScore / 1000) != Math.floor(score / 1000)) {

                if (timerMult > 0.10) {

                    timerMult -= .1;

                    game.time.events.remove(loopTimer);

                    loopTimer = game.time.events.loop(Phaser.Timer.SECOND * timerMult, step, this);

                }

            }

            var scoreLength = score.toString().length;

            if (score < 1000000) {

                for (i = 0; i < scoreLength; i++) {

                    scoreDigits[5 - i].loadTexture(getTextureForNumberString(score.toString().charAt(scoreLength - i - 1)));

                };

            }

        }



        function getTextureForNumberString(number) {

            if (number == '0') {

                return 'zero';

            } else if (number == '1') {

                return 'one';

            } else if (number == '2') {

                return 'two';

            } else if (number == '3') {

                return 'three';

            } else if (number == '4') {

                return 'four';

            } else if (number == '5') {

                return 'five';

            } else if (number == '6') {

                return 'six';

            } else if (number == '7') {

                return 'seven';

            } else if (number == '8') {

                return 'eight';

            } else if (number == '9') {

                return 'nine';

            }

        }



        function getPlatformImage(platformBoolean) {

            if (platformBoolean) {

                return 'platform';

            } else {

                return 'platformEmpty';

            }

        }
    