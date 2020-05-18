@echo off
yarn && cd android && gradlew clean && cd .. && cls && exit
del /s /q scriptCleanInicial.bat