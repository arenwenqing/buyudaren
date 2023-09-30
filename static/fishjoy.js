/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-this-alias */
(function () {
  function desensitizePhoneNumber(phoneNumber) {
    // 检查输入是否为有效的手机号码
    if (!/^\d{11}$/.test(phoneNumber)) {
      return '错误';
    }
    // 使用正则表达式替换中间部分为星号
    const desensitizedNumber = phoneNumber.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
    return desensitizedNumber;
  }
  window.onload = function () {
    setTimeout(function () {
      game.load();
    }, 10);
  };

  var ns = Q.use('fish');
  var game = (ns.game = {
    container: null,
    width: 480,
    height: 320,
    fps: 100,
    frames: 0,
    params: null,
    events: Q.supportTouch
      ? ['touchstart', 'touchend']
      : ['mousedown', 'mouseup'],

    fireInterval: 80 / 5, // 30,
    fireCount: 0
  });

  game.load = function (container) {
    //获取URL参数设置
    var params = (this.params = {}); // Q.getUrlParams();
    // if (params.mode == undefined) params.mode = 2;
    // if (params.fps) this.fps = params.fps;
    this.fireInterval = 15 // this.fps * 0.5;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    if (params.width) this.width = Number(params.width) || this.width;
    if (params.height) this.height = Number(params.height) || this.height;

    //初始化容器设置
    this.container = container || Q.getDOM('container');
    this.container.style.overflow = 'hidden';
    this.container.style.width = this.width + 'px';
    this.container.style.height = this.height + 'px';
    this.screenWidth = this.width; // window.innerWidth
    this.screenHeight = this.height; // window.innerHeight
    //load info
    var div = Q.createDOM('div', {
      innerHTML: '正在加载资源中，请稍候...<br>',
      style: {
        id: 'loader',
        position: 'absolute',
        width: this.width + 'px',
        left: '0px',
        top: (this.height >> 1) + 'px',
        textAlign: 'center',
        color: '#fff',
        font: Q.isMobile ? 'bold 16px 黑体' : 'bold 16px 宋体',
        textShadow: '0 2px 2px #111'
      }
    });
    this.container.appendChild(div);
    this.loader = div;

    //hide nav bar
    this.hideNavBar();
    if (Q.supportOrientation) {
      window.onorientationchange = function (e) {
        game.hideNavBar();
        if (game.stage) game.stage.updatePosition();
      };
    }

    //start load image
    var imgLoader = new Q.ImageLoader();
    imgLoader.addEventListener('loaded', Q.delegate(this.onLoadLoaded, this));
    imgLoader.addEventListener(
      'complete',
      Q.delegate(this.onLoadComplete, this)
    );
    imgLoader.load(ns.R.sources);
  };

  game.onLoadLoaded = function (e) {
    var content =
      '正在加载资源中，请稍候...<br>(' +
      Math.round((e.target.getLoadedSize() / e.target.getTotalSize()) * 100) +
      '%)';
    this.loader.innerHTML = content;
  };

  game.onLoadComplete = function (e) {
    e.target.removeAllEventListeners();
    this.init(e.images);
  };

  game.init = function (images) {
    ns.R.init(images);
    this.startup();
  };

  game.startup = function () {
    // var me = this;
    this.container.removeChild(this.loader);
    this.loader = null;

    //手持设备的特殊webkit设置
    if (Q.isWebKit && !Q.supportTouch) {
      document.body.style.webkitTouchCallout = 'none';
      document.body.style.webkitUserSelect = 'none';
      document.body.style.webkitTextSizeAdjust = 'none';
      document.body.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';
    }

    var context = null;
    if (this.params.mode == 1) {
      var canvas = Q.createDOM('canvas', {
        id: 'canvas',
        width: this.width,
        height: this.height,
        style: { position: 'absolute' }
      });
      this.container.appendChild(canvas);
      this.context = new Q.CanvasContext({ canvas: canvas });
    } else {
      this.context = new Q.DOMContext({ canvas: this.container });
    }
    this.stage = new Q.Stage({
      width: this.width,
      height: this.height,
      context: this.context,
      update: Q.delegate(this.update, this)
    });
    var em = (this.evtManager = new Q.EventManager());
    em.registerStage(this.stage, this.events, true, true);

    this.initUI();
    this.initPlayer();

    this.fishManager = new ns.FishManager(this.fishContainer);
    this.fishManager.makeFish();

    var timer = (this.timer = new Q.Timer(1000 / this.fps));
    timer.addListener(this.stage);
    timer.addListener(Q.Tween);
    timer.start();

    this.showFPS();
  };

  game.initUI = function () {
    ns.R.mainbg.height = this.stage.height;
    this.bg = new Q.Bitmap({
      id: 'bg',
      image: ns.R.mainbg,
      transformEnabled: false,
      width: this.stage.width
    });
    this.fishContainer = new Q.DisplayObjectContainer({
      id: 'fishContainer',
      width: this.width,
      height: this.height,
      eventChildren: false,
      transformEnabled: false
    });
    this.fishContainer.onEvent = function (e) {
      if (e.type == game.events[0] && game.fireCount >= game.fireInterval) {
        game.fireCount = 0;
        game.player.fire({ x: e.eventX, y: e.eventY });
      }
    };
    // this.bottom = new Q.Bitmap(ns.R.bottombar);
    // this.bottom.id = 'bottom';
    // this.bottom.x = -10
    // this.bottom.y = 0
    // this.bottom.transformEnabled = true; // false;

    // login icon add to stage
    this.loginIcon = new Q.Bitmap(ns.R.loginIcon)
    this.loginIcon.id = 'login'
    this.loginIcon.x = this.width - this.loginIcon.width / 2 - 30
    this.loginIcon.y = 10

    this.jinbiIcon = new Q.Bitmap(ns.R.jinbiIcon)
    this.jinbiIcon.x = this.loginIcon.x + 36
    this.jinbiIcon.y = this.loginIcon.y + this.loginIcon.height + 10
    this.jinbiIcon.id = 'jinbinIcon'

    this.zuanshiIcon = new Q.Bitmap(ns.R.zuanshiIcon)
    this.zuanshiIcon.x = this.loginIcon.x + 10
    this.zuanshiIcon.y = this.loginIcon.y + this.loginIcon.height + 10
    this.zuanshiIcon.id = 'zuanshiIcon'

    this.stage.addChild(
      this.bg,
      this.fishContainer,
      this.loginIcon,
      this.jinbiIcon,
      this.zuanshiIcon,
    );
    // this.stage.addChild(this.bg, this.fishContainer, this.bottom, this.loginIcon);
    // setTimeout(() => {
    //   // 根据元素在浏览器上的实际宽高进行Y坐标的设置
    //   this.bottom.y = (this.height - document.getElementById('bottom').offsetHeight) / 2
    // }, 0)
    // this.bottom.onEvent = function (e) {
    //   console.log(game.fireInterval);
    //   if (e.type == game.events[0] && game.fireCount >= game.fireInterval) {
    //     game.fireCount = 0;
    //     game.player.fire({ x: e.eventX, y: e.eventY });
    //   }
    // };

    this.loginIcon.onEvent = function() {
      window.location.href ='/my'
    }
    setTimeout(() => {
      document.querySelector('#gold-coin-number').style.display = 'block'
      document.querySelector('#zushi-coin-number').style.display = 'block'
      document.querySelector('#gold-coin-number').style.top = this.jinbiIcon.y + 65 + 'px'
      document.querySelector('#gold-coin-number').style.left = this.jinbiIcon.x - 37 + 'px'

      document.querySelector('#zushi-coin-number').style.top = this.zuanshiIcon.y + 65 + 'px'
      document.querySelector('#zushi-coin-number').style.left = this.zuanshiIcon.x - 37 + 'px'
      const loginUer = window.localStorage.getItem('user') || '{}'
      const currentUser = JSON.parse(loginUer)
      if (currentUser.phoneNum) {
        document.querySelector('#login').innerHTML = `<div id='loginContent'>
        <span>${desensitizePhoneNumber(currentUser.phoneNum)}</span>
        <span class='online-status'>在线</span>
        </div>`
      } else {
        document.querySelector('#login').innerHTML = `<div id='loginContent'>
        <span class='online-status logout-style'>未登录</span>
        </div>`
      }
    }, 0)
    // this.bottom.rotation = 90;
  };

  game.initPlayer = function () {
    var coin = window.localStorage.getItem('goldCoinCount') * 1 || 0
    var zuanshi = window.localStorage.getItem('diamondCount') * 1 || 0
    this.player = new ns.Player({ id: 'quark', coin: coin, zuanshi });
  };

  game.update = function (timeInfo) {
    this.frames++;
    this.fireCount++;
    this.fishManager.update();
  };

  game.showFPS = function () {
    // eslint-disable-next-line consistent-this
    var mes = this
    var fpsContainer = Quark.getDOM('fps');
    if (fpsContainer) {
      setInterval(function () {
        fpsContainer.innerHTML = 'FPS:' + mes.frames;
        mes.frames = 0;
      }, 1000);
    }
  };

  game.hideNavBar = function () {
    window.scrollTo(0, 1);
  };
})();
