import 'new_service_controller.dart';
import 'package:flutter_modular/flutter_modular.dart';

import 'new_service_page.dart';

class NewServiceModule extends ChildModule {
  @override
  List<Bind> get binds => [
        $NewServiceController,
      ];

  @override
  List<ModularRouter> get routers => [
        ModularRouter(Modular.initialRoute,
            child: (_, args) => NewServicePage()),
      ];

  static Inject get to => Inject<NewServiceModule>.of();
}
