# BE spring boot docker manual

- .jar 파일을 EC2상 /jar폴더 밑에 둔다.
- dockerfile도 같이 배치한다.
- shell에서 `docker build -t {이미지이름} . `으로 docker image를 빌드
- 기존 컨테이너 삭제  `docker rm -f stargate-spring-boot`
- `docker run --name stargate-spring-boot -d -p 8081:8080 stargate/spring-boot ` 이런식으로 컨테이너를 실행한다.
