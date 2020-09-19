import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';

part 'container_controller.g.dart';

@Injectable()
class ContainerController = _ContainerControllerBase with _$ContainerController;

abstract class _ContainerControllerBase with Store {

  RouterOutletListController routerOutletController = RouterOutletListController();
  void setRouterController(rc) => routerOutletController = rc;

  @observable
  int currentindex = 0;

  @action
  void toggleMenu() {
    onTapMenu(99);
  }

  @observable
  bool menuOpened = false;

  AnimationController animationController;

  void onTapMenu(index) {
    if (menuOpened == true) {
      animationController?.reverse();
    } else {
      animationController?.forward();
    }
    menuOpened = !menuOpened;
    if( index != 99)
      routerOutletController.changeModule(index);
  }
}
