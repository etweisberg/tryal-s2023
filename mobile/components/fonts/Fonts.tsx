import * as Font from 'expo-font'

// export default function GetFont({children, textType, style,}: AppTextProps) {
//   const [fontsLoaded] = Font.useFonts({
//     'Inconsolata-Regular': require('../../assets/fonts/Inconsolata-Regular.ttf'),
//     'Inconsolata-Bold': require('../../assets/fonts/Inconsolata-Bold.ttf'),
//     'Inconsolata-Legular': require('../../assets/fonts/Inconsolata-Light.ttf'),
//   });
// }


export default async function UseFonts() {
  await Font.loadAsync({
    'Inconsolata-Regular': require('../../assets/fonts/Inconsolata-Regular.ttf'),
    'Inconsolata-Bold': require('../../assets/fonts/Inconsolata-Bold.ttf'),
    'Inconsolata-Legular': require('../../assets/fonts/Inconsolata-Light.ttf'),})
}