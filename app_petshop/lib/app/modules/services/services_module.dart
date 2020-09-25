import 'services_controller.dart';
import 'package:flutter_modular/flutter_modular.dart';

import 'services_page.dart';

class ServicesModule extends ChildModule {
  @override
  List<Bind> get binds => [
        $ServicesController,
      ];

  @override
  List<ModularRouter> get routers => [
        ModularRouter(Modular.initialRoute, child: (_, args) => ServicesPage()),
      ];

  static Inject get to => Inject<ServicesModule>.of();
}
