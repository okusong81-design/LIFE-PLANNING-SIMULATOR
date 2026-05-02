@echo off
cd /d "%~dp0"
echo start-app launched > start-app.log
start "" "%~dp0open-browser.cmd"
if not exist "C:\Users\okuso\AppData\Local\OpenAI\Codex\bin\node.exe" echo node.exe not found >> start-app.log
"C:\Users\okuso\AppData\Local\OpenAI\Codex\bin\node.exe" server.mjs >> start-app.log 2>&1
echo server stopped >> start-app.log
pause
