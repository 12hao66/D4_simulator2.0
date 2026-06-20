/**
 * 文件系统访问工具 - 使用 File System Access API
 * 支持读取和保存本地 JSON 文件
 */

// 检查浏览器是否支持 File System Access API
export const isFileSystemAccessSupported = (): boolean => {
  return 'showOpenFilePicker' in window && 'showSaveFilePicker' in window;
};

// 读取 JSON 文件
export async function readJsonFile<T>(): Promise<{ data: T | null; fileHandle: FileSystemFileHandle | null }> {
  if (!isFileSystemAccessSupported()) {
    alert('您的浏览器不支持 File System Access API，请使用 Chrome 或 Edge 浏览器');
    return { data: null, fileHandle: null };
  }

  try {
    const [fileHandle] = await (window as any).showOpenFilePicker({
      types: [
        {
          description: 'JSON 文件',
          accept: { 'application/json': ['.json'] }
        }
      ],
      multiple: false
    });

    const file = await fileHandle.getFile();
    const content = await file.text();
    const data = JSON.parse(content) as T;

    return { data, fileHandle };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return { data: null, fileHandle: null };
    }
    throw err;
  }
}

// 保存 JSON 文件（使用已有的文件句柄）
export async function saveJsonFile<T>(
  data: T,
  fileHandle: FileSystemFileHandle | null,
  defaultName: string = 'data.json'
): Promise<FileSystemFileHandle | null> {
  if (!isFileSystemAccessSupported()) {
    alert('您的浏览器不支持 File System Access API，请使用 Chrome 或 Edge 浏览器');
    return null;
  }

  try {
    let handle = fileHandle;

    // 如果没有文件句柄，让用户选择保存位置
    if (!handle) {
      handle = await (window as any).showSaveFilePicker({
        suggestedName: defaultName,
        types: [
          {
            description: 'JSON 文件',
            accept: { 'application/json': ['.json'] }
          }
        ]
      });
    }

    if (!handle) {
      return null;
    }

    const writable = await handle.createWritable();
    await writable.write(JSON.stringify(data, null, 2));
    await writable.close();

    return handle;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return null;
    }
    throw err;
  }
}

// 导出 JSON 文件（强制下载）
export function downloadJsonFile<T>(data: T, filename: string = 'data.json'): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
