@echo off

set LOCAL_JAR=C:\\Users\\SSAFY\\Desktop\\Stargate\\Stargate\\stargate-be\\build\\libs\\stargate.jar
set KEY_LOC=C:\\Users\\SSAFY\\Desktop\\pem\\I9A406T.pem
set EC2=ubuntu@i9a406.p.ssafy.io

echo kill spring boot running
ssh -i %KEY_LOC% %EC2% "pkill -f 'stargate.*\.jar'; find . -type f -regex '\\home\\ubuntu\\nohup.out' -delete; exit;"

:choice
set /P c=Upload Jar File? [Y/n]?
if /I "%c%" EQU "n" goto :RessurectServer
if /I "%c~%" EQU "" goto :UploadJar
goto :choice

:UploadJar
echo upload jar to ec2
scp -i %KEY_LOC% %LOCAL_JAR% %EC2%:/home/ubuntu/stargate.jar

:RessurectServer
echo ressurect the server
ssh -i %KEY_LOC% %EC2% "nohup java -jar stargate.jar & "

exit