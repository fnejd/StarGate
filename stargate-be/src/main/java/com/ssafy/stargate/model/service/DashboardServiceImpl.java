package com.ssafy.stargate.model.service;

import com.ssafy.stargate.exception.NotFoundException;
import com.ssafy.stargate.model.dto.response.dashboard.DashboardMeetingResponseDto;
import com.ssafy.stargate.model.dto.response.dashboard.DashboardResponseDto;
import com.ssafy.stargate.model.dto.response.file.SavedFileResponseDto;
import com.ssafy.stargate.model.entity.Meeting;
import com.ssafy.stargate.model.entity.MeetingFUserBridge;
import com.ssafy.stargate.model.repository.MeetingFUserRepository;
import com.ssafy.stargate.model.repository.MeetingRepository;
import com.ssafy.stargate.util.FileUtil;
import com.ssafy.stargate.util.TimeUtil;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * 대시보드 미팅 정보 서비스 구현체
 */
@Service
@Slf4j
public class DashboardServiceImpl implements DashboardService{

    private final MeetingRepository meetingRepository;

    private final MeetingFUserRepository meetingFUserRepository;

    private final TimeUtil timeUtil;

    private final FileUtil fileUtil;

    private final String filePath;

    public DashboardServiceImpl(
            MeetingRepository meetingRepository,
            MeetingFUserRepository meetingFUserRepository,
            TimeUtil timeUtil,
            FileUtil fileUtil,
            @Value("${s3.filepath.meeting}") String filePath
    ) {
        this.meetingRepository = meetingRepository;
        this.meetingFUserRepository = meetingFUserRepository;
        this.timeUtil = timeUtil;
        this.fileUtil = fileUtil;
        this.filePath = filePath;
    }


    List<DashboardMeetingResponseDto> ongoingMeetings;

    List<DashboardMeetingResponseDto> expectedMeetings;

    List<DashboardMeetingResponseDto> finishedMeetings;

    LocalDateTime today;


    /**
     * 회원 (email) 와 관련된 meeting 정보 조회
     *
     * USER 일 경우 MeetingFUserBridge 를 통해서 Meeting 조회, PRODUCER 는 바로 Meeting 조회
     * @return DashboardResponseDto 과거, 현재, 미래 meeting 정보 저장하고 있는 dto
     * @throws NotFoundException 해당하는 AUTH 가 USER, PRODUCER 가 아닐 경우
     */
    @Override
    @Transactional
    public DashboardResponseDto getDashBoard() throws NotFoundException{

        ongoingMeetings = new ArrayList<>();
        expectedMeetings = new ArrayList<>();
        finishedMeetings = new ArrayList<>();
        today = LocalDateTime.now();

        String auth = getAuthorizationType();
        String email = getEmail();

        log.info("auth {} ", auth);
        log.info("email {} ", email);

        if(auth.equals("USER")){

            List<MeetingFUserBridge> meetingFUserBridgeList = meetingFUserRepository.findByEmail(email).orElse(null);

            if(meetingFUserBridgeList != null){
                for(MeetingFUserBridge meetingFUserBridge : meetingFUserBridgeList){

                    log.info("meetingFUserBridge {} ", meetingFUserBridge.getEmail());

                    Meeting meeting = meetingRepository.findById(meetingFUserBridge.getMeeting().getUuid()).orElse(null);
                    classifyMeetings(meeting);
                }
            }
        }else if(auth.equals("PRODUCER")){

            List<Meeting> meetingList = meetingRepository.findAllByEmail(email).orElse(null);

            if(meetingList != null){
                for(Meeting meeting : meetingList){
                    classifyMeetings(meeting);
                }
            }
        }else{
            throw new NotFoundException("해당하는 AUTH 는 유효하지 않습니다.");
        }

        
        // 예정은 가장 빠른 미팅 순으로 정렬
        expectedMeetings = sortExpectedMeetings(expectedMeetings);
        // 리마인드는 가장 최근 미팅 순으로 정렬
        finishedMeetings = sortFinishedMeetings(finishedMeetings);

        return DashboardResponseDto.builder()
                .ongoing(ongoingMeetings)
                .expected(expectedMeetings)
                .finished(finishedMeetings)
                .build();
    }

    /**
     * meeting의 날짜와 오늘 날짜를 비교해 예정 중인 미팅, 진행 중인 미팅, 완료된 미팅으로 분류
     *
     * 예정 인 미팅 ->  [ 미팅 시작 - 현재 > 0 ]
     * 진행 중인 미팅 -> [ 미팅 시작 - 현재 < 0  && (미팅 시작 - 현재) + 총 미팅 시간 > 0 ]
     * 완료된 미팅 -> [ 미팅 시작 - 현재 < 0 && (미팅 시작 - 현재) + 총 미팅 시간 <= 0 ]
     *          총 미팅 시간 계산 :  ( 미팅 시간 + 대기시간 ) * 미팅 팬 유저(가입한 사람)
     *
     * @param meeting Meeting 미팅 정보
     */
    private void classifyMeetings(Meeting meeting){

        if(meeting != null){

            long remainingSecond = timeUtil.getRemainingSeconds(meeting.getStartDate());
            long totalMeetingTime = (meeting.getMeetingTime() + meeting.getWaitingTime()) * meetingFUserRepository.countRegisteredFUsers(meeting.getUuid());

            if(remainingSecond> 0){
                expectedMeetings.add(setMeetingInfo(meeting , remainingSecond));
                
            }else{

                log.info("totalMeetingTime : {}", totalMeetingTime);
                log.info("remainingSecond + totalMeetingTime : {}", remainingSecond + totalMeetingTime);
                
                if(remainingSecond + totalMeetingTime > 0){
                    ongoingMeetings.add(setMeetingInfo(meeting, remainingSecond));
                    
                }else{
                    finishedMeetings.add(setMeetingInfo(meeting, remainingSecond));
                }
            }
        }
    }
    

    /**
     * 미팅 정보 전달하기 위해 dto 에 정보 저장, 이미지 파일 정보 가져와서 dto 에 저장
     * 사진이 있을 경우와 없을 경우 분리
     * @param meeting Meeting 미팅 정보
     * @param remainingSecond long 미팅 시작까지 남은 시간
     * @return DashboardMeetingResponseDto 대시보드에 있는 미팅 정보 담는 dto
     */
    private DashboardMeetingResponseDto setMeetingInfo(Meeting meeting, long remainingSecond){

        log.info("초 : {}",remainingSecond);

        DashboardMeetingResponseDto.DashboardMeetingResponseDtoBuilder dtoBuilder = DashboardMeetingResponseDto.builder()
                .uuid(meeting.getUuid())
                .name(meeting.getName())
                .startDate(meeting.getStartDate())
                .remainingTime(remainingSecond);

        if(meeting.getImage() != null){
            SavedFileResponseDto savedFileResponseDto = fileUtil.getFileInfo(filePath, meeting.getImage());
            dtoBuilder.imageFileInfo(savedFileResponseDto);
        }

        return dtoBuilder.build();
    }

    /**
     * SecurityContext 에 저장되어 있는 UsernamePasswordAuthenticationToken 정보 반환
     * @return UsernamePasswordAuthenticationToken
     */
    private UsernamePasswordAuthenticationToken getUserPasswordAuthentication(){

        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = (UsernamePasswordAuthenticationToken) authentication;

        return usernamePasswordAuthenticationToken;
    }

    /**
     * UsernamePasswordAuthenticationToken 에 저장되어 있는 auth 반환
     * @return String (USER, PRODUCER)
     */
    private String getAuthorizationType(){

        return getUserPasswordAuthentication().getAuthorities().stream().toList().get(0).getAuthority().toString();
    }

    /**
     * UsernamePasswordAuthenticationToken 에 저장되어 있는 유저 이메일 반환
     * @return String 유저 이메일
     */
    private String getEmail(){

        return getUserPasswordAuthentication().getName().toString();
    }

    /**
     * 예정 미팅을 가장 시간이 얼마 남지 않은 순으로 정렬
     * @param dto List<DashboardMeetingResponseDto> 예정 미팅 목록
     * @return 가장 빠르게 시작하는 순으로 정렬된 예정 미팅 목록
     */
    private List<DashboardMeetingResponseDto> sortExpectedMeetings(List<DashboardMeetingResponseDto> dto){
        return dto.stream().sorted((v1, v2) -> v1.getStartDate().compareTo(v2.getStartDate())).collect(Collectors.toList());
    }

    /**
     * 완료된 미팅을 가장 최근에 끝난 미팅 순으로 정렬
     * @param dto List<DashboardMeetingResponseDto> 완료된 미팅 목록
     * @return 가장 최근에 끝난 미팅 순으로 정렬된 완료된 미팅 목록
     */
    private List<DashboardMeetingResponseDto> sortFinishedMeetings(List<DashboardMeetingResponseDto> dto){
        return dto.stream().sorted((v1, v2) -> v2.getStartDate().compareTo(v1.getStartDate())).collect(Collectors.toList());
    }

}
