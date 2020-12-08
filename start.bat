@echo off

e:
cd e:/node/nexcloud-i18n-editor

echo ================================
set /p _isCopyAll="要复制NexCloud中的所有翻译文件过来吗? (y/n)"
echo 复制所有: %_isCopyAll%
pause

if "%_isCopyAll%" == "y" (
	cp -r E:/angular/NexCloud/src/assets/i18n/*.json i18n/	
	goto start
) else (
	goto copyZh
)
pause
exit


:copyZh
echo --------------------------------
set /p _copy="要复制NexCloud中的zh.json文件过来吗? (y/n)"
echo 复制zh.json: %_copy%
pause
if "%_copy%" == "y" (
	cp E:/angular/NexCloud/src/assets/i18n/zh.json i18n/
)
goto start
exit


:start
rem     start explorer.exe /e,/root,E:\angular\NexCloud\src\assets\i18n\
npm run start
pause
exit