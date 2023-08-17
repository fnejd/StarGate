package com.ssafy.stargate.handler;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.stargate.exception.CRUDException;
import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.response.file.SavedFileResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;


/**
 * Multipart로 받은 파일을 AWS S3에 핸들링하는 클래스
 */
@Slf4j
@Component
public class S3FileHandler extends FileHandler {
    private final String bucketName;
    private final AmazonS3Client amazonS3Client;

    public S3FileHandler(
            @Value("${cloud.aws.s3.bucket}") String bucketName,
            AmazonS3Client amazonS3Client
    ) {
        this.bucketName = bucketName;
        this.amazonS3Client = amazonS3Client;
    }

    /**
     * 저장된 파일 정보를 가져온다.
     *
     * @param key [String] 파일 경로
     * @return [SavedFileDto] 저장된 파일 정보를 담은 DTO
     * @throws NotFoundException 해당 파일이 없음
     */
    public SavedFileResponseDto getFileInfo(String key) throws NotFoundException {
        if (!amazonS3Client.doesObjectExist(bucketName, key)) {
            throw new NotFoundException("해당 S3 파일이 존재하지 않습니다. key: " + key);
        }

        String url = amazonS3Client.getUrl(bucketName, key).toString();

        return SavedFileResponseDto.builder()
                .filename(getFilenameByUrl(url))
                .fileUrl(url)
                .build();
    }

    /**
     * 파일을 저장한다.
     *
     * @param key           [String] 저장할 파일 경로
     * @param multipartFile [MultipartFile] 저장할 멀티파트 파일
     * @throws CRUDException 업로드에 실패
     */
    public void uploadFile(String key, MultipartFile multipartFile) throws CRUDException {
        log.info("upload start. key: {}, size: {}, contentType: {}", key, multipartFile.getSize(), multipartFile.getContentType());

        try (InputStream inputStream = multipartFile.getInputStream()) {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(multipartFile.getSize());
            objectMetadata.setContentType(multipartFile.getContentType());

            // ACL로 Public Read 권한 추가하여 외부에 파일 공개
            amazonS3Client.putObject(
                    new PutObjectRequest(bucketName, key, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead)
            );

        } catch (IOException e) {
            throw new CRUDException("S3 파일 업로드에 실패했습니다.");
        }

        if (!amazonS3Client.doesObjectExist(bucketName, key)) {
            throw new CRUDException("S3 파일 업로드에 실패했습니다.");
        }

        log.info("Success upload. Url: {}", amazonS3Client.getUrl(bucketName, key));
    }

    /**
     * 파일을 삭제한다.
     *
     * @param key [String] 삭제할 파일 경로
     * @throws NotFoundException 해당 파일이 없음
     * @throws CRUDException     삭제에 실패
     */
    public void deleteFile(String key) throws NotFoundException, CRUDException {
        if (!amazonS3Client.doesObjectExist(bucketName, key)) {
            throw new NotFoundException("해당 S3 파일이 존재하지 않습니다. key: " + key);
        }

        amazonS3Client.deleteObject(bucketName, key);

        if (amazonS3Client.doesObjectExist(bucketName, key)) {
            throw new CRUDException("S3 파일 삭제에 실패했습니다.");
        }
    }
}
