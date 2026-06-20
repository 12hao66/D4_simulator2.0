// 应用配置
export const APP_CONFIG = {
  // 数据库模块的数据路径（使用相对路径，支持统一构建部署）
  databaseBaseUrl: '../database/',
};

// 获取数据库数据路径
export function getDatabaseDataUrl(fileName: string): string {
  return `${APP_CONFIG.databaseBaseUrl}data/${fileName}`;
}

// 获取数据库图片路径
export function getDatabaseImageUrl(iconPath: string): string {
  // 移除 ./ 前缀（原始路径已经包含 images/）
  const cleanPath = iconPath.replace('./', '');
  return `${APP_CONFIG.databaseBaseUrl}${cleanPath}`;
}