package com.ssafy.stargate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.stargate.model.dto.request.history.HistoryCreateRequestDto;
import com.ssafy.stargate.model.dto.request.pmanagement.PGroupCreateRequestDto;
import com.ssafy.stargate.model.dto.request.pmanagement.PMemberCreateRequestDto;
import com.ssafy.stargate.model.dto.response.jwt.JwtResponseDto;
import com.ssafy.stargate.model.dto.response.pmanagement.PGroupCreateResponseDto;
import com.ssafy.stargate.model.dto.response.pmanagement.PMemberCreateResponseDto;
import com.ssafy.stargate.model.repository.HistoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
public class HistoryIntegrationTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private HistoryRepository historyRepository;

    String fUserId = "fan1@fan1.com";
    long pMemberId;

    @BeforeEach
    public void init() throws Exception {
        createDummyFUser();

        String pUserId = "producer1@producer1.com";
        String pUserPw = "qwer1234!";
        createDummyPUser(pUserId, pUserPw);
        String pAccessToken = loginPUser(pUserId, pUserPw);

        long pGroupId = createPGroup(pAccessToken);
        pMemberId = createPMember(pAccessToken, pGroupId);
    }

    public void createDummyFUser() throws Exception {
        mvc.perform(post("/fusers/register")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("email", fUserId)
                .param("name", "fan1")
                .param("password", "qwer1234!")
                .param("nickname", "팬유저1")
                .param("birthday", "1998-05-19T00:00:00.000")
                .param("phone", "010-1212-2323"));
    }

    public void createDummyPUser(String pUserId, String pUserPw) throws Exception {
        mvc.perform(post("/pusers/register")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("email", pUserId)
                .param("name", "producer1")
                .param("password", pUserPw)
                .param("code", "hello-world-code1"));
    }

    public String loginPUser(String pUserId, String pUserPw) throws Exception {
        MvcResult result = mvc.perform(post("/pusers/login")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("email", pUserId)
                        .param("password", pUserPw))
                .andReturn();

        JwtResponseDto responseDto = mapper.readValue(result.getResponse().getContentAsString(), JwtResponseDto.class);
        return responseDto.getAccessToken();
    }

    public long createPGroup(String pAccessToken) throws Exception {
        PGroupCreateRequestDto requestDto = PGroupCreateRequestDto.builder()
                .name("group1")
                .build();

        MvcResult result = mvc.perform(post("/pmanagements/group/create")
                        .header("Authorization", "Bearer " + pAccessToken)
                        .contentType("application/json;charset=utf-8")
                        .content(mapper.writeValueAsString(requestDto)))
                .andReturn();

        PGroupCreateResponseDto responseDto = mapper.readValue(result.getResponse().getContentAsString(), PGroupCreateResponseDto.class);
        return responseDto.getGroupNo();
    }

    public long createPMember(String pAccessToken, long pGroupId) throws Exception {
        PMemberCreateRequestDto requestDto = PMemberCreateRequestDto.builder()
                .groupNo(pGroupId)
                .name("member1")
                .build();

        MvcResult result = mvc.perform(post("/pmanagements/member/create")
                        .header("Authorization", "Bearer " + pAccessToken)
                        .contentType("application/json;charset=utf-8")
                        .content(mapper.writeValueAsString(requestDto)))
                .andReturn();

        PMemberCreateResponseDto responseDto = mapper.readValue(result.getResponse().getContentAsString(), PMemberCreateResponseDto.class);
        return responseDto.getMemberNo();
    }

    @Nested
    @DisplayName("create test")
    public class createTest {
        @Nested
        @DisplayName("success")
        public class Success {
            @Test
            public void successTest() throws Exception {
                // given
                int beforeSize = historyRepository.findAll().size();
                String contents = "테스트 컨텐트 입니다.";
                HistoryCreateRequestDto requestDto = HistoryCreateRequestDto
                        .builder()
                        .memberNo(pMemberId)
                        .email(fUserId)
                        .contents(contents)
                        .build();

                // when
                MvcResult result = mvc.perform(post("/histories/create")
                                .contentType("application/json;charset=utf-8")
                                .content(mapper.writeValueAsString(requestDto)))
                        // then
                        .andExpect(status().isOk())
                        .andReturn();

                // DB 저장 검증
                assertThat(historyRepository.findAll().size()).isEqualTo(beforeSize + 1);

            }
        }
    }
}
