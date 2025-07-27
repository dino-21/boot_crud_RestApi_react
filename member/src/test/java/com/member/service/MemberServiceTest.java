package com.member.service;

import com.member.entity.Member;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
@SpringBootTest
@Log4j2
class MemberServiceTest {
    @Autowired
    private MemberService memberService;

    @Test
    public void testInsert(){
        Member member = new Member();
        member.setAge(8);
        member.setName("강산이");
        member.setAddress("안산시");
        memberService.register(member);

    }

    //CRUD -> update
    @Test
    public void testupdate(){
        Member member = new Member();
        member.setId(1L);
        member.setAge(28);
        member.setName("까미");
        member.setAddress("안산시");
        memberService.register(member);
    }


    //CRUD -> read
    @Test
    public void testRead(){
        Long memberId = 1L;
        Member team = memberService.read(memberId);
        log.info("team : " + team);
    }


    //CRUD -> read All
    @Test
    public void testReadAll(){
        List<Member> members = memberService.readAll();
        members.forEach(member -> log.info(member));
    }

    //CRUD -> delete
    @Test
    public void testDelete(){
        Long memberId = 2L;
        memberService.delete(memberId);
    }
}