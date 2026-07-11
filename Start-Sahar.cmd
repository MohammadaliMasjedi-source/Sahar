@echo off
rem Sahar one-click launcher - starts a local server and opens the app.
rem (Double-clicking index.html does NOT work - audio/lessons need a server.)
cd /d "%~dp0"
start "" "http://127.0.0.1:8797/"
python -m http.server 8797 --bind 127.0.0.1
