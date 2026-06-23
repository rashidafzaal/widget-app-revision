import { registerWebModule, NativeModule } from 'expo';

// CounterModule is not available on the web platform.
class CounterModule extends NativeModule<{}> {}

export default registerWebModule(CounterModule, 'CounterModule');
