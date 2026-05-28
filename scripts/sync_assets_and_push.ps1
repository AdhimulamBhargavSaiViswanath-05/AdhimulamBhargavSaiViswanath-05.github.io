Set-Location (Split-Path -Parent $MyInvocation.MyCommand.Definition)
Set-Location ..
Remove-Item -Recurse -Force .\AdhimulamBhargavSaiViswanath-05.github.io\assets\* -ErrorAction SilentlyContinue
Copy-Item -Path .\AdhimulamBhargavSaiViswanath-05.github.io\dist\assets\* -Destination .\AdhimulamBhargavSaiViswanath-05.github.io\assets -Recurse -Force

Set-Location .\AdhimulamBhargavSaiViswanath-05.github.io

git add -A
$c = git commit -m 'fix(publish): sync assets with dist build' 2>&1
if ($LASTEXITCODE -ne 0) { Write-Output "No new changes to commit: $c" } else { Write-Output 'Committed' }

git push origin main
