package com.ssafy.stargate.handler;

import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.response.file.SavedFileResponseDto;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Paths;

/**
 * Multipart로 받은 파일을 핸들링하는 클래스
 */
public abstract class FileHandler {
    /**
     * 저장된 파일 정보를 가져오는 추상 함수
     * @param key [String] 파일 경로
     * @return [SavedFileDto] 저장된 파일 정보를 담은 DTO
     * @throws NotFoundException 해당 파일이 없음
     */
    public abstract SavedFileResponseDto getFileInfo(String key) throws NotFoundException;

    /**
     * 파일을 저장하는 추상 함수
     * @param key [String] 저장할 파일 경로
     * @param multipartFile [MultipartFile] 저장할 멀티파트 파일
     * @throws CRUDException 업로드에 실패
     */
    public abstract void uploadFile(String key, MultipartFile multipartFile) throws CRUDException;

    /**
     * 파일을 삭제하는 추상 함수
     * @param key [String] 삭제할 파일 경로
     * @throws NotFoundException 해당 파일이 없음
     * @throws CRUDException 삭제에 실패
     */
    public abstract void deleteFile(String key) throws NotFoundException, CRUDException;

    /**
     * 유니크한 파일 이름을 만들어 반환해준다.
     * 주어진 파일이름의 확장자 포함한다.
     * 유니크 파일 이름: 현재 시간 밀리초 + random 3글자 + 확장자
     * @param filename [String] 파일 이름(확장자 포함) ex: test.png
     * @return [String] 생성된 유니크한 파일 이름
     */
    public String getUuidFilename(String filename) {
        String ext = null;
        int dotIdx = filename.lastIndexOf(".");
        if (dotIdx != -1) {
            ext = filename.substring(dotIdx + 1);
        }

        StringBuilder uuidFilename = new StringBuilder();
        uuidFilename.append(System.currentTimeMillis())
                .append(RandomStringUtils.randomNumeric(3))
                .append(((ext != null) ? ("." + ext) : ""));
        return  uuidFilename.toString();
    }

    /**
     * Url에서 파일이름을 추출한다.
     * @param url [String] 파일 Url 정보
     * @return [String] 추출한 파일 이름
     * @throws NotFoundException 해당 파일이 없음
     */
    public String getFilenameByUrl(String url) throws NotFoundException {
        int lastSlashIndex = url.lastIndexOf("/");
        if (lastSlashIndex != -1 && lastSlashIndex < url.length() - 1) {
            return url.substring(lastSlashIndex + 1);
        } else {
            throw new NotFoundException("URL에서 파일이름을 가져오는데 실패했습니다.");
        }
    }

    /**
     * 저장할 파일 폴더 경로와 파일 이름붙어 파일 경로를 붙여준다.
     * @param filePath [String] 파일 폴더 경로
     * @param filename [String] 파일 이름
     * @return [String] 파일 경로 결과
     */
    public String getKey(String filePath, String filename) {
        return Paths.get(filePath, filename).toString();
    }
}
