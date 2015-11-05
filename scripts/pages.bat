
set dir_root=%~dp0\..\
pushd %dir_root%
set dir_root=%CD%
popd

echo %dir_root%

rmdir /s /q^
  %dir_root%\pages\js^
  %dir_root%\pages\css^
  %dir_root%\pages\img^
  %dir_root%\pages\lib^
  %dir_root%\pages\templates

del %dir_root%\index.html

robocopy /s %dir_root%\www %dir_root%\pages

del %dir_root%\pages\.buttlerc

pushd %dir_root%\pages
git commit -a -m "Publish pages"
git push origin gh-pages
popd
