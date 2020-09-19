import 'new_schedule_controller.dart';
import 'package:flutter_modular/flutter_modular.dart';

import 'new_schedule_page.dart';

class NewScheduleModule extends ChildModule {
  @override
  List<Bind> get binds => [
        $NewScheduleController,
      ];

  @override
  List<ModularRouter> get routers => [
        ModularRouter(Modular.initialRoute,
            child: (_, args) => NewSchedulePage()),
      ];

  static Inject get to => Inject<NewScheduleModule>.of();
}
