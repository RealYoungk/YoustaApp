# Youstagram IOS & Android App

Screens:

- [ ] Home
- [ ] Search
- [ ] Upload
- [ ] Notifications (challenge)
- [ ] Profile
- [ ] Edit Profile(challenge)
- [ ] Photo Detail
- [ ] Photo Comments(challenge)
- [ ] Photo Likes(challenge)

-------------------------------------------------------
#### ngrok usage
```
ngrok http 4000
포워딩 주소 apollo.js에 복사 붙여넣기
```
----------------------------------------------------------
### Study Node 

#### 10. APP: SETUP 
- 10.0 Creating the Project<br>
```yarn global add expo-cli``` <br>
```expo init youstaApp``` <br>
```yarn add styled-components react-navigation apollo-boost graphql react-apollo-hooks``` <br>


- 10.1 Preloading Assets<br>
이미지같은것들을 미리 보여주는것<br>
loaded 상태로 제어, preload, useEffect로 최적화<br>
```import { Ionicons } from "@expo/vector-icons";``` : 아이콘

- 10.2 Preloading Cache<br>
전에 쓰던 데이터가 로딩없이 보이는 이유는 클라이언트가 데이터를 가지고 있기 때문, 그것을 구현, apollo에서 client에 추가적으로 넘겨줄 옵션들 관리
AsyncStorage는 deprecated 되어서 문서 참고하여 변경<br>

```
import AsyncStorage from "@react-native-community/async-storage";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
```

- 10.3 Recap<br>
여태 했던 작업 리마인더 하였음, loaded client 상태를 가지고 preloading처리를 하였고 ApolloProvieder로 클라이언트를 넘겨주고, 클라이언트는 접속하였을때 서버통신없이 데이터를 보여주기 위해 asset, persist cache를 사용하고 Ionicon도 사용하여 아이콘 사용, preload함수를 사용한 이유는 비동기 처리를 하기 위해서, useEffect를 사용하여 처음 랜더링 될때만 리랜더링 시키고, preload가 끝나면 상태변화로 리랜더링 시켜서 클라이언트를 넘기고 view컴포넌트를 띄웠음.

- 10.4 isLoggedIn part One<br>
로그인 상태를 만들고 null false true 값으로 통제함, 이 상태를 추가한 이유는 로그인에 따른 네비게이션 바를 나타내기 위해서임

- 10.5 isLoggedIn part Two<br>
isLoggedIn 상태를 제어하기 위해서 비동기 login logout함수를 만들었다. 위 함수는 AsyncStorage에 isLoggedIn키를 true나 false로 바꿔주고 상태변화까지 한다. 그리고 react-native에서 지원하는 TouchableOpacity컴포넌트를 사용해서 onPress 파라미터에 login logout 이벤트를 넘겨준다.
로그인 로그아웃은 어디서든 가능하게 하게 해야하기때문에 context를 활용하여 전역상태로 리팩토링 할 예정이다.

- 10.6 AuthContext part One<br>
로그인 상태를 전역적으로 관리하기 위해서 createContext, useContext, useState를 사용하였다 createContext를 사용하여 컨택스트를 생성하고 isloggedin상태와 login logout 이벤트를 가져와서 AuthContext.Provider를 사용하여 객체 형식으로 넘겨준다. 그 전역적인 객체를 받아서 useIsLoggedIn, useLogIn, useLogOut을 만들고 export 함. 

- 10.7 AuthContext part Two<br>
앞서 만든 프로세스에 로그인인지 체크 하는동안 preload를 하지 못해서 사용자가 빈화면을 보는 치명적인 단점이 있었다. 그래서 app.js에서 지웠던 상태를 다시 만들고 context로 상태를 넘겨주는 방식으로 변경 하였다. 
ps. Expo 앱이 강제종료 되는 이슈가 있었음, 컴터 폰 재부팅하고 캐시파일 다 지우고 일단 다시 돌아가긴함, 에러의 원인은 분명하진 않지만 View style 에서 잘못된 css를 전달 해 준게 원인인것 같음.
```
CSS flex: 크기설정, 작게하기, 크게하기<br>
justify-contents : center 중앙정렬
align-items : center 중앙정렬
```

#### 11 APP: NAVIGATION

- 11.0 Introduction To Navigation<br>
앞으로 네비게이션을 구현할 예정인데, 네비게이션은 Tab, Stack, Drawer 네비게이션으로 구성된다.
탭은 하단에서 눌러서 사용하는 네비게이션
스택은 내가 보던 화면이 밑으로 내려가고 새로운 카드가 화면 상단에 뜨는것
드로워는 좌측상단에 있는 네비게이터다.

- 11.1 AuthNavigation<br>
```
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
```
ref : https://reactnavigation.org/docs/4.x/hello-react-navigation/

- 11.2 Tabs Navigation
와.. 매우매우 힘들었음 강의에서 사용한 네비게이터가 다 버전 업그레이드가 되어서 다시 설치하고 레퍼런스 참고해서 사용법도 다 달라서 힘들었음, 잘 모르지만 느낌적으로 봤을때 컴포넌트 느낌으로 짤수있게 바뀐것 같다. 
11.1에서 사용한 네비게이터는 안썼고 자체적으로 레퍼런스 참고해서 작성함
```
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
```

- 11.3 Photo Navigation<br>
 네비게이션의 흐름은 다음과 같다. 
 > 0. 메인 네비는 스택 네비게이션이다.
 > 1. 메인 네비게이션에서 탭 네비게이션과 포토 네비게이션 두개를 자식으로 가진다. (탭 네비가 디폴트)
 > 2. 텝 네비에서 ADD 버튼을 누르면 listener를 통해 Photo 네비로 이동
 4.x 네비에서 5.x네비로 넘어오면서 컴포넌트 형식으로 JSX가 바뀐게 느껴진다.(가독성이 더 좋은듯)
 
 11.4 Messages Navigation part One<br>
 각각의 탭 네비게이션은 그냥 컴포넌트가 랜더링 되는데, 이 컴포넌트에 스택 효과를 주기 위해서 stackFactory라는 함수를 사용하여 Stack 네비게이션을 콜백하게 해서 구현하였다.
 ```
 <BottomTab.Screen name="HOME">
        {() =>
          stackFactory(Home, "Home", {
            title: "Home",
            headerRight: () => (
              <TouchableOpacity>
                <Text>Hello</Text>
              </TouchableOpacity>
            ),
          })
        }
</BottomTab.Screen>
 ```
 
 - 11.5 Message Navigation part Two<br>
 메세지 네비게이터를 만들었움. 메세지 네비게이터를 추가하기 위해 메인에 메세지 네비게이터가 있다는것을 알려주고, 탭 네비게이터에서 headerRight옵션을 사용하여 MessageLink컴포넌트를 콜백하고 그 컴포넌트에서는 useNavigation이라는 훅을 사용하여 메세지 네비게이터로 이동하였다.
```import { useNavigation } from "@react-navigation/native";```


- 11.6 Navigation Conclusions
리액트는 네비게이터가 유연하지 않아서 큰 단점이다. 그래서프로잭트 설계시 요구사항을 확실히 받고 설계를 잘해서 네비게이터 부터 만드는것을 추천한다.


#### 12. APP: AUTH

- 12.0 AuthHome <br>
본격적으로 로그인 구현에 앞서 페이지 디자인을 하였다. Styled.Image를 활용하여 이미지를 가져오고 앞서 만든 라우팅 기능이 되도록 하였다. 여기서 새로 알게된 점은 Constants.js에서 Demensions.get("screen")을 활용하여 넓이와 높이를 가져오고 styled 에서 ${Constants.width} 로 값을 가져올 수 있다는 것, 그리고 styles를 전역적으로 export를 하고, props.theme.blueColor와 같은 방법으로 CSS를 가져올수 있다는것이다.

- 12.1 Auth Components part One <br>
리액트의 장점은 컴포넌트 재사용인데, auth에 버튼이나 입력 칸 같은것을 재사용을 많이 하기 때문에 컴포넌트를 만들었다. 컴포넌트는 레퍼런스를 참고해서 만들면 되고, propTypes를 활용하여 타입체크도 해주어야 한다.

- 12.2 Auth Components part Two<br>
입력하는 입력란에 대한 컴포넌트를 만들었다면 그 입력란의 상태변화에 대응하는 useInput이라는 훅을 만들었다.

- 12.3 Login part One<br>
로그인 인풋에 레퍼런스를 참고해서 여러 옵션을 주었다.
```
onChangeText={onChange}
keyboardType={keyboardType}
placeholder={placeholder}
autoCapitalize={autoCapitalize}
value={value}
returnKeyType={returnKeyType}
onEndEditing={onEndEditing}
autoCorrect={autoCorrect}
```

- 12.4 Login part Two<br>
백엔드의 requestSecret을 연동한다. react-apollo-hooks 완전 편한듯,,
그리고 로그인 시도시 중복으로 버튼을 handle 하지 않는다던지 여러 옵션을 주었음


- 12.5 Login part Three<br>
백엔드에 요청이 제대로 가지 않는 네트워크 에러가 발생하였음, 로컬에 실행중인 서버를 안전하게 외부에서 접근 가능하게 하는 ngrok을 활용하여 에러를 해결
```
ngrok 은 NAT와 방화벽 뒤에 있는 로컬 서버 를 안전한 터널을 통해 공개 인터넷에 노출시켜 주는 도구라고 설명되어 있습니다. 즉, 포트 포워딩과 같은 네트워크 환경 설정 변경없이 로컬에 실행중인 서버를 안전하게 외부에서 접근 가능하도록 해주는 도구
```

- 12.6 Confirm<br>
비밀번호를 확인하는 페이지를 만들었다. 전반적으로 login페이지와 유사하며, 클릭시 AuthContext에 jwt토큰을 저장하고 isloggined 가 true 가 되어서 홈 화면이 나타난다. login페이지에서 email 값을 넘기기 위해서 navigation을 활용하였고, confirm에서 이메일 값을 받아오기 위해서 route.param을 활용하였다.



