import 'package:app_petshop/app/components/drawer_widget.dart';
import 'package:app_petshop/app/modules/schedule/schedule_module.dart';
import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'container_controller.dart';

class ContainerPage extends StatefulWidget {
  final String title;
  const ContainerPage({Key key, this.title = "Container"}) : super(key: key);

  @override
  _ContainerPageState createState() => _ContainerPageState();
}

class _ContainerPageState
    extends ModularState<ContainerPage, ContainerController> with TickerProviderStateMixin {

  Animation animationTranslate;
  Animation animationSize;
  Animation animationSizeBorder;
  RouterOutletListController routerOutletController = RouterOutletListController();

  @override
  void initState() {
    super.initState();
    print('InitContainer');
    controller.animationController =
        AnimationController(duration: Duration(milliseconds: 200), vsync: this);

    animationTranslate = Tween(begin: 0.0, end: 300.0)
        .animate(CurvedAnimation(parent: controller.animationController, curve: Curves.easeOut));
    animationTranslate.addListener(() {
      setState(() {});
    });

    animationSize = Tween(begin: 1.0, end: 0.8)
        .animate(CurvedAnimation(parent: controller.animationController, curve: Curves.easeOut));
    animationSize.addListener(() {
      setState(() {});
    });

    animationSizeBorder = Tween(begin: 0.0, end: 10.0)
        .animate(CurvedAnimation(parent: controller.animationController, curve: Curves.easeOut));
    animationSizeBorder.addListener(() {
      setState(() {});
    });

    controller.setRouterController(routerOutletController);

    controller.routerOutletController.listen((value) {
      controller.currentindex = value;
    });

  }

  @override
  void dispose() {
    controller.animationController.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        DrawerWidget(), //widget do drawer
        Transform.scale(
          scale: animationSize.value,
          child: Container(
              transform: Matrix4.identity()
                ..translate(animationTranslate.value, 0.0),
              child: ClipRRect(
                  borderRadius:
                      BorderRadius.circular(animationSizeBorder.value),
                  child: RouterOutletList(
                    modules: [
                      ScheduleModule()
                    ],
                    controller: routerOutletController,
                  )
              )
          )
        ) //tela inicial
      ],
    );
  }
}
