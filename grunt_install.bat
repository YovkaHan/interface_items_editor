echo off
CHOICE /T 30 /D N /M "Do you want to install grunt ?"
If Errorlevel 2 Goto No

If Errorlevel 1 Goto Yes


:Yes


npm install

:No

pause 

