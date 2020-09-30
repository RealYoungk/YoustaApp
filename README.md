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
