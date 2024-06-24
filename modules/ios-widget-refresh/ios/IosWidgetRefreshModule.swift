import ExpoModulesCore
import WidgetKit

public class IosWidgetRefreshModule: Module {
    public func definition() -> ModuleDefinition {
        // Name of the module as used in JS
        Name("IosWidgetRefresh")

        // Function to call from JS
        Function("set") { (key: String, value: String, group: String?) in
            let userDefaults = UserDefaults(
              // The group name is the same as the App Group name
              suiteName: group
            )
            userDefaults?.set(value, forKey: key)

            // Trigger a widget update to sync the data
            if #available(iOS 14.0, *) {
                WidgetCenter.shared.reloadAllTimelines()
            }
        }
    }
}