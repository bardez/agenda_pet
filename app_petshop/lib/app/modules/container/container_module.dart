import 'container_controller.dart';
import 'package:flutter_modular/flutter_modular.dart';

import 'container_page.dart';

class ContainerModule extends ChildModule {
  @override
  List<Bind> get binds => [
        $ContainerController,
      ];

  @override
  List<ModularRouter> get routers => [
        ModularRouter(Modular.initialRoute,
            child: (_, args) => ContainerPage()),
      ];

  static Inject get to => Inject<ContainerModule>.of();
}
