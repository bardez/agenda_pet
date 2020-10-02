import 'package:app_petshop/app/modules/container/container_controller.dart';
import 'package:app_petshop/app/shared/EventBusCustom.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'services_controller.dart';

class ServicesPage extends StatefulWidget {
  final String title;
  const ServicesPage({Key key, this.title = "Servicos"}) : super(key: key);

  @override
  _ServicesPageState createState() => _ServicesPageState();
}

class _ServicesPageState
    extends ModularState<ServicesPage, ServicesController> {
  //use 'controller' variable to access controller
  final containerController = Modular.get<ContainerController>();

  @override
  void initState(){
    print('Services -> initState');
    super.initState();
    EventBusCustom.eventBus.on().listen((event){
      if(event == 'RefreshServices') {
        print(event);
        controller.services = null;
        controller.fetchServices();
      }
    });
  }


  @override
  void didUpdateWidget(ServicesPage oldWidget) {
    print('Services -> didUpdateWidget');
    super.didUpdateWidget(oldWidget);
    controller.fetchServices();
  }

  @override
  Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
          leading: GestureDetector(
            onTap: containerController.toggleMenu,
            child: Icon(Icons.menu)),
        ),
        body: Observer(builder: (_) {
          return Scaffold(
            backgroundColor: Colors.white,
            body: (controller.services == null) ?
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      CircularProgressIndicator()
                    ],
                  )
                : ListView.builder(
                    itemCount: controller.services.data.count,
                    itemBuilder: (BuildContext context, int index){
                      return new Card(
                        child: new Container(
                          padding: new EdgeInsets.only(left: 10.0, top:10, bottom: 10),
                          child: ListTile(
                            leading: Icon(Icons.pets),
                            title: Text(controller.services.data.rows.elementAt(index).tipoServico.tisDesc),
                            trailing: _simplePopup(),
                          )
                        ),
                      );
          
                    }
                )
          );
        }),
        floatingActionButton: FloatingActionButton(
              heroTag: 'services_tag',
              onPressed: () => Modular.to.pushNamed('NewService'),
              child: Icon(Icons.add, color: Theme.of(context).floatingActionButtonTheme.foregroundColor,),
              foregroundColor: Theme.of(context).floatingActionButtonTheme.foregroundColor,
            )
      );
  }

  @override
  void dispose() {
    print('Services -> dispose');
    super.dispose();
  }
}

Widget _simplePopup() => PopupMenuButton<int>(
  icon: Icon(Icons.more_vert),
  itemBuilder: (context) => [
        PopupMenuItem(
          value: 1,
          child: Text("Editar"),
        ),
        PopupMenuItem(
          value: 2,
          child: Text("Excluir"),
        ),
      ],
);

