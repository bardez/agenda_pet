import 'package:app_petshop/app/modules/container/container_module.dart';
import 'package:app_petshop/app/modules/login/login_module.dart';
import 'package:app_petshop/app/modules/new_schedule/new_schedule_module.dart';

import 'app_controller.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:flutter/material.dart';
import 'package:app_petshop/app/app_widget.dart';

class AppModule extends MainModule {
  @override
  List<Bind> get binds => [
        $AppController,
      ];

  @override
  List<ModularRouter> get routers => [
        ModularRouter(Modular.initialRoute, module: ContainerModule()),
        ModularRouter('/Home', module: ContainerModule()),
        ModularRouter('/NewSchedule', module: NewScheduleModule()),
      ];

  @override
  Widget get bootstrap => AppWidget();

  static Inject get to => Inject<AppModule>.of();
}
