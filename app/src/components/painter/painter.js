import Pen from './lib/pen';
import Downloader from './lib/downloader';
import KooHandler from './lib/koo-handler';

const util = require('./lib/util');

const downloader = new Downloader();

// 最大尝试的绘制次数
const MAX_PAINT_COUNT = 5;
Component({
  canvasWidthInPx: 0,
  canvasHeightInPx: 0,
  paintCount: 0,
  kooHandler: {},
  /**
   * 组件的属性列表
   */
  properties: {
    customStyle: {
      type: String,
    },
    dirty: {
      type: Boolean,
      value: false,
    },
    palette: {
      type: Object,
      observer: function (newVal, oldVal) {
        if (this.isNeedRefresh(newVal, oldVal)) {
          this.paintCount = 0;
          this.startPaint();
        }
      },
    },
  },

  data: {
    picURL: '',
    showCanvas: true,
    painterStyle: '',
  },

  attached() {
    setStringPrototype();
  },

  methods: {
    $emit: function $emit() {
       this.triggerEvent.apply(this, arguments);
    },
    /**
     * 判断一个 object 是否为 空
     * @param {object} object
     */
    isEmpty(object) {
      for (const i in object) {
        return false;
      }
      return true;
    },

    isNeedRefresh(newVal, oldVal) {
      if (!newVal || this.isEmpty(newVal) || (this.data.dirty && util.equal(newVal, oldVal))) {
        return false;
      }
      return true;
    },

    startPaint() {
      if (this.isEmpty(this.properties.palette)) {
        return;
      }

      if (this.properties.palette.path) {
        const Card = require(`../..${this.properties.palette.path}`);
        this.properties.palette = new Card().palette(this.properties.palette.data);
      }

      if (!(getApp().systemInfo && getApp().systemInfo.screenWidth)) {
        try {
          getApp().systemInfo = wx.getSystemInfoSync();
        } catch (e) {
          const error = `Painter get system info failed, ${JSON.stringify(e)}`;
          that.$emit('imgErr', { error: error });
          console.error(error);
          return;
        }
      }
      screenK = getApp().systemInfo.screenWidth / 750;

      this.downloadImages().then((palette) => {
        const { width, height } = palette;
        this.canvasWidthInPx = width.toPx();
        this.canvasHeightInPx = height.toPx();
        if (!width || !height) {
          console.error(`You should set width and height correctly for painter, width: ${width}, height: ${height}`);
          return;
        }
        this.setData({
          painterStyle: `width:${width};height:${height};`,
        });
        const ctx = wx.createCanvasContext('k-canvas', this);
        const pen = new Pen(ctx, palette);
        this.kooHandler = new KooHandler();
        this.kooHandler.init(pen);
        pen.paint(() => {
          this.saveImgToLocal();
        });
      });
    },

    downloadImages() {
      return new Promise((resolve, reject) => {
        let preCount = 0;
        let completeCount = 0;
        // const paletteCopy = JSON.parse(JSON.stringify(this.properties.palette));
        const paletteCopy = this.deepClone(this.properties.palette);
        if (paletteCopy.background) {
          preCount++;
          downloader.download(paletteCopy.background).then((path) => {
            paletteCopy.background = path;
            completeCount++;
            if (preCount === completeCount) {
              resolve(paletteCopy);
            }
          }, () => {
            completeCount++;
            if (preCount === completeCount) {
              resolve(paletteCopy);
            }
          });
        }
        if (paletteCopy.views) {
          for (const view of paletteCopy.views) {
            if (view && view.type === 'image' && view.url) {
              preCount++;
              /* eslint-disable no-loop-func */
              downloader.download(view.url).then((path) => {
                view.url = path;
                wx.getImageInfo({
                  src: view.url,
                  success: (res) => {
                    // 获得一下图片信息，供后续裁减使用
                    view.sWidth = res.width;
                    view.sHeight = res.height;
                  },
                  fail: (error) => {
                    console.error(`getImageInfo failed, ${Json.stringify(error)}`);
                  },
                  complete: () => {
                    completeCount++;
                    if (preCount === completeCount) {
                      resolve(paletteCopy);
                    }
                  },
                });
              }, () => {
                completeCount++;
                if (preCount === completeCount) {
                  resolve(paletteCopy);
                }
              });
            }
          }
        }
        if (preCount === 0) {
          resolve(paletteCopy);
        }
      });
    },

    // 递归实现一个深拷贝，保留对象中的方法
    deepClone(source) {
      if (!source || typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone');
      }
      const targetObj = source.constructor === Array ? [] : {};
      for (const keys in source) {
        if (source.hasOwnProperty(keys)) {
          if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = source[keys].constructor === Array ? [] : {};
            targetObj[keys] = this.deepClone(source[keys]);
          } else {
            targetObj[keys] = source[keys];
          }
        }
      }
      return targetObj;
    },

    saveImgToLocal() {
      // const that = this;
      // setTimeout(() => {
      //   wx.canvasToTempFilePath({
      //     canvasId: 'k-canvas',
      //     success: function (res) {
      //       that.getImageInfo(res.tempFilePath);
      //     },
      //     fail: function (error) {
      //       console.error(`canvasToTempFilePath failed, ${JSON.stringify(error)}`);
      //       that.$emit('imgErr', { error: error });
      //     },
      //   }, this);
      // }, 300);
    },

    getImageInfo(filePath) {
      const that = this;
      wx.getImageInfo({
        src: filePath,
        success: (infoRes) => {
          if (that.paintCount > MAX_PAINT_COUNT) {
            const error = `The result is always fault, even we tried ${MAX_PAINT_COUNT} times`;
            console.error(error);
            that.$emit('imgErr', { error: error });
            return;
          }
          // 比例相符时才证明绘制成功，否则进行强制重绘制
          if (Math.abs((infoRes.width * that.canvasHeightInPx - that.canvasWidthInPx * infoRes.height) / (infoRes.height * that.canvasHeightInPx)) < 0.01) {
            that.$emit('imgOK', { path: filePath });
          } else {
            that.startPaint();
          }
          that.paintCount++;
        },
        fail: (error) => {
          console.error(`getImageInfo failed, ${JSON.stringify(error)}`);
          that.$emit('imgErr', { error: error });
        },
      });
    },

    // interaction
    onBind(e) {
      this.kooHandler.emit(this._packEvent(e, 'bind'));
    },

    _packEvent(e, mode) {
      if (e.type === 'touchstart') {
        this.touchstart = {
          x: e.touches[0].x,
          y: e.touches[0].y,
        };
      }
      const swt = e.type === 'touchmove';
      const res = {
        x: swt ? e.touches[0].x : this.touchstart.x,
        y: swt ? e.touches[0].y : this.touchstart.y,
        type: e.type,
        e: e,
        mode: mode,
      };
      return res;
    },
  },
});

let screenK = 0.5;

function setStringPrototype() {
  /* eslint-disable no-extend-native */
  /**
   * 是否支持负数
   * @param {Boolean} minus 是否支持负数
   */
  String.prototype.toPx = function toPx(minus) {
    let reg;
    if (minus) {
      reg = /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
    } else {
      reg = /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
    }
    const results = reg.exec(this);
    if (!this || !results) {
      console.error(`The size: ${this} is illegal`);
      return 0;
    }
    const unit = results[2];
    const value = parseFloat(this);

    let res = 0;
    if (unit === 'rpx') {
      res = Math.round(value * screenK);
    } else if (unit === 'px') {
      res = value;
    }
    return res;
  };
}
