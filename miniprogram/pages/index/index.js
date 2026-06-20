// ══════════════════════════════════════════════════
// D4伤害计算器小程序 - 主页面逻辑
// 核心功能：WebView嵌入 + Canvas分享图生成
// ══════════════════════════════════════════════════

Page({
  data: {
    showModal: false,
    calcResult: null,
    equipmentData: null
  },

  onLoad() {
    console.log('D4模拟器小程序页面加载');
    // 初始化时可以设置默认数据用于演示
    this.setDefaultDemoData();
  },

  /**
   * 设置默认演示数据（用于首次进入展示）
   */
  setDefaultDemoData() {
    this.setData({
      calcResult: {
        damage: 2850000,
        dps: 1560000,
        critRate: 50,
        vulnRate: 80,
        aClass: 245,
        bClass: 44,
        legMult: 2.35
      },
      equipmentData: {
        class: 'barbarian',
        className: '野蛮人',
        skill: '旋风斩',
        skillDmg: 215,
        weapons: ['狂战士之斧', '怒火之刃'],
        armor: ['不朽战甲', '强化头盔', '暴击指环', '毁灭之链']
      }
    });
  },

  /**
   * 接收来自WebView的消息
   * WebView中通过 window.postMessage({ data: ... }) 发送数据
   */
  onWebViewMessage(e) {
    console.log('收到WebView消息:', e.detail);
    
    try {
      const data = e.detail.data[0];
      
      if (data.type === 'calcResult') {
        // 接收伤害计算结果
        this.setData({
          calcResult: data.payload
        });
        console.log('已更新计算结果');
      } else if (data.type === 'equipment') {
        // 接收装备数据
        this.setData({
          equipmentData: data.payload
        });
        console.log('已更新装备数据');
      }
    } catch (error) {
      console.error('解析WebView消息失败:', error);
    }
  },

  /**
   * 显示分享菜单
   */
  showShareMenu() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  /**
   * 生成分享图入口
   */
  generateShareImage() {
    // 如果没有实际数据，使用默认演示数据
    if (!this.data.calcResult) {
      this.setDefaultDemoData();
    }

    this.setData({ showModal: true });
    
    // 延迟执行Canvas绘制，等待DOM渲染完成
    setTimeout(() => {
      this.drawShareCanvas();
    }, 300);
  },

  /**
   * 使用Canvas绘制分享图
   * 这是核心功能：把配装和计算结果画成图片
   */
  drawShareCanvas() {
    const ctx = wx.createCanvasContext('shareCanvas');
    const result = this.data.calcResult;
    const equip = this.data.equipmentData;

    // 1. 绘制背景
    this.drawBackground(ctx);

    // 2. 绘制标题栏
    this.drawHeader(ctx);

    // 3. 绘制职业和技能信息
    this.drawClassInfo(ctx, equip);

    // 4. 绘制核心伤害数据
    this.drawDamageInfo(ctx, result);

    // 5. 绘制装备列表
    this.drawEquipment(ctx, equip);

    // 6. 绘制乘区数据
    this.drawZoneInfo(ctx, result);

    // 7. 绘制底部二维码区域
    this.drawFooter(ctx);

    // 执行绘制
    ctx.draw();
    
    console.log('分享图绘制完成');
  },

  /**
   * 绘制背景
   */
  drawBackground(ctx) {
    // 渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f0f1a');
    ctx.setFillStyle(gradient);
    ctx.fillRect(0, 0, 300, 450);

    // 边框装饰
    ctx.setStrokeStyle('rgba(224, 160, 32, 0.3)');
    ctx.setLineWidth(2);
    ctx.roundRect(4, 4, 292, 442, 12);
    ctx.stroke();
  },

  /**
   * 绘制标题栏
   */
  drawHeader(ctx) {
    ctx.setFillStyle('#e0a020');
    ctx.setFontSize(18);
    ctx.setFontFamily('Cinzel, serif');
    ctx.setTextAlign('center');
    ctx.fillText('⚔️ D4伤害计算器', 150, 35);

    ctx.setFillStyle('rgba(255, 255, 255, 0.5)');
    ctx.setFontSize(10);
    ctx.fillText('S13 憎恨之躯 · 全职业通用', 150, 55);
  },

  /**
   * 绘制职业信息
   */
  drawClassInfo(ctx, equip) {
    const iconMap = {
      barbarian: '⚔', druid: '🌿', sorc: '🔥', necro: '💀', 
      rogue: '🗡', paladin: '🛡', spiritborn: '🦅'
    };

    ctx.setFillStyle('#fff');
    ctx.setFontSize(12);
    ctx.setTextAlign('left');
    
    ctx.fillText('职业：', 20, 85);
    ctx.setFillStyle('#ffd060');
    ctx.setFontSize(14);
    ctx.fillText(`${iconMap[equip.class] || '⚔'} ${equip.className}`, 65, 85);

    ctx.setFillStyle('#fff');
    ctx.setFontSize(12);
    ctx.fillText('技能：', 20, 105);
    ctx.setFillStyle('#70b8ff');
    ctx.fillText(`${equip.skill} (${equip.skillDmg}%)`, 65, 105);
  },

  /**
   * 绘制核心伤害数据
   */
  drawDamageInfo(ctx, result) {
    // 伤害数值背景框
    ctx.setFillStyle('rgba(224, 160, 32, 0.1)');
    ctx.roundRect(20, 120, 260, 70, 8);
    ctx.fill();

    ctx.setStrokeStyle('rgba(224, 160, 32, 0.3)');
    ctx.roundRect(20, 120, 260, 70, 8);
    ctx.stroke();

    // 单次伤害
    ctx.setFillStyle('#ffd060');
    ctx.setFontSize(24);
    ctx.setFontFamily('Share Tech Mono, monospace');
    ctx.setTextAlign('center');
    ctx.fillText('单次伤害', 150, 142);

    ctx.setFillStyle('#fff');
    ctx.setFontSize(32);
    ctx.fillText(this.formatNumber(result.damage), 150, 175);

    // DPS
    ctx.setFillStyle('rgba(0, 214, 143, 0.1)');
    ctx.roundRect(20, 195, 125, 40, 6);
    ctx.fill();

    ctx.setFillStyle('#00d68f');
    ctx.setFontSize(11);
    ctx.setTextAlign('center');
    ctx.fillText('平均 DPS', 82, 212);
    
    ctx.setFillStyle('#fff');
    ctx.setFontSize(16);
    ctx.fillText(this.formatNumber(result.dps), 82, 230);

    // 暴击率
    ctx.setFillStyle('rgba(255, 128, 0, 0.1)');
    ctx.roundRect(155, 195, 125, 40, 6);
    ctx.fill();

    ctx.setFillStyle('#ff8000');
    ctx.setFontSize(11);
    ctx.fillText('暴击率', 217, 212);
    
    ctx.setFillStyle('#fff');
    ctx.setFontSize(16);
    ctx.fillText(`${result.critRate}%`, 217, 230);
  },

  /**
   * 绘制装备列表
   */
  drawEquipment(ctx, equip) {
    ctx.setFillStyle('#fff');
    ctx.setFontSize(12);
    ctx.setTextAlign('left');
    ctx.fillText('核心装备', 20, 265);

    // 武器
    ctx.setFillStyle('rgba(255, 128, 0, 0.1)');
    ctx.roundRect(20, 275, 260, 50, 6);
    ctx.fill();

    ctx.setFillStyle('#ff8000');
    ctx.setFontSize(10);
    ctx.fillText('⚔ 武器', 30, 292);
    
    ctx.setFillStyle('#fff');
    ctx.setFontSize(11);
    ctx.fillText(equip.weapons?.join(' + ') || '未装备', 30, 310);

    // 护甲/饰品
    ctx.setFillStyle('rgba(64, 150, 255, 0.1)');
    ctx.roundRect(20, 330, 260, 35, 6);
    ctx.fill();

    ctx.setFillStyle('#4096ff');
    ctx.setFontSize(10);
    ctx.fillText('🛡 护甲/饰品', 30, 347);
    
    ctx.setFillStyle('#fff');
    ctx.setFontSize(10);
    ctx.fillText(equip.armor?.join(' · ') || '未装备', 30, 362);
  },

  /**
   * 绘制乘区数据
   */
  drawZoneInfo(ctx, result) {
    ctx.setFillStyle('#fff');
    ctx.setFontSize(12);
    ctx.setTextAlign('left');
    ctx.fillText('伤害乘区', 20, 385);

    const zones = [
      { name: 'A类区', value: `+${result.aClass}%`, color: '#70b8ff' },
      { name: 'B类区', value: `+${result.bClass}%`, color: '#ff8000' },
      { name: '独立X', value: `×${result.legMult}`, color: '#e0a020' },
      { name: '易伤覆盖', value: `${result.vulnRate}%`, color: '#ff6050' }
    ];

    zones.forEach((zone, index) => {
      const x = 20 + index * 65;
      ctx.setFillStyle(zone.color);
      ctx.setFontSize(9);
      ctx.fillText(zone.name, x, 402);
      
      ctx.setFillStyle('#fff');
      ctx.setFontSize(10);
      ctx.fillText(zone.value, x, 417);
    });
  },

  /**
   * 绘制底部区域（二维码占位）
   */
  drawFooter(ctx) {
    // 分隔线
    ctx.setStrokeStyle('rgba(255, 255, 255, 0.1)');
    ctx.beginPath();
    ctx.moveTo(20, 425);
    ctx.lineTo(280, 425);
    ctx.stroke();

    // 提示文字
    ctx.setFillStyle('rgba(255, 255, 255, 0.4)');
    ctx.setFontSize(9);
    ctx.setTextAlign('center');
    ctx.fillText('扫码查看详细配装', 150, 442);
  },

  /**
   * 数字格式化
   */
  formatNumber(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + '亿';
    if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return Math.round(n).toString();
  },

  /**
   * 关闭弹窗
   */
  closeModal() {
    this.setData({ showModal: false });
  },

  /**
   * 保存图片到相册
   */
  saveImage() {
    wx.canvasToTempFilePath({
      canvasId: 'shareCanvas',
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            });
            this.closeModal();
          },
          fail: (err) => {
            console.error('保存失败:', err);
            wx.showToast({
              title: '保存失败',
              icon: 'error'
            });
          }
        });
      },
      fail: (err) => {
        console.error('生成图片失败:', err);
        wx.showToast({
          title: '生成失败',
          icon: 'error'
        });
      }
    });
  },

  /**
   * 分享图片给好友
   */
  shareImage() {
    wx.canvasToTempFilePath({
      canvasId: 'shareCanvas',
      success: (res) => {
        wx.showShareImageMenu({
          path: res.tempFilePath,
          success: () => {
            this.closeModal();
          },
          fail: (err) => {
            console.error('分享失败:', err);
            wx.showToast({
              title: '分享失败',
              icon: 'error'
            });
          }
        });
      },
      fail: (err) => {
        console.error('生成图片失败:', err);
        wx.showToast({
          title: '生成失败',
          icon: 'error'
        });
      }
    });
  },

  /**
   * 小程序分享功能（分享给好友）
   */
  onShareAppMessage() {
    return {
      title: '⚔️ D4伤害计算器 - S13配装计算',
      path: '/pages/index/index',
      imageUrl: '' // 可以设置自定义分享图
    };
  },

  /**
   * 小程序分享功能（分享到朋友圈）
   */
  onShareTimeline() {
    return {
      title: '⚔️ D4伤害计算器 - 暗黑4配装神器',
      imageUrl: ''
    };
  }
});
