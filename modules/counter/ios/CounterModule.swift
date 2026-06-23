import ExpoModulesCore
import WidgetKit

public class CounterModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Counter")

    Function("refreshWidget") {
      if #available(iOS 14.0, *) {
        WidgetCenter.shared.reloadAllTimelines()
      }
    }
  }
}