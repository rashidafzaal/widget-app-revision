import { Platform } from 'react-native';
import { File, Paths } from 'expo-file-system';
import CounterModule from '../modules/counter/src/CounterModule';

const APP_GROUP = 'group.com.rashidafzaal1718.widgetapp.counter';

function getCountFile(): File {
  if (Platform.OS === 'ios') {
    const dir = Paths.appleSharedContainers[APP_GROUP];
    return new File(dir, 'count.txt');
  }
  return new File(Paths.document, 'count.txt');
}

export function readCount(): number {
  const file = getCountFile();
  if (!file.exists) return 0;
  const text = file.textSync().trim();
  return parseInt(text, 10) || 0;
}

export function writeCount(value: number): void {
  const file = getCountFile();
  file.write(String(value));
  CounterModule.refreshWidget();
}