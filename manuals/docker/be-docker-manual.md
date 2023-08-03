# BE spring boot docker manual

- .jar 파일을 EC2상 /jar폴더 밑에 둔다.
- dockerfile도 같이 배치한다.
- shell에서 `docker build -t {이미지이름} . `으로 docker image를 빌드
- `docker run -d -p 8081:8080 --name stargate/spring-boot stargate/spring-boot ` 이런식으로 컨테이너를 실행한다.