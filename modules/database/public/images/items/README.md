# 装备图片维护说明

本目录用于存放各类装备图片，请按照以下结构组织图片文件：

## 目录结构

```
images/
├── unique/          # 所有暗金装备图片（包括暗金和神话暗金）
│   ├── selig_heart_of_dissolution.png    # 暗金装备
│   ├── butcher_axe.png                    # 暗金装备
│   ├── immortal_kings_crown.png           # 神话暗金装备
│   └── ...
│
└── powers/          # 威能图标
    └── ...
```

## 图片命名规范

- 使用英文命名，采用下划线分隔
- 名称应与 `mockData.ts` 中的 `icon` 字段对应
- 例如：`selig_heart_of_dissolution.png` 对应数据库中的 `/images/items/unique/selig_heart_of_dissolution.png`

## 支持的图片格式

- PNG（推荐）
- JPG/JPEG
- SVG
- WebP

## 推荐的图片尺寸

- 卡片缩略图：64x64 像素
- 详情弹窗图：80x80 像素
- 原始分辨率：建议不超过 256x256 像素

## 注意事项

1. 图片加载失败时会显示默认图标（💎 表示暗金，🌟 表示神话暗金）
2. 请确保图片背景透明或与暗黑主题协调
3. 建议使用官方或版权清晰的图片资源
4. 暗金和神话暗金装备图片统一放在 `unique/` 文件夹，通过 `itemType` 字段区分类型
