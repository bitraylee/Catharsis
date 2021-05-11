function startVisualizer(AUDIO_URL) {
   var TOTAL_BANDS, analyser, analyserDataArray, arrCircles, audio, build, buildCircles, canplay, changeMode, changeTheme, circlesContainer, cp, createCircleTex, gui, hammertime, init, initAudio, initGUI, initGestures, isPlaying, k, message, modes, mousePt, mouseX, mouseY, params, play, renderer, resize, stage, startAnimation, texCircle, themes, themesNames, update, v, windowH, windowW;
 
   
   modes = ["cubic", "conic"];
 
   themes = {
     blossom: [0x3a1c71,0x623173,0x894574,0xb05976,0xd76d77,0xe17e78,0xeb8e79,0xf59f7a,0xffaf7b],
     pupleDreams:[0xf72585,0xb5179e,0x7209b7,0x560bad,0x480ca8,0x3a0ca3,0x3f37c9,0x4361ee,0x4895ef,0x4cc9f0],
     pinkBlue: [0xFF0032, 0xFF5C00, 0x00FFB8, 0x53FF00],
     yellowGreen: [0xF7F6AF, 0x9BD6A3, 0x4E8264, 0x1C2124, 0xD62822],
     yellowRed: [0xECD078, 0xD95B43, 0xC02942, 0x542437, 0x53777A],
     blueGray: [0x343838, 0x005F6B, 0x008C9E, 0x00B4CC, 0x00DFFC],
     blackWhite: [0xFFFFFF, 0x000000, 0xFFFFFF, 0x000000, 0xFFFFFF]
   };
 
   themesNames = [];
 
   for (k in themes) {
     v = themes[k];
     themesNames.push(k);
   }
 
   // PARAMETERS
   params = {
     // public
     mode: modes[0],
     theme: themesNames[1],
     radius: 5,
     distance: 900,
     size: .8,
     // private
     numParticles: 500,
     sizeW: 1,
     sizeH: 1,
     radiusParticle: 30,
     themeArr: themes[this.theme]
   };
 
   TOTAL_BANDS = 256;
 
   cp = new PIXI.Point();
 
   mouseX = 0;
 
   mouseY = 0;
 
   mousePt = new PIXI.Point();
 
   windowW = 0;
 
   windowH = 0;
 
   stage = null;
 
   renderer = null;
 
   texCircle = null;
 
   circlesContainer = null;
 
   arrCircles = [];
 
   hammertime = null;
 
   message = null;
 
   // audio
   audio = null;
 
   analyser = null;
 
   analyserDataArray = null;
 
   isPlaying = false;
 
   canplay = false;
 
   // gui
   gui = null;
 
   init = function() {
     initGestures();
     message = $(".message");
     message.on("click", play);
     resize();
     build();
     resize();
     mousePt.x = cp.x;
     mousePt.y = cp.y;
     $(window).resize(resize);
     startAnimation();
     return initGUI();
   };
 
   play = function() {
     if (isPlaying) {
       return;
     }
     initAudio();
     message.css("cursor", "default");
     if (canplay) {
       message.hide();
     } else {
       message.html("LOADING MUSIC...");
     }
     audio.play();
     return isPlaying = true;
   };
 
   initGUI = function() {
     var modeController, sizeController, themeController;
     gui = new dat.GUI();
     // if window.innerWidth < 500
     gui.close();
     modeController = gui.add(params, 'mode', modes);
     modeController.onChange(function(value) {
       return changeMode(value);
     });
     themeController = gui.add(params, 'theme', themesNames);
     themeController.onChange(function(value) {
       return changeTheme(params.theme);
     });
     gui.add(params, 'radius', 1, 8);
     gui.add(params, 'distance', 100, 1000);
     sizeController = gui.add(params, 'size', 0, 1);
     return sizeController.onChange(function(value) {
       return resize(value);
     });
   };
 
   initAudio = function() {
     var context, source;
     context = new (window.AudioContext || window.webkitAudioContext)();
     analyser = context.createAnalyser();
     analyser.smoothingTimeConstant = 0.5
     source = null;
     audio = new Audio();
     audio.crossOrigin = "anonymous";
     audio.src = AUDIO_URL;
     return audio.addEventListener('canplay', function() {
       var bufferLength;
       if (isPlaying) {
         message.hide();
       }
       canplay = true;
       source = context.createMediaElementSource(audio);
       source.connect(analyser);
       source.connect(context.destination);
       analyser.fftSize = TOTAL_BANDS * 2;
       bufferLength = analyser.frequencyBinCount;
       return analyserDataArray = new Uint8Array(bufferLength);
     });
   };
 
   startAnimation = function() {
     return requestAnimFrame(update);
   };
 
   initGestures = function() {
     return $(window).on('mousemove touchmove', function(e) {
       if (e.type === 'mousemove') {
         mouseX = e.clientX;
         return mouseY = e.clientY;
       } else {
         mouseX = e.originalEvent.changedTouches[0].clientX;
         return mouseY = e.originalEvent.changedTouches[0].clientY;
       }
     });
   };
 
   build = function() {
     stage = new PIXI.Stage(0x121212);
     renderer = PIXI.autoDetectRenderer({
       width: $(window).width(),
       height: $(window).height(),
       antialias: true,
       resolution: window.devicePixelRatio,
     });
     renderer.view.classList.add("stage");
     document.getElementById("stage-cover").append(renderer.view);
     texCircle = createCircleTex();
     return buildCircles();
   };
 
   buildCircles = function() {
     var circle, i, j, ref;
     circlesContainer = new PIXI.DisplayObjectContainer();
     stage.addChild(circlesContainer);
     for (i = j = 0, ref = params.numParticles - 1; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
       circle = new PIXI.Sprite(texCircle);
       circle.anchor.x = 0.5;
       circle.anchor.y = 0.5;
       circle.position.x = circle.xInit = cp.x;
       circle.position.y = circle.yInit = cp.y;
       circle.mouseRad = Math.random();
       circlesContainer.addChild(circle);
       arrCircles.push(circle);
     }
     return changeTheme(params.theme);
   };
 
   createCircleTex = function() {
     var gCircle;
     gCircle = new PIXI.Graphics();
     gCircle.beginFill(0xFFFFFF);
     gCircle.drawCircle(0, 0, params.radiusParticle);
     gCircle.endFill();
     return gCircle.generateTexture();
   };
 
   resize = function() {
     windowW = $(window).width();
     windowH = $(window).height();
     cp.x = windowW * .5;
     cp.y = windowH * .5;
     params.sizeW = windowH * params.size;
     params.sizeH = windowH * params.size;
     changeMode(params.mode);
     if (renderer) {
       return renderer.resize(windowW, windowH);
     }
   };
 
   changeTheme = function(name) {
     var circle, group, i, indexColor, j, padColor, ref, results;
     params.themeArr = themes[name];
     indexColor = 0;
     padColor = Math.ceil(params.numParticles / params.themeArr.length);
     results = [];
     for (i = j = 0, ref = params.numParticles - 1; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
       circle = arrCircles[i];
       group = indexColor * padColor / params.numParticles;
       circle.blendMode = params.theme === "blackWhite" ? PIXI.blendModes.NORMAL : PIXI.blendModes.ADD;
       circle.indexBand = Math.round(group * (TOTAL_BANDS - 56)) - 1;
       if (circle.indexBand <= 0) {
         circle.indexBand = 49;
       }
       circle.s = (Math.random() + (params.themeArr.length - indexColor) * 0.2) * 0.1;
       circle.scale = new PIXI.Point(circle.s, circle.s);
       if (i % padColor === 0) {
         indexColor++;
       }
       results.push(circle.tint = params.themeArr[indexColor - 1]);
     }
     return results;
   };
 
   changeMode = function(value) {
     var angle, circle, i, j, ref, results;
     if (!arrCircles || arrCircles.length === 0) {
       return;
     }
     if (!value) {
       value = modes[Math.floor(Math.random() * modes.length)];
     }
     params.mode = value;
     results = [];
     for (i = j = 0, ref = params.numParticles - 1; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
       circle = arrCircles[i];
       switch (params.mode) {
         // cubic
         case modes[0]:
           circle.xInit = cp.x + (Math.random() * params.sizeW - params.sizeW / 2);
           results.push(circle.yInit = cp.y + (Math.random() * params.sizeH - params.sizeH / 2));
           break;
         // circular
         case modes[1]:
           angle = Math.random() * (Math.PI * 2);
           circle.xInit = cp.x + (Math.cos(angle) * params.sizeW);
           results.push(circle.yInit = cp.y + (Math.sin(angle) * params.sizeH));
           break;
         default:
           results.push(void 0);
       }
     }
     return results;
   };
 
   update = function() {
     var a, angle, circle, dist, dx, dy, i, j, n, r, ref, scale, t, xpos, ypos;
     requestAnimFrame(update);
     t = performance.now() / 60;
     if (analyserDataArray && isPlaying) {
       analyser.getByteFrequencyData(analyserDataArray);
     }
     if (mouseX > 0 && mouseY > 0) {
       mousePt.x += (mouseX - mousePt.x) * 0.03;
       mousePt.y += (mouseY - mousePt.y) * 0.03;
     } else {
       a = t * 0.05;
       mousePt.x = cp.x + Math.cos(a) * 100;
       mousePt.y = cp.y + Math.sin(a) * 100;
     }
     for (i = j = 0, ref = params.numParticles - 1; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
       circle = arrCircles[i];
       if (analyserDataArray && isPlaying) {
         n = analyserDataArray[circle.indexBand];
         scale = (n / 256) * circle.s * 3;
       } else {
         scale = circle.s * .5;
       }
       scale *= params.radius;
       circle.scale.x += (scale - circle.scale.x) * 0.5;
       circle.scale.y = circle.scale.x;
       dx = mousePt.x - circle.xInit;
       dy = mousePt.y - circle.yInit;
       dist = Math.sqrt(dx * dx + dy * dy);
       angle = Math.atan2(dy, dx);
       r = circle.mouseRad * params.distance + 30;
       xpos = circle.xInit - Math.cos(angle) * r;
       ypos = circle.yInit - Math.sin(angle) * r;
       circle.position.x += (xpos - circle.position.x) * 0.1;
       circle.position.y += (ypos - circle.position.y) * 0.1;
     }
     return renderer.render(stage);
     
   };
   
   init();
}
var i=0;
let musicArray=new Array(
"01 - Regard - Ride It.mp3",
"02 - Dua Lipa - Don't Start Now.mp3",
"03 - Alon, Desiree Dawson - This Time.mp3",
"04 - SAINt JHN, Imanbek - Roses - Imanbek Remix.mp3",
"05 - Kygo, Avicii, Sandro Cavazza - Forever Yours - Avicii Tribute.mp3",
"06 - UNOMAS - All I Know.mp3",
"07 - MEDUZA, Becky Hill, Goodboys - Lose Control.mp3",
"08 - Joel Corry - Lonely.mp3",
"09 - Viva La Panda - Feeling So Good.mp3",
"10 - LIZOT, Holy Molly - Menage A Trois.mp3",
"11 - Tones and I - Dance Monkey.mp3",
"12 - DJ Snake, J Balvin, Tyga - Loco Contigo (with J. Balvin & Tyga).mp3",
"13 - The Suncatchers - Lie to Me.mp3",
"14 - Dua Lipa, Regard - Don't Start Now - Regard Remix.mp3",
"15 - GAB, Jex - Endlessly.mp3",
"16 - Mabel - Mad Love.mp3",
"17 - Shawn Mendes, Camila Cabello - Señorita.mp3",
"18 - Joel Corry - Sorry.mp3",
"19 - Hr. Troels, Manos - Lambada.mp3",
"20 - Vintage Culture, Adam K, MKLA - Deep Inside Of Me (feat. MKLA).mp3",
"21 - Cat Dealers, Flakkë - Sweet Munchies.mp3",
"22 - GLDN - What's the Point.mp3",
"23 - Doja Cat - Say So.mp3",
"24 - Dua Lipa - Physical.mp3",
"25 - Adon - Want You.mp3",
"26 - Joy Corporation, Hot Bullet, Evoxx - Unbelievable.mp3",
"27 - R3HAB, A Touch Of Class - All Around The World (La La La).mp3",
"28 - Tale & Dutch - Your Eyes.mp3",
"29 - COY - Promises.mp3",
"30 - JYYE - In Deep.mp3",
"31 - MEDUZA, Goodboys - Piece Of Your Heart.mp3",
"32 - Trafoier, Xram, EQRIC, Sophiella - Take Me Home.mp3",
"33 - Charlie Lane - Back to You.mp3",
"34 - Justin Jesso, Seeb, James Carter - Bigger Than - James Carter Remix.mp3",
"36 - Henri Purnell, XYSM - The Way That I Am.mp3",
"37 - Saxity - Shallow Water.mp3",
"38 - Simon Skylar, GESES, Kate Wild - One Night.mp3",
"39 - Becky Hill, Weiss (UK) - I Could Get Used To This.mp3",
"40 - Viva La Panda - Beach Day.mp3",
"41 - Erdem Gul - Call My Number.mp3",
"42 - Alex Alexander - Don't Make Me.mp3",
"43 - Mabel - Don't Call Me Up.mp3",
"44 - Madism, Felix Samuel, Tom Ferry - Tried to Love (Tom Ferry Remix).mp3",
"45 - Tiësto, Stevie Appleton - BLUE.mp3",
"46 - Ericé - Light Me Up.mp3",
"47 - Alex Parker - Sneakers & Weed.mp3",
"48 - Luxe Agoris, Third Vibes, Jesse Ian - Floating.mp3",
"49 - Kygo, Whitney Houston - Higher Love.mp3",
"50 - Cally Rhodes - Too Close.mp3",
"51 - Matt Nash - Hold On.mp3",
"52 - Mateo - It Ain't Right.mp3",
"53 - Ed Sheeran, Justin Bieber - I Don't Care (with Justin Bieber).mp3",
"54 - Daveepa - Star Dreaming.mp3",
"55 - Ruhde, LODE - Simple Love.mp3",
"56 - Thomas Nan, Nácha - Feel It.mp3",
"57 - BEBURI - Escape.mp3",
"58 - James Carter, nourii, SRTW, Ella Claire - Capsized.mp3",
"59 - Alex Skrindo - Probably Not.mp3",
"60 - A-SHO - Forever.mp3",
"61 - Lucas Estrada, Kyan Palmer - Mostly Mine.mp3",
"62 - Sebastian Alm - House Rules.mp3",
"63 - The Suncatchers, Adam Knight - Find the Truth.mp3",
"64 - Christian O'Mahony, Alex Silves - Fall For You.mp3",
"65 - Mateo - Free.mp3",
"66 - Ship Wrek - Bloodstream.mp3",
"67 - LOST YOU, Michael Moawad - All over Again (Remix).mp3",
"68 - Pillows, Kaan Pars - Waves (Kaan Pars Remix).mp3",
"69 - Elderbrook, Rudimental - Something About You (with Rudimental).mp3",
"70 - Dualities, Aw-Some - Feel It.mp3",
"71 - CARSTN, Anna Leyne - Never Enough.mp3",
"72 - Alex Alexander - Helpless.mp3",
"73 - Juicy Cola, ZHIKO - Luv Motion.mp3",
"74 - MAMA I LIED - Close To You.mp3",
"75 - Sigala, Becky Hill - Wish You Well.mp3",
"76 - Audax, Lauren Mayhew - Shockwave.mp3",
"77 - JYYE - On My Body.mp3",
"78 - Lost Frequencies - Chan Chan.mp3",
"79 - Viva La Panda, Ess Bogale - Cool.mp3",
"80 - Ed Sheeran, Khalid - Beautiful People (feat. Khalid).mp3",
"81 - Iceleak, Widemode, Craig Smart - Waiting for You.mp3",
"82 - Koni, Devan, Tom Bailey - Losing My Religion.mp3",
"83 - Joey Stux - Where You Belong.mp3",
"84 - Gianni Blu, D. Lylez, Xcelencia - Somebody Like You (Remix).mp3"
);
//startVisualizer("./music/Download/"+musicArray[i]);
startVisualizer("./music/Lucky_Ones.mp3")
 
 