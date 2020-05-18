@echo off
cd android && gradlew clean && cd .. && cls && yarn && exit
del /s /q scriptCleanInicial.bat