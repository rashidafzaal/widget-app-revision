package expo.modules.counter

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class CounterModule : Module() {
  private val context: Context
    get() = appContext.reactContext ?: throw Exception("React context is not available")

  override fun definition() = ModuleDefinition {
    Name("Counter")

    Function("refreshWidget") {
      val manager = AppWidgetManager.getInstance(context)
      val componentName = ComponentName(context, "expo.modules.counter.CounterWidget")
      val ids = manager.getAppWidgetIds(componentName)

      val intent = android.content.Intent(context, Class.forName("expo.modules.counter.CounterWidget"))
      intent.action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
      intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids)
      context.sendBroadcast(intent)
    }
  }
}