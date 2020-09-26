import 'package:app_petshop/app/modules/container/container_controller.dart';
import 'package:flutter/material.dart';
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
  List data = new List();
  final containerController = Modular.get<ContainerController>();

  @override
  void initState() {
    super.initState();

    data.add('BANHO');
    data.add('TOSA');
    data.add('BANHO e TOSA');
    data.add('TOSA HIGIENICA');
    data.add('MASSAGEM');
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
      body: ListView.builder(
          itemCount: data.length,
          itemBuilder: (BuildContext context, int index){
            return new Card(
              child: new Container(
                padding: new EdgeInsets.only(left: 10.0, top:10, bottom: 10),
                child: ListTile(
                  leading: Icon(Icons.pets),
                  title: Text(data[index]),
                  trailing: _simplePopup(),
                )
              ),
            );
 
          }
      ),
      floatingActionButton: FloatingActionButton(
            heroTag: 'services_tag',
            onPressed: () => Modular.to.pushNamed('Configurations'),
            child: Icon(Icons.add, color: Theme.of(context).floatingActionButtonTheme.foregroundColor,),
            foregroundColor: Theme.of(context).floatingActionButtonTheme.foregroundColor,
          )
    );
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