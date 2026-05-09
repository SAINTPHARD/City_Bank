@echo off
REM Script para instalar e configurar o Apache Maven no Windows

REM 1. Baixar Maven
set MAVEN_VERSION=3.9.6
set MAVEN_ZIP=apache-maven-%MAVEN_VERSION%-bin.zip
set MAVEN_URL=https://dlcdn.apache.org/maven/maven-3/%MAVEN_VERSION%/binaries/%MAVEN_ZIP%
set DEST_DIR=C:\maven

REM Baixa o Maven
powershell -Command "Invoke-WebRequest -Uri %MAVEN_URL% -OutFile %MAVEN_ZIP%"

REM 2. Extrair o ZIP
powershell -Command "Expand-Archive -Path %MAVEN_ZIP% -DestinationPath %DEST_DIR%"

REM 3. Configurar variáveis de ambiente
setx MAVEN_HOME "%DEST_DIR%\apache-maven-%MAVEN_VERSION%"
setx PATH "%DEST_DIR%\apache-maven-%MAVEN_VERSION%\bin;%PATH%"

REM 4. Limpeza
DEL %MAVEN_ZIP%

ECHO.
ECHO Maven instalado em %DEST_DIR%\apache-maven-%MAVEN_VERSION%
ECHO Feche e abra o prompt de comando para ativar o Maven.
ECHO Para testar, execute:  mvn -version
pause
