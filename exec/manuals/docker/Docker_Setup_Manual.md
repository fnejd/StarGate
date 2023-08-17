# Docker image list
- mysql
- jenkins
- redis
- spring boot server(jenkins으로 관리)

## docker setup manual

### mysql

`docker run --name stargate-db -e MYSQL_ROOT_PASSWORD=ssafy -d -p 3306:3306 mysql:latest`

### redis

`docker run -p 6379:6379 --name stargate-redis -d redis:latest --requirepass "stargate406"`

### jenkins

`docker run --name jenkins-docker -d -p 9090:8080 -p 50000:50000 -v /home/jenkins:/var/jenkins_home -u root jenkins/jenkins:lts`


### spring boot server
> 기본적으로 jenkins가 생성 관리하며 여기에는 dockerfile를 게시하겠음

- 아래 dockerfile를 ubuntu서버상 `home/ubuntu/jar`라는 폴더에 배치 & 빌드한 jar 파일도 이 디렉토리에 배치한다.

```dockerfile
from openjdk:17
copy stargate.jar app.jar
entrypoint ["java","-jar","/app.jar"]
```
- docker image build 
```bash
docker build -t stargate/spring-boot
```
- docker container 생성 및 실행
```bash
docker run --name stargate-spring-boot -d -p 8081:8080 stargate/spring-boot
```





