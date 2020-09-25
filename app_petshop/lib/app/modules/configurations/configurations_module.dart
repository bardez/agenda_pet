import 'configurations_controller.dart';
import 'package:flutter_modular/flutter_modular.dart';

import 'configurations_page.dart';

class ConfigurationsModule extends ChildModule {
  @override
  List<Bind> get binds => [
        $ConfigurationsController,
      ];

  @override
  List<ModularRouter> get routers => [
        ModularRouter(Modular.initialRoute,
            child: (_, args) => ConfigurationsPage()),
      ];

  static Inject get to => Inject<ConfigurationsModule>.of();
}
