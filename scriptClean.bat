@echo off
rd %temp% /s /q
cd android && gradlew clean && cd .. && cls && react-native run-android