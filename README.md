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

### Study Node 

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

- 10.7 AuthContext part Two
앞서 만든 프로세스에 로그인인지 체크 하는동안 preload를 하지 못해서 사용자가 빈화면을 보는 치명적인 단점이 있었다. 그래서 app.js에서 지웠던 상태를 다시 만들고 context로 상태를 넘겨주는 방식으로 변경 하였다. 
ps. Expo 앱이 강제종료 되는 이슈가 있었음, 컴터 폰 재부팅하고 캐시파일 다 지우고 일단 다시 돌아가긴함, 에러의 원인은 분명하진 않지만 View style 에서 잘못된 css를 전달 해 준게 원인인것 같음.


















