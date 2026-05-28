$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

Remove-Item -Recurse -Force .\assets\* -ErrorAction SilentlyContinue
Copy-Item -Path .\dist\assets\* -Destination .\assets -Recurse -Force
Copy-Item -Path .\dist\index.html -Destination .\index.html -Force
git add -A
$commit = git commit -m "chore(publish): deploy production build to repo root for GitHub Pages" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Output "No changes to commit or commit failed: $commit"
}
else {
    Write-Output "Committed changes."
}

git push origin main
