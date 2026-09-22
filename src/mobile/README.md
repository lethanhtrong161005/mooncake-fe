# React Native Screens cho Nguyệt Phố B2B Mooncake

Thư mục này chứa các màn hình và theme token được chuyển đổi sang chuẩn **React Native** (sử dụng `View`, `Text`, `StyleSheet`, `TouchableOpacity`, `ScrollView`, v.v.):

## Cấu Trúc
- `theme/colors.js`: Định nghĩa bảng màu hoàng gia và typography chuẩn của thương hiệu Nguyệt Phố.
- `screens/EvaluteScreen.jsx`: Màn hình di động "Đánh Giá & Phê Duyệt Mẫu Thử" với đầy đủ tương tác tick chọn duyệt 4 vị bánh, kiểm tra dập nhũ vàng 24K, nhập ghi chú xưởng bánh và modal duyệt nghiệm thu.
- `index.js`: Điểm export tập trung.

## Cách Sử Dụng Trong Dự Án React Native / Expo
Copy thư mục `src/mobile` vào dự án React Native hoặc Expo của bạn:

```jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EvaluteScreen } from './src/mobile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Evalute" component={EvaluteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```
