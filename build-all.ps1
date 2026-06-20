Write-Host "=============================================="
Write-Host "        Diablo 4 Simulator - Build Script"
Write-Host "=============================================="
Write-Host ""

$rootDir = $PWD.Path
$distDir = "$rootDir\dist"

# Step 1: Clean and create output directory
Write-Host "[1/3] Cleaning output directory..." -ForegroundColor Cyan
if (Test-Path $distDir) {
    [System.IO.Directory]::Delete($distDir, $true)
    Start-Sleep -Milliseconds 500
}
[System.IO.Directory]::CreateDirectory($distDir) | Out-Null
Write-Host "      OK Output directory ready" -ForegroundColor Green

# Step 2: Build all modules
Write-Host ""
Write-Host "[2/3] Building modules..." -ForegroundColor Cyan

$modules = @("calculator", "database", "equipment", "skills", "paragon", "build", "bbs")

foreach ($module in $modules) {
    $moduleDir = "$rootDir\modules\$module"
    Write-Host "      Building: $module..." -ForegroundColor Yellow
    
    Push-Location $moduleDir
    npm run build 2>&1 | Out-Null
    Write-Host "      OK $module built successfully" -ForegroundColor Green
    Pop-Location
}

# Step 3: Deploy to dist directory
Write-Host ""
Write-Host "[3/3] Deploying to dist..." -ForegroundColor Cyan

# Copy build modules
$modules | ForEach-Object {
    $sourcePath = "$rootDir\modules\$_\dist"
    $destPath = "$distDir\$_"
    
    [System.IO.Directory]::CreateDirectory($destPath) | Out-Null
    Copy-Item -Path "$sourcePath\*" -Destination $destPath -Recurse -Force
    Write-Host "      OK $_ deployed" -ForegroundColor Green
}

# Copy static modules
$staticModules = @("simulator")
$staticModules | ForEach-Object {
    $sourcePath = "$rootDir\modules\$_"
    $destPath = "$distDir\$_"
    
    [System.IO.Directory]::CreateDirectory($destPath) | Out-Null
    Copy-Item -Path "$sourcePath\*" -Destination $destPath -Recurse -Force
    Write-Host "      OK $_ deployed" -ForegroundColor Green
}

# Copy main index.html
Copy-Item -Path "$rootDir\index.html" -Destination $distDir -Force
Write-Host "      OK main index.html copied" -ForegroundColor Green

Write-Host ""
Write-Host "=============================================="
Write-Host "              Build Complete!" -ForegroundColor Green
Write-Host "=============================================="
Write-Host ""
Write-Host "Output: $distDir"
Write-Host "Start: cd '$distDir'; npx http-server -p 8080 -s -c-1"
Write-Host ""
Write-Host "Note: -c-1 parameter disables cache for development"
Write-Host ""