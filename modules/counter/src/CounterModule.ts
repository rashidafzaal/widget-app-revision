import { NativeModule, requireNativeModule } from 'expo';

declare class CounterModule extends NativeModule<{}> {
  refreshWidget(): void;
}

export default requireNativeModule<CounterModule>('Counter');