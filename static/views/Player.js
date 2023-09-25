/* eslint-disable linebreak-style */
/* eslint-disable consistent-this */
/* eslint-disable @typescript-eslint/no-this-alias */
(function () {
  var ns = Q.use('fish'),
    game = ns.game;
  var currentGoldDom
  var currentZushiDom
  setTimeout(() => {
    currentGoldDom = document.getElementById('gold-coin-number')
    currentZushiDom = document.getElementById('zushi-coin-number')
  }, 0)
  var Player = (ns.Player = function (props) {
    this.id = null;
    this.coin = 0;
    this.zuanshi = 0;
    this.numCapturedFishes = 0;

    this.cannon = null;
    this.cannonMinus = null;
    this.cannonPlus = null;
    this.coinNum = null;

    props = props || {};
    Q.merge(this, props, true);

    this.init();
  });

  Player.prototype.init = function () {
    var me = this,
      power = 1;
    this.cannon = new ns.Cannon(ns.R.cannonTypes[power]);
    this.cannon.id = 'cannon';
    this.cannon.x = 50; // game.bottom.x + window.innerWidth / 2 + 40; // 425
    // this.cannon.y = game.bottom.x + 400; // game.bottom.y + 60;
    // this.cannon.y = game.bottom.width / 2 + game.bottom.x - 20
    setTimeout(() => {
      // 根据元素在浏览器上的实际宽高进行Y坐标的设置
      this.cannon.y = (game.height - document.getElementById('cannon').offsetHeight) / 2 + document.getElementById('cannon').offsetHeight / 2
    }, 0)

    this.cannonMinus = new Q.Button(ns.R.cannonMinus);
    this.cannonMinus.id = 'cannonMinus';
    this.cannonMinus.x = game.bottom.x + game.bottom.width / 2 - 50 //game.bottom.x + window.innerWidth / 2 - 55 // 340
    this.cannonMinus.y = 0 // game.height / 2 - 22 // this.cannon.y - 100; //game.bottom.y + 36;
    setTimeout(() => {
      // 根据元素在浏览器上的实际宽高进行Y坐标的设置
      this.cannonMinus.y = (game.height - document.getElementById('cannonMinus').offsetHeight) / 2 - 64
    }, 0)
    this.cannonMinus.onEvent = function (e) {
      if (e.type == game.events[1]) {
        me.cannon.setPower(-1, true);
      }
    };

    this.cannonPlus = new Q.Button(ns.R.cannonPlus);
    this.cannonPlus.id = 'cannonPlus';
    this.cannonPlus.x = game.bottom.x + game.bottom.width / 2 - 50 // game.bottom.x + window.innerWidth / 2 + 95 // this.cannonMinus.x + 140;
    this.cannonPlus.y = 0 // this.cannon.y + 60; // this.cannonMinus.y;
    setTimeout(() => {
      // 根据元素在浏览器上的实际宽高进行Y坐标的设置
      this.cannonPlus.y = (game.height - document.getElementById('cannonPlus').offsetHeight) / 2 + 68
    }, 0)
    this.cannonPlus.onEvent = function (e) {
      if (e.type == game.events[1]) {
        me.cannon.setPower(1, true);
      }
    };

    this.coinNum = new ns.Num({
      id: 'coinNum',
      src: ns.R.numBlack,
      max: 6,
      gap: 3,
      autoAddZero: true
    });
    // this.coinNum.x = game.bottom.x - 43; // 20
    // this.coinNum.y = game.bottom.y + 20; // 44
    this.updateCoin(this.coin, this.zuanshi);
    game.stage.addChild(
      this.cannon,
      this.cannonMinus,
      this.cannonPlus,
      // this.coinNum
    );
    this.cannon.rotation = 90;
    // this.cannonMinus.rotation = 90;
    // this.cannonPlus.rotation = 90;
    this.coinNum.rotation = 90;
  };

  Player.prototype.fire = function (targetPoint) {
    var cannon = this.cannon,
      power = cannon.power,
      consumeGold = cannon.consumeGold,
      speed = 5;
    if (this.coin < consumeGold) return;

    //cannon fire
    var dir = ns.Utils.calcDirection(cannon, targetPoint),
      degree = dir.degree;
    if (degree == -90) degree = 0;
    else if (degree < 0 && degree > -90) degree = -degree;
    else if (degree >= 180 && degree <= 270) degree = 180 - degree;
    cannon.fire(degree);

    //fire a bullet
    var sin = Math.sin(degree * Q.DEG_TO_RAD),
      cos = Math.cos(degree * Q.DEG_TO_RAD);
    var bullet = new ns.Bullet(ns.R.bullets[power - 1]);
    bullet.x = cannon.x + (cannon.regY + 20) * sin;
    bullet.y = cannon.y - (cannon.regY + 20) * cos;
    bullet.rotation = degree;
    bullet.power = power;
    bullet.speedX = speed * sin;
    bullet.speedY = speed * cos;
    game.stage.addChild(bullet);

    //deduct coin
    this.updateCoin(-consumeGold, 0, true);
  };

  Player.prototype.captureFish = function (fish) {
    this.updateCoin(fish.coin, fish.zuanshi, true);
    this.numCapturedFishes++;
  };

  Player.prototype.updateCoin = function (coin, zuanshi, increase) {
    if (increase) {
      this.coin += coin
      this.zuanshi += zuanshi
    } else{
      this.coin = coin;
      this.zuanshi = zuanshi
    }

    if (this.coin > 999999) {
      this.coin = 999999;
    }
    if (this.zuanshi > 999999) {
      this.zuanshi = 999999
    }
    if (!currentGoldDom || !currentZushiDom) {
      currentGoldDom = document.getElementById('gold-coin-number')
      currentZushiDom = document.getElementById('zushi-coin-number')
    }
    if (currentZushiDom) {
      const tempNum = this.zuanshi.toString().length
      const pre = new Array(6 - tempNum).fill(0).join('')
      currentZushiDom.innerText = `${pre}${this.zuanshi}`
    }
    if (currentGoldDom) {
      const tempNum = this.coin.toString().length
      const pre = new Array(6 - tempNum).fill(0).join('')
      currentGoldDom.innerText = `${pre}${this.coin}`
    }
    // this.coinNum.setValue(this.coin);
  };
})();
