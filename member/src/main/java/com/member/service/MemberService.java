package com.member.service;


import com.member.entity.Member;
import com.member.repository.MemberRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Getter
@Setter
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    //CRUD => Create
    public void register(Member member){
        memberRepository.save(member);
    }


    //CRUD => Read
    public Member read(Long memberId){
        //memberId 값을 DB에서 조회해서  없으면 예외 발생
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found with id: " + memberId));
        return  member;
    }

    //CRUD => Read All
    public List<Member> readAll(){

        List<Member> members = memberRepository.findAll();
        return members;
    }

    //CRUD => delete
    public void delete(Long memberId){
        memberRepository.deleteById(memberId);
    }


    //paging
    public Page<Member> readAllPage(Pageable pageable){
        Page<Member> memberPage = memberRepository.findAll(pageable);
        return memberPage;
    }
}
