package com.ssafy.stargate.util;

import com.ssafy.stargate.handler.FileHandler;
import com.ssafy.stargate.model.dto.response.file.SavedFileResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service 단에서 사용되는 Multipart 파일에 관한 유틸리티
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class FileUtil {

    private final FileHandler fileHandler;

    /**
     * 저장할 파일 폴더 경로와 파일 이름붙어 파일 경로를 붙여준다.
     *
     * @param filePath [String] 파일 폴더 경로
     * @param filename [String] 파일 이름
     * @return [String] 파일 경로 결과
     */
    public String getKey(String filePath, String filename) {
        return fileHandler.getKey(filePath, filename);
    }

    /**
     * 저장된 파일 정보를 가져온다.
     *
     * @param filePath [String] 파일 폴더 경로
     * @param filename [String] 파일 이름
     * @return [SavedFileDto] 저장된 파일 정보를 담은 DTO
     */
    public SavedFileResponseDto getFileInfo(String filePath, String filename) {
        return getFileInfo(getKey(filePath, filename));
    }

    /**
     * 저장된 파일 정보를 가져온다.
     *
     * @param key [String] 파일 경로
     * @return [SavedFileDto] 저장된 파일 정보를 담은 DTO
     */
    public SavedFileResponseDto getFileInfo(String key) {
        try {
            return fileHandler.getFileInfo(key);
        } catch (Exception e) {
            log.warn(e.getMessage());
            return null;
        }
    }

    /**
     * 파일을 저장한다.
     *
     * @param filePath      [String] 파일 폴더 경로
     * @param multipartFile [MultipartFile] 저장할 멀티파트 파일
     * @return [String] 저장한 파일이름
     */
    public String uploadFile(String filePath, MultipartFile multipartFile) {
        if (multipartFile == null) {
            return null;
        }
        String uuidFilename = fileHandler.getUuidFilename(multipartFile.getOriginalFilename());
        String key = getKey(filePath, uuidFilename);
        try {
            fileHandler.uploadFile(key, multipartFile);
            return uuidFilename;
        } catch (Exception e) {
            log.warn(e.getMessage());
            return null;
        }
    }

    /**
     * 파일을 삭제한다.
     *
     * @param filePath [String] 파일 폴더 경로
     * @param filename [String] 파일 이름
     */
    public void deleteFile(String filePath, String filename) {
        if (filename == null) {
            return;
        }
        deleteFile(getKey(filePath, filename));
    }

    /**
     * 파일을 삭제한다.
     *
     * @param key [String] 삭제할 파일 경로
     */
    public void deleteFile(String key) {
        try {
            fileHandler.deleteFile(key);
        } catch (Exception e) {
            log.warn(e.getMessage());
        }
    }
}
