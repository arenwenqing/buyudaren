/* eslint-disable linebreak-style */
/* eslint-disable consistent-this */
/* eslint-disable @typescript-eslint/no-this-alias */
(function () {
  var ns = Q.use('fish');

  var Cannon = (ns.Cannon = function (props) {
    this.power = 0;

    Cannon.superClass.constructor.call(this, props);
    this.stop();
  });
  Q.inherit(Cannon, Q.MovieClip);

  Cannon.prototype.setPower = function (power, increase) {
    if (increase) power += this.power;
    if (this.power === 7 && power < 7) {
      power = 2
    }
    power = power >= 3 ? 3 : power < 1 ? 1 : power;
    if (this.power == power) return;

    this.power = power;
    window.localStorage.setItem('power', this.power)
    this.setType(ns.R.cannonTypes[power]);
  };

  Cannon.prototype.setType = function (type) {
    Q.merge(this, type, true);
    Q.merge(this, type.mixin, false);

    this.setDrawable(type.image);
    this._frames.length = 0;
    this.addFrame(type.frames);
    this.gotoAndStop(0);
  };

  Cannon.prototype.fire = function (degree) {
    this.rotation = degree;
    this.gotoAndPlay(0);
  };
})();
