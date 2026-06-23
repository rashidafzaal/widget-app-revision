const { withAndroidManifest, withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const PACKAGE_PATH = 'com/rashidafzaal1718/WidgetAppRevision';

function withAndroidWidget(config) {
  // Step A: copy widget files into the generated android/ project
  config = withDangerousMod(config, [
    'android',
    async (config) => {
      console.log('🔧 withAndroidWidget plugin is running!');

      const projectRoot = config.modRequest.platformProjectRoot;
      const sourceDir = path.join(
        config.modRequest.projectRoot,
        'modules/counter/android/widget'
      );

      const kotlinDestDir = path.join(
        projectRoot,
        'app/src/main/java',
        PACKAGE_PATH
      );
      fs.mkdirSync(kotlinDestDir, { recursive: true });
      fs.copyFileSync(
        path.join(sourceDir, 'CounterWidget.kt'),
        path.join(kotlinDestDir, 'CounterWidget.kt')
      );

      const layoutDestDir = path.join(projectRoot, 'app/src/main/res/layout');
      fs.mkdirSync(layoutDestDir, { recursive: true });
      fs.copyFileSync(
        path.join(sourceDir, 'counter_widget.xml'),
        path.join(layoutDestDir, 'counter_widget.xml')
      );

      const xmlDestDir = path.join(projectRoot, 'app/src/main/res/xml');
      fs.mkdirSync(xmlDestDir, { recursive: true });
      fs.copyFileSync(
        path.join(sourceDir, 'counter_widget_info.xml'),
        path.join(xmlDestDir, 'counter_widget_info.xml')
      );

      return config;
    },
  ]);

  // Step B: inject <receiver> into AndroidManifest.xml
  config = withAndroidManifest(config, (config) => {
    const androidManifest = config.modResults;
    const application = androidManifest.manifest.application[0];

    if (!application.receiver) {
      application.receiver = [];
    }

    const alreadyExists = application.receiver.some(
      (r) => r['$']['android:name'] === '.CounterWidget'
    );

    if (!alreadyExists) {
      application.receiver.push({
        $: {
          'android:name': '.CounterWidget',
          'android:exported': 'false',
        },
        'intent-filter': [
          {
            action: [
              {
                $: {
                  'android:name': 'android.appwidget.action.APPWIDGET_UPDATE',
                },
              },
            ],
          },
        ],
        'meta-data': [
          {
            $: {
              'android:name': 'android.appwidget.provider',
              'android:resource': '@xml/counter_widget_info',
            },
          },
        ],
      });
    }

    return config;
  });

  return config;
}

module.exports = withAndroidWidget;