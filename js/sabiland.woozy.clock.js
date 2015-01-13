/*
* Woozy Clock jQuery plugin - v1.0
* Fully randomized digital-time-animation-presentation
* Code - Marko Sabotin (2010 - April)
*
* - width must be a number > 0
* - height must be a number > 0
* - ticklength must be a number > 0
* - maindtype must be a number: 1-3
*/
(function ($) {
   $.fn.extend({

      woozyclock: function (options) {

         var defaults = {
            width: 300, // Width
            height: 80,   // Height
            ticklength: 33, // Miliseconds per tick (33 == ~ 30FPS) / Animation speed
            maindtype: 3   // 1 - ONLY simple clock (circles), 2 - ONLY fancy-drawings clock, 3 - RANDOM choice between 1-2
         };

         options = $.extend(defaults, options);

         return this.each(function () {
            var o = options;

            // Check input-settings
            try {
               o.width = Math.abs(parseInt(o.width, 10));
               o.height = Math.abs(parseInt(o.height, 10));
               o.ticklength = Math.abs(parseInt(o.ticklength, 10));
               o.maindtype = Math.abs(parseInt(o.maindtype, 10));
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
               o.ticklength <= 0) {
               return;
            }

            var jCnvDrawing = $(this);
            var cnvDrawing = $(this)[0];

            var tickAnim;
            var timerMiliSecs = o.ticklength;
            var tickCurrentTime;
            var timerCurrentTimeMiliSecs = 1000;
            var currentHours;
            var currentMinutes;
            var currentSeconds;
            var choursDigit_1;
            var choursDigit_2;
            var cminutesDigit_1;
            var cminutesDigit_2;
            var csecondsDigit_1;
            var csecondsDigit_2;

            // Global object holding settings
            var animGS;

            // Unload
            function stopAnim() {
               if (tickAnim) {
                  clearTimeout(tickAnim);
               }

               if (tickCurrentTime) {
                  clearTimeout(tickCurrentTime);
               }

               return;
            }

            // Rand min-max
            function calcRndGenMinMax(min, max) {

               return Math.round(Math.random() * (max - min)) + min;
            }

            // Rand to max
            function calcRndGen(max, bInt) {

               return bInt === true ?
        Math.round(Math.random() * max)
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

            /*
            RGB to HEX
            */
            function RGB2Hex(red, green, blue) {
               var decColor = red + 256 * green + 65536 * blue;
               return decColor.toString(16);
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

            // How many runners AS time separators
            var howManyTimeSeparators = 4;

            // How many ALL digits
            var howManyAllDigits = 10;

            /*
            Get random starting number of runners
            */
            function getRandomStartingNumberOfRunners() {

               // We NEED a number dividable with 6 ! (6 digits) + 4 for time-separators !

               return ((calcRndGenMinMax(20, 30) * (howManyAllDigits - howManyTimeSeparators)) + howManyTimeSeparators);
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
    startingRunnerClrIncUpB,
    timeDigitLoyal) {

               // To WHICH time-digit (HH MM SS) this runner belongs !
               this.whichTimeDigitLoyal = timeDigitLoyal;

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

               // ALWAYS BACKUP STARTING FROM 0,0 TIME-DIGITS POSITION !
               this.runnerStartingXBackup = this.runnerX;
               this.runnerStartingYBackup = this.runnerY;

               return;
            }

            /*
            Constructing char - 0
            */
            function constructChar_0(perSingleCharPoints, chWidth, chHeight) {

               var tmpPoints = new Array(perSingleCharPoints);

               for (var i = 0; i < tmpPoints.length; i++) {
                  tmpPoints[i] = new Array(2);
               }

               var fullLengthLines = (2 * chWidth) + (2 * chHeight);

               var oneStep = fullLengthLines / perSingleCharPoints;

               var startX = 0;
               var startY = 0;
               var countingPoints = 0;

               var curUsedLength = 0;

               // To the right
               while (startX <= chWidth && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX += oneStep;
               }

               curUsedLength += chWidth;

               // Down from the right
               startX = chWidth;
               startY = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY <= chHeight && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               curUsedLength += chHeight;

               // Left from down-right
               startY = chHeight;
               startX = chWidth - Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startX >= 0 && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX -= oneStep;
               }

               curUsedLength += chWidth;

               // Up from down-left
               startX = 0;
               startY = chHeight - Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY >= 0 && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY -= oneStep;
               }

               // Ending possible fixing !
               if (countingPoints < perSingleCharPoints) {
                  // Just continue with previous steps

                  while (countingPoints < perSingleCharPoints) {
                     tmpPoints[countingPoints][0] = startX;
                     tmpPoints[countingPoints][1] = startY;

                     countingPoints++;
                     startY -= oneStep;
                  }
               }
               // END: Ending possible fixing !

               return tmpPoints;
            }

            /*
            Constructing char - 1
            */
            function constructChar_1(perSingleCharPoints, chWidth, chHeight) {

               var tmpPoints = new Array(perSingleCharPoints);

               for (var i = 0; i < tmpPoints.length; i++) {
                  tmpPoints[i] = new Array(2);
               }

               var fullLengthLines = chHeight;

               // Empty tail-ending MUST HAVE - 1 !
               var oneStep = fullLengthLines / (perSingleCharPoints - 1);

               var startX = chWidth;
               var startY = 0;
               var countingPoints = 0;

               // Down from right
               while (startY <= chHeight && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               // Ending possible fixing !
               if (countingPoints < perSingleCharPoints) {
                  // Just continue with previous steps

                  while (countingPoints < perSingleCharPoints) {
                     tmpPoints[countingPoints][0] = startX;
                     tmpPoints[countingPoints][1] = startY;

                     countingPoints++;
                     startY += oneStep;
                  }
               }
               // END: Ending possible fixing !

               return tmpPoints;
            }

            /*
            Constructing char - 2
            */
            function constructChar_2(perSingleCharPoints, chWidth, chHeight) {

               var tmpPoints = new Array(perSingleCharPoints);

               for (var i = 0; i < tmpPoints.length; i++) {
                  tmpPoints[i] = new Array(2);
               }

               var fullLengthLines = (3 * chWidth) + chHeight;

               // Empty tail-ending MUST HAVE - 1 !
               var oneStep = fullLengthLines / (perSingleCharPoints - 1);

               var startX = 0;
               var startY = 0;
               var countingPoints = 0;

               var curUsedLength = 0;

               // To the right
               while (startX <= chWidth && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX += oneStep;
               }

               curUsedLength += chWidth;

               // Down from the right to THE HALF height
               startX = chWidth;
               startY = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY <= (chHeight / 2) && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               curUsedLength += (chHeight / 2);

               // Left from half-down-right
               startY = chHeight / 2;
               startX = chWidth - Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startX >= 0 && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX -= oneStep;
               }

               curUsedLength += chWidth;

               // Down from left-half-down
               startX = 0;
               startY = (chHeight / 2) + Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY <= chHeight && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               curUsedLength += (chHeight / 2);

               // To the right from down-left
               startY = chHeight;
               startX = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startX <= chWidth && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX += oneStep;
               }

               // Ending possible fixing !
               if (countingPoints < perSingleCharPoints) {
                  // Just continue with previous steps

                  while (countingPoints < perSingleCharPoints) {
                     tmpPoints[countingPoints][0] = startX;
                     tmpPoints[countingPoints][1] = startY;

                     countingPoints++;
                     startX += oneStep;
                  }
               }
               // END: Ending possible fixing !

               return tmpPoints;
            }

            /*
            Constructing char - 3
            */
            function constructChar_3(perSingleCharPoints, chWidth, chHeight) {

               var tmpPoints = new Array(perSingleCharPoints);

               for (var i = 0; i < tmpPoints.length; i++) {
                  tmpPoints[i] = new Array(2);
               }

               var fullLengthLines = (3 * chWidth) + chHeight;

               var oneStep = fullLengthLines / (perSingleCharPoints - 1);

               var startX = 0;
               var startY = 0;
               var countingPoints = 0;

               var curUsedLength = 0;

               // To the right
               while (startX <= chWidth && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX += oneStep;
               }

               curUsedLength += chWidth;

               // Down from the right
               startX = chWidth;
               startY = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY <= chHeight && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               curUsedLength += chHeight;

               // Left from down-right
               startY = chHeight;
               startX = chWidth - Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startX >= 0 && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX -= oneStep;
               }

               curUsedLength += chWidth;

               // Left from half-down-right
               startY = chHeight / 2;
               startX = chWidth - Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startX >= 0 && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX -= oneStep;
               }

               // Ending possible fixing !
               if (countingPoints < perSingleCharPoints) {
                  // Just continue with previous steps

                  while (countingPoints < perSingleCharPoints) {
                     tmpPoints[countingPoints][0] = startX;
                     tmpPoints[countingPoints][1] = startY;

                     countingPoints++;
                     startX -= oneStep;
                  }
               }
               // END: Ending possible fixing !

               return tmpPoints;
            }

            /*
            Constructing char - 4
            */
            function constructChar_4(perSingleCharPoints, chWidth, chHeight) {

               var tmpPoints = new Array(perSingleCharPoints);

               for (var i = 0; i < tmpPoints.length; i++) {
                  tmpPoints[i] = new Array(2);
               }

               var fullLengthLines = chWidth + chHeight;

               // Empty tail-ending MUST HAVE - 1 !
               var oneStep = fullLengthLines / (perSingleCharPoints - 1);

               var startX = 0;
               var startY = 0;
               var countingPoints = 0;

               var curUsedLength = 0;

               // Down left-up
               while (startY <= (chHeight / 2) && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               curUsedLength += (chHeight / 2);

               // To the right from left-down-half
               startY = chHeight / 2;
               startX = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startX <= chWidth && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX += oneStep;
               }

               curUsedLength += chWidth;

               // Down from half-down-right
               startX = chWidth;
               startY = chHeight / 2 + Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY <= chHeight && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               // Ending possible fixing !
               if (countingPoints < perSingleCharPoints) {
                  // Just continue with previous steps

                  while (countingPoints < perSingleCharPoints) {
                     tmpPoints[countingPoints][0] = startX;
                     tmpPoints[countingPoints][1] = startY;

                     countingPoints++;
                     startY += oneStep;
                  }
               }
               // END: Ending possible fixing !

               return tmpPoints;
            }

            /*
            Constructing char - 5
            */
            function constructChar_5(perSingleCharPoints, chWidth, chHeight) {

               var tmpPoints = new Array(perSingleCharPoints);

               for (var i = 0; i < tmpPoints.length; i++) {
                  tmpPoints[i] = new Array(2);
               }

               var fullLengthLines = (3 * chWidth) + chHeight;

               // Empty tail-ending MUST HAVE - 1 !
               var oneStep = fullLengthLines / (perSingleCharPoints - 1);

               var startX = chWidth;
               var startY = 0;
               var countingPoints = 0;

               var curUsedLength = 0;

               // To the left from right
               while (startX >= 0 && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX -= oneStep;
               }

               curUsedLength += chWidth;

               // Down from the left to THE HALF height
               startX = 0;
               startY = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY <= (chHeight / 2) && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               curUsedLength += (chHeight / 2);

               // Right from half-down-left
               startY = chHeight / 2;
               startX = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startX <= chWidth && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX += oneStep;
               }

               curUsedLength += chWidth;

               // Down from right-half-down
               startX = chWidth;
               startY = (chHeight / 2) + Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY <= chHeight && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               curUsedLength += (chHeight / 2);

               // To the left from down-right
               startY = chHeight;
               startX = chWidth - Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startX >= 0 && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX -= oneStep;
               }

               // Ending possible fixing !
               if (countingPoints < perSingleCharPoints) {
                  // Just continue with previous steps

                  while (countingPoints < perSingleCharPoints) {
                     tmpPoints[countingPoints][0] = startX;
                     tmpPoints[countingPoints][1] = startY;

                     countingPoints++;
                     startX -= oneStep;
                  }
               }
               // END: Ending possible fixing !

               return tmpPoints;
            }

            /*
            Constructing char - 6
            */
            function constructChar_6(perSingleCharPoints, chWidth, chHeight) {

               var tmpPoints = new Array(perSingleCharPoints);

               for (var i = 0; i < tmpPoints.length; i++) {
                  tmpPoints[i] = new Array(2);
               }

               var fullLengthLines = (3 * chWidth) + ((3 * chHeight) / 2);

               var oneStep = fullLengthLines / perSingleCharPoints;

               var startX = chWidth;
               var startY = 0;
               var countingPoints = 0;

               var curUsedLength = 0;

               // To the left from right
               while (startX >= 0 && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX -= oneStep;
               }

               curUsedLength += chWidth;

               // Down from the left
               startX = 0;
               startY = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY <= chHeight && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               curUsedLength += chHeight;

               // Right from down-left
               startY = chHeight;
               startX = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startX <= chWidth && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX += oneStep;
               }

               curUsedLength += chWidth;

               // Up from right-down to right-half
               startX = chWidth;
               startY = chHeight - Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY >= (chHeight / 2) && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY -= oneStep;
               }

               curUsedLength += (chHeight / 2);

               // To the left from half-down-right
               startY = (chHeight / 2);
               startX = chWidth - Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startX >= 0 && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX -= oneStep;
               }

               // Ending possible fixing !
               if (countingPoints < perSingleCharPoints) {
                  // Just continue with previous steps

                  while (countingPoints < perSingleCharPoints) {
                     tmpPoints[countingPoints][0] = startX;
                     tmpPoints[countingPoints][1] = startY;

                     countingPoints++;
                     startX -= oneStep;
                  }
               }
               // END: Ending possible fixing !

               return tmpPoints;
            }

            /*
            Constructing char - 7
            */
            function constructChar_7(perSingleCharPoints, chWidth, chHeight) {

               var tmpPoints = new Array(perSingleCharPoints);

               for (var i = 0; i < tmpPoints.length; i++) {
                  tmpPoints[i] = new Array(2);
               }

               var fullLengthLines = chWidth + chHeight;

               // Empty tail-ending MUST HAVE - 1 !
               var oneStep = fullLengthLines / (perSingleCharPoints - 1);

               var startX = 0;
               var startY = 0;
               var countingPoints = 0;

               var curUsedLength = 0;

               // To the right
               while (startX <= chWidth && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX += oneStep;
               }

               curUsedLength += chWidth;

               // Down from the right
               startX = chWidth;
               startY = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY <= chHeight && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               // Ending possible fixing !
               if (countingPoints < perSingleCharPoints) {
                  // Just continue with previous steps

                  while (countingPoints < perSingleCharPoints) {
                     tmpPoints[countingPoints][0] = startX;
                     tmpPoints[countingPoints][1] = startY;

                     countingPoints++;
                     startY += oneStep;
                  }
               }
               // END: Ending possible fixing !

               return tmpPoints;
            }

            /*
            Constructing char - 8
            */
            function constructChar_8(perSingleCharPoints, chWidth, chHeight) {

               var tmpPoints = new Array(perSingleCharPoints);

               for (var i = 0; i < tmpPoints.length; i++) {
                  tmpPoints[i] = new Array(2);
               }

               var fullLengthLines = (3 * chWidth) + (2 * chHeight);

               var oneStep = fullLengthLines / perSingleCharPoints;

               var startX = 0;
               var startY = 0;
               var countingPoints = 0;

               var curUsedLength = 0;

               // To the right
               while (startX <= chWidth && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX += oneStep;
               }

               curUsedLength += chWidth;

               // Down from the right
               startX = chWidth;
               startY = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY <= chHeight && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               curUsedLength += chHeight;

               // Left from down-right
               startY = chHeight;
               startX = chWidth - Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startX >= 0 && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX -= oneStep;
               }

               curUsedLength += chWidth;

               // Up from left-down
               startX = 0;
               startY = chHeight - Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY >= 0 && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY -= oneStep;
               }

               curUsedLength += chHeight;

               startY = chHeight / 2;
               startX = Math.abs(curUsedLength - (oneStep * countingPoints));

               // To the right from half-down-left
               while (startX <= chWidth && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX += oneStep;
               }

               // Ending possible fixing !
               if (countingPoints < perSingleCharPoints) {
                  // Just continue with previous steps

                  while (countingPoints < perSingleCharPoints) {
                     tmpPoints[countingPoints][0] = startX;
                     tmpPoints[countingPoints][1] = startY;

                     countingPoints++;
                     startX += oneStep;
                  }
               }
               // END: Ending possible fixing !

               return tmpPoints;
            }

            /*
            Constructing char - 9
            */
            function constructChar_9(perSingleCharPoints, chWidth, chHeight) {

               var tmpPoints = new Array(perSingleCharPoints);

               for (var i = 0; i < tmpPoints.length; i++) {
                  tmpPoints[i] = new Array(2);
               }

               var fullLengthLines = (3 * chWidth) + ((3 * chHeight) / 2);

               var oneStep = fullLengthLines / perSingleCharPoints;

               var startX = 0;
               var startY = 0;
               var countingPoints = 0;

               var curUsedLength = 0;

               // To the right
               while (startX <= chWidth && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX += oneStep;
               }

               curUsedLength += chWidth;

               // Down from the right
               startX = chWidth;
               startY = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY <= chHeight && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               curUsedLength += chHeight;

               startY = chHeight;
               startX = chWidth - Math.abs(curUsedLength - (oneStep * countingPoints));

               // To the left from down-right
               while (startX >= 0 && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX -= oneStep;
               }

               curUsedLength += chWidth;

               // Down from left to half-down
               startX = 0;
               startY = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startY <= (chHeight / 2) && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startY += oneStep;
               }

               curUsedLength += (chHeight / 2);

               // To the right from half-down-left
               startY = chHeight / 2;
               startX = Math.abs(curUsedLength - (oneStep * countingPoints));

               while (startX <= chWidth && (countingPoints < perSingleCharPoints)) {

                  tmpPoints[countingPoints][0] = startX;
                  tmpPoints[countingPoints][1] = startY;

                  countingPoints++;
                  startX += oneStep;
               }

               // Ending possible fixing !
               if (countingPoints < perSingleCharPoints) {
                  // Just continue with previous steps

                  while (countingPoints < perSingleCharPoints) {
                     tmpPoints[countingPoints][0] = startX;
                     tmpPoints[countingPoints][1] = startY;

                     countingPoints++;
                     startX += oneStep;
                  }
               }
               // END: Ending possible fixing !

               return tmpPoints;
            }

            /*
            ONE Ascii char object
            */
            function oneAsciiChar(
   singleIntChar,
   perSingleCharPoints,
   fullWidth,
   fullHeight,
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

               this.allCharDefinitionData = new Array(perSingleCharPoints);

               // WE HAVE SIX SAME DIGITS PER ONE CHAR !
               for (var fdg = 0; fdg < this.allCharDefinitionData.length; fdg++) {
                  this.allCharDefinitionData[fdg] = new Array(6);
               }

               // Char Width / Height calculation
               this.oneCharWidth = fullWidth / 10;   // So we have some space left for chars alignment
               this.oneCharHeight = fullHeight - (this.oneCharWidth);   // So we have some space left for chars alignment

               var tmpPoints;

               // For INPUT-param singleIntChar build specific char-points

               tmpPoints = eval('constructChar_' + singleIntChar.toString() + '(perSingleCharPoints, this.oneCharWidth, this.oneCharHeight);');

               for (var j = 0; j < tmpPoints.length; j++) {

                  // WE HAVE SIX SAME DIGITS PER ONE CHAR !
                  for (var sixdigits = 0; sixdigits < 6; sixdigits++) {

                     this.allCharDefinitionData[j][sixdigits] =
            new oneAnimRunner(
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
               startingRunnerClrIncUpB,
               -1);  // This number IRRELEVANT here !

                     this.allCharDefinitionData[j][sixdigits].runnerX = tmpPoints[j][0];
                     this.allCharDefinitionData[j][sixdigits].runnerY = tmpPoints[j][1];

                     this.allCharDefinitionData[j][sixdigits].runnerStartingXBackup = this.allCharDefinitionData[j][sixdigits].runnerX;
                     this.allCharDefinitionData[j][sixdigits].runnerStartingYBackup = this.allCharDefinitionData[j][sixdigits].runnerY;

                     // FULL BACKUP OF ORIGINAL POSITION !
                     this.allCharDefinitionData[j][sixdigits].runnerStartingXBackupFULL = this.allCharDefinitionData[j][sixdigits].runnerX;
                     this.allCharDefinitionData[j][sixdigits].runnerStartingYBackupFULL = this.allCharDefinitionData[j][sixdigits].runnerY;
                  }
               }

               // Randomize in the begining which point where inside the single-char
               this.allCharDefinitionData.sort(function () { return (0.5 - Math.random()); });

               return;
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

               // FANCY GRAPHICS (v2 feature)
               this.drawMotionPictureOnly = Math.random() > 0.5;

               if (o.maindtype == 1) {
                  this.drawMotionPictureOnly = false;
               }
               else if (o.maindtype == 2) {
                  this.drawMotionPictureOnly = true;
               }

               this.firstBackgroundWasDrawn = false;
               this.drawMotionPictureMainStyle = calcRndGenMinMax(1, 10);  // Last two are for normal mode !

               this.drawMotionPictureRadiusTweakingType = calcRndGenMinMax(1, 3);
               this.drawMotionPictureCirclesDrawEdges = Math.random() > 0.5;
               this.drawMotionPictureDifferentDrawingTypes = calcRndGenMinMax(1, 2);
               this.motionPictureWickedLinesWidth = calcRndGenMinMax(1, 5);
               this.fadeOutScreenHowManyTicks = o.ticklength;
               this.fadeOutScreenCurrentTicksCount = 0;

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
               this.runnerMaxSizeRadius = Math.round(this.cnvWidth / calcRndGenMinMax(70, 140)); // Randomly calculated MAX size
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
               this.howManyRunners = getRandomStartingNumberOfRunners() - howManyTimeSeparators;   // How many runners ! NOTE: We ADD TIME-SEPARATORS LATER !
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
            startingClrIncUpB,
            ((i % 6) + 1));   // 1 or 2 or 3 or 4 or 5 or 6!
               }

               // Init time-chars and ALL other stuff

               // LAST 4 runners are for TIME separators !
               this.runnersTimerSeparators = new Array(howManyTimeSeparators);

               this.howManyRunners += howManyTimeSeparators;

               for (var ts = 0; ts < howManyTimeSeparators; ts++) {

                  // NOTE: NEEDED for OLD-logic...
                  this.isCatchingPhaseEscapingRunnerIndexes.push(0);

                  this.runners.push(new oneAnimRunner(
            this.runnerStartingRadius,
            this.cnvWidth,
            this.cnvHeight,
            this.colorAlpha,
            255 - runnerStartingR,
            255 - runnerStartingG,
            255 - runnerStartingB,
            runnerStartingClrPlus,
            startingClrIncUpR,
            startingClrIncUpG,
            startingClrIncUpB,
            (ts + howManyAllDigits)));   // 10, 11, 12, 13 == time-separators (howManyAllDigits == 10)

                  // Those 'howManyTimeSeparators' will be CHASING those hidden 'this.runnersTimerSeparators'
                  this.runnersTimerSeparators[ts] = new oneAnimRunner(
            this.runnerStartingRadius,
            this.cnvWidth,
            this.cnvHeight,
            this.colorAlpha,
            255 - runnerStartingR,
            255 - runnerStartingG,
            255 - runnerStartingB,
            runnerStartingClrPlus,
            startingClrIncUpR,
            startingClrIncUpG,
            startingClrIncUpB,
            (ts + howManyAllDigits));   // 10, 11, 12, 13 == time-separators (howManyAllDigits == 10)
               }

               // END: LAST 4 runners are for TIME separators !

               this.allAsciiCharsData = new Array(howManyAllDigits);

               var perSingleCharHowManyPoints = Math.round((this.runners.length - howManyTimeSeparators) / 6);

               for (var acd = 0; acd < howManyAllDigits; acd++) {

                  this.allAsciiCharsData[acd] = new oneAsciiChar(
         acd,
         perSingleCharHowManyPoints,
         this.cnvWidth,
         this.cnvHeight,
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

               // Starting left-top offset of FIRST time-digit !
               this.startingTimeTopLeftOffset = this.cnvWidth / 25;

               // Differenet runner-timer-digits-points-behaviour
               this.timeDigitsSingleRunnerLittleBitOffsetBehaviourTypes = calcRndGenMinMax(1, 3);

               // IF we dynamically strecth time digits vertically
               this.timeDigitsDynamicMovement = calcRndGenMinMax(0, 12);
               this.timeDigitsDynamicMovementMaxShakeOffset = 3;

               // END: Init time-chars and ALL other stuff

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
            We try to close to the escaping runner
            */
            function tryToCatchTheEscapingRunner(chaserRunner, escapingRunner, escapistIndex) {

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

               return;
            }

            /*
            Time-digits dynamic movement 11!
            */
            function makeDynamicTimeDigitMovement11() {

               // NOTE: makeDynamicTimeDigitMovement11 just shifts 2 randomly selected points-per-single-char !

               // Offset time-digits immediately very rarely !
               var bOffsetImmediately = Math.random() > 0.99;

               if (bOffsetImmediately === true) {

                  var firstRand;
                  var secondRand;
                  var tmpPoint;

                  for (var i = 0; i < animGS.allAsciiCharsData.length; i++) {

                     firstRand = calcRndGenMinMax(0, animGS.allAsciiCharsData[i].allCharDefinitionData.length - 1);
                     secondRand = calcRndGenMinMax(0, animGS.allAsciiCharsData[i].allCharDefinitionData.length - 1);

                     if (firstRand != secondRand) {

                        tmpPoint = animGS.allAsciiCharsData[i].allCharDefinitionData[firstRand];
                        animGS.allAsciiCharsData[i].allCharDefinitionData[firstRand] = animGS.allAsciiCharsData[i].allCharDefinitionData[secondRand];
                        animGS.allAsciiCharsData[i].allCharDefinitionData[secondRand] = tmpPoint;
                     }
                  }
               }

               return;
            }

            /*
            Time-digits dynamic movement 10!
            */
            function makeDynamicTimeDigitMovement10() {

               // NOTE: makeDynamicTimeDigitMovement10 just RANDOMIZES table WITH points-per-char !

               // Offset time-digits immediately very rarely !
               var bOffsetImmediately = Math.random() > 0.995;

               if (bOffsetImmediately === true) {
                  for (var i = 0; i < animGS.allAsciiCharsData.length; i++) {
                     // Randomize per-char-points
                     animGS.allAsciiCharsData[i].allCharDefinitionData.sort(function () { return (0.5 - Math.random()); });
                  }
               }

               return;
            }

            /*
            Time-digits dynamic movement 9!
            */
            function makeDynamicTimeDigitMovement9() {

               // NOTE: makeDynamicTimeDigitMovement9 just OFFESTS ALL RUNNERS to all of the 4 corners randomly !

               // Offset time-digits immediately very rarely !
               var bOffsetImmediately = Math.random() > 0.995;

               if (bOffsetImmediately === true) {

                  var howManyEdgesPoints = animGS.runners.length;
                  var allDigitsDynamicOffsets = new Array(howManyEdgesPoints);
                  var startEdgeX;
                  var startEdgeY;
                  var addoMod4;

                  for (var addo = 0; addo < allDigitsDynamicOffsets.length; addo++) {
                     allDigitsDynamicOffsets[addo] = new Array(2);

                     addoMod4 = addo % 4;

                     if (addoMod4 === 0) {
                        // Top left
                        startEdgeX = 0;
                        startEdgeY = 0;
                     }
                     else if (addoMod4 == 1) {
                        // Top right
                        startEdgeX = animGS.cnvWidth;
                        startEdgeY = 0;
                     }
                     else if (addoMod4 == 2) {
                        // Bottom right
                        startEdgeX = animGS.cnvWidth;
                        startEdgeY = animGS.cnvHeight;
                     }
                     else {
                        // Bottom left
                        startEdgeX = 0;
                        startEdgeY = animGS.cnvHeight;
                     }

                     allDigitsDynamicOffsets[addo][0] = startEdgeX;
                     allDigitsDynamicOffsets[addo][1] = startEdgeY;
                  }

                  // Randomize the order !
                  allDigitsDynamicOffsets.sort(function () { return (0.5 - Math.random()); });

                  for (var i = 0; i < animGS.runners.length; i++) {
                     animGS.runners[i].runnerX = allDigitsDynamicOffsets[i][0];
                     animGS.runners[i].runnerY = allDigitsDynamicOffsets[i][1];
                  }
               }

               return;
            }

            /*
            Time-digits dynamic movement 8!
            */
            function makeDynamicTimeDigitMovement8() {

               // NOTE: makeDynamicTimeDigitMovement8 just OFFESTS ALL RUNNERS - translate points over width / 2 and height / 2 axis!

               // Offset time-digits immediately very rarely !
               var bOffsetImmediately = Math.random() > 0.995;

               if (bOffsetImmediately === true) {

                  var translationMode = calcRndGenMinMax(0, 2);
                  var transFromX;
                  var transFromY;

                  if (translationMode === 0) {
                     // Over X axis
                     transFromX = animGS.cnvWidth;
                     transFromY = 0;
                  }
                  else if (translationMode == 1) {
                     // Over Y axis
                     transFromX = 0;
                     transFromY = animGS.cnvHeight;
                  }
                  else {
                     // Both X and Y axis
                     transFromX = animGS.cnvWidth;
                     transFromY = animGS.cnvHeight;
                  }

                  for (var i = 0; i < animGS.runners.length; i++) {
                     // Translation

                     animGS.runners[i].runnerX = Math.abs(transFromX - animGS.runners[i].runnerX);
                     animGS.runners[i].runnerY = Math.abs(transFromY - animGS.runners[i].runnerY);
                  }
               }

               return;
            }

            /*
            Time-digits dynamic movement 7!
            */
            function makeDynamicTimeDigitMovement7() {

               // NOTE: makeDynamicTimeDigitMovement7 just OFFESTS ALL RUNNERS to the WHOLE equally distributed points of the screen !

               // Offset time-digits immediately very rarely !
               var bOffsetImmediately = Math.random() > 0.995;

               if (bOffsetImmediately === true) {

                  var howManyEdgesPoints = animGS.runners.length;
                  var howManyHorizontalLines = calcRndGenMinMax(3, parseInt(howManyEdgesPoints / 3, 10));
                  var oneStepX = animGS.cnvWidth / (howManyEdgesPoints / howManyHorizontalLines);
                  var oneStepY = animGS.cnvHeight / (howManyHorizontalLines - 1);
                  var startEdgeX = 0;
                  var startEdgeY = 0;
                  var allEdgesPointsCounter = 0;

                  var allDigitsDynamicOffsets = new Array(howManyEdgesPoints);

                  for (var addo = 0; addo < allDigitsDynamicOffsets.length; addo++) {
                     allDigitsDynamicOffsets[addo] = new Array(2);
                  }

                  while (allEdgesPointsCounter < howManyEdgesPoints) {

                     allDigitsDynamicOffsets[allEdgesPointsCounter][0] = startEdgeX + (Math.random() * oneStepX);
                     allDigitsDynamicOffsets[allEdgesPointsCounter][1] = startEdgeY;

                     startEdgeX += oneStepX;
                     allEdgesPointsCounter++;

                     if (startEdgeX >= animGS.cnvWidth) {
                        startEdgeX = 0;
                        startEdgeY += oneStepY;
                     }
                  }

                  // Randomize the order !
                  allDigitsDynamicOffsets.sort(function () { return (0.5 - Math.random()); });

                  for (var i = 0; i < animGS.runners.length; i++) {
                     animGS.runners[i].runnerX = allDigitsDynamicOffsets[i][0];
                     animGS.runners[i].runnerY = allDigitsDynamicOffsets[i][1];
                  }
               }

               return;
            }

            /*
            Time-digits dynamic movement 6!
            */
            function makeDynamicTimeDigitMovement6() {

               // NOTE: makeDynamicTimeDigitMovement6 just OFFESTS ALL RUNNERS to the EDGE of the screen !

               // Offset time-digits immediately very rarely !
               var bOffsetImmediately = Math.random() > 0.995;

               if (bOffsetImmediately === true) {

                  var howManyEdgesPoints = animGS.runners.length;
                  var allEdgesLength = (2 * animGS.cnvWidth) + (2 * animGS.cnvHeight);
                  var oneEdgeStep = allEdgesLength / howManyEdgesPoints;
                  var oneStepX = oneEdgeStep;
                  var oneStepY = 0;
                  var startEdgeX = 0;
                  var startEdgeY = 0;
                  var allEdgesPointsCounter = 0;

                  var allDigitsDynamicOffsets = new Array(howManyEdgesPoints);

                  for (var addo = 0; addo < allDigitsDynamicOffsets.length; addo++) {
                     allDigitsDynamicOffsets[addo] = new Array(2);
                  }

                  while (allEdgesPointsCounter < howManyEdgesPoints) {

                     allDigitsDynamicOffsets[allEdgesPointsCounter][0] = startEdgeX;
                     allDigitsDynamicOffsets[allEdgesPointsCounter][1] = startEdgeY;

                     if (startEdgeX > animGS.cnvWidth) {
                        startEdgeX = animGS.cnvWidth;
                        oneStepX = 0;
                        oneStepY = oneEdgeStep;
                     }

                     if (startEdgeY > animGS.cnvHeight) {
                        oneStepX = -oneEdgeStep;
                        startEdgeY = animGS.cnvHeight;
                        oneStepY = 0;
                     }

                     if (startEdgeX < 0) {
                        startEdgeX = 0;
                        oneStepX = 0;
                        oneStepY = -oneEdgeStep;
                     }

                     startEdgeX += oneStepX;
                     startEdgeY += oneStepY;

                     allEdgesPointsCounter++;
                  }

                  // Randomize the order !
                  allDigitsDynamicOffsets.sort(function () { return (0.5 - Math.random()); });

                  for (var i = 0; i < animGS.runners.length; i++) {
                     animGS.runners[i].runnerX = allDigitsDynamicOffsets[i][0];
                     animGS.runners[i].runnerY = allDigitsDynamicOffsets[i][1];
                  }
               }

               return;
            }

            /*
            Time-digits dynamic movement 5!
            */
            function makeDynamicTimeDigitMovement5() {

               // NOTE: makeDynamicTimeDigitMovement5 just OFFESTS ALL RUNNERS to ONE single point - PER DIGIT!

               // Offset time-digits immediately very rarely !
               var bOffsetImmediately = Math.random() > 0.995;

               if (bOffsetImmediately === true) {

                  var allDigitsDynamicOffsets = new Array(7);  // 6 for DIGITS, 7 FOR SEPARATORS !

                  for (var addo = 0; addo < allDigitsDynamicOffsets.length; addo++) {
                     allDigitsDynamicOffsets[addo] = new Array(2);

                     allDigitsDynamicOffsets[addo][0] = Math.random() * animGS.cnvWidth;
                     allDigitsDynamicOffsets[addo][1] = Math.random() * animGS.cnvHeight;
                  }

                  for (var i = 0; i < animGS.runners.length; i++) {

                     var correctDigitIndex = (i % 6);

                     if (correctDigitIndex < 6) {
                        // Time digits
                        animGS.runners[i].runnerX = allDigitsDynamicOffsets[correctDigitIndex][0];
                        animGS.runners[i].runnerY = allDigitsDynamicOffsets[correctDigitIndex][1];
                     }
                     else {
                        // Separators
                        animGS.runners[i].runnerX = allDigitsDynamicOffsets[6][0];
                        animGS.runners[i].runnerY = allDigitsDynamicOffsets[6][1];
                     }
                  }
               }

               return;
            }

            /*
            Time-digits dynamic movement 4!
            */
            function makeDynamicTimeDigitMovement4() {

               // NOTE: makeDynamicTimeDigitMovement4 just OFFESTS ALL RUNNERS to ONE single point!

               // Offset time-digits immediately very rarely !
               var bOffsetImmediately = Math.random() > 0.995;

               if (bOffsetImmediately === true) {

                  var offsetAllToX;
                  var offsetAllToY;

                  var differentAllPointsOffsets = calcRndGenMinMax(0, 4);

                  if (differentAllPointsOffsets === 0) {
                     // TOP LEFT
                     offsetAllToX = 0;
                     offsetAllToY = 0;
                  }
                  else if (differentAllPointsOffsets === 1) {
                     // TOP RIGHT
                     offsetAllToX = animGS.cnvWidth;
                     offsetAllToY = 0;
                  }
                  else if (differentAllPointsOffsets === 2) {
                     // DOWN RIGHT
                     offsetAllToX = animGS.cnvWidth;
                     offsetAllToY = animGS.cnvHeight;
                  }
                  else if (differentAllPointsOffsets === 3) {
                     // DOWN LEFT
                     offsetAllToX = 0;
                     offsetAllToY = animGS.cnvHeight;
                  }
                  else {
                     // RANDOM
                     offsetAllToX = Math.random() * animGS.cnvWidth;
                     offsetAllToY = Math.random() * animGS.cnvHeight;
                  }

                  for (var i = 0; i < animGS.runners.length; i++) {
                     animGS.runners[i].runnerX = offsetAllToX;
                     animGS.runners[i].runnerY = offsetAllToY;
                  }
               }

               return;
            }

            /*
            Time-digits dynamic movement 3!
            */
            function makeDynamicTimeDigitMovement3() {

               // NOTE: makeDynamicTimeDigitMovement3 just OFFESTS RUNNERS immediately!

               // Offset time-digits immediately very rarely !
               var bOffsetImmediately = Math.random() > 0.99;

               if (bOffsetImmediately === true) {

                  var shakeX;
                  var shakeY;
                  var rndDigitsOffsetX;
                  var rndDigitsOffsetY;

                  for (var i = 0; i < animGS.runners.length; i++) {

                     shakeX = calcRndGenMinMax(0, animGS.startingTimeTopLeftOffset);
                     shakeY = calcRndGenMinMax(0, animGS.startingTimeTopLeftOffset);

                     rndDigitsOffsetX = shakeX * Math.random() * (Math.random() > Math.random() ? 1 : -1);
                     rndDigitsOffsetY = shakeY * Math.random() * (Math.random() > Math.random() ? 1 : -1);

                     animGS.runners[i].runnerX += rndDigitsOffsetX;
                     animGS.runners[i].runnerY += rndDigitsOffsetY;
                  }
               }

               return;
            }

            /*
            Time-digits dynamic movement 2!
            */
            function makeDynamicTimeDigitMovement2() {

               // NOTE: makeDynamicTimeDigitMovement2 just OFFESTS timing-digits immediately !

               // Offset time-digits immediately very rarely !
               var bOffsetImmediately = Math.random() > 0.99;

               if (bOffsetImmediately === true) {

                  var shakeX = calcRndGenMinMax(0, animGS.startingTimeTopLeftOffset);
                  var shakeY = calcRndGenMinMax(0, animGS.startingTimeTopLeftOffset);

                  var rndDigitsOffsetX = shakeX * Math.random() * (Math.random() > Math.random() ? 1 : -1);
                  var rndDigitsOffsetY = shakeY * Math.random() * (Math.random() > Math.random() ? 1 : -1);

                  for (var i = 0; i < animGS.allAsciiCharsData.length; i++) {
                     for (var j = 0; j < animGS.allAsciiCharsData[i].allCharDefinitionData.length; j++) {
                        for (var k = 0; k < animGS.allAsciiCharsData[i].allCharDefinitionData[j].length; k++) {

                           // FIRST - Reset
                           animGS.allAsciiCharsData[i].allCharDefinitionData[j][k].runnerStartingXBackup = animGS.allAsciiCharsData[i].allCharDefinitionData[j][k].runnerStartingXBackupFULL;
                           animGS.allAsciiCharsData[i].allCharDefinitionData[j][k].runnerStartingYBackup = animGS.allAsciiCharsData[i].allCharDefinitionData[j][k].runnerStartingYBackupFULL;

                           // SECOND - Offset immediately 
                           animGS.allAsciiCharsData[i].allCharDefinitionData[j][k].runnerStartingXBackup += rndDigitsOffsetX;
                           animGS.allAsciiCharsData[i].allCharDefinitionData[j][k].runnerStartingYBackup += rndDigitsOffsetY;

                        }
                     }
                  }
               }

               return;
            }

            /*
            Time-digits dynamic movement !
            */
            function makeDynamicTimeDigitMovement1() {

               var shakeX = calcRndGenMinMax(0, animGS.timeDigitsDynamicMovementMaxShakeOffset);
               var shakeY = calcRndGenMinMax(0, animGS.timeDigitsDynamicMovementMaxShakeOffset);

               var rndDigitsOffsetX = shakeX * Math.random() * (Math.random() > Math.random() ? 1 : -1);
               var rndDigitsOffsetY = shakeY * Math.random() * (Math.random() > Math.random() ? 1 : -1);

               // Reset RARE-ly from time to time !
               var bResetToDefaults = Math.random() > 0.99;

               for (var i = 0; i < animGS.allAsciiCharsData.length; i++) {
                  for (var j = 0; j < animGS.allAsciiCharsData[i].allCharDefinitionData.length; j++) {
                     for (var k = 0; k < animGS.allAsciiCharsData[i].allCharDefinitionData[j].length; k++) {

                        if (bResetToDefaults === true) {
                           // Reset
                           animGS.allAsciiCharsData[i].allCharDefinitionData[j][k].runnerStartingXBackup = animGS.allAsciiCharsData[i].allCharDefinitionData[j][k].runnerStartingXBackupFULL;
                           animGS.allAsciiCharsData[i].allCharDefinitionData[j][k].runnerStartingYBackup = animGS.allAsciiCharsData[i].allCharDefinitionData[j][k].runnerStartingYBackupFULL;
                        }
                        else {
                           // Dynamic movement
                           animGS.allAsciiCharsData[i].allCharDefinitionData[j][k].runnerStartingXBackup += rndDigitsOffsetX;
                           animGS.allAsciiCharsData[i].allCharDefinitionData[j][k].runnerStartingYBackup += rndDigitsOffsetY;
                        }
                     }
                  }
               }

               return;
            }

            /*
            Full runners motion logic - Woozy Clock VERSION ! :)
            */
            function fullRunnersMotionLogicTimeEscape() {

               var firstSeparatorStartX = 0;
               var firstSeparatorStartY = 0;
               var secondSeparatorStartX = 0;
               var secondSeparatorStartY = 0;

               // Offsets calculation
               for (var offsets = 0; offsets < howManyAllDigits; offsets++) {

                  if (offsets == choursDigit_1) {
                     // FIRST DIGIT !

                     for (var fd = 0; fd < animGS.allAsciiCharsData[offsets].allCharDefinitionData.length; fd++) {
                        animGS.allAsciiCharsData[offsets].allCharDefinitionData[fd][0].runnerX =
                  animGS.allAsciiCharsData[offsets].allCharDefinitionData[fd][0].runnerStartingXBackup + animGS.startingTimeTopLeftOffset;
                        animGS.allAsciiCharsData[offsets].allCharDefinitionData[fd][0].runnerY =
                  animGS.allAsciiCharsData[offsets].allCharDefinitionData[fd][0].runnerStartingYBackup + animGS.startingTimeTopLeftOffset;
                     }
                  }

                  if (offsets == choursDigit_2) {
                     // SECOND DIGIT !

                     for (var sd = 0; sd < animGS.allAsciiCharsData[offsets].allCharDefinitionData.length; sd++) {
                        animGS.allAsciiCharsData[offsets].allCharDefinitionData[sd][1].runnerX =
                  animGS.allAsciiCharsData[offsets].allCharDefinitionData[sd][1].runnerStartingXBackup + (2 * animGS.startingTimeTopLeftOffset) + animGS.allAsciiCharsData[offsets].oneCharWidth;
                        animGS.allAsciiCharsData[offsets].allCharDefinitionData[sd][1].runnerY =
                  animGS.allAsciiCharsData[offsets].allCharDefinitionData[sd][1].runnerStartingYBackup + animGS.startingTimeTopLeftOffset;

                        if (animGS.allAsciiCharsData[offsets].allCharDefinitionData[sd][1].runnerX > firstSeparatorStartX) {
                           firstSeparatorStartX = animGS.allAsciiCharsData[offsets].allCharDefinitionData[sd][1].runnerX;
                        }

                        if (animGS.allAsciiCharsData[offsets].allCharDefinitionData[sd][1].runnerY > firstSeparatorStartY) {
                           firstSeparatorStartY = animGS.allAsciiCharsData[offsets].allCharDefinitionData[sd][1].runnerY;
                        }
                     }

                     // MIDDLE of CHAR-DIGIT
                     firstSeparatorStartY /= 2;
                  }

                  if (offsets == cminutesDigit_1) {
                     // THIRD DIGIT !

                     for (var td = 0; td < animGS.allAsciiCharsData[offsets].allCharDefinitionData.length; td++) {
                        animGS.allAsciiCharsData[offsets].allCharDefinitionData[td][2].runnerX =
                  animGS.allAsciiCharsData[offsets].allCharDefinitionData[td][2].runnerStartingXBackup + (4 * animGS.startingTimeTopLeftOffset) + (2 * animGS.allAsciiCharsData[offsets].oneCharWidth);
                        animGS.allAsciiCharsData[offsets].allCharDefinitionData[td][2].runnerY =
                  animGS.allAsciiCharsData[offsets].allCharDefinitionData[td][2].runnerStartingYBackup + animGS.startingTimeTopLeftOffset;
                     }
                  }

                  if (offsets == cminutesDigit_2) {
                     // FOURTH DIGIT !

                     for (var fod = 0; fod < animGS.allAsciiCharsData[offsets].allCharDefinitionData.length; fod++) {
                        animGS.allAsciiCharsData[offsets].allCharDefinitionData[fod][3].runnerX =
                  animGS.allAsciiCharsData[offsets].allCharDefinitionData[fod][3].runnerStartingXBackup + (5 * animGS.startingTimeTopLeftOffset) + (3 * animGS.allAsciiCharsData[offsets].oneCharWidth);
                        animGS.allAsciiCharsData[offsets].allCharDefinitionData[fod][3].runnerY =
                  animGS.allAsciiCharsData[offsets].allCharDefinitionData[fod][3].runnerStartingYBackup + animGS.startingTimeTopLeftOffset;

                        if (animGS.allAsciiCharsData[offsets].allCharDefinitionData[fod][3].runnerX > secondSeparatorStartX) {
                           secondSeparatorStartX = animGS.allAsciiCharsData[offsets].allCharDefinitionData[fod][3].runnerX;
                        }

                        if (animGS.allAsciiCharsData[offsets].allCharDefinitionData[fod][3].runnerY > secondSeparatorStartY) {
                           secondSeparatorStartY = animGS.allAsciiCharsData[offsets].allCharDefinitionData[fod][3].runnerY;
                        }
                     }

                     // MIDDLE of CHAR-DIGIT
                     secondSeparatorStartY /= 2;
                  }

                  if (offsets == csecondsDigit_1) {
                     // FIFTH DIGIT !

                     for (var fthd = 0; fthd < animGS.allAsciiCharsData[offsets].allCharDefinitionData.length; fthd++) {
                        animGS.allAsciiCharsData[offsets].allCharDefinitionData[fthd][4].runnerX =
                  animGS.allAsciiCharsData[offsets].allCharDefinitionData[fthd][4].runnerStartingXBackup + (7 * animGS.startingTimeTopLeftOffset) + (4 * animGS.allAsciiCharsData[offsets].oneCharWidth);
                        animGS.allAsciiCharsData[offsets].allCharDefinitionData[fthd][4].runnerY =
                  animGS.allAsciiCharsData[offsets].allCharDefinitionData[fthd][4].runnerStartingYBackup + animGS.startingTimeTopLeftOffset;
                     }
                  }

                  if (offsets == csecondsDigit_2) {
                     // SIXTH DIGIT !

                     for (var sxthd = 0; sxthd < animGS.allAsciiCharsData[offsets].allCharDefinitionData.length; sxthd++) {
                        animGS.allAsciiCharsData[offsets].allCharDefinitionData[sxthd][5].runnerX =
                  animGS.allAsciiCharsData[offsets].allCharDefinitionData[sxthd][5].runnerStartingXBackup + (8 * animGS.startingTimeTopLeftOffset) + (5 * animGS.allAsciiCharsData[offsets].oneCharWidth);
                        animGS.allAsciiCharsData[offsets].allCharDefinitionData[sxthd][5].runnerY =
                  animGS.allAsciiCharsData[offsets].allCharDefinitionData[sxthd][5].runnerStartingYBackup + animGS.startingTimeTopLeftOffset;
                     }
                  }
               }

               // Time-separators offsets
               var oneSeparatorDownOffset = 0;

               for (var timeSep = 0; timeSep < (animGS.runnersTimerSeparators.length / 2); timeSep++) {

                  // 0,1 for HOUR-MINUTE separators
                  animGS.runnersTimerSeparators[timeSep].runnerX = firstSeparatorStartX + animGS.startingTimeTopLeftOffset;
                  animGS.runnersTimerSeparators[timeSep].runnerY = firstSeparatorStartY + oneSeparatorDownOffset;

                  oneSeparatorDownOffset += animGS.startingTimeTopLeftOffset;
               }

               oneSeparatorDownOffset = 0;

               for (var timeSep2 = (animGS.runnersTimerSeparators.length / 2); timeSep2 < animGS.runnersTimerSeparators.length; timeSep2++) {

                  // 2,3 for MINUTE-SECOND separators
                  animGS.runnersTimerSeparators[timeSep2].runnerX = secondSeparatorStartX + animGS.startingTimeTopLeftOffset;
                  animGS.runnersTimerSeparators[timeSep2].runnerY = secondSeparatorStartY + oneSeparatorDownOffset;

                  oneSeparatorDownOffset += animGS.startingTimeTopLeftOffset;
               }
               // END: Time-separators offsets

               // Single digits-indexes-conters
               var d1 = 0;
               var d2 = 0;
               var d3 = 0;
               var d4 = 0;
               var d5 = 0;
               var d6 = 0;

               for (var r = 0; r < animGS.runners.length; r++) {

                  if (checkForBorder(animGS.runners[r]) === true) {

                     // We hit border AND moved the runner, we can CONTINUE with other runners
                     continue;
                  }

                  if (animGS.runners[r].whichTimeDigitLoyal == 1) {

                     tryToCatchTheEscapingRunner(
            animGS.runners[r], animGS.allAsciiCharsData[choursDigit_1].allCharDefinitionData[d1][animGS.runners[r].whichTimeDigitLoyal - 1], d1);

                     d1++;
                  }
                  else if (animGS.runners[r].whichTimeDigitLoyal == 2) {

                     tryToCatchTheEscapingRunner(
            animGS.runners[r], animGS.allAsciiCharsData[choursDigit_2].allCharDefinitionData[d2][animGS.runners[r].whichTimeDigitLoyal - 1], d2);

                     d2++;
                  }
                  else if (animGS.runners[r].whichTimeDigitLoyal == 3) {

                     tryToCatchTheEscapingRunner(
            animGS.runners[r], animGS.allAsciiCharsData[cminutesDigit_1].allCharDefinitionData[d3][animGS.runners[r].whichTimeDigitLoyal - 1], d3);

                     d3++;
                  }
                  else if (animGS.runners[r].whichTimeDigitLoyal == 4) {

                     tryToCatchTheEscapingRunner(
            animGS.runners[r], animGS.allAsciiCharsData[cminutesDigit_2].allCharDefinitionData[d4][animGS.runners[r].whichTimeDigitLoyal - 1], d4);

                     d4++;
                  }
                  else if (animGS.runners[r].whichTimeDigitLoyal == 5) {

                     tryToCatchTheEscapingRunner(
            animGS.runners[r], animGS.allAsciiCharsData[csecondsDigit_1].allCharDefinitionData[d5][animGS.runners[r].whichTimeDigitLoyal - 1], d5);

                     d5++;
                  }
                  else if (animGS.runners[r].whichTimeDigitLoyal == 6) {

                     tryToCatchTheEscapingRunner(
            animGS.runners[r], animGS.allAsciiCharsData[csecondsDigit_2].allCharDefinitionData[d6][animGS.runners[r].whichTimeDigitLoyal - 1], d6);

                     d6++;
                  }
                  else if (animGS.runners[r].whichTimeDigitLoyal == (howManyAllDigits)) { // 1 point of 1 separator

                     tryToCatchTheEscapingRunner(
            animGS.runners[r], animGS.runnersTimerSeparators[0], 0);
                  }
                  else if (animGS.runners[r].whichTimeDigitLoyal == (howManyAllDigits + 1)) { // 2 point of 1 separator

                     tryToCatchTheEscapingRunner(
            animGS.runners[r], animGS.runnersTimerSeparators[1], 1);
                  }
                  else if (animGS.runners[r].whichTimeDigitLoyal == (howManyAllDigits + 2)) { // 1 point of 2 separator

                     tryToCatchTheEscapingRunner(
            animGS.runners[r], animGS.runnersTimerSeparators[2], 2);
                  }
                  else if (animGS.runners[r].whichTimeDigitLoyal == (howManyAllDigits + 3)) { // 2 point of 2 separator

                     tryToCatchTheEscapingRunner(
            animGS.runners[r], animGS.runnersTimerSeparators[3], 3);
                  }

                  if (animGS.timeDigitsSingleRunnerLittleBitOffsetBehaviourTypes == 1) {
                     // NOTE: NOTHING (just for info.)
                  }
                  else if (animGS.timeDigitsSingleRunnerLittleBitOffsetBehaviourTypes == 2) {
                     // Move little bit more
                     runnerMoveNormal(animGS.runners[r]);
                  }
                  else {
                     // Move little bit more - but more randomly
                     if (Math.random() > Math.random()) {
                        runnerMoveNormal(animGS.runners[r]);
                     }
                  }
               }

               // NOTE: If === 0, we DO NOT use any dynamic movement !
               if (animGS.timeDigitsDynamicMovement === 1) {
                  // Time-digits dynamic movement 1!
                  makeDynamicTimeDigitMovement1();
               }
               else if (animGS.timeDigitsDynamicMovement === 2) {
                  // Time-digits dynamic movement 2!
                  makeDynamicTimeDigitMovement2();
               }
               else if (animGS.timeDigitsDynamicMovement === 3) {
                  // Time-digits dynamic movement 3!
                  makeDynamicTimeDigitMovement3();
               }
               else if (animGS.timeDigitsDynamicMovement === 4) {
                  // Time-digits dynamic movement 4!
                  makeDynamicTimeDigitMovement4();
               }
               else if (animGS.timeDigitsDynamicMovement === 5) {
                  // Time-digits dynamic movement 5!
                  makeDynamicTimeDigitMovement5();
               }
               else if (animGS.timeDigitsDynamicMovement === 6) {
                  // Time-digits dynamic movement 6!
                  makeDynamicTimeDigitMovement6();
               }
               else if (animGS.timeDigitsDynamicMovement === 7) {
                  // Time-digits dynamic movement 7!
                  makeDynamicTimeDigitMovement7();
               }
               else if (animGS.timeDigitsDynamicMovement === 8) {
                  // Time-digits dynamic movement 8!
                  makeDynamicTimeDigitMovement8();
               }
               else if (animGS.timeDigitsDynamicMovement === 9) {
                  // Time-digits dynamic movement 9!
                  makeDynamicTimeDigitMovement9();
               }
               else if (animGS.timeDigitsDynamicMovement === 10) {
                  // Time-digits dynamic movement 10!
                  makeDynamicTimeDigitMovement10();
               }
               else if (animGS.timeDigitsDynamicMovement === 11) {
                  // Time-digits dynamic movement 11!
                  makeDynamicTimeDigitMovement11();
               }
               else if (animGS.timeDigitsDynamicMovement === 12) {

                  // RANDOMLY chosen between movements !
                  var choseRandomlyDynamicMovement = calcRndGenMinMax(1, 11);
                  eval('makeDynamicTimeDigitMovement' + choseRandomlyDynamicMovement.toString() + '();');
               }

               // NOTE: We DO NOT search escapist in Woozy Clock version !
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

            // END: START RUNNERS MOTION LOGIC

            /*
            fillStyle/strokeStyle for anim-background-drawing FADE-OUT - FOR TIME separators!
            */
            function getCorrectColorsForBackgroundMotionAnimTypeFadeOutForTimeSeparators(customAlphaChannel) {

               var retColor = '';

               // TWEAKED FOR ONLY FOR SEPARATORS !
               var inverseMaxRGB = 255;

               var foundCorrectColors = false;
               for (var st = 0; st < animGS.runners.length; st++) {

                  if (animGS.runners[st].iAmToCatch !== true) {
                     // AHA, we have FIRST hunter - enough for all the colors

                     // Ordinary runners
                     retColor = buildColorRGBA(inverseMaxRGB - animGS.runners[st].backR, inverseMaxRGB - animGS.runners[st].backG, inverseMaxRGB - animGS.runners[st].backB, customAlphaChannel);

                     foundCorrectColors = true;

                     break;
                  }
               }

               if (foundCorrectColors === false) {
                  retColor = buildColorRGBA(inverseMaxRGB - animGS.runners[0].backR, inverseMaxRGB - animGS.runners[0].backG, inverseMaxRGB - animGS.runners[0].backB, customAlphaChannel);
               }

               return retColor;
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
                     retColor = buildColorRGBA(animGS.runners[st].backR, animGS.runners[st].backG, animGS.runners[st].backB, customAlphaChannel);

                     foundCorrectColors = true;

                     break;
                  }
               }

               if (foundCorrectColors === false) {
                  retColor = buildColorRGBA(animGS.runners[0].backR, animGS.runners[0].backG, animGS.runners[0].backB, customAlphaChannel);
               }

               return retColor;
            }

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

               return;
            }

            /*
            fillStyle/strokeStyle for anim-background-drawing type - FOR TIMING-SEPARATORS !
            */
            function setCorrectColorsForBackgroundMotionAnimTypeForTimingSeparators() {

               var foundCorrectColors = false;

               // TWEAKED FOR ONLY FOR SEPARATORS !
               var inverseMaxRGB = 255;

               for (var st = (animGS.runners.length - howManyTimeSeparators); st < animGS.runners.length; st++) {

                  if (animGS.runners[st].iAmToCatch !== true) {
                     // AHA, we have FIRST SEPARATOR hunter - enough for all the colors

                     // Ordinary runners
                     animGS.ctx.fillStyle = buildColorRGBA(inverseMaxRGB - animGS.runners[st].backR, inverseMaxRGB - animGS.runners[st].backG, inverseMaxRGB - animGS.runners[st].backB, animGS.runners[st].backA);
                     animGS.ctx.strokeStyle = buildColorRGBA(inverseMaxRGB - animGS.runners[st].backR, inverseMaxRGB - animGS.runners[st].backG, inverseMaxRGB - animGS.runners[st].backB, 1);

                     foundCorrectColors = true;

                     break;
                  }
               }

               if (foundCorrectColors === false) {
                  animGS.ctx.fillStyle = buildColorRGBA(inverseMaxRGB - animGS.runners[0].backR, inverseMaxRGB - animGS.runners[0].backG, inverseMaxRGB - animGS.runners[0].backB, animGS.runners[0].backA);
                  animGS.ctx.strokeStyle = buildColorRGBA(inverseMaxRGB - animGS.runners[0].backR, inverseMaxRGB - animGS.runners[0].backG, inverseMaxRGB - animGS.runners[0].backB, 1);
               }

               return;
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
                     if (Math.random() > 0.99) {
                        // Start fading-out screen process very rarely !

                        // This STARTS fadin-out on the NEXT tick ! (becouse it is 0 at this moment)
                        animGS.fadeOutScreenCurrentTicksCount++;
                     }
                  }

                  if (animGS.drawMotionPictureMainStyle == 1 || animGS.drawMotionPictureMainStyle == 2) {
                     // Trees drawings

                     var oldLineWidthStars = animGS.ctx.lineWidth;

                     // OSTANE TAKO, CE MainStyle == 1
                     animGS.ctx.lineWidth = animGS.motionPictureWickedLinesWidth;

                     // SEPARATORS EXTRA DRAWING
                     animGS.ctx.beginPath();
                     setCorrectColorsForBackgroundMotionAnimTypeForTimingSeparators();

                     for (var starsSep = (animGS.runners.length - howManyTimeSeparators); starsSep < animGS.runners.length; starsSep++) {

                        var curRunnerSpeed2Sep = animGS.motionPictureWickedLinesWidth + getTwoPointsDistance(0, 0, animGS.runners[starsSep].runnerMotion.motionX, animGS.runners[starsSep].runnerMotion.motionY);

                        if (animGS.drawMotionPictureMainStyle == 2) {
                           // Za MainStyle == 2 SPROTI width prirejamo !
                           animGS.ctx.lineWidth = curRunnerSpeed2Sep;
                        }

                        var angleStarBeamSep = getAngleBetweenTwoPoints(
               0,
               0,
               animGS.runners[starsSep].runnerMotion.motionX,
               animGS.runners[starsSep].runnerMotion.motionY);

                        animGS.ctx.moveTo(
               animGS.runners[starsSep].runnerX - (Math.cos(angleStarBeamSep) * curRunnerSpeed2Sep),
               animGS.runners[starsSep].runnerY - (Math.sin(angleStarBeamSep) * curRunnerSpeed2Sep));

                        animGS.ctx.lineTo(
               animGS.runners[starsSep].runnerX + (Math.cos(angleStarBeamSep + (Math.random() * Math.PI)) * curRunnerSpeed2Sep * 2),
               animGS.runners[starsSep].runnerY + (Math.sin(angleStarBeamSep + (Math.random() * Math.PI)) * curRunnerSpeed2Sep * 2));
                     }

                     animGS.ctx.stroke();

                     // END: SEPARATORS EXTRA DRAWING

                     setCorrectColorsForBackgroundMotionAnimType();

                     animGS.ctx.beginPath();

                     for (var stars = 0; stars < (animGS.runners.length - howManyTimeSeparators); stars++) {

                        var curRunnerSpeed2 = animGS.motionPictureWickedLinesWidth + getTwoPointsDistance(0, 0, animGS.runners[stars].runnerMotion.motionX, animGS.runners[stars].runnerMotion.motionY);

                        if (animGS.drawMotionPictureMainStyle == 2) {
                           // Za MainStyle == 2 SPROTI width prirejamo !
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
               animGS.runners[stars].runnerX + (Math.cos(angleStarBeam + (Math.random() * Math.PI)) * curRunnerSpeed2 * 2),
               animGS.runners[stars].runnerY + (Math.sin(angleStarBeam + (Math.random() * Math.PI)) * curRunnerSpeed2 * 2));
                     }

                     animGS.ctx.stroke();

                     animGS.ctx.lineWidth = oldLineWidthStars;
                  }
                  else if (animGS.drawMotionPictureMainStyle == 3 || animGS.drawMotionPictureMainStyle == 4) {

                     var oldLineWidthFantasy = animGS.ctx.lineWidth;

                     // SEPARATORS EXTRA DRAWING
                     for (var runcenSep = (animGS.runners.length - howManyTimeSeparators); runcenSep < animGS.runners.length; runcenSep++) {

                        var spd = getTwoPointsDistance(0, 0, animGS.runners[runcenSep].runnerMotion.motionX, animGS.runners[runcenSep].runnerMotion.motionY);

                        var maxRadius = Math.abs((animGS.runners[runcenSep].runnerRadius + calcRndGenMinMax(0, animGS.motionPictureWickedLinesWidth)) - spd);

                        var hmSubCircles = Math.round(animGS.runners[runcenSep].runnerRadius);

                        var step = maxRadius / hmSubCircles;

                        var startAlpha = 0.2;
                        var stepAlpha = 1 / hmSubCircles;

                        for (var subc = 0; subc < hmSubCircles; subc++) {

                           if (maxRadius <= 0) {
                              break;
                           }

                           animGS.ctx.beginPath();
                           animGS.ctx.arc(
                  animGS.runners[runcenSep].runnerX,
                  animGS.runners[runcenSep].runnerY,
                  maxRadius,
                  0,
                  Math.PI * 2,
                  true);
                           animGS.ctx.closePath();

                           if (animGS.drawMotionPictureMainStyle == 3) {
                              animGS.ctx.fillStyle = getCorrectColorsForBackgroundMotionAnimTypeFadeOutForTimeSeparators(startAlpha);
                              animGS.ctx.fill();
                           }
                           else {
                              animGS.ctx.strokeStyle = getCorrectColorsForBackgroundMotionAnimTypeFadeOutForTimeSeparators(startAlpha);
                              animGS.ctx.stroke();
                           }

                           maxRadius -= step;

                           startAlpha += (stepAlpha / (subc + 1));

                           if (startAlpha > 1) {
                              startAlpha = 1;
                           }
                        }
                     }

                     // END: SEPARATORS EXTRA DRAWING

                     for (var runcen = 0; runcen < (animGS.runners.length - howManyTimeSeparators); runcen++) {

                        var spdNoSep = getTwoPointsDistance(0, 0, animGS.runners[runcen].runnerMotion.motionX, animGS.runners[runcen].runnerMotion.motionY);

                        var maxRadiusNoSep = Math.abs((animGS.runners[runcen].runnerRadius + calcRndGenMinMax(0, animGS.motionPictureWickedLinesWidth)) - spdNoSep);

                        var hmSubCirclesNoSep = Math.round(animGS.runners[runcen].runnerRadius);

                        var stepNoSep = maxRadiusNoSep / hmSubCirclesNoSep;

                        var startAlphaNoSep = 0.2;
                        var stepAlphaNoSep = 1 / hmSubCirclesNoSep;

                        for (var subcNoSep = 0; subcNoSep < hmSubCirclesNoSep; subcNoSep++) {

                           if (maxRadiusNoSep <= 0) {
                              break;
                           }

                           animGS.ctx.beginPath();
                           animGS.ctx.arc(
                  animGS.runners[runcen].runnerX,
                  animGS.runners[runcen].runnerY,
                  maxRadiusNoSep,
                  0,
                  Math.PI * 2,
                  true);
                           animGS.ctx.closePath();

                           if (animGS.drawMotionPictureMainStyle == 3) {
                              animGS.ctx.fillStyle = getCorrectColorsForBackgroundMotionAnimTypeFadeOut(startAlphaNoSep);
                              animGS.ctx.fill();
                           }
                           else {
                              animGS.ctx.strokeStyle = getCorrectColorsForBackgroundMotionAnimTypeFadeOut(startAlphaNoSep);
                              animGS.ctx.stroke();
                           }

                           maxRadiusNoSep -= stepNoSep;

                           startAlphaNoSep += (stepAlphaNoSep / (subcNoSep + 1));

                           if (startAlphaNoSep > 1) {
                              startAlphaNoSep = 1;
                           }
                        }
                     }

                     animGS.ctx.lineWidth = oldLineWidthFantasy;
                  }
                  else if (animGS.drawMotionPictureMainStyle == 5 || animGS.drawMotionPictureMainStyle == 6) {

                     var oldLineWidthFantasy2 = animGS.ctx.lineWidth;

                     animGS.ctx.lineWidth = animGS.motionPictureWickedLinesWidth;

                     // SEPARATORS EXTRA DRAWING
                     setCorrectColorsForBackgroundMotionAnimTypeForTimingSeparators();

                     for (var fantasySep = (animGS.runners.length - howManyTimeSeparators); fantasySep < animGS.runners.length; fantasySep++) {

                        var fantasySpeedSep = (animGS.motionPictureWickedLinesWidth * animGS.runners[fantasySep].runnerRadius) + getTwoPointsDistance(0, 0, animGS.runners[fantasySep].runnerMotion.motionX, animGS.runners[fantasySep].runnerMotion.motionY);

                        var startAngleFantasySep = Math.random() * (2 * Math.PI);
                        var anglePlus = Math.random() > 0.5 ? 1 : -1;
                        var fantasyAngleStep = anglePlus * ((2 * Math.PI) / fantasySpeedSep);

                        animGS.ctx.beginPath();

                        var startDistanceSep = 0;
                        var disStepSep = animGS.runners[fantasySep].runnerRadius / fantasySpeedSep;

                        animGS.ctx.moveTo(
                  animGS.runners[fantasySep].runnerX + (startDistanceSep * Math.cos(startAngleFantasySep)),
                  animGS.runners[fantasySep].runnerY + (startDistanceSep * Math.sin(startAngleFantasySep)));

                        for (var hmpSep = 0; hmpSep < Math.round(fantasySpeedSep); hmpSep++) {

                           startAngleFantasySep += fantasyAngleStep;
                           startDistanceSep += disStepSep;

                           animGS.ctx.lineTo(
                  animGS.runners[fantasySep].runnerX + (startDistanceSep * Math.cos(startAngleFantasySep)),
                  animGS.runners[fantasySep].runnerY + (startDistanceSep * Math.sin(startAngleFantasySep)));
                        }

                        animGS.ctx.stroke();
                     }

                     // END: SEPARATORS EXTRA DRAWING

                     setCorrectColorsForBackgroundMotionAnimType();

                     for (var fantasy = 0; fantasy < (animGS.runners.length - howManyTimeSeparators); fantasy++) {

                        var fantasySpeed = (animGS.motionPictureWickedLinesWidth * animGS.runners[fantasy].runnerRadius) + getTwoPointsDistance(0, 0, animGS.runners[fantasy].runnerMotion.motionX, animGS.runners[fantasy].runnerMotion.motionY);

                        var startAngleFantasy = Math.random() * (2 * Math.PI);
                        var anglePlusNoSep = Math.random() > 0.5 ? 1 : -1;
                        var fantasyAngleStepNoSep = anglePlusNoSep * ((2 * Math.PI) / fantasySpeed);

                        animGS.ctx.beginPath();

                        var startDistance = 0;
                        var disStep = animGS.runners[fantasy].runnerRadius / fantasySpeed;

                        animGS.ctx.moveTo(
                  animGS.runners[fantasy].runnerX + (startDistance * Math.cos(startAngleFantasy)),
                  animGS.runners[fantasy].runnerY + (startDistance * Math.sin(startAngleFantasy)));

                        for (var hmp = 0; hmp < Math.round(fantasySpeed); hmp++) {

                           startAngleFantasy += fantasyAngleStepNoSep;
                           startDistance += disStep;

                           animGS.ctx.lineTo(
                  animGS.runners[fantasy].runnerX + (startDistance * Math.cos(startAngleFantasy)),
                  animGS.runners[fantasy].runnerY + (startDistance * Math.sin(startAngleFantasy)));
                        }

                        animGS.ctx.stroke();
                     }

                     animGS.ctx.lineWidth = oldLineWidthFantasy2;
                  }
                  else if (animGS.drawMotionPictureMainStyle == 7 || animGS.drawMotionPictureMainStyle == 8) {
                     // Trees drawings

                     var oldLineWidthLast = animGS.ctx.lineWidth;

                     // SEPARATORS EXTRA DRAWING
                     setCorrectColorsForBackgroundMotionAnimTypeForTimingSeparators();

                     for (var lastGraphicsSep = (animGS.runners.length - howManyTimeSeparators); lastGraphicsSep < animGS.runners.length; lastGraphicsSep++) {

                        var curRunnerSpeedLastSep = 0.1 + getTwoPointsDistance(0, 0, animGS.runners[lastGraphicsSep].runnerMotion.motionX, animGS.runners[lastGraphicsSep].runnerMotion.motionY);

                        animGS.ctx.lineWidth = animGS.motionPictureWickedLinesWidth + curRunnerSpeedLastSep;

                        var lastRadiusByTwo = animGS.runners[lastGraphicsSep].runnerRadius / 2;

                        var rndLastAngle = Math.random() * Math.PI * 2;

                        var lastToX = animGS.runners[lastGraphicsSep].runnerX + (Math.cos(rndLastAngle) * lastRadiusByTwo);
                        var lastToY = animGS.runners[lastGraphicsSep].runnerY + (Math.sin(rndLastAngle) * lastRadiusByTwo);

                        var lastWH = animGS.motionPictureWickedLinesWidth + curRunnerSpeedLastSep;
                        var lastWHByTwo = lastWH / 2;

                        if (animGS.drawMotionPictureMainStyle == 7) {

                           animGS.ctx.fillRect(
                  lastToX,
                  lastToY,
                  lastWH,
                  lastWH);
                        }
                        else {

                           animGS.ctx.strokeRect(
                  lastToX,
                  lastToY,
                  lastWH,
                  lastWH);
                        }

                        animGS.ctx.beginPath();

                        animGS.ctx.moveTo(
               lastToX + lastWHByTwo,
               lastToY + lastWHByTwo);

                        animGS.ctx.lineTo(
               animGS.runners[lastGraphicsSep].runnerX,
               animGS.runners[lastGraphicsSep].runnerY);

                        animGS.ctx.stroke();
                     }

                     // END: SEPARATORS EXTRA DRAWING

                     setCorrectColorsForBackgroundMotionAnimType();

                     for (var lastGraphics = 0; lastGraphics < (animGS.runners.length - howManyTimeSeparators); lastGraphics++) {

                        var curRunnerSpeedLast = 0.1 + getTwoPointsDistance(0, 0, animGS.runners[lastGraphics].runnerMotion.motionX, animGS.runners[lastGraphics].runnerMotion.motionY);

                        animGS.ctx.lineWidth = animGS.motionPictureWickedLinesWidth + curRunnerSpeedLast;

                        var lastRadiusByTwoNoSep = animGS.runners[lastGraphics].runnerRadius / 2;

                        var rndLastAngleNoSep = Math.random() * Math.PI * 2;

                        var lastToXNoSep = animGS.runners[lastGraphics].runnerX + (Math.cos(rndLastAngleNoSep) * lastRadiusByTwoNoSep);
                        var lastToYNoSep = animGS.runners[lastGraphics].runnerY + (Math.sin(rndLastAngleNoSep) * lastRadiusByTwoNoSep);

                        var lastWHNoSep = animGS.motionPictureWickedLinesWidth + curRunnerSpeedLast;
                        var lastWHByTwoNoSep = lastWHNoSep / 2;

                        if (animGS.drawMotionPictureMainStyle == 7) {

                           animGS.ctx.fillRect(
                  lastToXNoSep,
                  lastToYNoSep,
                  lastWHNoSep,
                  lastWHNoSep);
                        }
                        else {

                           animGS.ctx.strokeRect(
                  lastToXNoSep,
                  lastToYNoSep,
                  lastWHNoSep,
                  lastWHNoSep);
                        }

                        animGS.ctx.beginPath();

                        animGS.ctx.moveTo(
               lastToXNoSep + lastWHByTwoNoSep,
               lastToYNoSep + lastWHByTwoNoSep);

                        animGS.ctx.lineTo(
               animGS.runners[lastGraphics].runnerX,
               animGS.runners[lastGraphics].runnerY);

                        animGS.ctx.stroke();
                     }

                     animGS.ctx.lineWidth = oldLineWidthLast;
                  }
                  else {
                     // DRAWING CIRCLES/RECTS

                     // SEPARATORS EXTRA DRAWING
                     setCorrectColorsForBackgroundMotionAnimTypeForTimingSeparators();

                     for (var rmpSep = (animGS.runners.length - howManyTimeSeparators); rmpSep < animGS.runners.length; rmpSep++) {

                        // Current runners speed radius-tweak
                        var curRunnerSpeedSep = 0.1 + getTwoPointsDistance(0, 0, animGS.runners[rmpSep].runnerMotion.motionX, animGS.runners[rmpSep].runnerMotion.motionY);

                        var radiusTypeTweakingSep;

                        if (animGS.drawMotionPictureRadiusTweakingType == 1) {
                           // NAVADEN radius

                           radiusTypeTweakingSep = animGS.runners[rmpSep].runnerRadius;

                        }
                        else if (animGS.drawMotionPictureRadiusTweakingType == 2) {
                           // RADIUS PLUS SPEED

                           radiusTypeTweakingSep = animGS.runners[rmpSep].runnerRadius + curRunnerSpeedSep;
                        }
                        else {
                           // RADIUS KRAT SPEED

                           if (curRunnerSpeedSep < 1) {
                              curRunnerSpeedSep = 1;
                           }

                           radiusTypeTweakingSep = animGS.runners[rmpSep].runnerRadius * curRunnerSpeedSep;
                        }

                        var rectsSizeSep = 2 * radiusTypeTweakingSep;

                        if (animGS.drawMotionPictureDifferentDrawingTypes == 1) {
                           // CIRCLES

                           // Fill first
                           animGS.ctx.beginPath();
                           animGS.ctx.arc(
                  animGS.runners[rmpSep].runnerX,
                  animGS.runners[rmpSep].runnerY,
                  radiusTypeTweakingSep,
                  0,
                  Math.PI * 2,
                  true);
                           animGS.ctx.closePath();
                           animGS.ctx.fill();
                        }
                        else {
                           // RECTS

                           animGS.ctx.fillRect(
                  animGS.runners[rmpSep].runnerX - radiusTypeTweakingSep,
                  animGS.runners[rmpSep].runnerY - radiusTypeTweakingSep,
                  rectsSizeSep,
                  rectsSizeSep);
                        }

                        if (animGS.drawMotionPictureCirclesDrawEdges === true) {

                           if (animGS.drawMotionPictureDifferentDrawingTypes == 1) {
                              // CIRCLES

                              // Edge second
                              animGS.ctx.beginPath();
                              animGS.ctx.arc(
                     animGS.runners[rmpSep].runnerX,
                     animGS.runners[rmpSep].runnerY,
                     radiusTypeTweakingSep,
                     0,
                     Math.PI * 2,
                     true);
                              animGS.ctx.closePath();
                              animGS.ctx.stroke();
                           }
                           else {
                              // RECTS

                              animGS.ctx.strokeRect(
                     animGS.runners[rmpSep].runnerX - radiusTypeTweakingSep,
                     animGS.runners[rmpSep].runnerY - radiusTypeTweakingSep,
                     rectsSizeSep,
                     rectsSizeSep);
                           }
                        }
                     }

                     // END: SEPARATORS EXTRA DRAWING

                     setCorrectColorsForBackgroundMotionAnimType();

                     // ONLY MOTION PICTURE DRAWING FROM ALL THE RUNNERS !
                     for (var rmp = 0; rmp < (animGS.runners.length - howManyTimeSeparators); rmp++) {

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

                           if (curRunnerSpeed < 1) {
                              curRunnerSpeed = 1;
                           }

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

               // Runners moving logic - Woozy Clock VERSION ! :)
               fullRunnersMotionLogicTimeEscape();

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

                  for (var c = 0; c < (animGS.runners.length - howManyTimeSeparators); c++) {   // Time-separators colors are calculated DIFFERENTLY !
                     tweakLittleBitRunnersIncColorComponents(animGS.runners[c], clrPlustNewTweak, changeRUp, changeGUp, changeBUp);
                  }

                  // Time-separators colors are calculated DIFFERENTLY !
                  clrPlustNewTweak = getRandomColorIncrementValue();

                  changeRUp = Math.random() > 0.5;
                  changeGUp = Math.random() > 0.5;
                  changeBUp = Math.random() > 0.5;

                  for (var cts = (animGS.runners.length - howManyTimeSeparators); cts < animGS.runners.length; cts++) {
                     tweakLittleBitRunnersIncColorComponents(animGS.runners[cts], clrPlustNewTweak, changeRUp, changeGUp, changeBUp);
                  }
               }

               // 05042010 - MODIFIED FOR GOSTILNA-GAJ
               if (animGS.runners.length > howManyTimeSeparators) {
                  var firstRunner = animGS.runners[howManyTimeSeparators];
                  $('#m_spnPageInConstructionForAnim').css('color', '#' + RGB2Hex(firstRunner.backR, firstRunner.backG, firstRunner.backB));
               }
               // END: // 05042010 - MODIFIED FOR GOSTILNA-GAJ


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
            Just a current time timer
            */
            function tickCurrentTimeEngine() {

               var d = new Date();

               currentHours = d.getHours();
               currentMinutes = d.getMinutes();
               currentSeconds = d.getSeconds();

               if (currentHours.toString().length == 1) {
                  choursDigit_1 = 0;
                  choursDigit_2 = currentHours;
               }
               else {
                  choursDigit_1 = parseInt(currentHours.toString().charAt(0), 10);
                  choursDigit_2 = parseInt(currentHours.toString().charAt(1), 10);
               }

               if (currentMinutes.toString().length == 1) {
                  cminutesDigit_1 = 0;
                  cminutesDigit_2 = currentMinutes;
               }
               else {
                  cminutesDigit_1 = parseInt(currentMinutes.toString().charAt(0), 10);
                  cminutesDigit_2 = parseInt(currentMinutes.toString().charAt(1), 10);
               }

               if (currentSeconds.toString().length == 1) {
                  csecondsDigit_1 = 0;
                  csecondsDigit_2 = currentSeconds;
               }
               else {
                  csecondsDigit_1 = parseInt(currentSeconds.toString().charAt(0), 10);
                  csecondsDigit_2 = parseInt(currentSeconds.toString().charAt(1), 10);
               }

               tickCurrentTime = setTimeout(tickCurrentTimeEngine, timerCurrentTimeMiliSecs);

               return;
            }

            /*
            Run anim
            */
            function runAnim(startingCanvasWidth, startingCanvasHeight) {

               tickCurrentTimeEngine();

               initAnim(startingCanvasWidth, startingCanvasHeight);

               tickAnimEngine();

               return;
            }

            function completeAnimStart(startingCanvasWidth, startingCanvasHeight) {
               if (cnvDrawing !== null) {
                  if (cnvDrawing.getContext) {
                     var ctx = cnvDrawing.getContext('2d');
                     if (ctx) {
                        // RESIZE canvas
                        cnvDrawing.width = o.width;
                        cnvDrawing.height = o.height;
                        runAnim(startingCanvasWidth, startingCanvasHeight);
                     }
                  }
               }
               return;
            }

            function startAnim() {
               stopAnim();
               completeAnimStart(o.width, o.height);
               return;
            }

            function destroyPlugin() {
               o = null;
               jCnvDrawing = null;
               cnvDrawing = null;
               tickAnim = null;
               timerMiliSecs = null;
               tickCurrentTime = null;
               timerCurrentTimeMiliSecs = null;
               currentHours = null;
               currentMinutes = null;
               currentSeconds = null;
               choursDigit_1 = null;
               choursDigit_2 = null;
               cminutesDigit_1 = null;
               cminutesDigit_2 = null;
               csecondsDigit_1 = null;
               csecondsDigit_2 = null;
               animGS = null;

               return;
            }

            $(document).unload(function () {
               stopAnim();
               destroyPlugin();
               $(this).unbind();
               return;
            });

            // Finally RUN WoozyClock :-)
            startAnim();

            $(this).click(function () {
               stopAnim();
               startAnim();
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