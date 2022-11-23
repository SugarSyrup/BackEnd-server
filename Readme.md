express api => 1. db(음식 자료 정리)
            2. kakaomap ( 주변에 좌표 찍고 보여주기 )

## 구성 방법

: Firebase + React ??

Firebase 및 백엔드 좀 더 고려해보기,,,,


Login,  Join => firebase함수를 이용한 직접 접근

오늘 무조건 만져봐야 프로젝트 어떻게 할지 감이 잡힐듯..? (앞으로 api,db 관리 하는데에도 중요한 순간, firebase에 전적으로 의존하면서 백엔드 구성을 안할지 vs firebase외의 부분을 nodejs로 구현할지 에 대해)

!!! passport.js를 이용해서 naver, kakao oauth를 구현해보는거 test해보기
-> express에서 하고 api로 요청 받고 callback해줘야함
==> oauth2.0(naver, kakao) <=passport=> express <=axios=> React
POST /auth/join/naver   res.json()
POST /auth/join/kakao   res.json()

++ oauth 이용하면... 내가 구성하는 웹페이지가 아닌 다른 웹페이지가 get됨 => ReactRouterDom이 아닌듯..? Nweeter 참고

## 진행 순서
1. 사용자 음식 data 받아오기
2. 전체 음식 데이터 받아와서 mongodb에 저장하기
3. 받아온 음식 data 처리하기 (계산)
4. 결과 return

1. login/ join => firebase
2. passport => login data로 넘기기
3. 사용자 data에 영양성분에 대한 정보도 남아있어야함

1. 배포는 firebase로 예정 + domain 하나 사던가 ㅋㅋ