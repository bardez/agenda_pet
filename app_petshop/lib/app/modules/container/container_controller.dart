import 'package:app_petshop/app/modules/configurations/configurations_module.dart';
import 'package:app_petshop/app/modules/schedule/schedule_module.dart';
import 'package:app_petshop/app/modules/services/services_module.dart';
import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';

part 'container_controller.g.dart';

@Injectable()
class ContainerController = _ContainerControllerBase with _$ContainerController;

abstract class _ContainerControllerBase with Store {

  RouterOutletListController routerOutletController = RouterOutletListController();
  void setRouterController(rc) {
    routerOutletController = rc;
    routerOutletController.listen((value) {
      currentindex = value;
    });
  }

  @observable
  int currentindex = 1;

  @action
  void toggleMenu() {
    onTapMenu(99, '');
  }

  @observable
  bool menuOpened = false;

  AnimationController animationController;

  void onTapMenu(int index, String route) {
    if (menuOpened == true) {
      animationController?.reverse();
    } else {
      animationController?.forward();
    }
    menuOpened = !menuOpened;
    if( index != 99 && route != '') {
      routerOutletController.changeModule(index);
      // Modular.to.navigator.(route);
    }
  }
}
