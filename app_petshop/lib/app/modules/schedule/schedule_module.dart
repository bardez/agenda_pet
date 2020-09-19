import 'package:app_petshop/app/modules/container/container_controller.dart';

import 'schedule_controller.dart';
import 'package:flutter_modular/flutter_modular.dart';

import 'schedule_page.dart';

class ScheduleModule extends ChildModule {
  @override
  List<Bind> get binds => [
        $ScheduleController,
        Bind((i) => ContainerController())
      ];

  @override
  List<ModularRouter> get routers => [
        ModularRouter(Modular.initialRoute, child: (_, args) => SchedulePage()),
      ];

  static Inject get to => Inject<ScheduleModule>.of();
}
