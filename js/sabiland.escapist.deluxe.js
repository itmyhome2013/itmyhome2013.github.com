/*
* Escapist Deluxe jQuery plugin - v1.0
* Fully randomized animations
* Code - Marko Sabotin (2010 - June)
*
* - width must be a number > 0
* - height must be a number > 0
* - ticklength must be a number > 0
* - numofrunners must be a number: >= 1 (1 == RANDOM)
*/
(function ($) {
   $.fn.extend({

      escapistdeluxe: function (options) {

         var defaults = {
            width: 300, // Width
            height: 80,   // Height
            ticklength: 33, // Miliseconds per tick (33 == ~ 30FPS) / Animation speed
            numofrunners: 1   // Number of runners (1 == RANDOM)
         };

         options = $.extend(defaults, options);

         return this.each(function () {
            var o = options;

            // Check input-settings
            try {
               o.width = Math.abs(parseInt(o.width, 10));
               o.height = Math.abs(parseInt(o.height, 10));
               o.ticklength = Math.abs(parseInt(o.ticklength, 10));
               o.numofrunners = Math.abs(parseInt(o.numofrunners, 10));
            }
            catch (err) {
               // Incorrect settings
               return;
            }

            // Check if reasonable settings
            if (
               o.width <= 0
               ||
               o.height <= 0
               ||
               o.ticklength <= 0
               ||
               o.numofrunners < 1) {
               return;
            }

            var tickAnimReset;
            var animResetMinTime = 30000; // Milisec
            var cnvDrawing = $(this)[0];
            var tickAnim;
            var timerMiliSecs = o.ticklength;
            var numOfRunnersFromSettings = o.numofrunners;

            // Global object holding settings
            var animGS;

            /*
            unLoad
            */
            function stopAnim() {
               if (tickAnim) {
                  clearTimeout(tickAnim);
               }

               if (tickAnimReset) {
                  clearTimeout(tickAnimReset);
               }

               var newRandResetTime = parseInt(calcRndGenMinMax(animResetMinTime, 20 * animResetMinTime), 10);

               tickAnimReset = setTimeout(autoResetEscapistDeluxe, newRandResetTime);
               return;
            }

            function autoResetEscapistDeluxe() {
               startAnim();
            }

            // Rand min-max
            function calcRndGenMinMax(min, max) {

               return Math.round(Math.random() * (max - min)) + min;
            }

            // Rand to max
            function calcRndGen(max, bInt) {

               return bInt === true ?
        parseInt(Math.random() * max, 10)
        :
        (Math.random() * max);
            }

            // Background Color modification
            function modifyBackGroundColor(animGS) {

               // R
               if (Math.random() > 0.5) {

                  if (animGS.clrIncUpR) {
                     // Check for UP
                     if ((animGS.backR + animGS.clrPlus) > 255) {
                        animGS.clrIncUpR = !animGS.clrIncUpR;
                     }
                  }
                  else {
                     // Check for DOWN
                     if ((animGS.backR - animGS.clrPlus) < 0) {
                        animGS.clrIncUpR = !animGS.clrIncUpR;
                     }
                  }

                  animGS.backR +=
            animGS.clrIncUpR === true ?
            animGS.clrPlus
            :
            -animGS.clrPlus;
               }

               // G
               if (Math.random() > 0.5) {

                  if (animGS.clrIncUpG) {
                     // Check for UP
                     if ((animGS.backG + animGS.clrPlus) > 255) {
                        animGS.clrIncUpG = !animGS.clrIncUpG;
                     }
                  }
                  else {
                     // Check for DOWN
                     if ((animGS.backG - animGS.clrPlus) < 0) {
                        animGS.clrIncUpG = !animGS.clrIncUpG;
                     }
                  }

                  animGS.backG +=
            animGS.clrIncUpG === true ?
            animGS.clrPlus
            :
            -animGS.clrPlus;
               }

               // B
               if (Math.random() > 0.5) {

                  if (animGS.clrIncUpB) {
                     // Check for UP
                     if ((animGS.backB + animGS.clrPlus) > 255) {
                        animGS.clrIncUpB = !animGS.clrIncUpB;
                     }
                  }
                  else {
                     // Check for DOWN
                     if ((animGS.backB - animGS.clrPlus) < 0) {
                        animGS.clrIncUpB = !animGS.clrIncUpB;
                     }
                  }

                  animGS.backB +=
            animGS.clrIncUpB === true ?
            animGS.clrPlus
            :
            -animGS.clrPlus;
               }

               // Possible gradient second color
               // R
               if (Math.random() > 0.5) {

                  if (animGS.GRclrIncUpR) {
                     // Check for UP
                     if ((animGS.GRbackR + animGS.GRclrPlus) > 255) {
                        animGS.GRclrIncUpR = !animGS.GRclrIncUpR;
                     }
                  }
                  else {
                     // Check for DOWN
                     if ((animGS.GRbackR - animGS.GRclrPlus) < 0) {
                        animGS.GRclrIncUpR = !animGS.GRclrIncUpR;
                     }
                  }

                  animGS.GRbackR +=
            animGS.GRclrIncUpR === true ?
            animGS.GRclrPlus
            :
            -animGS.GRclrPlus;
               }

               // G
               if (Math.random() > 0.5) {

                  if (animGS.GRclrIncUpG) {
                     // Check for UP
                     if ((animGS.GRbackG + animGS.GRclrPlus) > 255) {
                        animGS.GRclrIncUpG = !animGS.GRclrIncUpG;
                     }
                  }
                  else {
                     // Check for DOWN
                     if ((animGS.GRbackG - animGS.GRclrPlus) < 0) {
                        animGS.GRclrIncUpG = !animGS.GRclrIncUpG;
                     }
                  }

                  animGS.GRbackG +=
            animGS.GRclrIncUpG === true ?
            animGS.GRclrPlus
            :
            -animGS.GRclrPlus;
               }

               // B
               if (Math.random() > 0.5) {

                  if (animGS.GRclrIncUpB) {
                     // Check for UP
                     if ((animGS.GRbackB + animGS.GRclrPlus) > 255) {
                        animGS.GRclrIncUpB = !animGS.GRclrIncUpB;
                     }
                  }
                  else {
                     // Check for DOWN
                     if ((animGS.GRbackB - animGS.GRclrPlus) < 0) {
                        animGS.GRclrIncUpB = !animGS.GRclrIncUpB;
                     }
                  }

                  animGS.GRbackB +=
            animGS.GRclrIncUpB === true ?
            animGS.GRclrPlus
            :
            -animGS.GRclrPlus;
               }

            }

            function simplePoint(_x, _y) {
               this.x = _x;
               this.y = _y;

               return;
            }

            // Runners Color modification
            function modifyRunnerColor(oneRunner) {

               // R
               if (oneRunner.clrIncUpR) {
                  // Check for UP
                  if ((oneRunner.backR + oneRunner.clrPlus) > 255) {
                     oneRunner.clrIncUpR = !oneRunner.clrIncUpR;
                  }
               }
               else {
                  // Check for DOWN
                  if ((oneRunner.backR - oneRunner.clrPlus) < 0) {
                     oneRunner.clrIncUpR = !oneRunner.clrIncUpR;
                  }
               }

               oneRunner.backR +=
            oneRunner.clrIncUpR === true ?
            oneRunner.clrPlus
            :
            -oneRunner.clrPlus;

               // G
               if (oneRunner.clrIncUpG) {
                  // Check for UP
                  if ((oneRunner.backG + oneRunner.clrPlus) > 255) {
                     oneRunner.clrIncUpG = !oneRunner.clrIncUpG;
                  }
               }
               else {
                  // Check for DOWN
                  if ((oneRunner.backG - oneRunner.clrPlus) < 0) {
                     oneRunner.clrIncUpG = !oneRunner.clrIncUpG;
                  }
               }

               oneRunner.backG +=
            oneRunner.clrIncUpG === true ?
            oneRunner.clrPlus
            :
            -oneRunner.clrPlus;

               // B
               if (oneRunner.clrIncUpB) {
                  // Check for UP
                  if ((oneRunner.backB + oneRunner.clrPlus) > 255) {
                     oneRunner.clrIncUpB = !oneRunner.clrIncUpB;
                  }
               }
               else {
                  // Check for DOWN
                  if ((oneRunner.backB - oneRunner.clrPlus) < 0) {
                     oneRunner.clrIncUpB = !oneRunner.clrIncUpB;
                  }
               }

               oneRunner.backB +=
            oneRunner.clrIncUpB === true ?
            oneRunner.clrPlus
            :
            -oneRunner.clrPlus;

               // Catch me colors modification !!!

               // R
               if (oneRunner.CMclrIncUpR) {
                  // Check for UP
                  if ((oneRunner.CMbackR + oneRunner.CMclrPlus) > 255) {
                     oneRunner.CMclrIncUpR = !oneRunner.CMclrIncUpR;
                  }
               }
               else {
                  // Check for DOWN
                  if ((oneRunner.CMbackR - oneRunner.CMclrPlus) < 0) {
                     oneRunner.CMclrIncUpR = !oneRunner.CMclrIncUpR;
                  }
               }

               oneRunner.CMbackR +=
            oneRunner.CMclrIncUpR === true ?
            oneRunner.CMclrPlus
            :
            -oneRunner.CMclrPlus;

               // G
               if (oneRunner.CMclrIncUpG) {
                  // Check for UP
                  if ((oneRunner.CMbackG + oneRunner.CMclrPlus) > 255) {
                     oneRunner.CMclrIncUpG = !oneRunner.CMclrIncUpG;
                  }
               }
               else {
                  // Check for DOWN
                  if ((oneRunner.CMbackG - oneRunner.CMclrPlus) < 0) {
                     oneRunner.CMclrIncUpG = !oneRunner.CMclrIncUpG;
                  }
               }

               oneRunner.CMbackG +=
            oneRunner.CMclrIncUpG === true ?
            oneRunner.CMclrPlus
            :
            -oneRunner.CMclrPlus;

               // B
               if (oneRunner.CMclrIncUpB) {
                  // Check for UP
                  if ((oneRunner.CMbackB + oneRunner.CMclrPlus) > 255) {
                     oneRunner.CMclrIncUpB = !oneRunner.CMclrIncUpB;
                  }
               }
               else {
                  // Check for DOWN
                  if ((oneRunner.CMbackB - oneRunner.CMclrPlus) < 0) {
                     oneRunner.CMclrIncUpB = !oneRunner.CMclrIncUpB;
                  }
               }

               oneRunner.CMbackB +=
            oneRunner.CMclrIncUpB === true ?
            oneRunner.CMclrPlus
            :
            -oneRunner.CMclrPlus;
            }

            /*
            Get random color RGB
            */
            function getRandomColorRGB() {
               return 'rgb(' + calcRndGen(255, true).toString() + "," + calcRndGen(255, true).toString() + "," + calcRndGen(255, true).toString() + ')';
            }

            /*
            Get random color RGBA
            */
            function getRandomColorRGBA() {
               return 'rgba(' + calcRndGen(255, true).toString() + "," + calcRndGen(255, true).toString() + "," + calcRndGen(255, true).toString() + "," + Math.random().toString() + ')';
            }

            /*
            Build RGB color
            */
            function buildColorRGB(r, g, b) {
               return 'rgb(' + r.toString() + "," + g.toString() + "," + b.toString() + ')';
            }

            /*
            Build RGBA color
            */
            function buildColorRGBA(r, g, b, a) {
               return 'rgba(' + r.toString() + "," + g.toString() + "," + b.toString() + "," + a.toString() + ')';
            }

            /* RANDOM-CUSTOM-SETTINGS METHODS */

            /*
            Get random color component increment
            */
            function getRandomColorIncrementValue() {
               return calcRndGenMinMax(1, 8);
            }

            /*
            Get random color component increment - FOR BACKGROUND
            */
            function getRandomColorIncrementValueForBackground() {
               return calcRndGenMinMax(1, 2);
            }

            /*
            Get random starting number of runners
            */
            function getRandomStartingNumberOfRunners() {
               return calcRndGenMinMax(2, 60);  // (v2 tweak)
            }

            /*
            Runners starting random alpha channel
            */
            function getRandomStartingRunnerAlphaComponent() {
               var minA = 0.3;

               minA += Math.random() * 0.7;

               if (minA > 1) {
                  minA = 1;
               }

               return minA;
            }

            /* END: RANDOM-CUSTOM-SETTINGS METHODS */

            /*
            One runner motion
            */
            function oneAnimRunnerMotion() {
               this.motionX = 0;
               this.motionY = 0;
            }

            /*
            One anim runner
            */
            function oneAnimRunner(
    startingSizeRadius,
    areaWidth,
    areaHeight,
    startingAlpha,
    startingR,
    startingG,
    startingB,
    startingClrPlus,
    startingRunnerClrIncUpR,
    startingRunnerClrIncUpG,
    startingRunnerClrIncUpB) {

               // Runner motion object
               this.runnerMotion = new oneAnimRunnerMotion();

               // RunnerStates
               this.iAmToCatch = false;

               // Runner Colors
               this.backR = startingR;
               this.backG = startingG;
               this.backB = startingB;
               this.backA = startingAlpha;
               this.clrPlus = startingClrPlus;
               this.clrIncUpR = startingRunnerClrIncUpR;
               this.clrIncUpG = startingRunnerClrIncUpG;
               this.clrIncUpB = startingRunnerClrIncUpB;

               // CatchMe colors
               this.CMbackR = calcRndGen(255, true);
               this.CMbackG = calcRndGen(255, true);
               this.CMbackB = calcRndGen(255, true);
               this.CMbackA = getRandomStartingRunnerAlphaComponent();
               this.CMclrPlus = getRandomColorIncrementValue();
               this.CMclrIncUpR = Math.random() > 0.5;
               this.CMclrIncUpG = Math.random() > 0.5;
               this.CMclrIncUpB = Math.random() > 0.5;

               // Runner radius
               this.runnerRadius = startingSizeRadius;

               // Random starting position
               this.runnerX = calcRndGenMinMax(2 * startingSizeRadius, areaWidth - (2 * startingSizeRadius));
               this.runnerY = calcRndGenMinMax(2 * startingSizeRadius, areaHeight - (2 * startingSizeRadius));

               // Increments every time this runner catches the escapist
               this.howManyDidIRespawn = 0;
               this.howManyToRespawnToDie = calcRndGenMinMax(1, 2);
            }

            /*
            Global settings
            */
            function animGlobalSettings(startingCanvasWidth, startingCanvasHeight) {

               // Width, Height
               this.cnvWidth = startingCanvasWidth;
               this.cnvHeight = startingCanvasHeight;

               // 2D Drawing context
               this.ctx = cnvDrawing.getContext('2d');

               // Extras (29122009)
               this.runnersWholeMotionLogicType = 1;  // We USE 1 mode (ESCAPISTS MODE) MORE than OTHERS-EXTRAS-MODES !

               if (Math.random() > 0.5) {
                  this.runnersWholeMotionLogicType = calcRndGenMinMax(1, 12);
               }

               this.runnersMotionLogicExtrasForType11 = Math.random() > 0.5;

               this.runnersMotionLogicExtrasForType2 = Math.random() > 0.5;
               this.runnersMotionLogicExtrasForType3 = Math.random() > 0.5;

               // END: Extras (29122009)

               // FANCY GRAPHICS (v2 feature)
               this.howManyDrawingMotionStyles = 18;
               this.drawMotionPictureOnly = Math.random() > 0.5;
               this.firstBackgroundWasDrawn = false;
               this.drawMotionPictureMainStyleBrainDeadEnabled = Math.random() > 0.9;
               this.drawMotionPictureMainStyle = calcRndGenMinMax(1, this.howManyDrawingMotionStyles);

               this.drawMotionPictureMainStyleType17Rand1 = Math.random() > 0.5;
               this.drawMotionPictureMainStyleType17Rand2 = Math.random() > 0.5;

               this.drawMotionPictureRadiusTweakingType = calcRndGenMinMax(1, 3);
               this.drawMotionPictureCirclesDrawEdges = Math.random() > 0.5;
               this.drawMotionPictureDifferentDrawingTypes = calcRndGenMinMax(1, 2);
               this.motionPictureWickedLinesWidth = calcRndGenMinMax(1, 5);
               this.motionPictureSubSettingFillRegion = Math.random() > 0.5;
               this.motionPictureCumulativesVersionSpeedLikeLineWidth = Math.random() > 0.5;

               this.fadingBackgroundColorsInvertedFactor = calcRndGenMinMax(0, 255);
               this.fadingBackgroundAlwaysEnabled = Math.random() > 0.5;
               this.fadingBackgroundAlwaysFadingFactor = Math.random() / 6 + (0.001);
               this.fadingBackgroundStartParamEnabled = Math.random() > 0.3;
               this.fadingBackgroundStartParam = calcRndGenMinMax(970, 999) / 1000;
               this.fadeOutScreenHowManyTicks = o.ticklength;
               this.fadeOutScreenCurrentTicksCount = 0;

               // GLOBAL FOR TIP == 11 || TIP == 12
               this.motionPictureSpiralsDrawCumulativeCircle = Math.random() > 0.5;

               this.spiralAroundX = 0;
               this.spiralAroundY = 0;

               if (Math.random() > 0.5) {
                  // START SLIDING ON X

                  this.spiralAroundX = calcRndGenMinMax(1, this.cnvWidth);
                  this.spiralAroundY = Math.random() > 0.5 ? 0 : this.cnvHeight;
               }
               else {
                  // START SLIDING ON Y

                  this.spiralAroundX = Math.random() > 0.5 ? 0 : this.cnvWidth;
                  this.spiralAroundY = calcRndGenMinMax(1, this.cnvHeight);
               }
               // END: FANCY GRAPHICS (v2 feature)

               //Anim Background Colors
               this.backR = calcRndGen(255, true);
               this.backG = calcRndGen(255, true);
               this.backB = calcRndGen(255, true);
               this.clrPlus = getRandomColorIncrementValueForBackground();
               this.clrIncUpR = Math.random() > 0.5;
               this.clrIncUpG = Math.random() > 0.5;
               this.clrIncUpB = Math.random() > 0.5;
               this.useBackgroundFading = Math.random() > 0.5;

               // Possible second gradient color
               this.GRbackR = calcRndGen(255, true);
               this.GRbackG = calcRndGen(255, true);
               this.GRbackB = calcRndGen(255, true);
               this.GRclrPlus = getRandomColorIncrementValueForBackground();
               this.GRclrIncUpR = Math.random() > 0.5;
               this.GRclrIncUpG = Math.random() > 0.5;
               this.GRclrIncUpB = Math.random() > 0.5;
               this.useBackgroundGradient = Math.random() > 0.5;

               // Global for runners
               this.runnerMinSizeRadius = 1;
               this.runnerMaxSizeRadius = Math.round(this.cnvWidth / 60); // (v2 tweak)
               this.runnerMaxMotionMove = 3 + (Math.random() * this.runnerMaxSizeRadius); // (v2 tweak) Max single move (+- X, +- Y)
               this.runnerMaxMotionMovingStep = this.runnerMaxMotionMove / (30 - (Math.random() * 15)); // Max single random step
               this.runnerGrowShrink = this.runnerMinSizeRadius / 3;  // How much can runner grow/shrink per one special event
               this.runnerMaxMotionMoveEscaping = (4 / 3) * this.runnerMaxMotionMove; //  NOTE: Escapists little bit higher max. speed

               // Specific for runners drawings
               this.drawFromCenterToEyeLine = Math.random() > 0.5;
               this.drawEye = Math.random() > 0.5;
               this.fromCenterToEyeLineWidth = 1 + calcRndGen(1, false);
               this.eyeRadius = 1 + calcRndGen(1, false);
               this.drawFromCenterToEyeLineSpeedRepresentation = Math.random() > 0.5;

               // Some starting settings for runners
               this.runnerStartingRadius = calcRndGenMinMax(this.runnerMinSizeRadius, this.runnerMaxSizeRadius);

               // FROM starting (jQuery plugin) settings !
               // How many runners !
               this.howManyRunners = (numOfRunnersFromSettings === 1 ? getRandomStartingNumberOfRunners() : numOfRunnersFromSettings);

               this.runners = new Array(this.howManyRunners);  // All starting runners
               this.colorAlpha = getRandomStartingRunnerAlphaComponent();  // Alpha channel for runners
               var runnerStartingR = calcRndGen(255, true);
               var runnerStartingG = calcRndGen(255, true);
               var runnerStartingB = calcRndGen(255, true);
               var runnerStartingClrPlus = getRandomColorIncrementValue();
               var startingClrIncUpR = Math.random() > 0.5;
               var startingClrIncUpG = Math.random() > 0.5;
               var startingClrIncUpB = Math.random() > 0.5;

               // Global runners status-es
               this.isCatchingPhaseEscapingRunnerIndexes = new Array(this.howManyRunners);

               for (var p = 0; p < this.isCatchingPhaseEscapingRunnerIndexes.length; p++) {
                  this.isCatchingPhaseEscapingRunnerIndexes[p] = 0;  // In the beginning we have NO escapists !
               }

               for (var i = 0; i < this.runners.length; i++) {
                  this.runners[i] = new oneAnimRunner(
            this.runnerStartingRadius,
            this.cnvWidth,
            this.cnvHeight,
            this.colorAlpha,
            runnerStartingR,
            runnerStartingG,
            runnerStartingB,
            runnerStartingClrPlus,
            startingClrIncUpR,
            startingClrIncUpG,
            startingClrIncUpB);
               }

               this.numberOfRunnersStarting = this.runners.length;
               this.numberOfRunnersSpawned = 0;
               this.numberOfRunnersKilled = 0;

               // NOTE: This fake runner can be used in multiple scenarios...
               this.fakeAndHiddenRunner =
                  new oneAnimRunner(
                     this.runnerStartingRadius,
                     this.cnvWidth,
                     this.cnvHeight,
                     this.colorAlpha,
                     runnerStartingR,
                     runnerStartingG,
                     runnerStartingB,
                     runnerStartingClrPlus,
                     startingClrIncUpR,
                     startingClrIncUpG,
                     startingClrIncUpB);

               return;
            }

            /*
            Every now and then we TWEAK color increments a little bit
            */
            function tweakLittleBitRunnersIncColorComponents(oneRunner, clrPlusTweak, cRUp, cGUp, cBUp) {
               oneRunner.clrPlus = clrPlusTweak;

               oneRunner.clrIncUpR = cRUp;
               oneRunner.clrIncUpG = cGUp;
               oneRunner.clrIncUpB = cBUp;
            }

            /*
            Get two points distance
            */
            function getTwoPointsDistance(x1, y1, x2, y2) {
               return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            }

            /*
            Get angle (radians) between two points
            */
            function getAngleBetweenTwoPoints(x1, y1, x2, y2) {
               return Math.atan2(y2 - y1, x2 - x1);
            }

            // START RUNNERS MOTION LOGIC

            /*
            Grow/shrink runner
            */
            function growOrShrinkRunner(oneRunner, bGrow) {

               if (bGrow) {
                  // Try to grow runner
                  oneRunner.runnerRadius += animGS.runnerGrowShrink;

                  if (oneRunner.runnerRadius > animGS.runnerMaxSizeRadius) {
                     oneRunner.runnerRadius = animGS.runnerMaxSizeRadius;
                  }
               }
               else {
                  // Try to shrink runner
                  oneRunner.runnerRadius -= animGS.runnerGrowShrink;

                  if (oneRunner.runnerRadius < animGS.runnerMinSizeRadius) {
                     oneRunner.runnerRadius = animGS.runnerMinSizeRadius;
                  }
               }
            }

            /*
            Stopping the runner
            */
            function stopTheRunner(oneRunner) {
               oneRunner.runnerMotion.motionX = 0;
               oneRunner.runnerMotion.motionY = 0;
            }

            /*
            Get new normal random runner motion step
            */
            function getNormalRandomRunnerNewMotionStep() {
               return ((Math.random() * animGS.runnerMaxMotionMovingStep * 4) * (Math.random() > 0.5 ? 1 : -1));
            }

            /*
            Get new closing random runner motion step
            */
            function getClosingToEscapistRandomNewMotionStep() {
               return (Math.random() * animGS.runnerMaxMotionMovingStep * 4);
            }

            /*
            Get new ESCAPING random escapist motion step
            */
            function getEscapistRuningAwayRandomNewMotionStep() {
               return (Math.random() * animGS.runnerMaxMotionMovingStep * 6);  // Faster Accelerating for escapist ;-)
            }

            /*
            Checking for border moving logic
            */
            function checkForBorder(oneRunner) {

               var thereWasBorderHit = false;

               var borderHitX = false;
               var borderHitY = false;

               // X
               if ((oneRunner.runnerX + oneRunner.runnerMotion.motionX - oneRunner.runnerRadius) < 0) {

                  // Change X direction
                  oneRunner.runnerMotion.motionX *= -1;

                  oneRunner.runnerX = oneRunner.runnerRadius;

                  thereWasBorderHit = true;

                  borderHitX = true;
               }
               else if ((oneRunner.runnerX + oneRunner.runnerMotion.motionX + oneRunner.runnerRadius) > animGS.cnvWidth) {
                  // Change X direction
                  oneRunner.runnerMotion.motionX *= -1;

                  oneRunner.runnerX = animGS.cnvWidth - oneRunner.runnerRadius;

                  thereWasBorderHit = true;

                  borderHitX = true;
               }

               // Y
               if ((oneRunner.runnerY + oneRunner.runnerMotion.motionY - oneRunner.runnerRadius) < 0) {

                  // Change Y direction
                  oneRunner.runnerMotion.motionY *= -1;

                  oneRunner.runnerY = oneRunner.runnerRadius;

                  thereWasBorderHit = true;

                  borderHitY = true;
               }
               else if ((oneRunner.runnerY + oneRunner.runnerMotion.motionY + oneRunner.runnerRadius) > animGS.cnvHeight) {
                  // Change Y direction
                  oneRunner.runnerMotion.motionY *= -1;

                  oneRunner.runnerY = animGS.cnvHeight - oneRunner.runnerRadius;

                  thereWasBorderHit = true;

                  borderHitY = true;
               }

               if (borderHitX === true) {
                  // Y correction

                  oneRunner.runnerY += oneRunner.runnerMotion.motionY;
               }

               if (borderHitY === true) {
                  // X correction

                  oneRunner.runnerX += oneRunner.runnerMotion.motionX;
               }

               return thereWasBorderHit;
            }

            /*
            Runner normal move-logic
            */
            function runnerMoveNormal(oneRunner) {

               // Moving runners' motion coordinates
               var moveChangeX = 0;
               var moveChangeY = 0;

               if (Math.random() > 0.5) {
                  moveChangeX = getNormalRandomRunnerNewMotionStep();
               }

               if (Math.random() > 0.5) {
                  moveChangeY = getNormalRandomRunnerNewMotionStep();
               }

               // Escapist has OTHER MaxMotionMove-speed like other runners/chasers !
               var checkingMaxMotionMove = (oneRunner.iAmToCatch === false) ? animGS.runnerMaxMotionMove : animGS.runnerMaxMotionMoveEscaping;

               if (Math.abs(oneRunner.runnerMotion.motionX + moveChangeX) > checkingMaxMotionMove) {
                  moveChangeX *= -1;
               }

               if (Math.abs(oneRunner.runnerMotion.motionY + moveChangeY) > checkingMaxMotionMove) {
                  moveChangeY *= -1;
               }

               // Change current runner's motion !
               oneRunner.runnerMotion.motionX += moveChangeX;
               oneRunner.runnerMotion.motionY += moveChangeY;

               // Finally move runner
               oneRunner.runnerX += oneRunner.runnerMotion.motionX;
               oneRunner.runnerY += oneRunner.runnerMotion.motionY;
            }

            /*
            Returns TRUE if NO overlaping with other runners for runner index == currentRunnerIndex
            */
            function currentRunnerDoesntOverlapWithOthers(currentRunnerIndex) {

               var noOverlapping = true;

               for (var r = 0; r < animGS.runners.length; r++) {

                  if (r != currentRunnerIndex) {

                     if (getTwoPointsDistance(
                    animGS.runners[r].runnerX,
                    animGS.runners[r].runnerY,
                    animGS.runners[currentRunnerIndex].runnerX,
                    animGS.runners[currentRunnerIndex].runnerY)
                    <=
                    (animGS.runners[r].runnerRadius + animGS.runners[currentRunnerIndex].runnerRadius)) {

                        // YES, FIRST overlaping, we can BREAK for loop
                        // NOTE: THEIR centers distance is SMALLER than BOTH radius together

                        noOverlapping = false;
                        break;
                     }
                  }
               }

               return noOverlapping;
            }

            /*
            Returns TRUE if TWO runners OVERLAP !
            */
            function currentTwoRunnersOverlap(currentRunner, otherRunner) {

               var runnersOverlapping = false;

               if (getTwoPointsDistance(
        currentRunner.runnerX,
        currentRunner.runnerY,
        otherRunner.runnerX,
        otherRunner.runnerY)
        <=
        (currentRunner.runnerRadius + otherRunner.runnerRadius)) {

                  // YES, OVERLAPING !
                  // NOTE: THEIR centers distance is SMALLER than BOTH radius together

                  runnersOverlapping = true;
               }

               return runnersOverlapping;
            }

            /*
            Returns TRUE if at least ONE active escapist !
            */
            function areThereAnyEscapist() {
               var thereAreEscapist = false;

               for (var i = 0; i < animGS.isCatchingPhaseEscapingRunnerIndexes.length; i++) {

                  if (animGS.isCatchingPhaseEscapingRunnerIndexes[i] === 1) {
                     thereAreEscapist = true;
                     break;
                  }

               }

               return thereAreEscapist;
            }

            /*
            Get closest Escapist index for a current runner
            */
            function getClosestEscapistIndexForACurrentRunner(oneRunnerIndex) {

               var currentMinDistance = animGS.cnvWidth + animGS.cnvHeight;
               var closestEscapistIndex = -1;

               for (var e = 0; e < animGS.isCatchingPhaseEscapingRunnerIndexes.length; e++) {

                  if (animGS.isCatchingPhaseEscapingRunnerIndexes[e] === 1 && (oneRunnerIndex !== e)) {

                     var dist = getTwoPointsDistance(
            animGS.runners[oneRunnerIndex].runnerX,
            animGS.runners[oneRunnerIndex].runnerY,
            animGS.runners[e].runnerX,
            animGS.runners[e].runnerY);

                     if (dist < currentMinDistance) {

                        currentMinDistance = dist;
                        closestEscapistIndex = e;
                     }
                  }
               }

               return closestEscapistIndex;
            }

            /*
            We try to find and set NEW escaping runner
            */
            function tryToFindNewEscapists() {

               // We calculate randomly IF we should choose new escaping runner based on NUMBER of all runners
               if (Math.random() < (1 / animGS.runners.length)) {

                  var max = animGS.runners.length / 3;

                  if (max < 1) {
                     max = 1;
                  }
                  else {
                     max = Math.round(max);
                  }

                  // Max new random escapists
                  var howManyNewEscapist = calcRndGenMinMax(1, max);

                  for (var e = 0; e < howManyNewEscapist; e++) {

                     var escapingRunnerIndex = calcRndGenMinMax(0, animGS.runners.length - 1);

                     // FIRST WE CHECK IF NO OVERLAPING WITH ANY OTHER RUNNER !!!
                     if (currentRunnerDoesntOverlapWithOthers(escapingRunnerIndex)) {
                        // YES, NO overlaping, we can SET the escaping runner

                        animGS.isCatchingPhaseEscapingRunnerIndexes[escapingRunnerIndex] = 1;
                        animGS.runners[escapingRunnerIndex].iAmToCatch = true;
                     }
                  }
               }
            }

            /*
            We try to close to the specific point/coordinates
            */
            function tryToCatchTheSpecificCoordinates(chaserRunner, sc) {

               var moveChangeMotionX = 0;
               var moveChangeMotionY = 0;

               var translateMotionXToRealArea = chaserRunner.runnerX + chaserRunner.runnerMotion.motionX;
               var translateMotionYToRealArea = chaserRunner.runnerY + chaserRunner.runnerMotion.motionY;

               // Angle between BOTH center's !
               var angleBetweenChaserCenterAndEscapingCenter =
        getAngleBetweenTwoPoints(
            chaserRunner.runnerX,
            chaserRunner.runnerY,
            sc.x,
            sc.y);

               var targetingMotionCircleX = chaserRunner.runnerX + animGS.runnerMaxMotionMove * Math.cos(angleBetweenChaserCenterAndEscapingCenter);
               var targetingMotionCircleY = chaserRunner.runnerY + animGS.runnerMaxMotionMove * Math.sin(angleBetweenChaserCenterAndEscapingCenter);

               var angleBetweenTranslatedMotionPointAndTargetingMotionCirclePoint =
        getAngleBetweenTwoPoints(
            translateMotionXToRealArea,
            translateMotionYToRealArea,
            targetingMotionCircleX,
            targetingMotionCircleY);

               var tmpRandClosingMotion = getClosingToEscapistRandomNewMotionStep();

               moveChangeMotionX = tmpRandClosingMotion * Math.cos(angleBetweenTranslatedMotionPointAndTargetingMotionCirclePoint);
               moveChangeMotionY = tmpRandClosingMotion * Math.sin(angleBetweenTranslatedMotionPointAndTargetingMotionCirclePoint);

               if (Math.abs(chaserRunner.runnerMotion.motionX + moveChangeMotionX) > animGS.runnerMaxMotionMove) {
                  // When chasing, we don't FIX speed/motion circle (@ moveChangeMotionX = 0),
                  // we rather go in the oposite direction so runner would be more responsive

                  moveChangeMotionX *= -1;
               }

               if (Math.abs(chaserRunner.runnerMotion.motionY + moveChangeMotionY) > animGS.runnerMaxMotionMove) {
                  // When chasing, we don't FIX speed/motion circle (@ moveChangeMotionY = 0),
                  // we rather go in the oposite direction so runner would be more responsive

                  moveChangeMotionY *= -1;
               }

               chaserRunner.runnerMotion.motionX += moveChangeMotionX;
               chaserRunner.runnerMotion.motionY += moveChangeMotionY;

               // Finally move runner closer to the escaping runner
               chaserRunner.runnerX += chaserRunner.runnerMotion.motionX;
               chaserRunner.runnerY += chaserRunner.runnerMotion.motionY;

               if (getTwoPointsDistance(
                  chaserRunner.runnerX,
                  chaserRunner.runnerY,
                  sc.x,
                  sc.y)
                  <=
                  (chaserRunner.runnerRadius)) {

                  // YES, current runner chaser cought the specific coordinate
                  // Stop the runner
                  stopTheRunner(chaserRunner);
               }

               return;
            }

            /*
            We try to close to the escaping runner
            */
            function tryToCatchTheEscapingRunner(chaserRunner, escapingRunner, escapistIndex) {

               var bBastardWasCought = false;

               var moveChangeMotionX = 0;
               var moveChangeMotionY = 0;

               var translateMotionXToRealArea = chaserRunner.runnerX + chaserRunner.runnerMotion.motionX;
               var translateMotionYToRealArea = chaserRunner.runnerY + chaserRunner.runnerMotion.motionY;

               // Angle between BOTH center's ! (chaserRunner <-> escapingRunner)
               var angleBetweenChaserCenterAndEscapingCenter =
        getAngleBetweenTwoPoints(
            chaserRunner.runnerX,
            chaserRunner.runnerY,
            escapingRunner.runnerX,
            escapingRunner.runnerY);

               var targetingMotionCircleX = chaserRunner.runnerX + animGS.runnerMaxMotionMove * Math.cos(angleBetweenChaserCenterAndEscapingCenter);
               var targetingMotionCircleY = chaserRunner.runnerY + animGS.runnerMaxMotionMove * Math.sin(angleBetweenChaserCenterAndEscapingCenter);

               var angleBetweenTranslatedMotionPointAndTargetingMotionCirclePoint =
        getAngleBetweenTwoPoints(
            translateMotionXToRealArea,
            translateMotionYToRealArea,
            targetingMotionCircleX,
            targetingMotionCircleY);

               var tmpRandClosingMotion = getClosingToEscapistRandomNewMotionStep();

               moveChangeMotionX = tmpRandClosingMotion * Math.cos(angleBetweenTranslatedMotionPointAndTargetingMotionCirclePoint);
               moveChangeMotionY = tmpRandClosingMotion * Math.sin(angleBetweenTranslatedMotionPointAndTargetingMotionCirclePoint);

               if (Math.abs(chaserRunner.runnerMotion.motionX + moveChangeMotionX) > animGS.runnerMaxMotionMove) {
                  // When chasing, we don't FIX speed/motion circle (@ moveChangeMotionX = 0),
                  // we rather go in the oposite direction so runner would be more responsive

                  moveChangeMotionX *= -1;
               }

               if (Math.abs(chaserRunner.runnerMotion.motionY + moveChangeMotionY) > animGS.runnerMaxMotionMove) {
                  // When chasing, we don't FIX speed/motion circle (@ moveChangeMotionY = 0),
                  // we rather go in the oposite direction so runner would be more responsive

                  moveChangeMotionY *= -1;
               }

               chaserRunner.runnerMotion.motionX += moveChangeMotionX;
               chaserRunner.runnerMotion.motionY += moveChangeMotionY;

               // Finally move runner closer to the escaping runner
               chaserRunner.runnerX += chaserRunner.runnerMotion.motionX;
               chaserRunner.runnerY += chaserRunner.runnerMotion.motionY;

               // CHECK IF RUNNER COUGHT THE ESCAPING RUNNER !
               if (getTwoPointsDistance(
            chaserRunner.runnerX,
            chaserRunner.runnerY,
            escapingRunner.runnerX,
            escapingRunner.runnerY)
            <=
            (chaserRunner.runnerRadius + escapingRunner.runnerRadius)) {

                  // YES, current runner COUGHT the escapist !
                  bBastardWasCought = true;
                  escapingRunner.howManyDidIRespawn++;

                  // WE COUGHT this escapist !
                  animGS.isCatchingPhaseEscapingRunnerIndexes[escapistIndex] = 0;
                  escapingRunner.iAmToCatch = false;

                  // We stop BOTH runners
                  stopTheRunner(chaserRunner);
                  stopTheRunner(escapingRunner);

                  // We grow/shrink runners
                  growOrShrinkRunner(chaserRunner, true);
                  growOrShrinkRunner(escapingRunner, false);
               }

               return bBastardWasCought;
            }

            /*
            Used when ordinary runner checking if it needs to avoid OTHER closest runner
            */
            function checkForAvoiding(avoidingRunnerIndex) {

               var thereWasAvoidingAndMoving = false;

               // Find CLOSEST runner and try to avoid it !
               var possibleAvoidingRunner = animGS.runners[avoidingRunnerIndex];

               var closestRunnerIndex = -1;
               var currentMinDistance = animGS.cnvWidth + animGS.cnvHeight;    // This will ALWAYS be bigger than ANY two points distance

               for (var i = 0; i < animGS.runners.length; i++) {

                  if (i !== avoidingRunnerIndex) {

                     var tempNewDistance = getTwoPointsDistance(
                possibleAvoidingRunner.runnerX,
                possibleAvoidingRunner.runnerY,
                animGS.runners[i].runnerX,
                animGS.runners[i].runnerY);

                     if (tempNewDistance < currentMinDistance) {

                        currentMinDistance = tempNewDistance;
                        closestRunnerIndex = i;
                     }
                  }
               }

               // We have CLOSEST runner
               var closestRunner = animGS.runners[closestRunnerIndex];

               if (currentMinDistance > (4 * (possibleAvoidingRunner.runnerRadius + closestRunner.runnerRadius))) {
                  // LEAVE the method - NO NEED to avoid from closest runner !
                  return thereWasAvoidingAndMoving;
               }
               else if (animGS.isCatchingPhaseEscapingRunnerIndexes[closestRunnerIndex] === 1) {
                  // WE DON'T WANT TO AVOID ESCAPIST !!! :-)
                  return thereWasAvoidingAndMoving;
               }
               else {
                  thereWasAvoidingAndMoving = true;
               }

               // FIRST CHECK IF THERE IS OVERLAPING WITH CLOSEST RUNNER (IN THIS CASE WE STOP CURRENT RUNNER)
               if (currentTwoRunnersOverlap(possibleAvoidingRunner, closestRunner) === true) {
                  // YES, overlaping we STOP 'possibleAvoidingRunner' AND CONTINUE trying to AVOID the closest runner !

                  stopTheRunner(possibleAvoidingRunner);
               }

               // END: FIRST CHECK IF THERE IS OVERLAPING WITH CLOSEST RUNNER (IN THIS CASE WE STOP CURRENT RUNNER)

               // TRY to avoid closest runner

               var moveChangeMotionX = 0;
               var moveChangeMotionY = 0;

               var translateMotionXToRealArea = possibleAvoidingRunner.runnerX + possibleAvoidingRunner.runnerMotion.motionX;
               var translateMotionYToRealArea = possibleAvoidingRunner.runnerY + possibleAvoidingRunner.runnerMotion.motionY;

               // Angle between BOTH center's ! (chaserRunner <-> possibleAvoidingRunner)
               var angleBetweenChaserCenterAndEscapingCenter =
        getAngleBetweenTwoPoints(
            possibleAvoidingRunner.runnerX,
            possibleAvoidingRunner.runnerY,
            closestRunner.runnerX + (closestRunner.runnerRadius * (Math.random() > 0.5 ? 1 : -1)),  // Randomize closest runner's X
            closestRunner.runnerY + (closestRunner.runnerRadius * (Math.random() > 0.5 ? 1 : -1))); // Randomize closest runner's Y

               // Here we FIX the targeting POINT - So we can accualy ESCAPE (not to get closer) from a runner !
               // (BY ADDING Math.PI to the angle !)

               var escapingAngle = angleBetweenChaserCenterAndEscapingCenter + Math.PI;

               var targetingMotionCircleX =
        possibleAvoidingRunner.runnerX + animGS.runnerMaxMotionMove * Math.cos(escapingAngle);
               var targetingMotionCircleY =
        possibleAvoidingRunner.runnerY + animGS.runnerMaxMotionMove * Math.sin(escapingAngle);

               var angleBetweenTranslatedMotionPointAndTargetingMotionCirclePoint =
        getAngleBetweenTwoPoints(
            translateMotionXToRealArea,
            translateMotionYToRealArea,
            targetingMotionCircleX,
            targetingMotionCircleY);

               var tmpRandEscapingMotion = getEscapistRuningAwayRandomNewMotionStep();

               moveChangeMotionX = tmpRandEscapingMotion * Math.cos(angleBetweenTranslatedMotionPointAndTargetingMotionCirclePoint);
               moveChangeMotionY = tmpRandEscapingMotion * Math.sin(angleBetweenTranslatedMotionPointAndTargetingMotionCirclePoint);

               if (Math.abs(possibleAvoidingRunner.runnerMotion.motionX + moveChangeMotionX) > animGS.runnerMaxMotionMove) {
                  moveChangeMotionX = 0;
               }

               if (Math.abs(possibleAvoidingRunner.runnerMotion.motionY + moveChangeMotionY) > animGS.runnerMaxMotionMove) {
                  moveChangeMotionY = 0;
               }

               possibleAvoidingRunner.runnerMotion.motionX += moveChangeMotionX;
               possibleAvoidingRunner.runnerMotion.motionY += moveChangeMotionY;

               // Finally move escaping runner AWAY from closest runner !
               possibleAvoidingRunner.runnerX += possibleAvoidingRunner.runnerMotion.motionX;
               possibleAvoidingRunner.runnerY += possibleAvoidingRunner.runnerMotion.motionY;

               return thereWasAvoidingAndMoving;
            }

            /*
            Return index of the MIN/MAX-speed runner
            */
            function getIndexOfTheSpeedMinMaxRunner(currentRunnerIndex, bSearchFastest) {

               var speedMinMaxRunnerIndex = -1;
               var currentMinMaxSpeed = (bSearchFastest === true ? 0 : (animGS.cnvWidth + animGS.cnvHeight));

               for (var i = 0; i < animGS.runners.length; i++) {

                  if (i !== currentRunnerIndex) {

                     var currSpeed = getTwoPointsDistance(0, 0, animGS.runners[i].runnerMotion.motionX, animGS.runners[i].runnerMotion.motionY);

                     if (bSearchFastest === true) {

                        // Find FASTEST
                        if (currSpeed > currentMinMaxSpeed) {

                           currentMinMaxSpeed = currSpeed;
                           speedMinMaxRunnerIndex = i;
                        }
                     }
                     else {

                        // Find SLOWEST
                        if (currSpeed < currentMinMaxSpeed) {

                           currentMinMaxSpeed = currSpeed;
                           speedMinMaxRunnerIndex = i;
                        }
                     }
                  }
               }

               return speedMinMaxRunnerIndex;
            }

            /*
            Return index of the MIN/MAX-sized runner
            */
            function getIndexOfTheSizestMinMaxRunner(currentRunnerIndex, bSearchBiggest) {

               var sizestMinMaxRunnerIndex = -1;
               var currentMinMaxSize = (bSearchBiggest === true ? 0 : (animGS.cnvWidth + animGS.cnvHeight));

               var bAllTheSameSize = true;

               var firstRunnerRadiusSize = animGS.runners[0].runnerRadius;

               for (var i = 0; i < animGS.runners.length; i++) {

                  // Simple check if ALL the runners are the same size
                  if (firstRunnerRadiusSize != animGS.runners[i].runnerRadius) {
                     bAllTheSameSize = false;
                  }

                  if (i !== currentRunnerIndex) {

                     if (bSearchBiggest === true) {

                        // Find BIGGEST
                        if (animGS.runners[i].runnerRadius > currentMinMaxSize) {

                           currentMinMaxSize = animGS.runners[i].runnerRadius;
                           sizestMinMaxRunnerIndex = i;
                        }
                     }
                     else {

                        // Find SMALLEST
                        if (animGS.runners[i].runnerRadius < currentMinMaxSize) {

                           currentMinMaxSize = animGS.runners[i].runnerRadius;
                           sizestMinMaxRunnerIndex = i;
                        }
                     }
                  }
               }

               // Simple check if ALL the runners are the same size
               if (bAllTheSameSize === true) {
                  sizestMinMaxRunnerIndex = -1;
               }

               return sizestMinMaxRunnerIndex;
            }

            /*
            Return index of the FURTHEREST runner
            */
            function getIndexOfTheFurtherestRunner(currentRunnerIndex) {

               var currentRunner = animGS.runners[currentRunnerIndex];

               var furtherestRunnerIndex = -1;
               var currentMaxDistance = 0;

               for (var i = 0; i < animGS.runners.length; i++) {

                  if (i !== currentRunnerIndex) {

                     var tempNewDistance = getTwoPointsDistance(
            currentRunner.runnerX,
            currentRunner.runnerY,
            animGS.runners[i].runnerX,
            animGS.runners[i].runnerY);

                     if (tempNewDistance > currentMaxDistance) {

                        currentMaxDistance = tempNewDistance;
                        furtherestRunnerIndex = i;
                     }
                  }
               }

               return furtherestRunnerIndex;
            }

            /*
            Return index of the CLOSEST runner
            */
            function getIndexOfTheClosestRunner(currentRunnerIndex) {

               var currentRunner = animGS.runners[currentRunnerIndex];

               var closestRunnerIndex = -1;
               var currentMinDistance = animGS.cnvWidth + animGS.cnvHeight;    // This will ALWAYS be bigger than ANY two points distance

               for (var i = 0; i < animGS.runners.length; i++) {

                  if (i !== currentRunnerIndex) {

                     var tempNewDistance = getTwoPointsDistance(
            currentRunner.runnerX,
            currentRunner.runnerY,
            animGS.runners[i].runnerX,
            animGS.runners[i].runnerY);

                     if (tempNewDistance < currentMinDistance) {

                        currentMinDistance = tempNewDistance;
                        closestRunnerIndex = i;
                     }
                  }
               }

               return closestRunnerIndex;
            }

            /*
            Escaping runner tries to escape here !
            */
            function tryToEscapeFromOtherRunners(escapingRunnerIndex) {

               // Find CLOSEST runner and try to avoid it !
               var escapingRunner = animGS.runners[escapingRunnerIndex];

               var closestRunnerIndex = -1;
               var currentMinDistance = animGS.cnvWidth + animGS.cnvHeight;    // This will ALWAYS be bigger than ANY two points distance

               for (var i = 0; i < animGS.runners.length; i++) {

                  if (i !== escapingRunnerIndex) {

                     var tempNewDistance = getTwoPointsDistance(
                escapingRunner.runnerX,
                escapingRunner.runnerY,
                animGS.runners[i].runnerX,
                animGS.runners[i].runnerY);

                     if (tempNewDistance < currentMinDistance) {

                        currentMinDistance = tempNewDistance;
                        closestRunnerIndex = i;
                     }
                  }
               }

               // We have CLOSEST runner
               var closestRunner = animGS.runners[closestRunnerIndex];

               var translateMotionXToRealArea = escapingRunner.runnerX + escapingRunner.runnerMotion.motionX;
               var translateMotionYToRealArea = escapingRunner.runnerY + escapingRunner.runnerMotion.motionY;

               // POSSIBLE FROM EDGE TO CENTER MOVEMENT !
               var edgesDistances = new Array(4);

               // Left
               edgesDistances[0] =
        getTwoPointsDistance(
            escapingRunner.runnerX,
            escapingRunner.runnerY,
            0,
            escapingRunner.runnerY);

               // Top
               edgesDistances[1] =
        getTwoPointsDistance(
            escapingRunner.runnerX,
            escapingRunner.runnerY,
            escapingRunner.runnerX,
            0);

               // Right
               edgesDistances[2] =
        getTwoPointsDistance(
            escapingRunner.runnerX,
            escapingRunner.runnerY,
            animGS.cnvWidth,
            escapingRunner.runnerY);

               // Bottom
               edgesDistances[3] =
        getTwoPointsDistance(
            escapingRunner.runnerX,
            escapingRunner.runnerY,
            escapingRunner.runnerX,
            animGS.cnvHeight);

               var currentEdgesMinDistance = animGS.cnvWidth + animGS.cnvHeight;    // This will ALWAYS be bigger

               for (var e = 0; e < edgesDistances.length; e++) {

                  if (edgesDistances[e] < currentEdgesMinDistance) {
                     currentEdgesMinDistance = edgesDistances[e];
                  }
               }

               if (
        (currentEdgesMinDistance < currentMinDistance)
        &&
        (currentEdgesMinDistance < (4 * escapingRunner.runnerRadius + ((Math.pow(animGS.runnerMaxSizeRadius, 2) - getEscapistRuningAwayRandomNewMotionStep()) / escapingRunner.runnerRadius)))) {

                  // YES, edges are closest - TRY to move to the center !

                  var moveChangeToCenterMotionX = 0;
                  var moveChangeToCenterMotionY = 0;

                  // Angle between escapist AND center screen
                  var angleBetweenEscapistAndCenterScreen =
            getAngleBetweenTwoPoints(
                escapingRunner.runnerX,
                escapingRunner.runnerY,
                (animGS.cnvWidth / 2) + (Math.pow(getEscapistRuningAwayRandomNewMotionStep(), 2) * (Math.random() > 0.5 ? 1 : -1)),  // Randomize closest runner's X
                (animGS.cnvHeight / 2) + (Math.pow(getEscapistRuningAwayRandomNewMotionStep(), 2) * (Math.random() > 0.5 ? 1 : -1))); // Randomize closest runner's Y

                  var tmpRandToCenterMotion = getEscapistRuningAwayRandomNewMotionStep();

                  moveChangeToCenterMotionX = tmpRandToCenterMotion * Math.cos(angleBetweenEscapistAndCenterScreen);
                  moveChangeToCenterMotionY = tmpRandToCenterMotion * Math.sin(angleBetweenEscapistAndCenterScreen);

                  if (Math.abs(escapingRunner.runnerMotion.motionX + moveChangeToCenterMotionX) > animGS.runnerMaxMotionMoveEscaping) {

                     moveChangeToCenterMotionX *= -1;
                  }

                  if (Math.abs(escapingRunner.runnerMotion.motionY + moveChangeToCenterMotionY) > animGS.runnerMaxMotionMoveEscaping) {

                     moveChangeToCenterMotionY *= -1;
                  }

                  escapingRunner.runnerMotion.motionX += moveChangeToCenterMotionX;
                  escapingRunner.runnerMotion.motionY += moveChangeToCenterMotionY;

                  // Finally move escaping runner AWAY from closest runner !
                  escapingRunner.runnerX += escapingRunner.runnerMotion.motionX;
                  escapingRunner.runnerY += escapingRunner.runnerMotion.motionY;

                  // We moved toward center, we can return HERE !
                  return;
               }
               // END: POSSIBLE FROM EDGE TO CENTER MOVEMENT !

               if (currentMinDistance > (4 * (escapingRunner.runnerRadius + closestRunner.runnerRadius))) {
                  // MAKE normal move IF distance TOO big between the escapist and closer RUNNER !
                  runnerMoveNormal(escapingRunner);

                  // LEAVE the method - NO NEED to avoid from closest runner !
                  return;
               }

               // TRY to avoid closest runner

               var moveChangeMotionX = 0;
               var moveChangeMotionY = 0;

               // Angle between BOTH center's ! (chaserRunner <-> escapingRunner)
               var angleBetweenChaserCenterAndEscapingCenter =
        getAngleBetweenTwoPoints(
            escapingRunner.runnerX,
            escapingRunner.runnerY,
            closestRunner.runnerX + (closestRunner.runnerRadius * (Math.random() > 0.5 ? 1 : -1)),  // Randomize closest runner's X
            closestRunner.runnerY + (closestRunner.runnerRadius * (Math.random() > 0.5 ? 1 : -1))); // Randomize closest runner's Y

               // Here we FIX the targeting POINT - So we can accualy ESCAPE (not to get closer) from a runner !
               // (BY ADDING Math.PI to the angle !)

               var escapingAngle = angleBetweenChaserCenterAndEscapingCenter + Math.PI;

               var targetingMotionCircleX =
        escapingRunner.runnerX + animGS.runnerMaxMotionMoveEscaping * Math.cos(escapingAngle);
               var targetingMotionCircleY =
        escapingRunner.runnerY + animGS.runnerMaxMotionMoveEscaping * Math.sin(escapingAngle);

               var angleBetweenTranslatedMotionPointAndTargetingMotionCirclePoint =
        getAngleBetweenTwoPoints(
            translateMotionXToRealArea,
            translateMotionYToRealArea,
            targetingMotionCircleX,
            targetingMotionCircleY);

               var tmpRandEscapingMotion = getEscapistRuningAwayRandomNewMotionStep();

               var randomizedEscapingAngle =
        angleBetweenTranslatedMotionPointAndTargetingMotionCirclePoint + ((Math.random() > 0.5 ? 1 : -1) * Math.random() * (Math.PI / 4));

               moveChangeMotionX = tmpRandEscapingMotion * Math.cos(randomizedEscapingAngle);
               moveChangeMotionY = tmpRandEscapingMotion * Math.sin(randomizedEscapingAngle);

               if (Math.abs(escapingRunner.runnerMotion.motionX + moveChangeMotionX) > animGS.runnerMaxMotionMoveEscaping) {

                  moveChangeMotionX *= -1;
               }

               if (Math.abs(escapingRunner.runnerMotion.motionY + moveChangeMotionY) > animGS.runnerMaxMotionMoveEscaping) {

                  moveChangeMotionY *= -1;
               }

               escapingRunner.runnerMotion.motionX += moveChangeMotionX;
               escapingRunner.runnerMotion.motionY += moveChangeMotionY;

               // Finally move escaping runner AWAY from closest runner !
               escapingRunner.runnerX += escapingRunner.runnerMotion.motionX;
               escapingRunner.runnerY += escapingRunner.runnerMotion.motionY;
            }

            /*
            Full runners motion logic - EXTRAS version - EXPERIMENTAL MADNESS 2
            ADDED on 29122009
            */
            function fullRunnersMotionLogicExtrasVersionExperimentalMadness2() {

               for (var r = 0; r < animGS.runners.length; r++) {

                  // FIRST - CHECK for borders-hit !
                  if (checkForBorder(animGS.runners[r]) === true) {

                     // We hit border AND moved the runner, we can CONTINUE with other runners
                     continue;
                  }

                  // SECOND - Check for avoiding !
                  if (checkForAvoiding(r) === true) {

                     // 2-modes (one with CONTINUE after avoiding and one WITHOUT continue)
                     if (animGS.runnersMotionLogicExtrasForType2 === false) {
                        continue;
                     }
                  }

                  if (Math.random() > Math.random()) {

                     runnerMoveNormal(animGS.runners[r]);

                  }
                  else {

                     var randomEscapist = calcRndGenMinMax(0, animGS.runners.length - 1);

                     if (randomEscapist == r) {
                        tryToEscapeFromOtherRunners(r);
                     }
                     else {
                        tryToCatchTheEscapingRunner(animGS.runners[r], animGS.runners[randomEscapist], randomEscapist);
                     }

                  }
               }
            }

            /*
            Full runners motion logic - EXTRAS version - EXPERIMENTAL MADNESS
            ADDED on 29122009
            */
            function fullRunnersMotionLogicExtrasVersionExperimentalMadness() {

               for (var r = 0; r < animGS.runners.length; r++) {

                  // FIRST - CHECK for borders-hit !
                  if (checkForBorder(animGS.runners[r]) === true) {

                     // We hit border AND moved the runner, we can CONTINUE with other runners
                     continue;
                  }

                  // SECOND - Check for avoiding !
                  if (checkForAvoiding(r) === true) {

                     continue;
                  }

                  var randomEscapist = -1;

                  while ((randomEscapist == -1) || (randomEscapist == r)) {
                     randomEscapist = calcRndGenMinMax(0, animGS.runners.length - 1);
                  }

                  tryToCatchTheEscapingRunner(animGS.runners[r], animGS.runners[randomEscapist], randomEscapist);
               }
            }

            /*
            Full runners motion logic - EXTRAS version - Every runner is ESCAPIST !
            ADDED on 29122009
            */
            function fullRunnersMotionLogicExtrasVersionEveryRunnerEscapist() {

               for (var r = 0; r < animGS.runners.length; r++) {

                  // FIRST - CHECK for borders-hit !
                  if (checkForBorder(animGS.runners[r]) === true) {

                     // We hit border AND moved the runner, we can CONTINUE with other runners
                     continue;
                  }

                  // SECOND - Check for avoiding !
                  if (checkForAvoiding(r) === true) {
                     continue;
                  }

                  // EVERY runner is escapist !
                  tryToEscapeFromOtherRunners(r);
               }
            }

            /*
            Full runners motion logic - EXTRAS version - each runner is following SLOWEST/FASTEST runner !
            ADDED on 29122009
            */
            function fullRunnersMotionLogicExtrasVersionSlowestFastest() {

               for (var r = 0; r < animGS.runners.length; r++) {

                  // FIRST - CHECK for borders-hit !
                  if (checkForBorder(animGS.runners[r]) === true) {

                     // We hit border AND moved the runner, we can CONTINUE with other runners
                     continue;
                  }

                  // SECOND - Check for avoiding !
                  if (checkForAvoiding(r) === true) {

                     // 2-modes (one with CONTINUE after avoiding and one WITHOUT continue)
                     if (animGS.runnersMotionLogicExtrasForType2 === false) {
                        continue;
                     }
                  }

                  // 1) FIND speed MIN/MAX RUNNER !
                  // 2) IF NOT FOUND MIN/MAX -> FIND closest RUNNER !
                  // 3) CHASE closest RUNNER !

                  var speedMinMaxRunnerIndex = getIndexOfTheSpeedMinMaxRunner(r, animGS.runnersMotionLogicExtrasForType3);

                  if (speedMinMaxRunnerIndex != -1 && (Math.random() > Math.random())) { // Little bit of randomness 
                     // WE found speed MIN/MAX RUNNER !
                     tryToCatchTheEscapingRunner(animGS.runners[r], animGS.runners[speedMinMaxRunnerIndex], speedMinMaxRunnerIndex);
                  }
                  else {
                     // SPEED min/max runner was not found - try the closest-version !

                     var closestRunnerIndex = getIndexOfTheClosestRunner(r);

                     if (closestRunnerIndex != -1) {
                        // WE found CLOSEST RUNNER !
                        tryToCatchTheEscapingRunner(animGS.runners[r], animGS.runners[closestRunnerIndex], closestRunnerIndex);
                     }
                     else {
                        // We did NOT find closest runner ! 
                        // PROBABLY will never happen (but JUST a bullet-proof precousion check :))

                        // We DO just NORMAL move
                        runnerMoveNormal(animGS.runners[r]);
                     }
                  }
               }
            }

            /*
            Experimental shit 3
            */
            function fullRunnersMotionLogicExperimentalShit3() {

               if (checkForBorder(animGS.fakeAndHiddenRunner) === true) {
                  // NOTE: Nothing - just for clarity of the code....
               }
               else {
                  runnerMoveNormal(animGS.fakeAndHiddenRunner);
               }

               var fakeRunnerCoordinates =
               {
                  x: animGS.fakeAndHiddenRunner.runnerX,
                  y: animGS.fakeAndHiddenRunner.runnerY

               };

               for (var r = 0; r < animGS.runners.length; r++) {

                  // FIRST - CHECK for borders-hit !
                  if (checkForBorder(animGS.runners[r]) === true) {

                     // We hit border AND moved the runner, we can CONTINUE with other runners
                     continue;
                  }

                  // SECOND - Check for avoiding !
                  if (checkForAvoiding(r) === true) {

                     // 2-modes (one with CONTINUE after avoiding and one WITHOUT continue)
                     if (animGS.runnersMotionLogicExtrasForType2 === false) {
                        continue;
                     }
                  }

                  if (animGS.runnersMotionLogicExtrasForType11) {
                     // NOTE: Just try to catch the specific coordinates
                     tryToCatchTheSpecificCoordinates(animGS.runners[r], fakeRunnerCoordinates);
                  }
                  else {
                     // NOTE: Little bit MORE random movement when catching specific coordinates
                     if (Math.random() > 0.5) {
                        tryToCatchTheSpecificCoordinates(animGS.runners[r], fakeRunnerCoordinates);
                     }
                     else {
                        runnerMoveNormal(animGS.runners[r]);
                     }
                  }
               }

               return;
            }

            var startingPointExperimentalShit2 = null;
            /*
            Experimental shit 2
            */
            function fullRunnersMotionLogicExperimentalShit2() {

               if (startingPointExperimentalShit2 === null) {
                  startingPointExperimentalShit2 = new simplePoint(animGS.cnvWidth / 2, animGS.cnvHeight / 2);
               }
               else {
                  if (Math.random() > 0.95) {
                     startingPointExperimentalShit2.x = Math.random() * animGS.cnvWidth;
                     startingPointExperimentalShit2.y = Math.random() * animGS.cnvHeight;
                  }
               }

               for (var r = 0; r < animGS.runners.length; r++) {

                  // FIRST - CHECK for borders-hit !
                  if (checkForBorder(animGS.runners[r]) === true) {

                     // We hit border AND moved the runner, we can CONTINUE with other runners
                     continue;
                  }

                  // SECOND - Check for avoiding !
                  if (checkForAvoiding(r) === true) {

                     // 2-modes (one with CONTINUE after avoiding and one WITHOUT continue)
                     if (animGS.runnersMotionLogicExtrasForType2 === false) {
                        continue;
                     }
                  }

                  if (animGS.runnersMotionLogicExtrasForType11) {
                     // NOTE: Just try to catch the specific coordinates
                     tryToCatchTheSpecificCoordinates(animGS.runners[r], startingPointExperimentalShit2);
                  }
                  else {
                     // NOTE: Little bit MORE random movement when catching specific coordinates
                     if (Math.random() > 0.5) {
                        tryToCatchTheSpecificCoordinates(animGS.runners[r], startingPointExperimentalShit2);
                     }
                     else {
                        runnerMoveNormal(animGS.runners[r]);
                     }
                  }
               }

               return;
            }

            /*
            Experimental shit - Just check border, check avoiding, move normal
            */
            function fullRunnersMotionLogicExperimentalShit() {

               for (var r = 0; r < animGS.runners.length; r++) {

                  // FIRST - CHECK for borders-hit !
                  if (checkForBorder(animGS.runners[r]) === true) {

                     // We hit border AND moved the runner, we can CONTINUE with other runners
                     continue;
                  }

                  // SECOND - Check for avoiding !
                  if (checkForAvoiding(r) === true) {

                     // 2-modes (one with CONTINUE after avoiding and one WITHOUT continue)
                     if (animGS.runnersMotionLogicExtrasForType2 === false) {
                        continue;
                     }
                  }

                  runnerMoveNormal(animGS.runners[r]);
               }

               return;
            }

            /*
            Full runners motion logic - EXTRAS version - each runner is following SMALLEST/BIGGEST runner !
            ADDED on 29122009
            */
            function fullRunnersMotionLogicExtrasVersionSmallestBiggest() {

               for (var r = 0; r < animGS.runners.length; r++) {

                  // FIRST - CHECK for borders-hit !
                  if (checkForBorder(animGS.runners[r]) === true) {

                     // We hit border AND moved the runner, we can CONTINUE with other runners
                     continue;
                  }

                  // SECOND - Check for avoiding !
                  if (checkForAvoiding(r) === true) {

                     // 2-modes (one with CONTINUE after avoiding and one WITHOUT continue)
                     if (animGS.runnersMotionLogicExtrasForType2 === false) {
                        continue;
                     }
                  }

                  // THIRD - Follow the CLOSEST runner !
                  // 1) FIND sizest MIN/MAX RUNNER !
                  // 2) IF NOT FOUND MIN/MAX -> FIND closest RUNNER !
                  // 3) CHASE closest RUNNER !

                  var sizestMinMaxRunnerIndex = getIndexOfTheSizestMinMaxRunner(r, animGS.runnersMotionLogicExtrasForType3);

                  if (sizestMinMaxRunnerIndex != -1 && (Math.random() > Math.random())) { // Little bit of randomness 
                     // WE found sizest MIN/MAX RUNNER !
                     tryToCatchTheEscapingRunner(animGS.runners[r], animGS.runners[sizestMinMaxRunnerIndex], sizestMinMaxRunnerIndex);
                  }
                  else {
                     // SIZEST runner was not found - try the closest-version !

                     var closestRunnerIndex = getIndexOfTheClosestRunner(r);

                     if (closestRunnerIndex != -1) {
                        // WE found CLOSEST RUNNER !
                        tryToCatchTheEscapingRunner(animGS.runners[r], animGS.runners[closestRunnerIndex], closestRunnerIndex);
                     }
                     else {
                        // We did NOT find closest runner ! 
                        // PROBABLY will never happen (but JUST a bullet-proof precousion check :))

                        // We DO just NORMAL move
                        runnerMoveNormal(animGS.runners[r]);
                     }
                  }
               }
            }

            /*
            Full runners motion logic - EXTRAS version - Procession with PATHS
            ADDED on 29122009
            */
            function fullRunnersMotionLogicExtrasVersionProcession2() {

               for (var r = 0; r < animGS.runners.length; r++) {

                  // FIRST - CHECK for borders-hit !
                  if (checkForBorder(animGS.runners[r]) === true) {

                     // We hit border AND moved the runner, we can CONTINUE with other runners
                     continue;
                  }

                  // SECOND - Check for avoiding !
                  if (checkForAvoiding(r) === true) {

                     // 2-modes (one with CONTINUE after avoiding and one WITHOUT continue)
                     if (animGS.runnersMotionLogicExtrasForType2 === false) {
                        continue;
                     }
                  }

                  if (r === 0) {

                     var last = animGS.runners.length - 1;

                     // FIRST runner chasing LAST runner
                     tryToCatchTheEscapingRunner(animGS.runners[r], animGS.runners[last], last);
                  }
                  else {
                     // FOLLOW pre-decessor

                     var predecessor = r - 1;

                     tryToCatchTheEscapingRunner(animGS.runners[r], animGS.runners[predecessor], predecessor);
                  }
               }
            }

            /*
            Full runners motion logic - EXTRAS version - First runner wandering, other follow their pre-decessors
            ADDED on 29122009
            */
            function fullRunnersMotionLogicExtrasVersionProcession() {

               for (var r = 0; r < animGS.runners.length; r++) {

                  // FIRST - CHECK for borders-hit !
                  if (checkForBorder(animGS.runners[r]) === true) {

                     // We hit border AND moved the runner, we can CONTINUE with other runners
                     continue;
                  }

                  // SECOND - Check for avoiding !
                  if (checkForAvoiding(r) === true) {

                     // 2-modes (one with CONTINUE after avoiding and one WITHOUT continue)
                     if (animGS.runnersMotionLogicExtrasForType2 === false) {
                        continue;
                     }
                  }

                  if (r === 0) {
                     // FIRST runner just wandering

                     // We DO just NORMAL move
                     runnerMoveNormal(animGS.runners[r]);
                  }
                  else {
                     // FOLLOW pre-decessor

                     var predecessor = r - 1;

                     tryToCatchTheEscapingRunner(animGS.runners[r], animGS.runners[predecessor], predecessor);
                  }
               }
            }

            /*
            Full runners motion logic - EXTRAS version - each runner is following his CLOSEST neighbour !
            ADDED on 29122009
            */
            function fullRunnersMotionLogicExtrasVersion() {

               for (var r = 0; r < animGS.runners.length; r++) {

                  // FIRST - CHECK for borders-hit !
                  if (checkForBorder(animGS.runners[r]) === true) {

                     // We hit border AND moved the runner, we can CONTINUE with other runners
                     continue;
                  }

                  // SECOND - Check for avoiding !
                  if (checkForAvoiding(r) === true) {

                     // 2-modes (one with CONTINUE after avoiding and one WITHOUT continue)
                     if (animGS.runnersMotionLogicExtrasForType2 === false) {
                        continue;
                     }
                  }

                  // THIRD - Follow the CLOSEST runner !
                  // 1) FIND closest RUNNER !
                  // 2) CHASE closest RUNNER !

                  var closestRunnerIndex = getIndexOfTheClosestRunner(r);

                  if (closestRunnerIndex != -1) {
                     // WE found CLOSEST RUNNER !
                     tryToCatchTheEscapingRunner(animGS.runners[r], animGS.runners[closestRunnerIndex], closestRunnerIndex);
                  }
                  else {
                     // We did NOT find closest runner ! 
                     // PROBABLY will never happen (but JUST a bullet-proof precousion check :))

                     // We DO just NORMAL move
                     runnerMoveNormal(animGS.runners[r]);
                  }
               }
            }

            /*
            Full runners motion logic
            */
            function fullRunnersMotionLogic() {

               for (var r = 0; r < animGS.runners.length; r++) {

                  if (checkForBorder(animGS.runners[r]) === true) {

                     // We hit border AND moved the runner, we can CONTINUE with other runners
                     continue;
                  }

                  if (areThereAnyEscapist() === true) {

                     // We HAVE the catching phase !
                     if (animGS.runners[r].iAmToCatch === true) {
                        // All the other runners are catching ME !
                        tryToEscapeFromOtherRunners(r);
                     }
                     else {
                        // All the runners which are catching the escaping runner !

                        if (checkForAvoiding(r) === true) {

                           // We AVOID another runner AND moved the runner, we can CONTINUE with other runners
                           continue;
                        }

                        // No need for avoiding, try to CATCH the escaping runner

                        // Get closest escapist index
                        var closestEscapistIndex = getClosestEscapistIndexForACurrentRunner(r);

                        // CHECK if some OTHER runner didn't CATCH the escaping runner already !
                        if (closestEscapistIndex !== -1) {
                           tryToCatchTheEscapingRunner(animGS.runners[r], animGS.runners[closestEscapistIndex], closestEscapistIndex);
                        }
                        else {
                           // NORMAL move
                           runnerMoveNormal(animGS.runners[r]);
                        }
                     }
                  }
                  else {

                     // AVOIDING FROM OTHER RUNNERS CHECK !

                     if (checkForAvoiding(r) === true) {

                        // We AVOID another runner AND moved the runner, we can CONTINUE with other runners
                        continue;
                     }

                     // Runner normal move-logic
                     runnerMoveNormal(animGS.runners[r]);
                  }
               }

               if (areThereAnyEscapist() === false) {
                  // Becouse no catching this time - we try to find randomly NEW escapists
                  tryToFindNewEscapists();
               }
            }

            function getClosestEdgePoint(r) {
               var tmpX;
               var tmpY;

               var pTop = new simplePoint(r.runnerX, 0);
               var pRight = new simplePoint(animGS.cnvWidth, r.runnerY);
               var pBottom = new simplePoint(r.runnerX, animGS.cnvHeight);
               var pLeft = new simplePoint(0, r.runnerY);

               var checkShortest = [];

               checkShortest.push(
                  {
                     dist: getTwoPointsDistance(pTop.x, pTop.y, r.runnerX, r.runnerY),
                     coordinates: pTop
                  }
                  );
               checkShortest.push(
                  {
                     dist: getTwoPointsDistance(pRight.x, pRight.y, r.runnerX, r.runnerY),
                     coordinates: pRight
                  }
                  );
               checkShortest.push(
                  {
                     dist: getTwoPointsDistance(pBottom.x, pBottom.y, r.runnerX, r.runnerY),
                     coordinates: pBottom
                  }
                  );
               checkShortest.push(
                  {
                     dist: getTwoPointsDistance(pLeft.x, pLeft.y, r.runnerX, r.runnerY),
                     coordinates: pLeft
                  }
                  );


               var shortestPointToEdge = checkShortest[0];

               for (var i = 1; i < checkShortest.length; i++) {

                  if (checkShortest[i].dist < shortestPointToEdge.dist) {
                     shortestPointToEdge = checkShortest[i];
                  }
               }

               return shortestPointToEdge.coordinates;
            }

            // END: START RUNNERS MOTION LOGIC

            /*
            fillStyle/strokeStyle for anim-background-drawing type
            */
            function setCorrectColorsForBackgroundMotionAnimType() {

               var foundCorrectColors = false;
               for (var st = 0; st < animGS.runners.length; st++) {

                  if (animGS.runners[st].iAmToCatch !== true) {
                     // AHA, we have FIRST hunter - enough for all the colors

                     // Ordinary runners
                     animGS.ctx.fillStyle = buildColorRGBA(animGS.runners[st].backR, animGS.runners[st].backG, animGS.runners[st].backB, animGS.runners[st].backA);
                     animGS.ctx.strokeStyle = buildColorRGBA(animGS.runners[st].backR, animGS.runners[st].backG, animGS.runners[st].backB, 1);

                     foundCorrectColors = true;

                     break;
                  }
               }

               if (foundCorrectColors === false) {
                  animGS.ctx.fillStyle = buildColorRGBA(animGS.runners[0].backR, animGS.runners[0].backG, animGS.runners[0].backB, animGS.runners[0].backA);
                  animGS.ctx.strokeStyle = buildColorRGBA(animGS.runners[0].backR, animGS.runners[0].backG, animGS.runners[0].backB, 1);
               }
            }

            /*
            fillStyle/strokeStyle for anim-background-drawing FADE-OUT !
            */
            function getCorrectColorsForBackgroundMotionAnimTypeFadeOut(customAlphaChannel) {

               var retColor = '';

               var foundCorrectColors = false;
               for (var st = 0; st < animGS.runners.length; st++) {

                  if (animGS.runners[st].iAmToCatch !== true) {
                     // AHA, we have FIRST hunter - enough for all the colors

                     // Ordinary runners
                     retColor =
                     buildColorRGBA(
                        Math.abs(animGS.runners[st].backR - animGS.fadingBackgroundColorsInvertedFactor),
                        Math.abs(animGS.runners[st].backG - animGS.fadingBackgroundColorsInvertedFactor),
                        Math.abs(animGS.runners[st].backB - animGS.fadingBackgroundColorsInvertedFactor),
                        customAlphaChannel);

                     foundCorrectColors = true;

                     break;
                  }
               }

               if (foundCorrectColors === false) {
                  retColor =
                  buildColorRGBA(
                     Math.abs(animGS.runners[0].backR - animGS.fadingBackgroundColorsInvertedFactor),
                     Math.abs(animGS.runners[0].backG - animGS.fadingBackgroundColorsInvertedFactor),
                     Math.abs(animGS.runners[0].backB - animGS.fadingBackgroundColorsInvertedFactor),
                     customAlphaChannel);
               }

               return retColor;
            }

            // Main timer
            function tickAnimEngine() {

               if (animGS.drawMotionPictureOnly === true) {

                  if (animGS.firstBackgroundWasDrawn === false) {
                     animGS.firstBackgroundWasDrawn = true;

                     if (animGS.useBackgroundGradient) {

                        // Gradient background fill
                        var grad2 = animGS.ctx.createLinearGradient(0, 0, animGS.cnvWidth, animGS.cnvHeight);
                        grad2.addColorStop(0, buildColorRGB(animGS.backR, animGS.backG, animGS.backB));
                        grad2.addColorStop(1, buildColorRGB(animGS.GRbackR, animGS.GRbackG, animGS.GRbackB));

                        animGS.ctx.fillStyle = grad2;
                        animGS.ctx.fillRect(0, 0, animGS.cnvWidth, animGS.cnvHeight);
                     }
                     else {

                        // Normal background fill
                        animGS.ctx.fillStyle = buildColorRGB(animGS.backR, animGS.backG, animGS.backB);
                        animGS.ctx.fillRect(0, 0, animGS.cnvWidth, animGS.cnvHeight);
                     }
                  }

                  if (animGS.fadingBackgroundAlwaysEnabled) {
                     // Alpha channel
                     var fadeOutAlphaAlwaysEnabled = animGS.fadingBackgroundAlwaysFadingFactor;

                     if (animGS.useBackgroundGradient) {

                        // Gradient background fade-out
                        var grad33 = animGS.ctx.createLinearGradient(0, 0, animGS.cnvWidth, animGS.cnvHeight);

                        grad33.addColorStop(0, getCorrectColorsForBackgroundMotionAnimTypeFadeOut(fadeOutAlphaAlwaysEnabled));
                        grad33.addColorStop(1, buildColorRGBA(animGS.GRbackR, animGS.GRbackG, animGS.GRbackB, fadeOutAlphaAlwaysEnabled));

                        animGS.ctx.fillStyle = grad33;
                        animGS.ctx.fillRect(0, 0, animGS.cnvWidth, animGS.cnvHeight);
                     }
                     else {
                        // Normal background fill-fade-out
                        animGS.ctx.fillStyle = getCorrectColorsForBackgroundMotionAnimTypeFadeOut(fadeOutAlphaAlwaysEnabled);
                        animGS.ctx.fillRect(0, 0, animGS.cnvWidth, animGS.cnvHeight);
                     }
                  }
                  else {
                     if (animGS.fadingBackgroundStartParamEnabled) {
                        if (animGS.fadeOutScreenCurrentTicksCount > 0) {
                           // CURRENTLY fadeout process !

                           // Alpha channel
                           var fadeOutAlpha = 0.2;

                           if (animGS.useBackgroundGradient) {

                              // Gradient background fade-out
                              var grad3 = animGS.ctx.createLinearGradient(0, 0, animGS.cnvWidth, animGS.cnvHeight);

                              grad3.addColorStop(0, getCorrectColorsForBackgroundMotionAnimTypeFadeOut(fadeOutAlpha));
                              grad3.addColorStop(1, buildColorRGBA(animGS.GRbackR, animGS.GRbackG, animGS.GRbackB, fadeOutAlpha));

                              animGS.ctx.fillStyle = grad3;
                              animGS.ctx.fillRect(0, 0, animGS.cnvWidth, animGS.cnvHeight);
                           }
                           else {

                              // Normal background fill-fade-out

                              animGS.ctx.fillStyle = getCorrectColorsForBackgroundMotionAnimTypeFadeOut(fadeOutAlpha);
                              animGS.ctx.fillRect(0, 0, animGS.cnvWidth, animGS.cnvHeight);
                           }

                           if (animGS.fadeOutScreenCurrentTicksCount >= animGS.fadeOutScreenHowManyTicks) {
                              // We finished with fading-out !
                              animGS.fadeOutScreenCurrentTicksCount = 0;
                           }
                           else {
                              animGS.fadeOutScreenCurrentTicksCount++;
                           }
                        }
                        else {
                           if (Math.random() > animGS.fadingBackgroundStartParam) {
                              // Start fading-out screen process very rarely !

                              // This STARTS fadin-out on the NEXT tick ! (becouse it is 0 at this moment)
                              animGS.fadeOutScreenCurrentTicksCount++;

                              // Reset to new random-check for startingg fading
                              animGS.fadingBackgroundStartParam = calcRndGenMinMax(970, 999) / 1000;
                           }
                        }
                     }
                  }

                  // NOTE: If drawMotionPictureMainStyleBrainDeadEnabled === true -> randomize EVERY drawing-templates
                  // Yes, it's a brain-dead-visualization combination :-)
                  if (animGS.drawMotionPictureMainStyleBrainDeadEnabled) {
                     animGS.drawMotionPictureMainStyle = calcRndGenMinMax(1, animGS.howManyDrawingMotionStyles);
                  }

                  if (animGS.drawMotionPictureMainStyle == 1 || animGS.drawMotionPictureMainStyle == 2) {
                     var oldLineWidthWickedLines = animGS.ctx.lineWidth;

                     animGS.ctx.lineWidth = animGS.motionPictureWickedLinesWidth;

                     animGS.ctx.beginPath();
                     animGS.ctx.moveTo(animGS.runners[0].runnerX, animGS.runners[0].runnerY);

                     setCorrectColorsForBackgroundMotionAnimType();

                     for (var wl = 0; wl < animGS.runners.length; wl++) {

                        if (animGS.drawMotionPictureMainStyle == 1) {
                           // DRAWING WICKED LINES ! :)

                           animGS.ctx.lineTo(animGS.runners[wl].runnerX, animGS.runners[wl].runnerY);

                        }
                        else if (animGS.drawMotionPictureMainStyle == 2) {
                           // DRAWING WICKED CURVES ! :)

                           var curControlPointsTweakForCurves =
                  (0.1 + getTwoPointsDistance(0, 0, animGS.runners[wl].runnerMotion.motionX, animGS.runners[wl].runnerMotion.motionY)) * animGS.runners[wl].runnerRadius;

                           var cpX = animGS.runners[wl].runnerX + curControlPointsTweakForCurves;
                           var cpY = animGS.runners[wl].runnerY + curControlPointsTweakForCurves;

                           animGS.ctx.bezierCurveTo(
                  cpX,
                  cpY,
                  cpX,
                  cpY,
                  animGS.runners[wl].runnerX,
                  animGS.runners[wl].runnerY);
                        }
                     }

                     animGS.ctx.closePath();

                     if (animGS.motionPictureSubSettingFillRegion === true) {
                        // Draw fill
                        animGS.ctx.fill();
                     }
                     else {
                        // Draw stroke
                        animGS.ctx.stroke();
                     }

                     animGS.ctx.lineWidth = oldLineWidthWickedLines;
                  }
                  else if (animGS.drawMotionPictureMainStyle === 18) {
                     // Experimantel 18
                     var oldLineWidth18 = animGS.ctx.lineWidth;
                     setCorrectColorsForBackgroundMotionAnimType();

                     animGS.ctx.beginPath();

                     for (var run18 = 0; run18 < animGS.runners.length; run18++) {
                        var r18 = animGS.runners[run18];

                        var r18Speed = getTwoPointsDistance(0, 0, r18.runnerMotion.motionX, r18.runnerMotion.motionY);

                        animGS.ctx.lineWidth = 0.1 + r18Speed;

                        var rndOffset;

                        if (animGS.drawMotionPictureMainStyleType17Rand1) {
                           rndOffset = Math.random() * (r18Speed * r18Speed) * (Math.random() > 0.5 ? 1 : -1);
                        }
                        else {
                           rndOffset = Math.random() * r18Speed * (Math.random() > 0.5 ? 1 : -1);
                        }

                        animGS.ctx.moveTo(r18.runnerX + rndOffset, 0);
                        animGS.ctx.lineTo(r18.runnerX, animGS.cnvHeight);
                        animGS.ctx.moveTo(0, r18.runnerY + rndOffset);
                        animGS.ctx.lineTo(animGS.cnvWidth, r18.runnerY);
                     }
                     animGS.ctx.stroke();
                     animGS.ctx.lineWidth = oldLineWidth18;
                  }
                  else if (animGS.drawMotionPictureMainStyle === 17) {
                     // Experimantel 17
                     var oldLineWidth17 = animGS.ctx.lineWidth;
                     setCorrectColorsForBackgroundMotionAnimType();

                     animGS.ctx.beginPath();

                     for (var run17 = 0; run17 < animGS.runners.length; run17++) {
                        var r17 = animGS.runners[run17];

                        var r17Speed = getTwoPointsDistance(0, 0, r17.runnerMotion.motionX, r17.runnerMotion.motionY);

                        animGS.ctx.lineWidth = 0.1 + r17Speed;

                        if (animGS.drawMotionPictureMainStyleType17Rand2) {
                           // Little bit Offseted coordinates

                           var rnd = Math.random() * (r17Speed * r17Speed) * (Math.random() > 0.5 ? 1 : -1);

                           if (animGS.drawMotionPictureMainStyleType17Rand1) {
                              animGS.ctx.moveTo(r17.runnerX + rnd, 0);
                              animGS.ctx.lineTo(r17.runnerX, animGS.cnvHeight);
                           }
                           else {
                              animGS.ctx.moveTo(0, r17.runnerY + rnd);
                              animGS.ctx.lineTo(animGS.cnvWidth, r17.runnerY);
                           }
                        }
                        else {
                           if (animGS.drawMotionPictureMainStyleType17Rand1) {
                              animGS.ctx.moveTo(r17.runnerX, 0);
                              animGS.ctx.lineTo(r17.runnerX, animGS.cnvHeight);
                           }
                           else {
                              animGS.ctx.moveTo(0, r17.runnerY);
                              animGS.ctx.lineTo(animGS.cnvWidth, r17.runnerY);
                           }
                        }
                     }
                     animGS.ctx.stroke();
                     animGS.ctx.lineWidth = oldLineWidth17;
                  }
                  else if (animGS.drawMotionPictureMainStyle === 16) {
                     // Experimantel 16
                     var oldLineWidth16 = animGS.ctx.lineWidth;
                     setCorrectColorsForBackgroundMotionAnimType();

                     animGS.ctx.beginPath();

                     for (var run16 = 0; run16 < animGS.runners.length; run16++) {
                        var r16 = animGS.runners[run16];
                        animGS.ctx.lineWidth = 0.1 + getTwoPointsDistance(0, 0, r16.runnerMotion.motionX, r16.runnerMotion.motionY);
                        animGS.ctx.moveTo(r16.runnerX, 0);
                        animGS.ctx.lineTo(r16.runnerX, animGS.cnvHeight);
                        animGS.ctx.moveTo(0, r16.runnerY);
                        animGS.ctx.lineTo(animGS.cnvWidth, r16.runnerY);
                     }
                     animGS.ctx.stroke();
                     animGS.ctx.lineWidth = oldLineWidth16;
                  }
                  else if (animGS.drawMotionPictureMainStyle === 15) {
                     // Experimantel 15
                     var oldLineWidth15 = animGS.ctx.lineWidth;
                     setCorrectColorsForBackgroundMotionAnimType();

                     animGS.ctx.beginPath();

                     for (var run15 = 0; run15 < animGS.runners.length; run15++) {

                        var r15 = animGS.runners[run15];

                        var s = getClosestEdgePoint(r15);
                        animGS.ctx.lineWidth = 0.1 + getTwoPointsDistance(0, 0, r15.runnerMotion.motionX, r15.runnerMotion.motionY);
                        animGS.ctx.moveTo(r15.runnerX, r15.runnerY);
                        animGS.ctx.lineTo(s.x, s.y);
                     }
                     animGS.ctx.stroke();
                     animGS.ctx.lineWidth = oldLineWidth15;
                  }
                  else if (animGS.drawMotionPictureMainStyle == 3 || animGS.drawMotionPictureMainStyle == 4) {
                     // Trees drawings

                     var oldLineWidthStars = animGS.ctx.lineWidth;

                     // OSTANE TAKO, CE MainStyle == 3
                     animGS.ctx.lineWidth = animGS.motionPictureWickedLinesWidth;

                     setCorrectColorsForBackgroundMotionAnimType();

                     animGS.ctx.beginPath();

                     for (var stars = 0; stars < animGS.runners.length; stars++) {

                        var curRunnerSpeed2 = 0.1 + getTwoPointsDistance(0, 0, animGS.runners[stars].runnerMotion.motionX, animGS.runners[stars].runnerMotion.motionY);

                        if (animGS.drawMotionPictureMainStyle == 4) {
                           // Za MainStyle == 4 SPROTI width prirejamo !
                           animGS.ctx.lineWidth = curRunnerSpeed2;
                        }

                        var angleStarBeam = getAngleBetweenTwoPoints(
               0,
               0,
               animGS.runners[stars].runnerMotion.motionX,
               animGS.runners[stars].runnerMotion.motionY);

                        animGS.ctx.moveTo(
               animGS.runners[stars].runnerX - (Math.cos(angleStarBeam) * curRunnerSpeed2),
               animGS.runners[stars].runnerY - (Math.sin(angleStarBeam) * curRunnerSpeed2));

                        animGS.ctx.lineTo(
               animGS.runners[stars].runnerX + (Math.cos(angleStarBeam) * curRunnerSpeed2 * 2),
               animGS.runners[stars].runnerY + (Math.sin(angleStarBeam) * curRunnerSpeed2 * 2));
                     }

                     animGS.ctx.stroke();

                     animGS.ctx.lineWidth = oldLineWidthStars;
                  }
                  else if (animGS.drawMotionPictureMainStyle == 5 || animGS.drawMotionPictureMainStyle == 6) {

                     var oldLineWidthFantasy = animGS.ctx.lineWidth;

                     setCorrectColorsForBackgroundMotionAnimType();

                     animGS.ctx.beginPath();

                     for (var runcen = 0; runcen < animGS.runners.length; runcen++) {

                        var closestRunnerIndex = getIndexOfTheClosestRunner(runcen);

                        if (closestRunnerIndex != -1) {

                           if (animGS.drawMotionPictureMainStyle == 5) {
                              // == 5 - speed for width
                              animGS.ctx.lineWidth = 0.1 + getTwoPointsDistance(0, 0, animGS.runners[runcen].runnerMotion.motionX, animGS.runners[runcen].runnerMotion.motionY);
                           }
                           else {
                              // == 6 - distance for width
                              var d = getTwoPointsDistance(
                     animGS.runners[runcen].runnerX, animGS.runners[runcen].runnerY,
                     animGS.runners[closestRunnerIndex].runnerX, animGS.runners[closestRunnerIndex].runnerY);

                              animGS.ctx.lineWidth = d + 0.1;
                           }

                           animGS.ctx.moveTo(
                  animGS.runners[runcen].runnerX,
                  animGS.runners[runcen].runnerY);

                           animGS.ctx.lineTo(
                  animGS.runners[closestRunnerIndex].runnerX,
                  animGS.runners[closestRunnerIndex].runnerY);
                        }
                     }

                     animGS.ctx.stroke();
                     animGS.ctx.lineWidth = oldLineWidthFantasy;
                  }
                  else if (animGS.drawMotionPictureMainStyle == 7 || animGS.drawMotionPictureMainStyle == 8) {

                     var oldLineWidthCrosses = animGS.ctx.lineWidth;

                     setCorrectColorsForBackgroundMotionAnimType();

                     animGS.ctx.beginPath();

                     var xCenter = animGS.cnvWidth / 2;
                     var yCenter = animGS.cnvHeight / 2;

                     for (var runcrs = 0; runcrs < animGS.runners.length; runcrs++) {

                        var currRunCrsSpeed = 0.1 + getTwoPointsDistance(0, 0, animGS.runners[runcrs].runnerMotion.motionX, animGS.runners[runcrs].runnerMotion.motionY);

                        animGS.ctx.lineWidth = currRunCrsSpeed;

                        if (animGS.drawMotionPictureMainStyle == 7) {
                           // == 7 - Crosses

                           var candrunnerangle =
                  getAngleBetweenTwoPoints(
                     0,
                     0,
                     animGS.runners[runcrs].runnerMotion.motionX,
                     animGS.runners[runcrs].runnerMotion.motionY);

                           animGS.ctx.moveTo(
                  animGS.runners[runcrs].runnerX,
                  animGS.runners[runcrs].runnerY);

                           var moveX = animGS.runners[runcrs].runnerX + (Math.cos(candrunnerangle) * currRunCrsSpeed);
                           var moveY = animGS.runners[runcrs].runnerY + (Math.sin(candrunnerangle) * currRunCrsSpeed);

                           animGS.ctx.lineTo(
                  moveX,
                  moveY);

                           var repmoveX = moveX;
                           var repmoveY = moveY;

                           for (var treerep = 0; treerep < Math.round(currRunCrsSpeed); treerep++) {

                              var rndAngle = Math.random() * (2 * Math.PI);

                              animGS.ctx.lineTo(
                     repmoveX,
                     repmoveY);

                              repmoveX += (Math.cos(rndAngle) * currRunCrsSpeed);
                              repmoveY += (Math.sin(rndAngle) * currRunCrsSpeed);
                           }
                        }
                        else {
                           // == 8 - to-center
                           animGS.ctx.moveTo(
                  animGS.runners[runcrs].runnerX,
                  animGS.runners[runcrs].runnerY);

                           animGS.ctx.lineTo(
                  xCenter,
                  yCenter);
                        }
                     }

                     animGS.ctx.stroke();
                     animGS.ctx.lineWidth = oldLineWidthCrosses;
                  }
                  else if (animGS.drawMotionPictureMainStyle == 9 || animGS.drawMotionPictureMainStyle == 10) {

                     var oldLineWidthComulative = animGS.ctx.lineWidth;

                     // If motionPictureCumulativesVersionSpeedLikeLineWidth == true, this one is ignored
                     animGS.ctx.lineWidth = animGS.motionPictureWickedLinesWidth;

                     setCorrectColorsForBackgroundMotionAnimType();

                     var cumulativeX = 0;
                     var cumulativeY = 0;
                     var cumulativeSpeed = 0.1;

                     for (var runcum = 0; runcum < animGS.runners.length; runcum++) {

                        cumulativeSpeed += getTwoPointsDistance(0, 0, animGS.runners[runcum].runnerMotion.motionX, animGS.runners[runcum].runnerMotion.motionY);
                        cumulativeX += animGS.runners[runcum].runnerX;
                        cumulativeY += animGS.runners[runcum].runnerY;

                     }

                     cumulativeX /= animGS.runners.length;
                     cumulativeY /= animGS.runners.length;

                     var averageCumulativeSpeed = cumulativeSpeed / animGS.runners.length;

                     if (animGS.motionPictureCumulativesVersionSpeedLikeLineWidth === true) {

                        animGS.ctx.lineWidth = averageCumulativeSpeed;

                     }

                     animGS.ctx.strokeStyle = buildColorRGBA(animGS.runners[0].backR, animGS.runners[0].backG, animGS.runners[0].backB, animGS.runners[0].backA);

                     animGS.ctx.beginPath();

                     var tmpCnvWidthByTwo = animGS.cnvWidth / 2;
                     var tmpCnvHeightByTwo = animGS.cnvHeight / 2;

                     if (animGS.drawMotionPictureMainStyle == 9) {
                        // TIP == 9

                        var inverseX = animGS.cnvWidth - cumulativeX;
                        var inverseY = animGS.cnvHeight - cumulativeY;

                        animGS.ctx.moveTo(0, 0);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        // Sliding
                        animGS.ctx.moveTo(inverseX, 0);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        animGS.ctx.moveTo(animGS.cnvWidth, 0);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        // Sliding
                        animGS.ctx.moveTo(animGS.cnvWidth, inverseY);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        animGS.ctx.moveTo(animGS.cnvWidth, animGS.cnvHeight);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        // Sliding
                        animGS.ctx.moveTo(inverseX, animGS.cnvHeight);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        animGS.ctx.moveTo(0, animGS.cnvHeight);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        // Sliding
                        animGS.ctx.moveTo(0, inverseY);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);
                     }
                     else {
                        // TIP == 10
                        animGS.ctx.moveTo(0, 0);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        animGS.ctx.moveTo(tmpCnvWidthByTwo, 0);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        animGS.ctx.moveTo(animGS.cnvWidth, 0);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        animGS.ctx.moveTo(animGS.cnvWidth, tmpCnvHeightByTwo);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        animGS.ctx.moveTo(animGS.cnvWidth, animGS.cnvHeight);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        animGS.ctx.moveTo(tmpCnvWidthByTwo, animGS.cnvHeight);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        animGS.ctx.moveTo(0, animGS.cnvHeight);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);

                        animGS.ctx.moveTo(0, tmpCnvHeightByTwo);
                        animGS.ctx.lineTo(cumulativeX, cumulativeY);
                     }

                     animGS.ctx.stroke();

                     var centerBallSizeRadius = Math.pow(averageCumulativeSpeed, 2) / 2;

                     animGS.ctx.beginPath();
                     animGS.ctx.arc(
            cumulativeX,
            cumulativeY,
            centerBallSizeRadius,
            0,
            Math.PI * 2,
            true);
                     animGS.ctx.closePath();
                     animGS.ctx.fill();

                     animGS.ctx.lineWidth = oldLineWidthComulative;
                  }
                  else if (animGS.drawMotionPictureMainStyle == 11 || animGS.drawMotionPictureMainStyle == 12) {

                     var oldLineWidthSpiral = animGS.ctx.lineWidth;

                     // If animGS.drawMotionPictureMainStyle == 11
                     animGS.ctx.lineWidth = animGS.motionPictureWickedLinesWidth;

                     setCorrectColorsForBackgroundMotionAnimType();

                     var cumulativeSpiX = 0;
                     var cumulativeSpiY = 0;
                     var cumulativeSpiSpeed = 0.1;

                     for (var runspi = 0; runspi < animGS.runners.length; runspi++) {

                        cumulativeSpiSpeed += getTwoPointsDistance(0, 0, animGS.runners[runspi].runnerMotion.motionX, animGS.runners[runspi].runnerMotion.motionY);
                        cumulativeSpiX += animGS.runners[runspi].runnerX;
                        cumulativeSpiY += animGS.runners[runspi].runnerY;

                     }

                     cumulativeSpiX /= animGS.runners.length;
                     cumulativeSpiY /= animGS.runners.length;

                     var averageCumulativeSpiSpeed = cumulativeSpiSpeed / animGS.runners.length;

                     if (animGS.drawMotionPictureMainStyle == 12) {

                        animGS.ctx.lineWidth = Math.pow(averageCumulativeSpiSpeed, 2);

                     }

                     animGS.ctx.beginPath();
                     animGS.ctx.moveTo(animGS.spiralAroundX, animGS.spiralAroundY);
                     animGS.ctx.lineTo(cumulativeSpiX, cumulativeSpiY);
                     animGS.ctx.stroke();

                     if (animGS.motionPictureSpiralsDrawCumulativeCircle === true) {

                        var centerSpiBallSizeRadius = animGS.ctx.lineWidth;

                        animGS.ctx.beginPath();
                        animGS.ctx.arc(
            cumulativeSpiX,
            cumulativeSpiY,
            centerSpiBallSizeRadius,
            0,
            Math.PI * 2,
            true);
                        animGS.ctx.closePath();
                        animGS.ctx.fill();

                     }

                     // Move spiral X,Y
                     if (animGS.spiralAroundX === 0 || animGS.spiralAroundX == animGS.cnvWidth) {
                        // AHA, we are moving on Y axis

                        if (animGS.spiralAroundX === 0) {
                           // Moving on LEFT-Y axis - UP

                           animGS.spiralAroundY -= averageCumulativeSpiSpeed;

                           if (animGS.spiralAroundY <= 0) {
                              animGS.spiralAroundY = 0;
                              animGS.spiralAroundX = averageCumulativeSpiSpeed;
                           }
                        }
                        else {
                           // Moving on RIGHT-Y axis - DOWN

                           animGS.spiralAroundY += averageCumulativeSpiSpeed;

                           if (animGS.spiralAroundY >= animGS.cnvHeight) {
                              animGS.spiralAroundY = animGS.cnvHeight;
                              animGS.spiralAroundX = animGS.cnvWidth - averageCumulativeSpiSpeed;
                           }
                        }
                     }
                     else {
                        // AHA, we are moving on X axis

                        if (animGS.spiralAroundY === 0) {
                           // Moving on TOP-X axis - RIGHT

                           animGS.spiralAroundX += averageCumulativeSpiSpeed;

                           if (animGS.spiralAroundX >= animGS.cnvWidth) {
                              animGS.spiralAroundX = animGS.cnvWidth;
                              animGS.spiralAroundY = averageCumulativeSpiSpeed;
                           }
                        }
                        else {
                           // Moving on BOTTOM-X axis - LEFT

                           animGS.spiralAroundX -= averageCumulativeSpiSpeed;

                           if (animGS.spiralAroundX <= 0) {
                              animGS.spiralAroundX = 0;
                              animGS.spiralAroundY = animGS.cnvHeight - averageCumulativeSpiSpeed;
                           }
                        }
                     }

                     animGS.ctx.lineWidth = oldLineWidthSpiral;
                  }
                  else {
                     // DRAWING CIRCLES/RECTS

                     setCorrectColorsForBackgroundMotionAnimType();

                     // ONLY MOTION PICTURE DRAWING FROM ALL THE RUNNERS !
                     for (var rmp = 0; rmp < animGS.runners.length; rmp++) {

                        // Current runners speed radius-tweak
                        var curRunnerSpeed = 0.1 + getTwoPointsDistance(0, 0, animGS.runners[rmp].runnerMotion.motionX, animGS.runners[rmp].runnerMotion.motionY);

                        var radiusTypeTweaking;

                        if (animGS.drawMotionPictureRadiusTweakingType == 1) {
                           // NAVADEN radius

                           radiusTypeTweaking = animGS.runners[rmp].runnerRadius;

                        }
                        else if (animGS.drawMotionPictureRadiusTweakingType == 2) {
                           // RADIUS PLUS SPEED

                           radiusTypeTweaking = animGS.runners[rmp].runnerRadius + curRunnerSpeed;
                        }
                        else {
                           // RADIUS KRAT SPEED

                           radiusTypeTweaking = animGS.runners[rmp].runnerRadius * curRunnerSpeed;
                        }

                        var rectsSize = 2 * radiusTypeTweaking;

                        if (animGS.drawMotionPictureDifferentDrawingTypes == 1) {
                           // CIRCLES

                           // Fill first
                           animGS.ctx.beginPath();
                           animGS.ctx.arc(
                  animGS.runners[rmp].runnerX,
                  animGS.runners[rmp].runnerY,
                  radiusTypeTweaking,
                  0,
                  Math.PI * 2,
                  true);
                           animGS.ctx.closePath();
                           animGS.ctx.fill();
                        }
                        else {
                           // RECTS

                           animGS.ctx.fillRect(
                  animGS.runners[rmp].runnerX - radiusTypeTweaking,
                  animGS.runners[rmp].runnerY - radiusTypeTweaking,
                  rectsSize,
                  rectsSize);
                        }

                        if (animGS.drawMotionPictureCirclesDrawEdges === true) {

                           if (animGS.drawMotionPictureDifferentDrawingTypes == 1) {
                              // CIRCLES

                              // Edge second
                              animGS.ctx.beginPath();
                              animGS.ctx.arc(
                     animGS.runners[rmp].runnerX,
                     animGS.runners[rmp].runnerY,
                     radiusTypeTweaking,
                     0,
                     Math.PI * 2,
                     true);
                              animGS.ctx.closePath();
                              animGS.ctx.stroke();
                           }
                           else {
                              // RECTS

                              animGS.ctx.strokeRect(
                     animGS.runners[rmp].runnerX - radiusTypeTweaking,
                     animGS.runners[rmp].runnerY - radiusTypeTweaking,
                     rectsSize,
                     rectsSize);
                           }
                        }
                     }
                  }

                  // END: ONLY MOTION PICTURE DRAWING FROM ALL THE RUNNERS !
               }
               else {

                  // Clear
                  animGS.ctx.clearRect(0, 0, animGS.cnvWidth, animGS.cnvHeight);

                  if (animGS.useBackgroundGradient) {

                     // Gradient background fill
                     var grad = animGS.ctx.createLinearGradient(0, 0, animGS.cnvWidth, animGS.cnvHeight);
                     grad.addColorStop(0, buildColorRGB(animGS.backR, animGS.backG, animGS.backB));
                     grad.addColorStop(1, buildColorRGB(animGS.GRbackR, animGS.GRbackG, animGS.GRbackB));

                     animGS.ctx.fillStyle = grad;
                     animGS.ctx.fillRect(0, 0, animGS.cnvWidth, animGS.cnvHeight);
                  }
                  else {

                     // Normal background fill
                     animGS.ctx.fillStyle = buildColorRGB(animGS.backR, animGS.backG, animGS.backB);
                     animGS.ctx.fillRect(0, 0, animGS.cnvWidth, animGS.cnvHeight);
                  }

                  for (var r = 0; r < animGS.runners.length; r++) {

                     if (animGS.runners[r].iAmToCatch === true) {
                        // Runner to be hunt down !
                        animGS.ctx.fillStyle = buildColorRGBA(animGS.runners[r].CMbackR, animGS.runners[r].CMbackG, animGS.runners[r].CMbackB, animGS.runners[r].CMbackA);
                        animGS.ctx.strokeStyle = buildColorRGBA(animGS.runners[r].CMbackR, animGS.runners[r].CMbackG, animGS.runners[r].CMbackB, 1);
                     }
                     else {
                        // Ordinary runners
                        animGS.ctx.fillStyle = buildColorRGBA(animGS.runners[r].backR, animGS.runners[r].backG, animGS.runners[r].backB, animGS.runners[r].backA);
                        animGS.ctx.strokeStyle = buildColorRGBA(animGS.runners[r].backR, animGS.runners[r].backG, animGS.runners[r].backB, 1);
                     }

                     // Fill first
                     animGS.ctx.beginPath();
                     animGS.ctx.arc(
            animGS.runners[r].runnerX,
            animGS.runners[r].runnerY,
            animGS.runners[r].runnerRadius,
            0,
            Math.PI * 2,
            true);
                     animGS.ctx.closePath();
                     animGS.ctx.fill();

                     // Edge second
                     animGS.ctx.beginPath();
                     animGS.ctx.arc(
            animGS.runners[r].runnerX,
            animGS.runners[r].runnerY,
            animGS.runners[r].runnerRadius,
            0,
            Math.PI * 2,
            true);
                     animGS.ctx.closePath();
                     animGS.ctx.stroke();

                     // Here we draw the LITTLE direction eye
                     if (animGS.runners[r].runnerMotion.motionX !== 0 && animGS.runners[r].runnerMotion.motionY !== 0) {

                        // (with OPOSITE colors)
                        if (animGS.runners[r].iAmToCatch !== true) {
                           // Runner to be hunt down !
                           animGS.ctx.fillStyle = buildColorRGBA(animGS.runners[r].CMbackR, animGS.runners[r].CMbackG, animGS.runners[r].CMbackB, animGS.runners[r].CMbackA);
                           animGS.ctx.strokeStyle = buildColorRGBA(animGS.runners[r].CMbackR, animGS.runners[r].CMbackG, animGS.runners[r].CMbackB, 1);
                        }
                        else {
                           // Ordinary runners
                           animGS.ctx.fillStyle = buildColorRGBA(animGS.runners[r].backR, animGS.runners[r].backG, animGS.runners[r].backB, animGS.runners[r].backA);
                           animGS.ctx.strokeStyle = buildColorRGBA(animGS.runners[r].backR, animGS.runners[r].backG, animGS.runners[r].backB, 1);
                        }

                        var translateMotionXToRealArea = animGS.runners[r].runnerX + animGS.runners[r].runnerMotion.motionX;
                        var translateMotionYToRealArea = animGS.runners[r].runnerY + animGS.runners[r].runnerMotion.motionY;

                        var angleForEye = getAngleBetweenTwoPoints(
               animGS.runners[r].runnerX,
               animGS.runners[r].runnerY,
               translateMotionXToRealArea,
               translateMotionYToRealArea);

                        var eyeX;
                        var eyeY;

                        if (animGS.drawFromCenterToEyeLineSpeedRepresentation === true && animGS.drawFromCenterToEyeLine === true) {
                           // Current speed depending EYE

                           var fromCenterToMotionDistance =
                  getTwoPointsDistance(
                  animGS.runners[r].runnerX,
                  animGS.runners[r].runnerY,
                  translateMotionXToRealArea,
                  translateMotionYToRealArea);

                           var currentSpeedRatio = fromCenterToMotionDistance / animGS.runnerMaxMotionMove;

                           if (currentSpeedRatio > 1) {
                              currentSpeedRatio = 1;
                           }

                           eyeX = animGS.runners[r].runnerX + (Math.cos(angleForEye) * animGS.runners[r].runnerRadius * currentSpeedRatio);
                           eyeY = animGS.runners[r].runnerY + (Math.sin(angleForEye) * animGS.runners[r].runnerRadius * currentSpeedRatio);
                        }
                        else {
                           // NORMAL eye on the circle

                           eyeX = animGS.runners[r].runnerX + (Math.cos(angleForEye) * animGS.runners[r].runnerRadius);
                           eyeY = animGS.runners[r].runnerY + (Math.sin(angleForEye) * animGS.runners[r].runnerRadius);
                        }

                        var oldLineWidth = animGS.ctx.lineWidth;

                        if (animGS.drawFromCenterToEyeLine === true) {

                           animGS.ctx.lineWidth = animGS.fromCenterToEyeLineWidth;

                           animGS.ctx.beginPath();
                           animGS.ctx.moveTo(animGS.runners[r].runnerX, animGS.runners[r].runnerY);

                           // Line from center to the eye
                           animGS.ctx.lineTo(eyeX, eyeY);
                           animGS.ctx.stroke();
                           animGS.ctx.closePath();
                        }

                        animGS.ctx.lineWidth = oldLineWidth;

                        if (animGS.drawEye === true) {

                           // EYE
                           animGS.ctx.beginPath();
                           animGS.ctx.arc(
                  eyeX,
                  eyeY,
                  animGS.eyeRadius,
                  0,
                  Math.PI * 2,
                  true);
                           animGS.ctx.closePath();
                           animGS.ctx.fill();
                        }
                     }
                  }
               }

               // Runners moving logic

               // Extras (29122009)
               if (animGS.runnersWholeMotionLogicType == 1) {
                  // NORMAL chasing-escapist logic
                  fullRunnersMotionLogic();
               }
               else if (animGS.runnersWholeMotionLogicType == 2) {
                  // NEW EXTRAS logic - every runner is following his closest neighbour !
                  fullRunnersMotionLogicExtrasVersion();
               }
               else if (animGS.runnersWholeMotionLogicType == 3) {
                  // NEW EXTRAS logic - every runner is following SMALLEST/BIGGEST runner !
                  fullRunnersMotionLogicExtrasVersionSmallestBiggest();
               }
               else if (animGS.runnersWholeMotionLogicType == 4) {
                  // NEW EXTRAS logic - Procession !
                  fullRunnersMotionLogicExtrasVersionProcession();
               }
               else if (animGS.runnersWholeMotionLogicType == 5) {
                  // NEW EXTRAS logic - every runner is following SLOWEST/FASTEST runner !
                  fullRunnersMotionLogicExtrasVersionSlowestFastest();
               }
               else if (animGS.runnersWholeMotionLogicType == 6) {
                  // NEW EXTRAS logic - every runner is ESCAPIST !
                  fullRunnersMotionLogicExtrasVersionEveryRunnerEscapist();
               }
               else if (animGS.runnersWholeMotionLogicType == 7) {
                  // NEW EXTRAS logic - EXPERIMENTAL-MADNESS !
                  fullRunnersMotionLogicExtrasVersionExperimentalMadness();
               }
               else if (animGS.runnersWholeMotionLogicType == 8) {
                  // NEW EXTRAS logic - Procession with PATHS
                  fullRunnersMotionLogicExtrasVersionProcession2();
               }
               else if (animGS.runnersWholeMotionLogicType == 9) {
                  // NEW EXTRAS logic - EXPERIMENTAL-MADNESS 2!
                  fullRunnersMotionLogicExtrasVersionExperimentalMadness2();
               }
               else if (animGS.runnersWholeMotionLogicType == 10) {
                  // Experimental shit-type
                  fullRunnersMotionLogicExperimentalShit();
               }
               else if (animGS.runnersWholeMotionLogicType == 11) {
                  // Experimental shit-type 2
                  fullRunnersMotionLogicExperimentalShit2();
               }
               else {
                  // Experimental shit-type 3
                  fullRunnersMotionLogicExperimentalShit3();
               }

               // END: Extras (29122009)

               // Color components change for Background
               if (animGS.useBackgroundFading || animGS.useBackgroundGradient) {
                  modifyBackGroundColor(animGS);
               }

               // Color components change for Runners
               for (var i = 0; i < animGS.runners.length; i++) {
                  modifyRunnerColor(animGS.runners[i]);
               }

               // Every now and then LITTLE color tweaks
               if (Math.random() < 0.05) {

                  var clrPlustNewTweak = getRandomColorIncrementValue();

                  var changeRUp = Math.random() > 0.5;
                  var changeGUp = Math.random() > 0.5;
                  var changeBUp = Math.random() > 0.5;

                  for (var c = 0; c < animGS.runners.length; c++) {
                     tweakLittleBitRunnersIncColorComponents(animGS.runners[c], clrPlustNewTweak, changeRUp, changeGUp, changeBUp);
                  }

               }

               tickAnim = setTimeout(tickAnimEngine, timerMiliSecs);

               return;
            }

            /*
            Anim initialization
            */
            function initAnim(startingCanvasWidth, startingCanvasHeight) {

               animGS = new animGlobalSettings(startingCanvasWidth, startingCanvasHeight);

               return;
            }

            /*
            Run anim
            */
            function runAnim(startingCanvasWidth, startingCanvasHeight) {

               initAnim(startingCanvasWidth, startingCanvasHeight);

               tickAnimEngine();

               return;
            }

            /*
            Full anim start
            */
            function completeAnimStart(startingCanvasWidth, startingCanvasHeight) {

               if (cnvDrawing !== null) {

                  // Get a reference to the element.
                  var elem = cnvDrawing;

                  // Always check for properties and methods, to make sure your code doesn't break 
                  // in other browsers.
                  if (elem && elem.getContext) {

                     // Get the 2d context.
                     // Remember: you can only initialize one context per element.
                     var ctx = elem.getContext('2d');

                     if (ctx) {

                        // Run anim
                        runAnim(startingCanvasWidth, startingCanvasHeight);
                     }
                  }
               }

               return;
            }

            /*
            Togle between normal or full-screen mode
            */
            function changeDisplayMode(escapistWidth, escapistHeight) {

               // Clear timeout FIRST
               stopAnim();

               cnvDrawing.width = escapistWidth;
               cnvDrawing.height = escapistHeight;

               // Run anim
               completeAnimStart(escapistWidth, escapistHeight);

               return;
            }

            function startAnim() {
               stopAnim();
               changeDisplayMode(o.width, o.height);

               return;
            }

            function destroyPlugin() {
               o = null;
               cnvDrawing = null;
               tickAnim = null;
               timerMiliSecs = null;
               numOfRunnersFromSettings = null;
               animGS = null;

               return;
            }

            $(document).unload(function () {
               stopAnim();
               destroyPlugin();
               $(this).unbind();
               return;
            });

            // Finally RUN EscapistDeluxe :-)
            startAnim();

            $(this).click(function () {
               stopAnim();
               startAnim();
               return;
            });

            $(this).bind('restartWithCustomNumberOfRunners', function (e, n) {
               numOfRunnersFromSettings = n;

               stopAnim();
               startAnim();
               return;
            });

            $(this).keyup(function () {
               stopAnim();
               destroyPlugin();
               $(this).unbind();
            });
         });
      }
   });
})(jQuery);