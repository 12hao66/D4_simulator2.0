@echo off
setlocal

echo ==============================================
echo 暗黑4模拟器 - 统一构建脚本
echo ==============================================

:: 创建统一输出目录
mkdir dist 2>nul

:: 构建 calculator
echo.
echo [1/6] 构建伤害计算器 (calculator)...
cd modules\calculator
if exist package-lock.json (
    npm run build
) else (
    npm install && npm run build
)
if not exist ..\..\dist\calculator mkdir ..\..\dist\calculator
xcopy /E /I /Y dist ..\..\dist\calculator >nul
cd ..\..

:: 构建 database  
echo.
echo [2/6] 构建数据库管理 (database)...
cd modules\database
if exist package-lock.json (
    npm run build
) else (
    npm install && npm run build
)
if not exist ..\..\dist\database mkdir ..\..\dist\database
xcopy /E /I /Y dist ..\..\dist\database >nul
cd ..\..

:: 构建 equipment
echo.
echo [3/6] 构建装备模拟器 (equipment)...
cd modules\equipment
if exist package-lock.json (
    npm run build
) else (
    npm install && npm run build
)
if not exist ..\..\dist\equipment mkdir ..\..\dist\equipment
xcopy /E /I /Y dist ..\..\dist\equipment >nul
cd ..\..

:: 复制静态模块
echo.
echo [4/6] 复制伤害模拟器2.0 (simulator)...
if not exist dist\simulator mkdir dist\simulator
xcopy /E /I /Y modules\simulator dist\simulator >nul

echo.
echo [5/6] 复制技能模拟器 (skills)...
if not exist dist\skills mkdir dist\skills
xcopy /E /I /Y modules\skills dist\skills >nul

echo.
echo [6/6] 复制巅峰盘模拟器 (paragon)...
if not exist dist\paragon mkdir dist\paragon
xcopy /E /I /Y modules\paragon dist\paragon >nul

:: 复制导航页
echo.
echo [完成] 复制导航页...
copy index.html dist\ >nul
copy d4_simulator_v2.0.html dist\ >nul

echo.
echo ==============================================
echo 构建完成！输出目录: dist\
echo 启动命令: cd dist && http-server -p 8080
echo ==============================================

endlocal
