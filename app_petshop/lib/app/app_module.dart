import 'package:app_petshop/app/modules/configurations/configurations_module.dart';
import 'package:app_petshop/app/modules/container/container_module.dart';
import 'package:app_petshop/app/modules/new_schedule/new_schedule_module.dart';
import 'package:app_petshop/app/modules/new_service/new_service_module.dart';
import 'package:app_petshop/app/modules/schedule/schedule_module.dart';
import 'package:app_petshop/app/modules/services/services_module.dart';
import 'package:dio/dio.dart';

import 'app_controller.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:flutter/material.dart';
import 'package:app_petshop/app/app_widget.dart';

class AppModule extends MainModule {
  @override
  List<Bind> get binds => [
        $AppController,
        Bind((i) => Dio())
      ];

  @override
  List<ModularRouter> get routers => [
        ModularRouter(Modular.initialRoute, module: ContainerModule()),
        ModularRouter('/Home', module: ScheduleModule()),
        ModularRouter('/NewSchedule', module: NewScheduleModule()),
        ModularRouter('/Services', module: ServicesModule()),
        ModularRouter('/Configurations', module: ConfigurationsModule()),
        ModularRouter('/NewService', module: NewServiceModule()),
      ];

  @override
  Widget get bootstrap => AppWidget();

  static Inject get to => Inject<AppModule>.of();
}
