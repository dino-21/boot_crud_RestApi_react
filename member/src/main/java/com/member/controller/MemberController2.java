package com.member.controller;

import com.member.dto.MemberDTO;
import com.member.entity.Member;
import com.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000") // React(프론트엔드)에서 접근 허용
@RestController // REST 방식의 컨트롤러임을 선언
@RequestMapping("/api/members") // 이 컨트롤러는 /api/members로 시작하는 요청 처리
@RequiredArgsConstructor // 생성자 자동 주입
@Log4j2
public class MemberController2 {

    private final MemberService memberService; // 서비스 레이어 주입

    // 전체 회원 목록 조회 (페이징 + ID 내림차순 정렬)
    @GetMapping
    public Page<MemberDTO> list(@RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "3") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        return memberService.readAllPage(pageable).map(this::toDTO);
    }

    // 회원 한 명 조회 (상세보기)
    @GetMapping("/{id}")
    public MemberDTO read(@PathVariable Long id) {
        return toDTO(memberService.read(id));
    }

    // 회원 등록
    @PostMapping
    public ResponseEntity<String> create(@RequestBody MemberDTO dto) {
        memberService.register(toEntity(dto));
        return ResponseEntity.ok("회원 등록 성공");
    }

    // 회원 수정
    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody MemberDTO dto) {
        dto.setId(id);
        memberService.register(toEntity(dto));
        return ResponseEntity.ok("회원 수정 성공");
    }

    // 회원 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        memberService.delete(id);
        return ResponseEntity.ok("회원 삭제 완료");
    }


    //  Entity → DTO 변환
    // 서버(DB에서 꺼낸 자바 Entity 객체)를 → 클라이언트(React)가 받을 수 있게 JSON 형태로 응답을 주기 위해 DTO로 변환
    private MemberDTO toDTO(Member member) {
        return new MemberDTO(
                member.getId(),
                member.getName(),
                member.getAge(),
                member.getPhone(),
                member.getAddress()
        );
    }

    // DTO → Entity 변환
    // 클라이언트(React)가 보낸 JSON 데이터를 → 서버에서 처리하기 위해 DTO로 받고 → DB 저장용 Entity 객체로 변환
    private Member toEntity(MemberDTO dto) {
        return new Member(
                dto.getId(),
                dto.getName(),
                dto.getAge(),
                dto.getPhone(),
                dto.getAddress()
        );

    }
}
