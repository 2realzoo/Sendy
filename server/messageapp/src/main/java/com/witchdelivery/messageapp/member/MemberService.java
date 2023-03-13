package com.witchdelivery.messageapp.member;

import com.witchdelivery.messageapp.exception.BusinessLogicException;
import com.witchdelivery.messageapp.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        verifiedExistedEmail(member.getEmail());    // 이메일 검증
        verifiedExistedName(member.getMemberName());    // 닉네임 검증
        return memberRepository.save(member);
    }

    public Member findMember(Long memberId) {
        return findVerifiedMember(memberId);
    }

    public Page<Member> findMembers(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return memberRepository.findAllByOrderByMemberIdDesc(pageRequest);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());    // ofNullable() : Optional 객체가 null 값을 가지고 있어도 허용
        Optional.ofNullable(member.getEmail()).ifPresent(email -> findMember.setEmail(email));
        Optional.ofNullable(member.getMemberName()).ifPresent(memberName -> findMember.setMemberName(memberName));
        Optional.ofNullable(member.getPassword()).ifPresent(password -> findMember.setPassword(password));
        Optional.ofNullable(member.getComment()).ifPresent(comment -> findMember.setComment(comment));
        return memberRepository.save(findMember);
    }

    public void deleteMember(Long memberId) {
        Member findMember = findVerifiedMember(memberId);  // 사용자 검증
        memberRepository.delete(findMember);    // TODO 사용자 탈퇴 시, 관련 데이터 일괄 삭제
    }

    // 사용자 검증
    public Member findVerifiedMember(long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);  // orElseThrow() : Optional 객체가 null 값을 가지고 있다면 예외처리 발생
        Member findMember = member.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));   // 404
        return findMember;
    }

    // 이메일 검증
    public void verifiedExistedEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) // isPresent() : Optional 객체가 값을 가지고 있다면 true, 아니라면 false
            throw new BusinessLogicException(ExceptionCode.MEMBER_EMAIL_EXISTS);    // 409
    }

    // 닉네임 검증
    public void verifiedExistedName(String memberName) {
        Optional<Member> member = memberRepository.findByMemberName(memberName);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_NAME_EXISTS);    // 409
    }
}
